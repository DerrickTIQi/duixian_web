<template>
    <div class="com-right" >
        <div class="item" v-for="(item,index) in matchData" :key="index">
            <div class="title">
                <div class="group1">
                    <div  @click="toggleStart(index)" class="icon">
                        <img :src="item.FA ? startRed : start" />
                    </div>
                    <div class="league">{{ item.NCN.LEAGUE }}</div>
                </div>
                <div class="team">
                    <div class="left_team">
                        <div class="team_name">{{item.NCN?.TEAM_H}}</div>
                        <img :src="item.NCN?.TEAM_H_LOGO" class="logo"/>
                        <div class="team_point">{{parseInt(item.NCN?.SCORE.split(":")[0])}}</div>
                    </div>
                    <div class="half">
                        <span class="half-time">{{item.NCN?.TIMER}}'</span>
                        <span>半场{{item.NCN?.["H:SCORE"]}}</span>
                    </div>
                    <div class="right_team">
                        <div class="team_point">{{parseInt(item.NCN?.SCORE.split(":")[1])}}</div>
                        <img :src="item.NCN?.TEAM_C_LOGO" class="logo"/>
                        <div class="team_name">{{item.NCN?.TEAM_C}}</div>
                    </div>
                </div>
                <div class="progress-container">
                    <span class="progress-text">主队压力</span>
                    <span class="hteam-percentage">{{ item.OV_INFO?.pi?.home }}%</span>
                    <el-progress
                        :percentage="item.OV_INFO?.pi?.home"
                        class="hteam-progress"
                    />
                    <el-progress
                        :percentage="item.OV_INFO?.pi?.away"
                        class="gteam-progress"
                    />
                    <span class="gteam-percentage">{{ item.OV_INFO?.pi?.away }}%</span>
                    <span class="progress-text">客队压力</span>
                </div>
                <div class="cell">
                    <div class="cell-init">
                        <div class="cell-text">初始</div>
                        <div class="cell-item">{{ item.OV_INFO?.markets?.pre?.h.v }}</div>
                        <div class="cell-item">{{ item.OV_INFO?.markets?.pre?.x.v }}</div>
                        <div class="cell-item">{{ item.OV_INFO?.markets?.pre?.a.v }}</div>
                    </div>
                    <div class="cell-init">
                        <div class="cell-text">赛中</div>
                        <div class="cell-item">{{ item.OV_INFO?.markets?.live?.h.v }}</div>
                        <div class="cell-item">{{ item.OV_INFO?.markets?.live?.x.v }}</div>
                        <div class="cell-item">{{ item.OV_INFO?.markets?.live?.a.v }}</div>
                    </div>
                </div>
            </div>
            <div class="bottom">
                <div class="left_curve">
                    <app-curve v-if="item" :data="item"/>
                </div>
                <div class="right_panel">
                    <div class="menu">
                        <div 
                        class="menu_text_item" 
                        v-for="(menuItem,menuIndex) in menu" 
                        :key="menuItem.value"
                        @mouseover="hoverIndex = menuIndex"
                        @mouseleave="hoverIndex = null"
                        @click="selectIndex(menuIndex,index)"
                        :class="{'active': matchData[index].selectedIndex === menuIndex}"
                        >
                            <span>{{ menuItem.label }}</span>
                        </div>
                    </div>
                    <div class="main">
                        <app-indicators v-if="matchData[index].selectedIndex === 0" :data="item"/>
                        <app-important v-if="matchData[index].selectedIndex === 1" :data="item"/>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import startRed from '@/assets/afoot/start_red.png'
import start from '@/assets/afoot/start.png'
import { ElMessage } from 'element-plus';
const props = defineProps({
    data: Array
})
const matchData = ref(props.data)
console.log(props.data);
const menu = [
    {label: '技术指标'},
    {label: '重要事件'},
]

const hoverIndex = ref(null) //鼠标悬停时索引
const selectIndex = (menuIndex,itemIndex) => {
    matchData.value[itemIndex].selectedIndex = menuIndex //点击时索引为menu菜单索引
}

const updateMatchData = (newData, isFiltering = false) => {
    if (isFiltering) {
        // 重置所有项的 selectedIndex 为 0
        matchData.value = newData.map((match) => ({
            ...match,
            selectedIndex: 0  // 默认选中技术指标
        }));
    } else {
        // 更新数据并保留 selectedIndex 状态
        matchData.value = newData.map((match, index) => ({
            ...match,
            selectedIndex: matchData.value[index]?.selectedIndex ?? 0  // 保持原来的 selectedIndex 或设为 0
        }));
    }
};
// 监听父组件传递的新 data 数据，并自动更新 matchData
watch(
    () => props.data,
    (newData) => {
        updateMatchData(newData);
    },
    { immediate: true, deep: true }  // 确保首次渲染和每次数据变化时执行
);

const toggleStart = (index) => {
    // matchData.value[index].FA = !matchData.value[index].startActive
    if( matchData.value[index].FA === 0){
    favorAdd({mid: matchData.value[index].KEY}).then(() => {
        matchData.value[index].FA = 1;
        ElMessage.success('已收藏')
    })
  }
  if( matchData.value[index].FA === 1){
    favorDelete({mid: matchData.value[index].KEY}).then(() => {
        matchData.value[index].FA = 0;
        ElMessage.success('取消收藏')
    })
  }
}
</script>
<style lang='scss' scoped>
.item{
    width: 985px;
    height: 488px;
    margin-left: 16px;
    padding: 16px;
    background-color: #f8f9fa;
    margin-bottom: 8px;
}
.group1{
    display: flex;
    justify-content: start;
    align-items: center;
}
.icon{
    cursor: pointer;
    z-index: 1000;
}
.league{
    margin-left: 8px;
}

.team {
    height: 40px;
    margin-top: -20px;
    display: flex;
    align-items: center; /* 垂直居中 */
    justify-content: center; /* 水平居中 */
    position: relative; 

    .half {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        position: absolute; /* 绝对定位 */
        left: 50%; /* 在中间位置 */
        transform: translateX(-50%); /* 水平居中 */
        color: #8a8a8a;
        font-size: 12px;
    }
    .half-time{
        font-size: 16px;
        font-weight: bold;
        color: #000;
    }

    .left_team {
        position: absolute; /* 绝对定位 */
        display: flex;
        align-items: center; /* 垂直居中 */
        right: 53%;
    }

    .right_team {
        position: absolute; /* 绝对定位 */
        display: flex;
        align-items: center; /* 垂直居中 */
        left: 53%; /* 在中间位置 */
    }

    .team_name {
        color: rgba(0, 0, 0, 1);
        font-size: 18px;
        font-weight: bold;
        margin: 0 8px;
    }

    .logo {
        width: 32px;
        height: 32px;
        margin: 0 8px;
    }

    .team_point {
        color: #e92937;
        font-size: 32px;
        font-weight: bold;
        line-height: 1.25;
        margin: 0 10px;
    }
}
.progress-container {
    display: flex;
    justify-content: center;  
    align-items: center;  
    margin-top: 10px; 
}
.hteam-progress{
    transform: scaleX(-1);
    margin-left: 27px;
    margin-right: 5px;
    width: 150px;
}
.gteam-progress{
    width: 150px;
    margin-right: 27px;
}

.progress-text{
    font-size: 12px;
    color: #8a8a8a;
}
.hteam-percentage{
    font-size: 12px;
    color: #e92937;
    margin-left: 10px;
}
.gteam-percentage{
    font-size: 12px;
    color: #0071ff;
    margin-right: 10px;
}
:deep(.hteam-progress .el-progress-bar__inner){
    background-color: #e92937;
    height: 8px !important;
    border-radius: 0 !important;
}
:deep(.hteam-progress .el-progress-bar__outer){
    background-color: rgba(229, 229, 234, 0.5);
    height: 8px !important;
    border-radius: 0 !important;
}
:deep(.gteam-progress .el-progress-bar__inner){
    background-color: #0071ff;
    height: 8px !important;
    border-radius: 0 !important;
}
:deep(.gteam-progress .el-progress-bar__outer){
    background-color: rgba(229, 229, 234, 0.5);
    height: 8px !important;
    border-radius: 0 !important;
}
.cell{
    display: flex;
    justify-content: center;  
    align-items: center;  
    font-size: 12px;
    color: #000;
    margin-top: 20px;
}
.cell .el-divider--vertical{
    margin: 0;
}
.cell-init{
    display: flex; 
    align-items: center;  
    width: 160px;
    height: 28px;
    border: solid 1px #d9d9d9;
    border-right: 0;
    margin-right: 10px;
}
.cell-text{
    display: flex;
    justify-content: center;  
    align-items: center;  
    background-color: #d9d9d9;
    height: 28px;
    width: 40px;
    border: solid 1px #d9d9d9
}
.cell-item{
    display: flex;
    justify-content: center;
    align-items: center;
    width: 40px;
    height: 28px;
    border-right: solid 1px #d9d9d9; 
}
.bottom{
    display: flex;
}
.left_curve{
    width: 645px;
    height: 380px;
}
.right_panel{
    width: 330px;
    height: 346px;
    background-color: #fff;
    margin-top: 28px;
}
.menu{
    width: 340px;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    
}
.menu_text_item{
    display: flex;
    justify-content: center;
    align-items: center;
    width: 170px;
    cursor: pointer;
}
.active{
    color: #e92937;
}
</style>