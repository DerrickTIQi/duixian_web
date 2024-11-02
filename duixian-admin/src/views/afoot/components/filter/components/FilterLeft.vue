<template>
    <div class="left">
        <el-scrollbar class="left-scroll">
            <div class="search">
                <span>联赛名称：</span>
                <el-select v-model="selectedLeague" style="width: 250px;" placeholder="请选择联赛" multiple>
                    <el-option 
                    v-for="league in leagueOptions" 
                    :key="league.id" 
                    :label="league.name" 
                    :value="league.id"
                    />
                </el-select>
            </div>
            <div class="chose">
                <span class="chose-text">全部条件</span>
                <img :src="!zhankai ? zhankaiD : zhankaiS" style="margin-left: 16px;" @click="toggleCollapse"/>
                <img :src="!zhankai ? shouhuiF : shouhuiD" style="margin-left: 16px;" @click="toggleCollapse"/>
            </div>
            <el-scrollbar class="scroll">
                <div class="left-content" v-if="data.length > 0">
                    <div class="main-item" v-for="(item, index) in filters" :key="index">
                    <div v-for="filterItem in item" :key="filterItem">
                            <LeftMain 
                            :data="filterItem"
                            @update:data="handleUpdateData"
                            @reset="handleReset"
                            :activeNames="activeNames"
                            @updateActiveNames="handleActiveNamesUpdate"
                            :status="zhankai"/>
                    </div>
                    </div>
                </div>
            </el-scrollbar>
        </el-scrollbar>
        
        
        <div class="bottom">
            <el-button class="but1" @click="handleReset">清除</el-button>
            <el-button class="but2" @click="handleClick">确定</el-button>
            <el-button class="but3" @click="openDialog">保存过滤器</el-button>
        </div>

        <!-- 保存新方案的对话框 -->
        <el-dialog title="保存过滤器" v-model="dialogVisible" width="600px" align-center class="fdialog">
            <el-form ref="formRef">
                <el-form-item >
                    <span class="form-text">过滤器名称：</span>
                    <el-input v-model="newPlanTitle" placeholder="请输入过滤器名称"></el-input>
                </el-form-item>
                <el-form-item >
                    <span class="form-text">过滤器描述：</span>
                    <el-input v-model="newPlanDesc" placeholder="请输入过滤器描述"></el-input>
                </el-form-item>
            </el-form>
            <template #footer>
                <el-button class="but4" @click="saveNewPlan">保存</el-button>
            </template>
        </el-dialog>
    </div>
</template>
<script setup>
import LeftMain from './LeftMain.vue'
import zhankaiD from '@/assets/afoot/zhankai-default.png'
import zhankaiS from '@/assets/afoot/zhankai-selected.png'
import shouhuiD from '@/assets/afoot/shouhui-default.png'
import shouhuiF from '@/assets/afoot/shouhui-selected.png'
import { ElMessage } from 'element-plus';
const props = defineProps({
    leagues: Array,
    data: Array,
    zhankai: Boolean,
    activeNames: Array
})
const emit = defineEmits(['handleReset','handleSave','saveNewPlan','toggleCollapse','updateActiveNames'])
const filters = computed(() => {
    return props.data.map(item => item.filters)
})

const selectedLeague = ref([])
const dialogVisible = ref(false)  // 控制对话框的显示和隐藏
const newPlanTitle = ref('')  // 保存输入的过滤器名称
const newPlanDesc = ref('')   // 保存输入的过滤器描述
//获取联赛名称和id
const leagueOptions = computed(() => {
  return Object.values(props.leagues).flatMap(leagueGroup => 
    leagueGroup.leagues.map(innerLeague => ({
      id: innerLeague.id,    // id 属性
      name: innerLeague.name  //  name 属性
    }))
  );
});

const handleUpdateData = (updatedItem) => {
    const filter = filters.value[0].find(f => f.tip === updatedItem.tip)
    if(filter){
        Object.assign(filter, updatedItem)
    } 
}

//清除
const handleReset = () =>{
    selectedLeague.value = ''
    filters.value[0].map(item => {
        item.filterList.map(filterItem => {
            filterItem.selectValue = 1; // 恢复 selectValue
            filterItem.min = '';      // 清空最低值
            filterItem.max = '';      // 清空最高值
        });
    });
    emit('handleReset')
}
//确定
const handleClick = () =>{
    let League = selectedLeague.value
    let newFilters = filters.value
    emit('handleClick',League,newFilters)
}
// 打开对话框
const openDialog = () => {
    newPlanTitle.value = ''  // 清空输入框的内容
    newPlanDesc.value = ''
    dialogVisible.value = true
}

// 点击确定按钮保存新方案
const saveNewPlan = () => {
    if (!newPlanTitle.value || !newPlanDesc.value) {
        ElMessage.error('方案名称和描述不能为空')
        return
    }

    let League = selectedLeague.value
    let newFilters = filters.value
    let title = newPlanTitle.value
    let desc = newPlanDesc.value
    console.log(League);
    console.log(title);
    emit('saveNewPlan',League,newFilters,title,desc)
    dialogVisible.value = false  // 关闭对话框
}

// 控制折叠的函数
const toggleCollapse = () => {
  emit('toggleCollapse')
};
// 将更新状态的方法传递到父组件
const handleActiveNamesUpdate = (newActiveNames) => {
  emit('updateActiveNames', newActiveNames);
};
onMounted(() => {
  const selectedFromData = props.data?.[0]?.leagues || []; // 从 data 获取已选中的联赛 ID
  selectedLeague.value = selectedFromData;
});
</script>
<style lang='scss' scoped>
.left{
    height: calc(100vh - 220px);
}
.left-scroll{
    height: 100%;
}
.chose{
    display: flex;
    margin-top: 24px;
}
.chose-text{
    padding: 6px 16px;
    background-color: #e92937;
    color: white;
    font-size: 12px;
}
:deep(.el-collapse-item){
    width: 330px;
}
:deep(.el-collapse-item__content){
    width: 330px;
}
.scroll{
    height:570px;
}
.left-content{
    margin-top: 8px;
}
:deep(.el-select__wrapper){
    background-color: #fff !important;
    border: solid 1px #ebebeb !important; 
}
:deep(.el-select__wrapper.is-focused){
  box-shadow:none
}
.el-select-dropdown .el-select-dropdown__item.is-selected{
  color: #e92937;
}
.el-select__placeholder{
    color: #000;
}
.bottom{
    display: flex;
    justify-content: center;
    margin-top: 10px;
    padding-bottom: 10px;
}
.but1{
    width: 60px;
    height: 32px;
    margin-right: 4px;
    background-color: #f8f9fa;
    color: #333333;
    border: 0;
    border-radius: 0;
}
.but2{
    width: 60px;
    height: 32px;
    background-color: #e92937;
    color: #fff;
    border: 0;
    border-radius: 0;
}
.but3{
    width: 102px;
    height: 32px;
    background-color: #e92937;
    color: #fff;
    border: 0;
    border-radius: 0;
}
.but4{
    width: 60px;
    height: 32px;
    background-color: #e92937;
    color: #fff;
    border: 0;
    border-radius: 0;
}
:deep(.el-dialog){
    border-radius: 0;
    z-index: 100000;
}
:deep(.el-dialog__title){
    font-size: 16px;
    color: #000;
    font-weight: 600;
    margin-left:16px;
    
}
:deep(.el-dialog__header){
    height: 32px;
    background-color: #fafafa;
    padding-top: 8px;
}
:deep(.fdialog .el-dialog__footer){
    display: flex;
    justify-content: center;
    margin-bottom: 40px
}
.fdialog .el-input{
    width: 336px;
    height: 32px;
}
:deep(.fdialog .el-input__wrapper){
    background-color: #fff;
    border: solid 1px #ebebeb;
    border-radius: 0;
}
:deep(.fdialog .el-input__wrapper:is-focus){
    box-shadow: none
}

.el-form{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 40px;
}
.form-text{
    font-size: 14px;
    color: #000;
}
</style>