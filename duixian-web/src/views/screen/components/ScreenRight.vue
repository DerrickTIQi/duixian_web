<template>
    <div class="right">
        <el-scrollbar height="90vh">
            <div class="content_item" v-for="(item,index) in matchData" :key="index">
                <div class="title">
                    <div class="title_text">
                        <div v-if="userRole !== 'tourist'" @click="toggleStart(index)" class="icon">
                            <img :src="item.FA ? startRed : start" />
                        </div>
                        <div class="group">{{ item.NCN?.LEAGUE }}</div>
                        <div class="team">{{ item.NCN?.TEAM_H }}</div>
                        <div class="point">
                            <span>{{ parseInt(item.NCN?.SCORE.split(":")[0]) }}</span>
                            <span class="fenge">-</span>
                            <span>{{ parseInt(item.NCN?.SCORE.split(":")[1]) }}</span>
                        </div>
                        <div class="team">{{ item.NCN?.TEAM_C }}</div>
                        <div class="status">
                            <span :class="['breathing', { fade: !isVisible }]">{{ item.NCN?.TIMER }}'</span>
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
                        <app-curve v-if="matchData" :data="item"/>
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
            <div class="footer" v-if="matchData.length == 0">
                <div class="footer_one">暂时没有符合条件的比赛信息，去看看其他赛事吧</div>
                <div class="footer_two">
                    使用说明: <br/>
                    1.您可以通过指标筛选器任意筛选符合您查看需求的赛中比赛曲线图，如筛选比赛时间为20-30分钟，该页面则只会展示符合该时间段的比赛进攻曲线图<br/>
                    2.保存方案功能可以将您需要的固定筛选组合保存为 一个新方案到【我的方案】中  <br/>
                    3.保存的固定筛选组合方案当有比赛满足条件时，会进行实时消息推送，点击即可查看，让您不错过任何一场精彩比赛<br/>
                    4. 赶紧点击筛选器创建您的专属筛选组合方案吧
                </div>
            </div>
            <app-error :show="showError" :content="errorMessage" @close="showError = !showError"/>
            <div v-if="userRole === 'tourist' || userRole === 'normal'" ref="triggerPoint" class="trigger-point"></div> <!-- 空白触发点 -->
        </el-scrollbar>
        
    </div>
</template>
<script setup>
import startRed from '@/assets/table/start_red.png'
import start from '@/assets/table/start.png'
import { ElMessage } from 'element-plus';
import { detailLive, listAllLive, listUpLive } from '../../../api/match';
import { onMounted, onUnmounted } from 'vue';
import { EventBus } from '../../../utils/eventBus';
const matchData = ref([]);  // 存储每个比赛// 计算用户角色
const userStore = useUserStore();
const userRole = computed(() => userStore.roles);
const emit = defineEmits(['updateCount','nowFavorData']);
const props = defineProps({
    start:Boolean
})


const startStatus = props.start ? JSON.parse(JSON.stringify(props.start)) : ''
const favorData = ref([]) //收藏的比赛
// 获取 myPlans 的 active plan
const fetchActivePlans = async (resetSelectedIndex = false) => {
    let activePlanCodes = [];
    if (userRole.value === 'tourist' || userRole.value === 'normal') {
        // 游客或普通用户只调用 ftInplay 并将 code 设置为 'default'
        const body = {
            code: 'default',
            uid: parseInt(localStorage.uid)
        };
        const ftInplayRes = await ftInplay(body);
        emit('updateCount', ftInplayRes.totalCount);  // 返回totalCount到父组件

        if (Array.isArray(ftInplayRes.matches) && ftInplayRes.matches.length > 0) {
            // 如果需要重置 selectedIndex，则传递 true
            updateMatchData(ftInplayRes, resetSelectedIndex); 
        } else {
            matchData.value = [];
        }
    } else if (userRole.value === 'member') {
        // 会员用户调用 myPlans 获取 active 的 plan 的 code
        const res = await myPlans();
        activePlanCodes = getActivePlanCodes(res);

        if (activePlanCodes.length > 0) {
            const body = {
                code: activePlanCodes[0],  // 取 active = 1 的 plan 的 code
                uid: parseInt(localStorage.uid)
            };

            const ftInplayRes = await ftInplay(body);
            emit('updateCount', ftInplayRes.totalCount);  // 返回totalCount到父组件
            favorData.value = ftInplayRes.matches.filter(item => item.FA === 1); // 保存筛选后收藏的比赛

            // 如果需要重置 selectedIndex，则传递 true
            updateMatchData(ftInplayRes, resetSelectedIndex); 
        }
    }
};

// 更新比赛数据逻辑
const updateMatchData = (ftInplayRes, isFiltering = false) => {
    if (isFiltering) {
        // 筛选时重置 selectedIndex 为 0
        matchData.value = ftInplayRes.matches.map((match) => ({
            ...match,
            selectedIndex: 0  // 重置为 0
        }));
    } else {
        // 更新数据时保留之前的 selectedIndex
        matchData.value = ftInplayRes.matches.map((match, index) => ({
            ...match,
            selectedIndex: matchData.value[index]?.selectedIndex ?? 0  // 保持原来的 selectedIndex，如果没有则设置为0
        }));
    }
};

// 监听 start 的变化
watch(() => props.start, () => {
    fetchActivePlans(false);
});

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

const titleData = ref([
    {label: '技术指标'},
    {label: '重要事件'},
])

const hoverIndex = ref(null) //鼠标悬停时索引

const selectIndex = (menuIndex,itemIndex) => {
    matchData.value[itemIndex].selectedIndex = menuIndex //点击时索引为menu菜单索引
}
const toggleStart = (index) => {
    // matchData.value[index].FA = !matchData.value[index].startActive
    if( matchData.value[index].FA === 0){
    favorAdd({mid: matchData.value[index].KEY}).then(() => {
        matchData.value[index].FA = ! matchData.value[index].FA;
      ElMessage.success('已收藏')
    })
  }
  if( matchData.value[index].FA === 1){
    favorDelete({mid: matchData.value[index].KEY}).then(() => {
        matchData.value[index].FA = ! matchData.value[index].FA;
      emit('update-data');
      ElMessage.success('取消收藏')
    })
  }
}

//每隔一段时间更新比赛数据
const updateTime = () => {
  fetchActivePlans(false); // 调用 active plans 获取更新
}

const isVisible = ref(true); // 控制呼吸效果
let updateTimeoutId = null;  // 保存 setTimeout 返回的 ID
let visibilityIntervalId;

watch(() => EventBus.chartUpdate, (newval) => {
    if(newval){
        fetchActivePlans(true)
        EventBus.chartUpdate = false
    }
})
const showError = ref(false); // 控制通知的显示
const errorMessage = ref(''); // 存储错误提示的内容
const triggerPoint = ref(null);

const checkTriggerPoint = () => {
    if (!triggerPoint.value) return; // 确保触发点存在

    const rect = triggerPoint.value.getBoundingClientRect();
    const windowHeight = window.innerHeight;

    // 当触发点出现在窗口底部时
    if (rect.top <= windowHeight) {
        if (userRole.value === 'tourist') {
            showError.value = true;
            errorMessage.value = '请先登录查看更多';
        } else if (userRole.value === 'normal') {
            showError.value = true;
            errorMessage.value = '非会员用户不能查看更多数据，请点击开通会员';
        }
        // 移除事件监听器以避免多次触发
        window.removeEventListener('scroll', checkTriggerPoint);
    }
};

onMounted(() => {
    window.addEventListener('scroll', checkTriggerPoint);
    fetchActivePlans();  // 页面加载时获取 active plans
     // 定义一个函数来调用 updateTime 并使用 setTimeout 进行递归调用
     const startUpdateTime = () => {
        updateTime();  // 调用更新函数

        // 10秒后再次调用 updateTime
        updateTimeoutId = setTimeout(startUpdateTime, 10000);
    };
    // 页面加载时立即调用 startUpdateTime，启动定时器
    startUpdateTime();

    // 每2秒切换一次可见性
    visibilityIntervalId = setInterval(() => {
        isVisible.value = !isVisible.value;
    }, 2000); // 每2秒切换一次可见性
})
onUnmounted(() => {
    window.removeEventListener('scroll', checkTriggerPoint);
    clearInterval(updateTimeoutId);   // 清除更新定时器
    clearInterval(visibilityIntervalId); // 清除可见性定时器
})

</script>
<style lang='scss' scoped>
.trigger-point {
  height: 1px; /* 触发点的高度 */
  width: 100%; /* 触发点宽度 */
}
.breathing {
  transition: opacity 1s ease; /* 设置过渡效果 */
}
.fade {
  opacity: 0; /* 透明度为0，隐藏元素 */
}
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
    color: #000;
    font-weight: 600;
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
    flex-direction: column;
    margin: 40px 0;
}
.footer_one{
    font-size: 18px;
    margin-right: auto;
}
.footer_two{
    margin-top: 100px;
    margin-right: auto;
    font-size: 16px;
    color: #ff3b30;
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