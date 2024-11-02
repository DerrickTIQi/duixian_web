<template>
    <div class="recommend" v-loading="fullscreenLoading">
        <div class="left">
            <el-scrollbar class="left-scrol">
                <ComItem v-if="screenData.length > 0"  :data="screenData" @updatePlans="updatePlans"/>
            </el-scrollbar>
        </div>
        <div class="right">
            <el-scrollbar class="left-scrol">
                <ComRight v-if="matchData.length > 0" :data="matchData"/>
                <div v-else class="noti">暂时没有符合条件的比赛信息，去看看其他赛事吧</div>
            </el-scrollbar>
        </div>
    </div>
</template>
<script setup>
import ComItem from './components/ComItem.vue';
import ComRight from './components/ComRight.vue';
const screenData = ref([]) //精选方案数据
const matchData = ref([])
const fullscreenLoading = ref(true); // 控制加载遮罩
Plans().then((res) => {
    screenData.value = res;
});

const updatePlans = (item) => {
    screenData.value = item
}
//当前选中的方案的code
let activePlanCodes = [];
//比赛数据
const planData = () => {
    myPlans().then((res) => {
        activePlanCodes = getActivePlanCodes(res);
        fullscreenLoading.value = false; // 隐藏加载遮罩

        ftInplay({ code: activePlanCodes[0], uid: parseInt(localStorage.uid) }).then((res) => {
            matchData.value = res.matches;
        });
    });
}
// 提取 active 的 plan 的 code
function getActivePlanCodes(res) {
  let activeCodes = [];
  if (res.default?.active === 1) {
    activeCodes.push(res.default.code); // default 对象的 code
  }

  // 遍历 my_plans 数组并提取 active plan 的 code
  if (Array.isArray(res.my_plans)) {
    res.my_plans.forEach(plan => {
      if (plan.active === 1) {
        activeCodes.push(plan.plan_info.code); // plan_info 内的 code
      }
    });
  }
  return activeCodes;
}
let intervalId = null;  
onMounted(() => {
    planData()
    intervalId = setInterval(() => {
        planData();
    }, 10000);
});

onUnmounted(() => {
    // 清除定时器
    if (intervalId) {
        clearInterval(intervalId);
    }
});
</script>
<style lang='scss' scoped>
.recommend{
    // height: 724px;
    // width: 330px;
    height: calc(100vh - 160px);
    margin: 16px 0 0 0;
    display: flex;
    // justify-content: center;
}
.left-scrol{
    height: 100%;
}
.noti{
    margin: 20px 0 0 20px;
}
</style>