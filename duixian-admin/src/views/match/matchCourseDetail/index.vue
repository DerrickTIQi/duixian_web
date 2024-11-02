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
            <div class="navi">
                <div 
                    class="text" 
                    v-for="(item, index) in naviItem" 
                    :key="index" 
                    :class="{ active: actiIndex === index }" 
                    @click="actiIndex = index">
                    <span>{{ item }}</span>
                </div>
            </div>
            <div v-if="(route.path.split('/')[1] === 'afoot' && actiIndex === 0) || (route.path.split('/')[2] === 'record' && actiIndex === 0)">
                <HomeDetail v-if="matchData.OV_INFO" :data="matchData" />
            </div>
            <div class="table" v-if="(route.path.split('/')[2] === 'early') || (route.path.split('/')[1] === 'afoot' && actiIndex === 1) || (route.path.split('/')[2] === 'record' && actiIndex === 1) || (route.path.split('/')[2] === 'followearly')">
                <div class="table_title">
                    <div class="navi1">
                        <div 
                            class="text1" 
                            v-for="(item, index) in naviItems" 
                            :key="index" 
                            :class="{ active: actiIndexs === index }" 
                            @click="actiIndexs = index">
                            <span>{{ item }}</span>
                        </div>
                    </div>
                    <div class="title_text">注:最近3场比赛的进攻曲线图</div>
                </div>
                
                <el-scrollbar class="left-scrol">
                    <div style="display: flex; justify-content: center;">
                        <CourseDetail v-if="activeTeam" :data="activeTeam" />
                    </div>
                </el-scrollbar>
                
            </div>
        </div>
    </app-layout>
</template>

<script setup>
import { detailEarly } from '../../../api/match';
import CourseDetail from './components/CourseDetail.vue';
import HomeDetail from './components/HomeDetail.vue';
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
const naviItem = ref([])

const naviItems = ['主队', '客队'];
const actiIndex = ref(0);
const actiIndexs = ref(0);
const route = useRoute();
const matchData = ref({});
const fullscreenLoading = ref(true); // 控制加载遮罩
if(route.path.split('/')[2] === 'early' || route.path.split('/')[2] === 'followearly'){
     naviItem.value = ['历史分析'];
}else if((route.path.split('/')[1] === 'afoot' && route.params.running === '1')){
    naviItem.value = ['本场'];
}else{
    naviItem.value = ['本场', '历史分析']
}

// 请求数据的函数
const fetchData = () => {
    let loadingTimeout = null;
  if (route.path.split('/')[2] === 'early' || route.path.split('/')[2] === 'followearly') {
    detailEarly({ mid: route.params.id, uid: parseInt(localStorage.uid) }).then((res) => {
      matchData.value = res; // 确保 matchData 是响应式的
      loadingTimeout = setTimeout(() => {
        fullscreenLoading.value = false; // 隐藏加载遮罩
      }, 1000);
    });
  } else if (route.path.split('/')[2] === 'record' || (route.path.split('/')[1] === 'afoot' && route.params.running === '0')) {
    detailRecord({ mid: route.params.id, uid: parseInt(localStorage.uid) }).then((res) => {
      matchData.value = res;
      loadingTimeout = setTimeout(() => {
        fullscreenLoading.value = false; // 隐藏加载遮罩
      }, 1000);
    });
  } else if (route.path.split('/')[1] === 'afoot' && route.params.running === '1') {
    detailLive({ mid: route.params.id, uid: parseInt(localStorage.uid) }).then((res) => {
        matchData.value = res;
        loadingTimeout = setTimeout(() => {
        fullscreenLoading.value = false; // 隐藏加载遮罩
      }, 1000);
    });
    
    // 启动定时更新
    liveUpdateInterval = setInterval(() => {
        detailLive({ mid: route.params.id, uid: parseInt(localStorage.uid) }).then((res) => {
        matchData.value = res;
    });
    }, 3000); // 每3秒更新一次
  }
};


// 计算属性用于获取当前活动队伍
const activeTeam = computed(() => {
    if (matchData.value.REC) {
        return actiIndexs.value === 0 ? matchData.value.REC.home_top : matchData.value.REC.away_top;
    }
    return null; // 如果没有数据，返回 null
})
let liveUpdateInterval = null;
// 清除定时器
const clearLiveUpdate = () => {
  if (liveUpdateInterval) {
    clearInterval(liveUpdateInterval);
    liveUpdateInterval = null;
  }
};

onMounted(() => {
  fetchData(); // 首次加载时调用
});

// 在组件卸载时清理定时器
onUnmounted(() => {
  clearLiveUpdate(); // 清除定时器
});
</script>

<style lang='scss' scoped>
a{
    color: #000;
}
.matchDetail{
    background-color: #fff;
    // margin: 16px;
}
.bread{
    padding: 16px 0 0 16px;
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
.status{
    display: flex;
    justify-content: center; /* 水平居中 */
    align-items: center; /* 垂直居中 */
    color: #ff3b30;
    font-size: 14px;
    margin-top: 10px;
}
.team {
    height: 40px;
    margin-top: 22px;
    display: flex;
    align-items: center; /* 垂直居中 */
    justify-content: center; /* 水平居中 */
    position: relative; 

    .half-time{
        font-size: 16px;
        font-weight: bold;
        color: #000;
    }
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
.navi{
    display: flex;
    margin: 20px 0 0 16px;
    cursor: pointer;
}
.text{
    padding: 10px 20px;
    border-radius: 5px;
}
.text.active {
  background-color: #e92937; // 选中时背景颜色为红色
  color: white; // 选中时字体颜色为白色
  font-weight: 600;
}
.table{
    height: calc(100vh - 258px);
}
.table_title{
    display: flex;
    align-items: center; /* 垂直居中 */
    margin-bottom: 20px;
}
.title_text{
    margin-left: 100px;
    margin-top: 20px;
    color: #8e8e93;
}
.navi1 {
    display: flex;
    justify-content: center; /* 水平居中 */
    margin: 20px 0 0 16px;
    cursor: pointer;
    background-color: rgba(242, 242, 247, 1);
    border-radius: 20px;
    width: 160px;
    color: #8e8e93;
}
.text1{
    display: flex;
    padding: 10px 20px;
    border-radius: 5px;
    text-align: center;
    
}
.text1-span{
    width: 45px !important;
}
.text1.active {
    background-color: rgba(255, 255, 255, 1);
    border-radius: 20px;
    color: #2c2c2e; // 选中时字体颜色
    font-weight: 500;
}
.left-scrol{
    height: 85%;
}
</style>