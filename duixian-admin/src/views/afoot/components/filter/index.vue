<template>
    <div class="filter" v-loading="fullscreenLoading">
        <FilterLeft v-if="mainData.length > 0" :leagues="leagues" :data="mainData" :zhankai="zhankai" :activeNames="activeNames" @updateActiveNames="updateActiveNames" @toggleCollapse="toggleCollapse" @handleReset="handleReset" @handleClick="handleClick" @saveNewPlan="saveNewPlan"/>
        <!-- <FilterTable v-if="matchData" :data="matchData" :total="matchTotal"/>
        <FilteHandicap /> -->
        <el-scrollbar class="left-scrol">
            <ComRight v-if="matchData.length > 0" :data="matchData"/>
            <div v-else class="noti">暂时没有符合条件的比赛信息，去看看其他赛事吧</div>
        </el-scrollbar>
    </div>
</template>
<script setup>
import FilterLeft from './components/FilterLeft.vue';
import ComRight from '../recommend/components/ComRight.vue';
import { ElMessage } from 'element-plus';
const mainData = ref([])  //方案数据
const leagues = ref([]) //联赛数据
const matchData = ref([])   //当前筛选条件下的比赛数据
const matchTotal = ref([]) //当前筛选条件下的比赛条数
let defaultData = [] //默认配置数据
const fullscreenLoading = ref(true); // 控制加载遮罩
// 定期调用Leagues接口
const fetchLeagues = () => {
    Leagues().then((res) => {
        leagues.value = res.groups;
    });
}

let timeoutId;
const fetchWithTimeout = async () => {
    if (timeoutId) {
        clearTimeout(timeoutId);  // 清除先前的定时器
    }
    try {
        await fetchLeagues();  // 等待数据获取完成
        // 在请求完成后，设置一个新的定时器
        timeoutId = setTimeout(fetchWithTimeout, 5000);  // 3 秒后重新执行
    } catch (error) {
    }
};
//当前选中的方案的code
let activePlanCodes = [];
//比赛数据
const planData = () => {
    myPlans().then((res) => {
        mainData.value = getActivePlan(res);
        
        activePlanCodes = getActivePlanCodes(res);
        
        defaultData = JSON.parse(JSON.stringify(res.default)); // 深拷贝 defaultData，确保它与 mainData 独立
        
        fetchFt()
    });
}
const fetchFt = () => {
    ftInplay({ code: activePlanCodes[0], uid: parseInt(localStorage.uid) }).then((res) => {
        matchData.value = res.matches;
        matchTotal.value = res.totalCount
        fullscreenLoading.value = false;
    });
}


function getActivePlan(res){
    let activePlan = []
    if(res.default?.active === 1){
        activePlan.push(res.default)
    }
    //遍历my_plans数组
    if(Array.isArray(res.my_plans)){
        res.my_plans.forEach(plan => {
            if(plan.active === 1){
                activePlan.push(plan.settings)
            }
        })
    }
    return activePlan
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

const zhankai = ref(false)
const activeNames = ref([]); // 存储折叠状态
// 控制折叠的函数
const toggleCollapse = () => {
  zhankai.value = !zhankai.value;
  activeNames.value = zhankai.value ? ['1'] : []; // 根据状态更新 activeNames
};
// 更新折叠状态的函数
const updateActiveNames = (newActiveNames) => {
  activeNames.value = newActiveNames;
};

//处理子组件清除
const handleReset = () =>{
    fullscreenLoading.value = true;
    let defaultPlan = defaultData
    delete defaultPlan.active;
    delete defaultPlan.total;
    defaultPlan.title = defaultPlan.name;
    setFilter(defaultPlan).then(() => {
        ftInplay({code: 'default', uid: parseInt(localStorage.uid)}).then((res) => {
            matchData.value = res.matches
            matchTotal.value = res.totalCount
            fullscreenLoading.value = false; // 隐藏加载遮罩
        })
    })
}
//处理子组件确定
const handleClick = (League,newFilters) =>{
    fullscreenLoading.value = true; // 隐藏加载遮罩
    let currentPlan = mainData.value[0]
    if(currentPlan.active){
        delete currentPlan.active
        delete currentPlan.total
        currentPlan.title = currentPlan.name
    }
    currentPlan.filters = newFilters[0]
    currentPlan.leagues = League
    setFilter(currentPlan).then(() => {
        ftInplay({code: currentPlan.code, uid: parseInt(localStorage.uid)}).then((res) => {
            matchData.value = res.matches
            matchTotal.value = res.totalCount
            fullscreenLoading.value = false; // 隐藏加载遮罩
        })
    })
}
//处理子组件保存过滤器
const saveNewPlan = (League,newFilters,title,desc) =>{
    let newPlan = mainData.value[0]
    delete newPlan.active;
    delete newPlan.total;
    newPlan.title = title
    newPlan.desc = desc
    newPlan.filters = newFilters[0]
    newPlan.leagues = League;
    newPlan.code = ''  // 清空code
    console.log(newPlan);
    
    setFilter(newPlan).then(() => {
        ElMessage.success('保存成功，请到保存中查看')
    })
}

let intervalId = null;  //定时调用ft，更新表格数据
onMounted(() => {
    fetchWithTimeout();  // 首次调用
    planData()
    intervalId = setInterval(() => {
        fetchFt();
    }, 10000);
});
onUnmounted(() => {
    if(timeoutId){
        clearInterval(timeoutId)
    }
    if (intervalId) {
        clearInterval(intervalId);
    }
})
</script>
<style lang='scss' scoped>
.filter{
    height: calc(100vh - 160px);
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