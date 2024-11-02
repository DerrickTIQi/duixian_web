<template>
    <app-layout >
        <div class="matchDetail" v-loading.fullscreen.lock="fullscreenLoading">
            <app-bread class="bread"/>
            <div class="team">
                <div class="left_team">
                    <div class="win"></div>
                    <div class="team_name">{{matchData.NCN?.TEAM_H}}</div>
                    <img :src="matchData.NCN?.TEAM_H_LOGO" class="logo"/>
                    <div class="team_point">{{parseInt(matchData.NCN?.SCORE.split(":")[0])}}</div>
                </div>
                <div class="half">
                    <span class="half-time">{{matchData.NCN?.TIMER}}<span :class="['breathing', { fade: !isVisible }]">'</span></span>
                    <span>半场{{matchData.NCN?.["H:SCORE"]}}</span>
                </div>
                <div class="right_team">
                    <div class="team_point">{{parseInt(matchData.NCN?.SCORE.split(":")[1])}}</div>
                    <img :src="matchData.NCN?.TEAM_C_LOGO" class="logo"/>
                    <div class="team_name">{{matchData.NCN?.TEAM_C}}</div>
                    <div class="win"></div>
                </div>
                <div class="title">
                    <div class="group">{{matchData.NCN?.LEAGUE}}</div>
                    <div class="time">{{matchData.NCN?.DATE}}</div>
                </div>
            </div>
            

            <div class="detail_table">
                <!-- <DetailTable /> -->
            </div>

            <div class="detail_content">
                <el-scrollbar class="left-scroll">
                    <div class="content_left">
                        <DetailCurve v-if="matchData.OV_INFO" style="margin-top: 20px;" :data="matchData"/>
                        <DetailIndicators v-if="matchData.OV_INFO" style="margin-top: 20px;" :data="matchData"/>
                        <DetailImportant v-if="matchData.OV_INFO"  style="margin-top: 20px;" :data="matchData"/>
                    </div>
                </el-scrollbar>
                <el-scrollbar class="right-scroll">
                    <div class="content_right" >
                        <DetailScreen v-if="matchData.OV_INFO"  style="margin-top: 20px;" :data="matchData"/>
                    </div>
                </el-scrollbar>
            </div>
        </div>
    </app-layout>
</template>
<script setup>
import DetailTable from './components/DetailTable.vue';
import DetailCurve from './components/DetailCurve.vue';
import DetailIndicators from './components/DetailIndicators.vue';
import DetailImportant from './components/DetailImportant.vue';
import DetailScreen from './components/DetailScreen.vue';
import { onBeforeUnmount, onMounted, onUnmounted } from 'vue';
import { useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();
// const matchData = ref({})
const fullscreenLoading = ref(true); // 控制加载遮罩
const matchData = ref({})
let fetchTimer = null;
let visibilityTimer = null;
const isVisible = ref(true); // 控制呼吸效果
const body = {
  mid: route.params.id,
  uid: parseInt(localStorage.uid)
}

const goBack = computed(() => {
    if (route.path.split('/')[2] === 'live') {
        return '/match/live'; 
    } else if(route.path.split('/')[2] === 'followlive') {
        return '/match/followlive'; 
    }
})

const fetchData = () => {
    
    detailLive(body).then((res) => {
        // 深拷贝新数据，确保响应式更新
        matchData.value = res
        fullscreenLoading.value = false; // 隐藏加载遮罩
    });
}

// 在页面挂载时初始化并开始实时更新
onMounted(() => {
  // 清除定时器以防多次初始化
  if (fetchTimer) clearInterval(fetchTimer);
  if (visibilityTimer) clearInterval(visibilityTimer);

  // 第一次加载数据
  fetchData();
  
  // 设置定时器，定时刷新数据
  fetchTimer = setInterval(fetchData, 3000);
  
  // 设置定时器，定时切换可见性
  visibilityTimer = setInterval(() => {
    isVisible.value = !isVisible.value;
  }, 1000);
});

// 清除定时器
onUnmounted(() => {
  if (fetchTimer) clearInterval(fetchTimer);
  if (visibilityTimer) clearInterval(visibilityTimer);
});

</script>
<style lang='scss' scoped>
// .loading-container {
//     display: flex;
//     flex-direction: column;
//     align-items: center;
//     justify-content: center;
//     height: 100vh; /* 占满整个页面 */
//     text-align: center;
// }
.bread{
    padding: 16px 0 0 16px;
}
a{
    color: #000;
}
.half-time{
    font-size: 16px;
    font-weight: bold;
    color: #000;
}
.breathing {
  transition: opacity 1s ease; /* 设置过渡效果 */
  font-size: 16px;
  font-weight: bold;
  color: #000;
}
.fade {
  opacity: 0; /* 透明度为0，隐藏元素 */
}
.butt{
    border-radius: 10px;
    height: 42px;
    border: 1px solid #ff3b30;
    margin-left: 10px;
    width: 65px;
    color: #fff;
    background-color: #ff3b30;
    font-size: 16px;
    cursor: pointer;
    font-weight: 600;
}
.matchDetail{
    // width: 1408px;
    background-color: #fff;
    // margin: 16px;
}
.back{
    width: 60px;
    height: 30px;
    position: absolute;
    display: flex;
    align-items: center;
    cursor: pointer;
}
.back:hover{
    background-color: #e6e6e6;
}
.title {
    display: flex;
    align-items: end; /* 垂直居中 */
    flex-direction: column;
    margin-left: auto;
    margin-right: 16px;
    opacity: 0.7;
}

.team {
    height: 40px;
    margin-top: 22px;
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

    .win {
        color: rgba(142, 142, 147, 1);
        font-size: 14px;
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
.detail_table{
    margin-top: 20px;
}
.detail_content{
    display: flex;
    width: 100%;
    height: calc(100vh - 215px);
}
.left-scroll{
    height: 100%;
}
.right-scroll{
    height: 100%;
    margin-left: auto;
}
.content_left{
    flex: 1;
}
.content_right{
    width: 330px;
    margin-right: 16px;
}
</style>