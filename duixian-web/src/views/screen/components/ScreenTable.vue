<template>
    <div class="scdialog">
        <el-dialog v-model="show" class="sctable" :key="props.dialogCode">
            <template #title>
                <div class="dialog-title">
                    <div class="title_red"></div>
                    <span class="title_text">{{ dialogTitle }}</span>
                    <div class="title-img" @click="handleImg">
                        <img src="@/assets/shuaxin2.png"/>
                    </div>
                </div>
                <div class="noti">
                    说明：以下赛事显示的比赛时间和比分均为推荐时的时间和比分，并非实时比赛进行的时间和比分，查看实时进行时间和比分请点击比赛进入赛事详情页面
                </div>
            </template>
            <el-table  :data="tableData" stripe class="screen_table" @row-click="handleRowClick">
                <el-table-column prop="match" label="所属赛事" align="center" width="170px">
                    <template #default="{ row }">
                        {{ row.NCN?.LEAGUE }}
                    </template>
                </el-table-column>
                <el-table-column prop="time" label="时间" align="center" width="170px">
                    <template #default="{ row }">
                        {{ row.NCN?.DATE }}
                    </template>
                </el-table-column>
                <el-table-column prop="status" label="状态" align="center" width="108px">
                    <template #default="{row}" >
                        <span v-if="row.is_running === 0 ">完场</span>
                        <span v-else style="color: #fff;"> 
                            {{ row.NCN?.TIMER }}'
                        </span>
                    </template>
                </el-table-column>
                <el-table-column prop="home" label="主场球队" align="right">
                    <template #default="{row}" >
                        <span v-if="parseInt(row.NCN?.RED?.split(':')[0]) > 0" class="red">{{ parseInt(row.NCN?.RED?.split(":")[0]) }}</span>
                        <span v-if="parseInt(row.NCN?.YELLOW?.split(':')[0]) > 0" class="yellow">{{ parseInt(row.NCN?.YELLOW?.split(":")[0]) }}</span>
                        <span style="color: #fff;font-size: 12px;margin-right: 5px;">{{row.hwin}}</span>
                        <span> {{ row.NCN?.TEAM_H }}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="point" label="比分" align="center" width="60px">
                    <template #default="{row}" >
                        <span style="color: #fff;font-weight: 600;"> {{ row.NCN?.SCORE }}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="guest" label="客场球队" align="left">
                    <template #default="{row}" >
                        <span> {{ row.NCN?.TEAM_C }}</span>
                        <span style="color: #fff;font-size: 12px;margin:0 5px;">{{row.gwin}}</span>
                        <span v-if="parseInt(row.NCN?.YELLOW?.split(':')[1]) > 0" class="yellow">{{ parseInt(row.NCN?.YELLOW?.split(":")[1]) }}</span>
                        <span v-if="parseInt(row.NCN?.RED?.split(':')[1]) > 0" class="red">{{ parseInt(row.NCN?.RED?.split(":")[1]) }}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="half" label="半场" align="center" width="88px">
                    <template #default="{ row }">
                        {{ row.NCN?.["H:SCORE"] }}
                    </template>
                </el-table-column>
                <el-table-column prop="corner" label="角球" align="center" width="88px">
                    <template #default="{ row }">
                        {{ row.NCN?.["CN:SCORE"] }}
                    </template>
                </el-table-column>
                <el-table-column label="功能" align="center" width="108px">
                    <template #default="{ row }">
                        <div class="function">
                            <div v-if="userRole !== 'tourist'" @click="(event) => toggleStart(row, event)" class="icon">
                                <img :src="row.FA ? startRed : start "/>
                            </div>
                            <div @click="(event) => toggleTop(row, event)" class="icon">
                                <img :src="row.topActive ? topRed : top"/>
                            </div>
                        </div>
                    </template>
                </el-table-column>
            </el-table>
        </el-dialog>
    </div>
</template>
<script setup>
import startRed from '@/assets/table/start_red.png'
import start from '@/assets/table/start.png'
import topRed from '@/assets/table/top_red.png'
import top from '@/assets/table/top.png'
import { ElMessage } from 'element-plus';
import { computed, watch } from 'vue';
const show = defineModel({ type: Boolean })
const props = defineProps({
    dialogTitle: String,
    dialogCode: String,
    selectedIndex: Int32Array
})
const tableData = ref([])
// 计算用户角色
const userStore = useUserStore();
const userRole = computed(() => userStore.roles);
const fentchData  = computed(() => {
    if(props.dialogCode){
        const body = { code: props.dialogCode }
        historyLastTen(body).then((res) => {
            tableData.value = res
            if(props.selectedIndex === 1){
                tableData.value = tableData.value.filter(item => item.is_running ===0) //筛选完场的比赛
            }
        })
    }
})

watch(() =>{
    fentchData.value
})


const handleImg = () =>{
    const body = { code: props.dialogCode }
    historyLastTen(body).then((res) => {
        tableData.value = res
        ElMessage.success('刷新成功')
    })
}
const toggleStart = (row, event) => {
  event.stopPropagation(); // 阻止事件冒泡
  if(row.FA === 0){
    favorAdd({mid: row.KEY}).then(() => {
      row.FA = !row.FA;
      ElMessage.success('已收藏')
    })
  }
  if(row.FA === 1){
    favorDelete({mid: row.KEY}).then(() => {
      row.FA = !row.FA;
      emit('update-data');
      ElMessage.success('取消收藏')
    })
  }
};

const toggleTop = (row, event) => {
  event.stopPropagation(); // 阻止事件冒泡
  // 如果是第一次点击置顶，则保存该行的原始索引
  if (!row.topActive && row.originalIndex === undefined) {
    row.originalIndex = tableData.value.indexOf(row); // 保存原始位置
  }

  // 切换置顶状态
  row.topActive = !row.topActive;

  if (row.topActive) {
    // 置顶：将点击的 row 移到第一位
    const index = tableData.value.indexOf(row);
    if (index > -1) {
      tableData.value.splice(index, 1); // 从原位置移除
      tableData.value.unshift(row); // 将其添加到第一位
    }
  } else {
    // 取消置顶：将 row 移回原始位置
    const originalIndex = row.originalIndex; // 获取保存的原始索引
    if (originalIndex !== undefined) {
      tableData.value.splice(tableData.value.indexOf(row), 1); // 从置顶位置移除
      tableData.value.splice(originalIndex, 0, row); // 插入到原始索引位置
    }
    delete row.originalIndex; // 删除原始位置的记录
  }
};

const router = useRouter();
const handleRowClick = (row) => {
    router.push(`/Screen/${row.KEY}/${props.selectedIndex}/${row.is_running}`)  
}
</script>
<style lang='scss' scoped>

.red{
    background-color: #e92937;
    border-radius: 3px;
    color: #fff;
    padding: 0 2px;
    margin-right: 5px;
}
.yellow{
    background-color: #ff9000;
    border-radius: 3px;
    color: #fff;
    padding: 0 2px;
    margin-right: 5px;
}
.trtext{
    margin: 0 11px;
}
.function{
    display: flex;
    justify-content: center; /* 水平居中 */
    align-items: center; /* 垂直居中 */
}
.icon{
    margin: 0 5px;
}
.noti{
    background-color: rgba(55, 55, 57, 0.4);
    font-size: 14px;
    padding: 5px 10px;
    color: #fff;
}
.dialog-title{
    display: flex;
    align-items: center;
    height: 50px;
}
.title-img{
    position: absolute;
    right: 50px;
    cursor: pointer;
}

.title_red{
    background-color: rgba(255, 59, 48, 1);
    width: 6px;
    height: 18px;
    margin-left: 40px;
}
.title_text{
    color: #fff;
    font-size: 18px;
    font-weight: 600;
    margin-left: 10px;
}

</style>
<style>

.scdialog .el-dialog{
    width:1200px;
    background-color: #2c2c2e;
    border-radius: 10px;
}
.scdialog .el-dialog__header .el-dialog__close:hover {
    color: #fff; /* 设置鼠标悬停时的颜色，改为你想要的颜色 */
}
.scdialog .el-dialog__headerbtn:hover{
    color: #fff !important;
    --el-color-primary:normal;
}
.scdialog  .el-table{
    --el-table-header-bg-color: #424243;
}
.scdialog  .el-table th .cell{
    height: 50px;
    line-height: 50px;
    font-weight: 600 !important;
} /* 表头 */
.scdialog  .el-table td{
    height: 55px;
} /* 表格 */
.scdialog  .el-table .cell{
    padding: 0;
    font-weight: normal;
    color: #fff;
    font-size: 14px;
}
.scdialog  .el-table .el-table__cell{
    padding: 0;
}
.scdialog  .el-table .el-table__row{
    background-color: #2c2c2e ;
}
.scdialog  .el-table__row--striped td {

    background-color: rgba(55, 55, 57, 0.5) !important;  /* 偶数行背景颜色 */
}
.scdialog .el-table .el-table__row:hover {
    background-color: #e0e0e0 !important;  /* 鼠标悬停时的颜色 */
}
.scdialog .el-dialog__header.show-close{
    padding: 0;
}
</style>