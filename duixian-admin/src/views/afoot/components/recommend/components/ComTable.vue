<template>
    <div class="scdialog">
        <el-dialog v-model="show" class="sctable" :key="props.dialogCode">
            <template #title>
                <div class="dialog-title">
                    <span class="title_text">{{ dialogTitle }}</span>
                    <div class="title-img" @click="handleImg">
                        <img src="@/assets/shuaxin3.png"/>
                    </div>
                </div>
                <div class="noti">
                    说明：以下赛事显示的比赛时间和比分均为推荐时的时间和比分，并非实时比赛进行的时间和比分，查看实时进行时间和比分请点击比赛进入赛事详情页面
                </div>
            </template>
            <el-table  :data="tableData" class="screen_table" >
                <el-table-column prop="match" label="所属赛事"  width="170px">
                    <template #default="{ row }">
                        <a :href="getRowLink(row)" class="row-link">
                            {{ row.NCN?.LEAGUE }}
                        </a>
                    </template>
                </el-table-column>
                <el-table-column prop="time" label="时间" align="center" width="160px">
                    <template #default="{ row }">
                        <a :href="getRowLink(row)" class="row-link">
                            {{ row.NCN?.DATE }}
                        </a>
                    </template>
                </el-table-column>
                <el-table-column prop="status" label="状态" align="center" width="75px">
                    <template #default="{row}" >
                        <a :href="getRowLink(row)" class="row-link">
                            <span v-if="row.is_running === 0 " style="display: flex; justify-content: center; align-items: center;">
                                <img src="@/assets/table/icon-over.png" style="margin-right: 8px"/>完
                            </span>
                            <span v-else style="color: #e92937; display: flex; justify-content: center; align-items: center;"> 
                                <img :src="geticon(row.NCN?.TIMER)" style="margin-right: 8px;"/>
                                {{ row.NCN?.TIMER }}'
                            </span>
                        </a>
                    </template>
                </el-table-column>
                <el-table-column prop="home" label="主场球队" align="right">
                    <template #default="{row}" >
                        <a :href="getRowLink(row)" class="row-link">
                            <span v-if="parseInt(row.NCN?.RED?.split(':')[0]) > 0" class="red">{{ parseInt(row.NCN?.RED?.split(":")[0]) }}</span>
                            <span v-if="parseInt(row.NCN?.YELLOW?.split(':')[0]) > 0" class="yellow">{{ parseInt(row.NCN?.YELLOW?.split(":")[0]) }}</span>
                            <span style="color: #fff;font-size: 12px;margin-right: 5px;">{{row.hwin}}</span>
                            <span> {{ row.NCN?.TEAM_H }}</span>
                        </a>
                    </template>
                </el-table-column>
                <el-table-column prop="point" label="比分" align="center" width="60px">
                    <template #default="{row}" >
                        <a :href="getRowLink(row)" class="row-link">
                            <span style="color: #e92937;font-weight: 600;"> {{ row.NCN?.SCORE }}</span>
                        </a>
                    </template>
                </el-table-column>
                <el-table-column prop="guest" label="客场球队" align="left">
                    <template #default="{row}" >
                        <a :href="getRowLink(row)" class="row-link">
                            <span> {{ row.NCN?.TEAM_C }}</span>
                            <span style="color: #fff;font-size: 12px;margin:0 5px;">{{row.gwin}}</span>
                            <span v-if="parseInt(row.NCN?.YELLOW?.split(':')[1]) > 0" class="yellow">{{ parseInt(row.NCN?.YELLOW?.split(":")[1]) }}</span>
                            <span v-if="parseInt(row.NCN?.RED?.split(':')[1]) > 0" class="red">{{ parseInt(row.NCN?.RED?.split(":")[1]) }}</span>
                        </a>
                    </template>
                </el-table-column>
                <el-table-column prop="half" label="半场" align="center" width="70px">
                    <template #default="{ row }">
                        <a :href="getRowLink(row)" class="row-link">
                            {{ row.NCN?.["H:SCORE"] }}
                        </a>
                    </template>
                </el-table-column>
                <el-table-column prop="corner" label="角球" align="center" width="70px">
                    <template #default="{ row }">
                        <a :href="getRowLink(row)" class="row-link">
                            {{ row.NCN?.["CN:SCORE"] }}
                        </a>
                        
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
import icon15 from '@/assets/table/icon-15.png'
import icon30 from '@/assets/table/icon-30.png'
import icon45 from '@/assets/table/icon-45.png'
import icon60 from '@/assets/table/icon-60.png'
import icon75 from '@/assets/table/icon-75.png'
import icon90 from '@/assets/table/icon-90.png'
import icon90a from '@/assets/table/icon-90+.png'
import { ElMessage } from 'element-plus';
import { computed, watch } from 'vue';
const emit = defineEmits(['update-data'])
const show = defineModel({ type: Boolean })
const props = defineProps({
    dialogTitle: String,
    dialogCode: String,
    dialogOwn: Int32Array,
})

const geticon = (time) => {
  if(time > 0 && time <= 15){
    return icon15
  }else if(time > 15 && time <= 30){
    return icon30
  }else if(time > 30 && time <= 45){
    return icon45
  }else if(time > 45 && time <= 60){
    return icon60
  }else if(time > 60 && time <= 75){
    return icon75
  }else if(time > 75 && time <= 90){
    return icon90
  }else if(time > 90){
    return icon90a
  }
}

const tableData = ref([])
// 计算用户角色
const userStore = useUserStore();
const userRole = computed(() => userStore.roles);
const fentchData  = computed(() => {
    if(props.dialogCode){
        const body = { code: props.dialogCode }
        historyLastTen(body).then((res) => {
            tableData.value = res
            if((location.pathname === '/afoot/recommend') && props.dialogOwn === 0){
                tableData.value = tableData.value.filter(item => item.is_running ===0) //筛选完场的比赛
            }
        })
    }
})
const getRowLink = (row) =>{
    return `${location.hash}/${row.KEY}/${row.is_running}`
}
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
.row-link {
  display: block; /* 让链接填满单元格 */
  width: 100%; /* 确保宽度为100% */
  text-decoration: none; /* 去除下划线 */
  color: inherit; /* 继承颜色 */
}
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
    // background-image: none;
    background-color: rgba(55, 55, 57, 0.4);
    font-size: 14px;
    padding: 5px 16px;
    color: #fff;
    font-weight: 600;
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
    margin-left: 16px;
}

</style>
<style>

.scdialog .el-dialog{
    width:1100px;
    background-color: #fff;
    border-radius: 0;
}
.scdialog .dialog-title .title_text{
    color: #000;
}
.scdialog .el-dialog__header{
    background-image: url('@/assets/afoot/tanchang-bg.png');
    color: #000;
}
.scdialog .el-dialog__header .el-dialog__close:hover {
    color: #000; /* 设置鼠标悬停时的颜色，改为你想要的颜色 */
}
.scdialog .el-dialog__headerbtn:hover{
    color: #000 !important;
    --el-color-primary:normal;
}
.scdialog  .el-table{
    --el-table-header-bg-color: #f8f9fa;
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
    color: #000;
    font-size: 14px;
    margin-left: 16px;
}
.scdialog  .el-table .el-table__cell{
    padding: 0;
}
.scdialog  .el-table .el-table__row{
    background-color: #fff ;
}

.scdialog .el-table .el-table__row:hover {
    background-color: #e0e0e0 !important;  /* 鼠标悬停时的颜色 */
}
.scdialog .el-dialog__header.show-close{
    padding: 0;
}
.scdialog .el-icon,.el-icon svg{
    width: 25px;
    height: 25px;
}
</style>