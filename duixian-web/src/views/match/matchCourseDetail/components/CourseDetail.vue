<template>
    <div class="right">
        <div class="content_item" v-for="(item,index) in matchData" :key="index">
            <div class="title">
                <div class="title_text">
                    <div class="group">{{ item.NCN?.LEAGUE }}</div>
                    <div class="team">{{ item.NCN?.TEAM_H }}</div>
                    <div class="point">
                        <span>{{ parseInt(item.NCN?.SCORE.split(":")[0]) }}</span>
                        <span class="fenge">-</span>
                        <span>{{ parseInt(item.NCN?.SCORE.split(":")[1]) }}</span>
                    </div>
                    <div class="team">{{ item.NCN?.TEAM_C }}</div>
                    <div class="status">
                        <span v-if="item.NCN?.TIMER === 90">完场</span>
                        <span v-else>{{ item.NCN?.TIMER }}'</span>
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
                        <el-divider direction="vertical" class="custom-divider"/>
                        <div class="cell-item">{{ item.OV_INFO?.markets?.pre?.x.v }}</div>
                        <el-divider direction="vertical" class="custom-divider"/>
                        <div class="cell-item">{{ item.OV_INFO?.markets?.pre?.a.v }}</div>
                    </div>
                    <div class="cell-init">
                        <div class="cell-text">赛中</div>
                        <div class="cell-item">{{ item.OV_INFO?.markets?.live?.h.v }}</div>
                        <el-divider direction="vertical" class="custom-divider"/>
                        <div class="cell-item">{{ item.OV_INFO?.markets?.live?.x.v }}</div>
                        <el-divider direction="vertical" class="custom-divider"/>
                        <div class="cell-item">{{ item.OV_INFO?.markets?.live?.a.v }}</div>
                    </div>
                </div>
            </div>
            <div class="bottom">
                <div class="left_curve">
                    <app-curve v-if="matchData[index]" :data="matchData[index]"/>
                </div>
                <div class="right_panel">
                    <div class="menu">
                        <div class="menu_text" >
                            <div 
                            class="menu_text_item" 
                            v-for="(menuItem,menuIndex) in titleData" 
                            :key="menuItem.value"
                            @mouseover="hoverIndex = menuIndex"
                            @mouseleave="hoverIndex = null"
                            @click="selectIndex(menuIndex,index)"
                            :class="{'active': matchData[index].selectedIndex === menuIndex}"
                            >
                                <span>{{ menuItem.label }}</span>
                                <div class="underline" v-if="matchData[index].selectedIndex === menuIndex || hoverIndex === menuIndex"></div>
                            </div>
                        </div>
                        <div class="fengexian">
                            <img src="@/assets/detail/fengexian.png" />
                        </div>
                    </div>
                    <div class="main">
                        <app-indicators v-if="matchData[index].selectedIndex === 0 " :data="matchData[index]"/>
                        <app-important v-if="matchData[index].selectedIndex === 1" :data="matchData[index]"/>
                    </div>
                </div>
            </div>
        </div>
        <div class="footer">
            暂无更多数据~
        </div>
    </div>
</template>
<script setup>
const props = defineProps({
  data: Object,
});
const matchData = computed(() => {
  return props.data.map(item => ({
    ...item,
    selectedIndex: item.selectedIndex !== undefined ? item.selectedIndex : 0, // 设置默认值
  }));
})


const titleData = ref([
    {label: '技术指标'},
    {label: '重要事件'},
])

const hoverIndex = ref(null) //鼠标悬停时索引

const selectIndex = (menuIndex,itemIndex) => {
    matchData.value[itemIndex].selectedIndex = menuIndex //点击时索引为menu菜单索引
}

</script>
<style lang='scss' scoped>
.content_item{
    background-color: rgba(242, 242, 247, 0.5);
    border-radius: 10px;
    height: 603px;
    width: 1480px;
    margin-bottom: 20px;
}
.title{
    padding: 20px;
}
.title_text{
    display: flex;
}
.group{
    margin-right: auto;
    margin-left: 10px;
    font-size: 14px;
    color: #8e8e93;
}
.team{
    font-size: 18px;
    color: #000;
    margin-right: 70px;
}
.point{
    font-size: 20px;
    color: #000;
    font-weight: 600;
    margin-left: -30px;
    margin-right: 40px;
}
.fenge{
    margin: 0 5px;
}
.status{
    margin-left: auto;
    font-size: 14px;
    color: #ff3b30;
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
    color: #8e8e93;
}
.hteam-percentage{
    font-size: 12px;
    color: #ff3b30;
    margin-left: 10px;
}
.gteam-percentage{
    font-size: 12px;
    color: #007aff;
    margin-right: 10px;
}
.cell{
    display: flex;
    justify-content: center;  
    align-items: center;  
    font-size: 12px;
    color: #8e8e93;
    margin-top: 20px;
}
.cell .el-divider--vertical{
    margin: 0;
}
.cell-init{
    display: flex; 
    align-items: center;  
    border-radius: 5px;
    width: 202px;
    height: 30px;
    border: 1px solid rgba(199, 199, 204, 1);
    margin-right: 10px;
}
.cell-text{
    display: flex;
    justify-content: center;  
    align-items: center;  
    background-color: rgba(199, 199, 204, 1);
    border-radius: 5px 0px 0px 5px;
    height: 30px;
    width: 50px;
    color: #fff;
}
.cell-item{
    display: flex;
    justify-content: center;
    width: 50px;
}
.bottom{
    display: flex;
    margin-right: 20px;
}
.right_panel{
    border-radius: 10px;
    width: 550px;
    height: 438px;
    border: 2px solid rgba(209, 209, 214, 0.5);
    margin-left: auto;
}

.menu{
    width: 550px;
    height: 46px;
    position: relative;
}
.menu_text{
    display: flex;
    margin-left: 30px;
    width: 296px;
    color: #2c2c2e;
    font-size: 16px;
    position: absolute;
    bottom: 8px;
    left: 0;
}
.menu_text_item{
    position: relative;
    cursor: pointer; //手形
    margin-right: 40px;
}
.menu_text_item span{
    transition: font-size 0.3s, color 0.3s;
}
.menu_text_item .underline{
    position: absolute;
    bottom: -6px;
    left: 0;
    right: 0;
    height: 2px;
    background-color: #ff3b30;
    opacity: 0; //默认不可见
    transition: opacity 0.3s, transform 0.3s;
    transform: scaleX(0); //默认缩放至不可见
}
.menu_text_item.active span{
    font-size: 18px;
    color: #2c2c2e;
    font-weight: 600;
    bottom: 5px;
}
.menu_text_item.active .underline{
    opacity: 1; //选中后保持显示
    transform: scaleX(1); //保持扩展状态
}
.menu_text_item:hover .underline{
    opacity: 1;
    transform: scaleX(1); //悬停时显示横线
}
.fengexian {
    position: relative;
    height: 1px;
}
.fengexian img {
    position: absolute;
    top: 43px;
    bottom: 0;
    left: 0;
    margin-left: 30px;
    width: 490px;
}
.custom-divider {
    border-color: #c7c7cc !important; /* 更改分割线的颜色 */
    height: 20px;
}
.footer{
    color: rgba(142, 142, 147, 1);
    width: 1480px;
    font-size: 14px;
    display: flex;
    justify-content: center; /* 水平居中 */
    align-items: center; /* 垂直居中 */
    margin: 40px 0;
}
:deep(.hteam-progress .el-progress-bar__inner){
    background-color: #ff3b30;
    height: 6px !important;
    border-radius: 0 !important;
}
:deep(.hteam-progress .el-progress-bar__outer){
    background-color: rgba(229, 229, 234, 0.5);
    height: 6px !important;
    border-radius: 0 !important;
}
:deep(.gteam-progress .el-progress-bar__inner){
    background-color: #007aff;
    height: 6px !important;
    border-radius: 0 !important;
}
:deep(.gteam-progress .el-progress-bar__outer){
    background-color: rgba(229, 229, 234, 0.5);
    height: 6px !important;
    border-radius: 0 !important;
}
</style>

<style>
.title .el-progress__text {
  display: none;
}
</style>