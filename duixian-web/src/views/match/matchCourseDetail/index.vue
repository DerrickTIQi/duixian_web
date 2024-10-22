<template>
    <div class="matchDetail">
        <div class="back" @click="goBack">
            <img src="@/assets/back.png" style="width: 20px; height: 20px;">
            <div class="back-text">返回</div>
        </div>
        <div class="title">
            <div class="group">{{ matchData.NCN?.LEAGUE }}</div>
            <div class="time">{{ matchData.NCN?.DATE }}</div>
        </div>
        <div class="status">
            <span v-if="matchData.NCN?.TIMER === 0" style="color: #000;">未开始</span>
            <span v-else-if="matchData.NCN?.TIMER === 90" style="color: #000;">完场</span>
            <span v-else>{{ matchData.NCN?.TIMER }}'</span>
        </div>
        <div class="team">
            <div class="left_team">
                <div class="win"></div>
                <div class="team_name">{{ matchData.NCN?.TEAM_H }}</div>
                <img :src="matchData.NCN?.TEAM_H_LOGO" class="logo" />
                <div class="team_point">{{ parseInt(matchData.NCN?.SCORE.split(":")[0]) }}</div>
            </div>
            <div class="half">半场
                <span v-if="matchData.NCN?.['H:SCORE']">{{matchData.NCN?.["H:SCORE"]}}</span>
                <span v-else>0-0</span>
            </div>
            <div class="right_team">
                <div class="team_point">{{ parseInt(matchData.NCN?.SCORE.split(":")[1]) }}</div>
                <img :src="matchData.NCN?.TEAM_C_LOGO" class="logo" />
                <div class="team_name">{{ matchData.NCN?.TEAM_C }}</div>
                <div class="win"></div>
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
        <div v-if="(route.path.split('/')[1] === 'Screen' && actiIndex === 0) || (route.path.split('/')[1] === 'MatchRecord' && actiIndex === 0)">
            <HomeDetail v-if="matchData.OV_INFO" :data="matchData" />
        </div>
        <div class="table" v-if="(route.path.split('/')[1] === 'MatchCourse' && actiIndex === 0) || (route.path.split('/')[1] === 'Screen' && actiIndex === 1) || (route.path.split('/')[1] === 'MatchRecord' && actiIndex === 1)">
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
            <CourseDetail v-if="activeTeam" :data="activeTeam" />
        </div>
    </div>
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
const router = useRouter();
const matchData = ref({});
if(route.path.split('/')[1] === 'MatchCourse'){
     naviItem.value = ['历史分析'];
}else if((route.path.split('/')[1] === 'Screen' && route.params.running === '1')){
    naviItem.value = ['本场'];
}else{
    naviItem.value = ['本场', '历史分析']
}

//获取当前路径传递的activeIndex
const activeIndex = route.params.index



const goBack = () => {
    //返回上一页
    if(route.path.split('/')[1] === 'Screen'){
        router.push({path: '/Screen',query: { activeIndex }})
    }else{
        router.push({path: '/Match',query: { activeIndex }})
    }
}
// 请求数据的函数
const fetchData = () => {
  if (route.path.split('/')[1] === 'MatchCourse') {
    detailEarly({ mid: route.params.id }).then((res) => {
      matchData.value = res; // 确保 matchData 是响应式的
    });
  } else if (route.path.split('/')[1] === 'MatchRecord' || (route.path.split('/')[1] === 'Screen' && route.params.running === '0')) {
    detailRecord({ mid: route.params.id }).then((res) => {
      matchData.value = res;
    });
  } else if (route.path.split('/')[1] === 'Screen' && route.params.running === '1') {
    // 启动定时更新
    liveUpdateInterval = setInterval(() => {
      detailLive({ mid: route.params.id }).then((res) => {
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
    font-size: 12px;
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
    font-size: 14px;
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
        font-size: 12px;
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
.navi{
    display: flex;
    margin-top: 20px;
    cursor: pointer;
}
.text{
    padding: 10px 20px;
    border-radius: 5px;
}
.text.active {
  background-color: #ff3b30; // 选中时背景颜色为红色
  color: white; // 选中时字体颜色为白色
  font-weight: 600;
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
    margin-top: 20px;
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
</style>