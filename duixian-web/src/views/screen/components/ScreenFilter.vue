<template>
    <div class="filter">
        <div v-if="userRole === 'tourist'" class="tourist-notice">
            <div class="notice">
                <div class="notice-text">登录后可查看筛选器</div>
                <el-button type="primary" @click="goToLogin">请先登录</el-button>
            </div>
        </div>
        <el-scrollbar height="70vh" v-if="userRole === 'normal' || userRole === 'member'">
            <div  v-for="(item,index) in mainData" :key="index"  :style="{ height: filterHeight }">
                <div class="dq">当前方案:<span style="color: #ff3b30;font-weight: 500;">{{ item.name || item.title }}</span></div>
                <div class="top" :style="{ height: topHeight }">
                    <div class="collect" @click="toggleStart">
                        <img :src="startStatus ? startRed : start " />
                        <span class="collect-text">我的收藏</span>
                    </div>
                    <div class="fenge"></div>
                    <div class="leagues">
                        <el-collapse v-model="activeName" accordion>
                            <el-collapse-item title="所有联赛" name="allLeagues" :style="{backgroudColor: 'rgba(242, 242, 247, 0.5)'}">
                                <div class="league-list">
                                    <div v-for="(league, index) in leagues" :key="index">
                                        <div class="title">
                                            <span class="title-text">{{ league.name }}</span>
                                        </div>
                                        <div class="content">
                                            <span 
                                            class="content-text" 
                                            v-for="(item, idx) in league.leagues" 
                                            :key="idx"
                                            :class="{'selected' : isSelected( item)}"
                                            @click="toggleSelection(item)">{{ item.name }}</span>  
                                            <!-- 根据当前是否被选中来动态加载selected；点击传递当前联赛id -->
                                        </div>
                                    </div>
                                </div>
                            </el-collapse-item>
                        </el-collapse>
                    </div>

                </div>
                <div class="main" v-if="mainData.length > 0">
                    <div class="main-item" v-for="filter in item.filters" :key="filter">
                        <div class="main-text">{{filter.tip}}</div>
                        <div class="main-content" :style="{ height: getContentHeight(filter.filterList.length) }">
                            <div v-for="filterItem in filter.filterList" :key="filterItem">
                                <app-selectInputItem 
                                :data="filterItem"
                                @update:data="handleUpdateData"/>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- 保存新方案的对话框 -->
                <el-dialog title="添加方案" v-model="dialogVisible" width="30%" align-center>
                    <el-form ref="formRef">
                        <el-form-item >
                        <el-input v-model="newPlanTitle" placeholder="请输入新的方案名"></el-input>
                        </el-form-item>
                        <el-form-item >
                        <el-input v-model="newPlanDesc" placeholder="请输入方案描述"></el-input>
                        </el-form-item>
                    </el-form>
                    <template #footer>
                        <el-button @click="dialogVisible = false">取消</el-button>
                        <el-button type="primary" @click="saveNewPlan">确定</el-button>
                    </template>
                </el-dialog>
            </div>
        </el-scrollbar>
        <div class="bottom" v-if="userRole !== 'tourist'">
            <div class="buttone">
                <div class="butt1" @click="resetFilters">重置</div>
                <div class="butt2" @click="completeFilters">确定</div>
            </div>
            <div class="butttwo">
                <div class="butt3" @click="openDialog">保存新方案</div>
            </div>
        </div>
        <app-error :show="showError" :content="errorMessage" @close="showError = !showError"/>
    </div>   
</template>
<script setup>
import startRed from '@/assets/table/start_red.png'
import start from '@/assets/table/start.png'
import { Leagues, myPlans, setFilter } from '../../../api/screen';
import { ElMessageBox, ElMessage } from 'element-plus';
import { EventBus } from '../../../utils/eventBus';
const props = defineProps(['selectedIndex']);
const emit = defineEmits(['update:selectedIndex','updateStart'])
const activeName = ref('');
const leagues = ref([])
const mainData = ref([])  //方案数据
let defaultData = [] //默认配置数据
const dialogVisible = ref(false)  // 控制对话框的显示和隐藏
const newPlanTitle = ref('')  // 保存输入的方案名称
const newPlanDesc = ref('')   // 保存输入的方案描述
const showError = ref(false); // 控制通知的显示
const errorMessage = ref(''); // 存储错误提示的内容

const startStatus = ref(false)
// 计算用户角色
const userStore = useUserStore();
const userRole = computed(() => userStore.roles);
let leaguesTimer = null;

const router = useRouter();
const goToLogin = () =>{
    router.push('/login')
}
// 定期调用Leagues接口
const fetchLeagues = () => {
    if(userRole.value !== 'tourist'){
        Leagues().then((res) => {
            leagues.value = res.groups;
        });
    }
};

const toggleStart = () => {
    // 创建一个新的对象来保持其他属性不变
    startStatus.value = !startStatus.value
    emit('updateStart',startStatus.value)
    
};
let timeoutId;
const fetchWithTimeout = async () => {
    try {
        // 调用数据获取函数
        await fetchLeagues(); // 等待数据获取完成

        // 在请求完成后，递归调用 setTimeout，再次启动下一个请求
        timeoutId =  setTimeout(fetchWithTimeout, 3000); // 10 秒后重新执行
    } catch (error) {
        // 即便出错，仍然在 10 秒后重新尝试请求
        timeoutId =  setTimeout(fetchWithTimeout, 3000);
    }
};
// 在组件挂载时调用，并每3秒刷新一次
onMounted(() => {
    if (userRole.value !== 'tourist') {
        fetchWithTimeout();  // 首次调用
        // 我的方案数据
        myPlans().then((res) => {
            mainData.value = getActivePlan(res);
            defaultData = JSON.parse(JSON.stringify(res.default)); // 深拷贝 defaultData，确保它与 mainData 独立
        });
    }
});

onUnmounted(() => {
  if (leaguesTimer) clearInterval(leaguesTimer);  // 清除定时器
});

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

function getContentHeight(length) {
      // 根据项数动态设置高度
      if (length === 2) return '120px';
      if (length === 3) return '170px';
      if (length === 5) return '270px';
}

// 只存储选中的联赛ID
const selectedItems = ref([])

// 修改 toggleSelection 方法，只存储联赛的ID
const toggleSelection = (item) => {
    // 找到当前项的索引
    const index = selectedItems.value.indexOf(item.id)
    if (index === -1) {
        // 如果未找到，说明尚未选中，添加该ID
        selectedItems.value.push(item.id)
    } else {
        // 如果找到了，说明已选中，移除该ID
        selectedItems.value.splice(index, 1)
    }
}

// 修改 isSelected 方法，判断当前ID是否已被选中
const isSelected = (item) => {
    return selectedItems.value.includes(item.id)
}
const topHeight = computed(() => (activeName.value ? '400px' : '100px'))
const filterHeight = computed(() => (activeName.value ? '1750px' : '1450px'))

// 使用 computed 来动态获取 filters
const filters = computed(() => {
  return mainData.value.length > 0 ? mainData.value[0].filters : [];
});

const handleUpdateData = (updatedItem) => {
  // 遍历 filters 找到对应的 filter
  const filter = mainData.value[0].filters.find(f => 
    f.filterList.some(item => item.type === updatedItem.type)
  );

  if (filter) {
    // 找到对应的 filterList 中的 item
    const filterItem = filter.filterList.find(item => item.type === updatedItem.type);
    
    if (filterItem) {
      // 更新对应的 filterItem 数据
      Object.assign(filterItem, updatedItem);
    }
  }
};

// 清空选中的过滤器和联赛
const clearSelections = () => {
  selectedItems.value = []; // 清空选中的联赛ID
  
};

// 重置按钮点击事件
const resetFilters = () => {
    if(userRole.value === 'normal'){
        showError.value = true
        errorMessage.value = '非会员用户无法使用筛选器，请点击开通会员'
    }else{
        let defaultPlan = defaultData
        delete defaultPlan.active;
        delete defaultPlan.totle;
        defaultPlan.title = defaultPlan.name;
        // console.log(defaultPlan)
        setFilter(defaultPlan).then(() => {
            clearSelections()
            EventBus.chartUpdate = true
            // console.log('chartUpdate:', EventBus.chartUpdate);
            
            // ftInplay({ code: 'default', uid: parseInt(localStorage.uid) });
            // myPlans()
            // emit('update:selectedIndex', 1);
            ElMessage.success('已重置方案，筛选中');
        });
    }
};

// 确认按钮点击事件
const completeFilters = () => {
    if(userRole.value === 'normal'){
        showError.value = true
        errorMessage.value = '非会员用户无法使用筛选器，请点击开通会员'
    }else{
        let currentPlan = {...mainData.value[0]}
        if (currentPlan.active) {
            delete currentPlan.active;
            delete currentPlan.totle;
            currentPlan.title = currentPlan.name;
        }
        currentPlan.filters = filters.value
        currentPlan.leagues = selectedItems.value
        // // 如果有传入 updatedStart favorites
        // if (updatedStart) {
        //     currentPlan.favorites = updatedStart.favorites;
        // }
        setFilter(currentPlan).then(() => {
            // clearSelections()
            EventBus.chartUpdate = true
            
            // ftInplay({ code: currentPlan.code, uid: parseInt(localStorage.uid) });
            // myPlans()
            // emit('update:selectedIndex', 1);
            ElMessage.success('筛选中');
        });
    }
};

// 打开对话框
const openDialog = () => {
    if(userRole.value === 'normal'){
        showError.value = true
        errorMessage.value = '非会员用户无法使用筛选器，请点击开通会员'
    }else{
        newPlanTitle.value = ''  // 清空输入框的内容
        newPlanDesc.value = ''
        dialogVisible.value = true
    }
}

// 点击确定按钮保存新方案
const saveNewPlan = () => {
  if (!newPlanTitle.value || !newPlanDesc.value) {
    ElMessage.error('方案名称和描述不能为空')
    return
  }

  // 获取当前方案
  let newPlan = { ...mainData.value[0] }
  if (newPlan.active) {
    delete newPlan.active
    delete newPlan.total
  }
  newPlan.title = newPlanTitle.value
  newPlan.desc = newPlanDesc.value
  newPlan.filters = filters.value
  newPlan.leagues = selectedItems.value;
  newPlan.code = ''  // 清空code

  // 调用 setFilter 保存方案
  setFilter(newPlan).then(() => {
    ElMessage.success('保存成功，请到我的方案中查看')
    dialogVisible.value = false  // 关闭对话框
    clearSelections()
  })
}
</script>
<style lang='scss' scoped>
.tourist-notice{
    background-color: rgba(242, 242, 247, 0.5);
    height: 100px;
}
.notice{
    text-align: center;
}
.notice-text{
    margin-bottom: 10px;
    color: #999999;
}
.dq{
    margin-left: 20px;
    margin: 0 0 10px 20px;
}
.filter{
    background-color: rgba(242, 242, 247, 0.5);
    width: 385px;
    padding-top: 10px;
}
.collect{
    height: 35px;
    margin: 10px 0 0 10px;
}
.collect-text{
    margin-left: 5px;
}
.fenge{
    width: 100%;
    border: solid 0.5px #CCCCCC;
}
.top{
    width: 340px;
    margin-left: 20px;
    border-radius: 10px;
    border: solid 1px #CCCCCC;
    transition: height 0.3s ease;
}
.league-list {
    margin-left: 20px;
    font-size: 16px;
    max-height: 300px; 
    overflow-y: auto;
}
.title {
    margin-top: 10px;
}
.title-text {
    font-weight: bold;
}
.content {
    display: flex;
    flex-direction: column;
}
.content-text {
    margin-left: 20px;
    font-size: 14px;
    cursor: pointer;
}
.el-collapse{
    
    --el-collapse-header-bg-color: normal;
    --el-collapse-content-bg-color: normal;
}
:deep(.el-collapse-item__header){
    font-size: 16px;
    font-family: AlibabaPuHuiTi_2_55;
    margin-left: 20px;
}
:deep(.el-collapse-item__arrow){
    margin-right: 25px;
}
.main{
}
.main-text{
    margin: 20px 0 10px 20px;
}
.main-content{
    width: 340px;
    margin-left: 20px;
    border-radius: 10px;
    border: solid 1px #CCCCCC;
}
.selected{
    color: #ff3b30;
}
.bottom{
    background-color: rgba(242, 242, 247, 0.5);
    width: 380px;
    height: 120px;
}
.buttone{
    display: flex;
    margin-top: 20px;
    justify-content: center;
}
.butt1{
    width: 170px;
    height: 40px;
    border: solid 1px #ff3b30;
    border-radius: 30px;
    color: #ff3b30;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 10px;
    cursor: pointer;
}
.butt2{
    width: 170px;
    height: 40px;
    background-color: #ff3b30;
    border-radius: 30px;
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
}
.butttwo{
    display: flex;
    margin-top: 20px;
    justify-content: center;
}
.butt3{
    width: 350px;
    height: 40px;
    background-color: #ff3b30;
    border-radius: 30px;
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
}
:deep(.el-dialog){
    height: 280px;
    width: 400px;
}
:deep(.el-dialog__title){
    font-size: 24px;
    display: flex;
    justify-content: center;
    height: 50px;
    align-items: center;
}
:deep(.el-dialog .el-input__inner){
    width: 300px;
    height: 50px;
    border-bottom: solid 1px #cccccc;
    font-size: 18px;
}
:deep(.el-dialog .el-input__wrapper){
    background-color: #fff;
    box-shadow: none;
}
:deep(.el-dialog .el-input__wrapper:hover){
    box-shadow: none
}
:deep(.el-dialog__footer){
    display: flex;
    justify-content: center;
    align-items: center;
}
:deep(.el-dialog .el-button){
    font-size: 16px;
    border-radius: 30px;
    height: 40px;
    width: 100px;
    border: 1px solid #c7c7cc;
    color: #cfcfcf;
    cursor: pointer;
}
:deep(.el-dialog .el-button--primary){
    border: 1px solid #ff3b30;
    color: #fff;
    background-color: #ff3b30;
}
:deep(.el-dialog .el-button:hover){
    background-color: #fff
}
:deep(.el-dialog .el-button--primary:hover){
    background-color: #ff3b30
}
:deep(.el-dialog__header){
    background-color: #eff0f4;
}
</style>