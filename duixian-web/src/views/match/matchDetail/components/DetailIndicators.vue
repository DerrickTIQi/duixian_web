<template>
    <div class="curve">
        <div class="title">
            <DetailTitle
            type="small"
            quxianText="技术指标"
            quxianEnText="TECHNICAL INDICATORS"
            />
        </div>
        <div class="content">
            <div class="top">
                <div class="top-progress-item" v-for="(item, index) in progressTop" :key="index">
                    <div class="top-progress-label">
                        <span class="top-label-text">{{ item.label }}</span>
                        <span class="top-percentage">{{ item.percentage }}<span class="top-percent">%</span></span>
                    </div>
                    <el-progress
                        :percentage="item.percentage"
                        class="top-progress"
                    />
                </div>
            </div>
            <div class="main">
                <div class="main-progress-item" v-for="(item,index) in progressMain" :key="index">
                    <div class="main-progress-lable" >
                        <span class="htem-percentage">{{ index === 0 ? item.hteamper + '%' : item.hteamper }}</span>
                        <span class="main-label-text">{{ item.label }}</span>
                        <span class="gteam-percentage">{{ index === 0 ? item.gteamper + '%' : item.gteamper }}</span>
                    </div>
                    <div class="progress-container">
                        <el-progress
                            :percentage="item.hteamper"
                            class="hteam-progress"
                        />
                        <el-progress
                            :percentage="item.gteamper"
                            class="gteam-progress"
                        />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import DetailTitle from './DetailTitle.vue';
const progressTop = ref([
    {label:'全场压力', percentage:'49',},
    {label:'平均压力', percentage:'20',},
    {label:'近10分钟压力', percentage:'37',}
])
const progressMain = ref([
    {label:'控球率',hteamper:'67',gteamper:'33'},
    {label:'射正',hteamper:'35',gteamper:'11'},
    {label:'进攻',hteamper:'136',gteamper:'81'},
    {label:'射偏',hteamper:'1',gteamper:'2'},
    {label:'危险进攻',hteamper:'19',gteamper:'54'},
    {label:'红牌',hteamper:'0',gteamper:'0'},
    {label:'角球',hteamper:'5',gteamper:'2'},
    {label:'黄牌',hteamper:'1',gteamper:'3'},
])
</script>
<style lang='scss' scoped>
.content{
    background-color: rgba(242, 242, 247, 0.5);
    border-radius: 0px 10px 10px 10px;
    width: 800px;
    height: 332px;
}
.top{
    display: flex;
    .top-progress-label{
        display: flex;
    }
    .top-progress-item{
        margin: 20px 0 0 63px;
    }
    .top-label-text{
        display: flex;
        align-items: center; /* 垂直居中 */
        color: #2c2c2e;
        font-size: 14px;
    }
    .top-percentage{
        color: #ff9500;
        font-size: 22px;
        font-weight: 600;
        margin-left: auto;
    }
    .top-percent{
        font-size: 14px;
    }
}

.top-progress{
    border-radius: 0;
    width: 182px;
    stroke-width: 8px !important; /* 强制设置 */
    height: 8px !important; /* 强制设置 */
}

.main {
    display: flex;
    flex-wrap: wrap; /* 允许换行 */
    margin-top: 20px;
}
.main-progress-item{
    margin: 20px 0 0 63px;
}
.main-progress-lable {
    display: flex;
    font-size: 14px;
    .htem-percentage{
        margin-right: auto;
    }
    .gteam-percentage{
        margin-left: auto;
    }
}
.progress-container {
    display: flex;
    justify-content: space-between; /* 使进度条在一行中均匀分布 */
    margin-top: 5px; /* 添加间距 */
}
.hteam-progress{
    transform: scaleX(-1);
}
.hteam-progress,
.gteam-progress {
    margin-right: 5px;
    width: 150px; /* 进度条宽度 */
}


:deep(.top-progress .el-progress-bar__inner){
    background-color: #ff9500;
    height: 8px !important;
    border-radius: 0 !important;
}
:deep(.top-progress .el-progress-bar__outer){
    background-color: #ff95001A;
    height: 8px !important;
    border-radius: 0 !important;
}

:deep(.hteam-progress .el-progress-bar__inner){
    background-color: #ff3b30;
    height: 8px !important;
    border-radius: 0 !important;
}
:deep(.hteam-progress .el-progress-bar__outer){
    background-color: rgba(229, 229, 234, 0.5);
    height: 8px !important;
    border-radius: 0 !important;
}
:deep(.gteam-progress .el-progress-bar__inner){
    background-color: #007aff;
    height: 8px !important;
    border-radius: 0 !important;
}
:deep(.gteam-progress .el-progress-bar__outer){
    background-color: rgba(229, 229, 234, 0.5);
    height: 8px !important;
    border-radius: 0 !important;
}


</style>
<style>
.content .el-progress__text {
  display: none;
}
</style>