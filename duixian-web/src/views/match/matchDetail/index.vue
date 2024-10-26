<template>
    <div class="matchDetail" v-loading.fullscreen.lock="fullscreenLoading">
        <a :href="goBack">
            <div class="back" >
                <img src="@/assets/back.png" style="width: 20px; height: 20px;">
                <div class="back-text">返回</div>
            </div>
        </a>
        <div class="title">
            <div class="group">{{matchData.NCN?.LEAGUE}}</div>
            <div class="time">{{matchData.NCN?.DATE}}</div>
        </div>
        <div class="status">
            <span :class="['breathing', { fade: !isVisible }]">{{matchData.NCN?.TIMER}}'</span>
        </div>
        <div class="team">
            <div class="left_team">
                <div class="win"></div>
                <div class="team_name">{{matchData.NCN?.TEAM_H}}</div>
                <img :src="matchData.NCN?.TEAM_H_LOGO" class="logo"/>
                <div class="team_point">{{parseInt(matchData.NCN?.SCORE.split(":")[0])}}</div>
            </div>
            <div class="half">
                半场{{matchData.NCN?.["H:SCORE"]}}
            </div>
            <div class="right_team">
                <div class="team_point">{{parseInt(matchData.NCN?.SCORE.split(":")[1])}}</div>
                <img :src="matchData.NCN?.TEAM_C_LOGO" class="logo"/>
                <div class="team_name">{{matchData.NCN?.TEAM_C}}</div>
                <div class="win"></div>
            </div>
        </div>

        <div class="detail_table">
            <!-- <DetailTable /> -->
        </div>

        <div class="detail_content">
            <div class="content_left">
                <DetailCurve v-if="matchData.OV_INFO" style="margin-top: 20px;" :data="matchData"/>
                <DetailIndicators v-if="matchData.OV_INFO" style="margin-top: 20px;" :data="matchData"/>
                <DetailImportant v-if="matchData.OV_INFO"  style="margin-top: 20px;" :data="matchData"/>
            </div>
            <div class="content_right" >
                <DetailScreen v-if="matchData.OV_INFO"  style="margin-top: 20px;" :data="matchData"/>
            </div>
        </div>
    </div>
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
        return '#/match/live'; 
    } else if(route.path.split('/')[2] === 'followlive') {
        return '#/match/followlive'; 
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
a{
    color: #000;
}
.breathing {
  transition: opacity 1s ease; /* 设置过渡效果 */
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
    width: 1200px;
    margin: 0 auto;
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
    justify-content: center; /* 水平居中 */
    align-items: center; /* 垂直居中 */
    margin-top: 20px;
    font-size: 16px;
    width: 100%; /* 使其宽度占满 */
    
    .time {
        margin-left: 50px;
    }

}
.status{
    display: flex;
    justify-content: center; /* 水平居中 */
    align-items: center; /* 垂直居中 */
    color: #ff3b30;
    font-size: 18px;
    margin-top: 10px;
}
.team {
    height: 120px;
    display: flex;
    align-items: center; /* 垂直居中 */
    justify-content: center; /* 水平居中 */
    position: relative; 

    .half {
        position: absolute; /* 绝对定位 */
        left: 50%; /* 在中间位置 */
        transform: translateX(-50%); /* 水平居中 */
        color: rgba(142, 142, 147, 1);
        font-size: 16px;
    }

    .left_team {
        position: absolute; /* 绝对定位 */
        display: flex;
        align-items: center; /* 垂直居中 */
        right: 55%;
    }

    .right_team {
        position: absolute; /* 绝对定位 */
        display: flex;
        align-items: center; /* 垂直居中 */
        left: 55%; /* 在中间位置 */
    }

    .win {
        color: rgba(142, 142, 147, 1);
        font-size: 14px;
    }

    .team_name {
        color: rgba(0, 0, 0, 1);
        font-size: 18px;
        font-weight: 600;
        margin: 0 5px;
    }

    .logo {
        margin: 0 5px;
    }

    .team_point {
        color: rgba(0, 0, 0, 1);
        font-size: 40px;
        font-weight: 600;
        margin: 0 15px;
    }
}
.detail_table{
    margin-top: 20px;
}
.detail_content{
    display: flex;
    width: 100%;
}
.content_left{
    flex: 1;
}
.content_right{
    width: 380px;
    margin-left: auto;
}
</style>