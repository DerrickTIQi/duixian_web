<template>
    <div>
        <div class="top">
            <div class="top-progress-item" v-for="(item, index) in progressTop" :key="index">
                <div class="top-progress-label">
                    <span class="top-label-text">{{ item.label }}</span>
                </div>
                <div class="custom-percentage">
                    <span class="custom-percentage-value">{{ item.percentage }}<span class="custom-percent">%</span></span>
                </div>
                <el-progress
                    ref="progressRefs"
                    type="circle"
                    :width="90"
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
</template>
<script setup>
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

const progressRefs = ref([]);

onMounted(() => {
  // 遍历所有 progress 元素并修改其 viewBox
  progressRefs.value.forEach((progressEl) => {
    const svgEl = progressEl.$el.querySelector('svg');
    if (svgEl) {
      svgEl.setAttribute('viewBox', '-5 -5 110 110'); // 设置自定义的 viewBox，调整圆形绘图区域
    }
  });
})
</script>
<style lang='scss' scoped>
.top{
    display: flex;
    .top-progress-label{
        display: flex;
        justify-content: center;
    }
    .top-progress-item{
       margin: 30px 0 0 70px;
       position: relative;
       .custom-percentage {
            position: absolute; /* 使其定位到进度条上 */
            top: 45%;
            left: 30%;
        }

        .custom-percentage-value {
            font-size: 22px; 
            font-weight: 600;
            color: #ff9500;
        }

        .custom-percent {
            font-size: 14px;
        }
    }
    .top-label-text{
        display: flex;
        color: #2c2c2e;
        font-size: 14px;
        margin-bottom: 5px;
    }
    .top-percent{
        font-size: 14px;
    }
}


.main {
    display: flex;
    flex-wrap: wrap; /* 允许换行 */
    margin-top: 10px;
}
.main-progress-item{
    margin: 20px 0 0 30px;
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
    width: 110px; /* 进度条宽度 */
}


:deep(.top-progress .el-progress-circle .el-progress-circle__track) {
    stroke: #ff95001A; /* 空白部分颜色 */
    stroke-width: 12
}
:deep(.top-progress .el-progress-circle .el-progress-circle__path) {
    stroke: #ff9500; /* 已填充部分颜色 */
    stroke-width: 12;
    
}
:deep(.top-progress .el-progress-circle svg) {
  width: 90px;   /* 自定义宽度 */
  height: 90px;  /* 自定义高度 */
}

:deep(.main .hteam-progress .el-progress-bar__inner){
    background-color: #ff3b30;
    height: 8px !important;
    border-radius: 0 !important;
}
:deep(.main .hteam-progress .el-progress-bar__outer){
    background-color: rgba(229, 229, 234, 0.5);
    height: 8px !important;
    border-radius: 0 !important;
}
:deep(.main .gteam-progress .el-progress-bar__inner){
    background-color: #007aff;
    height: 8px !important;
    border-radius: 0 !important;
}
:deep(.main .gteam-progress .el-progress-bar__outer){
    background-color: rgba(229, 229, 234, 0.5);
    height: 8px !important;
    border-radius: 0 !important;
}

</style>
<style>
.el-progress__text {
  display: none;
}
/* .el-progress-circle {
    svg{
        viewBox: "-5 5 110 110"
    }
} */
</style>