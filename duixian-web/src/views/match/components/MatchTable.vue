<template>
  <div class="match_table">
    <el-table
      :data="tableData"
      style="width: 100%"
      
    >
      <el-table-column
        prop="match"
        label="所属赛事"
        align="center"
        width="200px"
      >
        <template #default="{ row}">
          <a :href="getRowLink(row)" class="row-link">
            <span   class="match-text" :title="row.NCN?.LEAGUE">{{ row.NCN?.LEAGUE }}</span>
          </a>
        </template>
      </el-table-column>
      <el-table-column prop="time" label="时间" align="center" width="100px">
        <template #default="{ row }">
          <a :href="getRowLink(row)" class="row-link">
            {{ row.odds_datetime?.date_cut }}
          </a>
        </template>
      </el-table-column>
      <el-table-column prop="status" label="状态" align="center" width="75px">
        <template #default="{ row }">
          <a :href="getRowLink(row)" class="row-link">
            <span v-if="(route.path.split('/')[2] === 'record') && row.NCN?.TIMER >= 90">完场</span>
            <span v-else-if="row.NCN?.TIMER == 0">未开始</span>
            <div v-else class="status-time" style="color: #ff3b30;">
              <img :src="geticon(row.NCN?.TIMER)" style="margin-right: 8px;"/>
              {{ row.NCN?.TIMER }}
              <span :class="['breathing', { fade: !isVisible }]"> '</span>
            </div>
          </a>
        </template>
      </el-table-column>
      <el-table-column prop="home" label="主场球队" align="right">
        <template #default="{ row }">
          <a :href="getRowLink(row)" class="row-link">
            <span v-if="parseInt(row.NCN?.RED?.split(':')[0]) > 0" class="red">{{ parseInt(row.NCN?.RED?.split(":")[0])}}</span>
            <span v-if="parseInt(row.NCN?.YELLOW?.split(':')[0]) > 0" class="yellow">{{ parseInt(row.NCN?.YELLOW?.split(":")[0])}}</span>
            <span style="color: #8e8e93; font-size: 12px; margin-right: 5px">{{ row.hwin}}</span>
            <span> {{ row.NCN?.TEAM_H }}</span>
          </a>
        </template>
      </el-table-column>
      <el-table-column prop="point" label="比分" align="center" width="60px">
        <template #default="{ row }">
          <a :href="getRowLink(row)" class="row-link">
            <span style="color: #ff3b30; font-weight: 600">
              {{ row.NCN?.SCORE }}
            </span>
          </a>
        </template>
      </el-table-column>
      <el-table-column prop="guest" label="客场球队" align="left">
        <template #default="{ row }">
          <a :href="getRowLink(row)" class="row-link">
            <span> {{ row.NCN?.TEAM_C }}</span>
            <span style="color: #8e8e93; font-size: 12px; margin: 0 5px">{{ row.gwin}}</span>
            <span  v-if="parseInt(row.NCN?.YELLOW?.split(':')[1]) > 0" class="yellow">{{ parseInt(row.NCN?.YELLOW?.split(":")[1]) }}</span>
            <span v-if="parseInt(row.NCN?.RED?.split(':')[1]) > 0" class="red">{{parseInt(row.NCN?.RED?.split(":")[1])}}</span>
          </a>
        </template>
      </el-table-column>
      <el-table-column v-if="showHalfColumn" prop="half" label="半场" align="center" width="70px">
        <template #default="{ row }">
          <a :href="getRowLink(row)" class="row-link">
            {{ row.NCN?.["H:SCORE"] }}
          </a>
        </template>
      </el-table-column>
      <el-table-column v-if="showHalfColumn" prop="corner" label="角球" align="center" width="70px">
        <template #default="{ row }">
          <a :href="getRowLink(row)" class="row-link">
            <img src="@/assets/detail/jiaoqiu.png"/>
            {{ row.NCN?.["CN:SCORE"] }}
          </a>
        </template>
      </el-table-column>
      <el-table-column
        prop="trend"
        label="初始走势"
        align="center"
        width="140px"
      >
        <template #default="{row}" >
          <a :href="getRowLink(row)" class="row-link">
            <div style="font-size: 12px;">
              <span class="trtext">{{ row.odds_early?.AH?.hrfsp }}</span>
              <span class="trtext trtext1">{{ row.odds_early?.AH?.hrf }}</span>
              <span class="trtext">{{ row.odds_early?.AH?.grfsp }}</span>
              <br>
              <span class="trtext">{{ row.odds_early?.OU?.hdxsp }}</span>
              <span class="trtext trtext2">{{ row.odds_early?.OU?.hdx }}</span>
              <span class="trtext">{{ row.odds_early?.OU?.hdxsp }}</span>
            </div>
          </a>
        </template>
      </el-table-column>
      <el-table-column label="功能" align="center" width="85px">
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
import { favorAdd, favorDelete, favorLive, favorUpLive } from '../../../api/match';
import { onMounted, onUnmounted } from 'vue';
const props = defineProps({
  data: Object,
});
const tableData = computed(() => {
  return props.data || []; // 如果 props.data 存在，返回它，否则返回一个空数组
})
const getRowLink = (row) =>{
    return `${location.href}/${row.KEY}`

}
const emit = defineEmits(['update-data'])
// 计算用户角色
const userStore = useUserStore();
const userRole = computed(() => userStore.roles);
// 根据 tableData 的第一个元素判断是否显示半场列
const showHalfColumn = computed(() => {
  return tableData.value.length > 0 && tableData.value[0]?.NCN?.["H:SCORE"] !== undefined && tableData.value[0]?.NCN?.["CN:SCORE"] !== undefined;
})
const route = useRoute();
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


const isVisible = ref(true);
let intervalId;

onMounted(() => {
  // 每两秒切换一次可见性
  intervalId = setInterval(() => {
    isVisible.value = !isVisible.value;
  }, 1000); // 每2秒切换一次可见性
});



onUnmounted(() => {
  // 清除定时器
  clearInterval(intervalId);
});
</script>
<style lang='scss' scoped>
.match-text{
  // // word-wrap: break-word;
  // width: 100%;
  // display: block;
  // overflow: hidden;
  // // 
  // white-space:normal;
  // text-overflow: ellipsis;
  display: block; /* 使span充当块级元素 */
  width: 150px;
  overflow: hidden; /* 隐藏溢出的内容 */
  white-space: nowrap; /* 不换行 */
  text-overflow: ellipsis; /* 超出部分用省略号表示 */
  text-align: left;
  margin-left: 50px;
}
.row-link {
  display: block; /* 让链接填满单元格 */
  width: 100%; /* 确保宽度为100% */
  text-decoration: none; /* 去除下划线 */
  color: inherit; /* 继承颜色 */
}
// .row-link:hover {
//   background-color: rgba(255, 59, 48, 0.1); /* 悬停时的背景色 */
// }
.match_table{
  z-index: 1000 ;
}
.breathing {
  transition: opacity 1s ease; /* 设置过渡效果 */
}
.fade {
  opacity: 0; /* 透明度为0，隐藏元素 */
}
.el-table {
  --el-table-header-bg-color: #f2f2f7;
  border-radius: 5px;
}
.red {
  background-color: #e92937;
  border-radius: 3px;
  color: #fff;
  padding: 0 2px;
  margin-right: 5px;
}
.yellow {
  background-color: #ff9000;
  border-radius: 3px;
  color: #fff;
  padding: 0 2px;
  margin-right: 5px;
}
.trtext {
  margin: 0 4px;
}
.trtext1{
  color: green;
}
.trtext2{
  color: #e92937;
}
.function {
  display: flex;
  justify-content: center; /* 水平居中 */
  align-items: center; /* 垂直居中 */
}
.icon {
  margin: 0 5px;
}
.status-time{
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
<style >
.match_table .el-table th {
  height: 50px;
  line-height: 50px;
  font-size: 14px;
} /* 表头 */
.match_table .el-table td {
  height: 55px;
} /* 表格 */
.match_table .el-table .cell {
  padding: 0;
  font-weight: normal;
  color: #2c2c2e;
  font-size: 14px;
}
.match_table .el-table .el-table__cell {
  padding: 0;
}


.match_table .el-table .el-table__row:hover {
  background-color: #e0e0e0 !important; /* 鼠标悬停时的颜色 */
}
</style>

