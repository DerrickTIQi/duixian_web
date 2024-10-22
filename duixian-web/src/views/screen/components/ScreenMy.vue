<template>
    <div class="my">
        <div v-if="userRole === 'tourist'" class="tourist-notice">
            <div class="notice">
                <div class="notice-text">登录后即可创建专属的方案</div>
                <el-button type="primary" @click="goToLogin">请先登录</el-button>
            </div>
        </div>
        <div v-if="userRole === 'normal'" class="tourist-notice">
            <div class="notice">
                <div class="notice-text">你还没有添加方案</div>
                <el-button type="primary" @click="goToJinXuan">去添加方案</el-button>
            </div>
        </div>
        <div v-else>
            <div class="content_item" v-for="(item, index) in mainData" :key="index">
            <div class="title">
                <img :src="item.user_info.avatar" style="width: 30px; height: 30px;"/>
                <span class="title_text">{{ item.user_info.name }}</span>
                <img :src="getIconSrc(item.user_info.ratio)" style="width: 70px;height: 12px;">
                <div class="title_right" >
                   <div class="use" v-if="item.active === 1">
                    <span>使用中</span>
                   </div>
                </div>
            </div>
            <div class="main">
                <span class="main_textone">{{ item.plan_info.title }}</span>
                <span class="main_texttwo">{{ item.plan_info.desc }}</span>
            </div>
            <div class="bottom">
                <div class="bottom_item">
                    <span class="bottom_text">今日出单</span>
                    <span class="bottom_num">{{ item.plan_info.today }}</span>
                </div>
                <el-divider direction="vertical" border-color="#c7c7cc" class="custom-divider" />
                <div class="bottom_item">
                    <span class="bottom_text">近10日出单</span>
                    <span class="bottom_num">{{ item.plan_info['7days'] }}</span>
                </div>
                <el-divider direction="vertical" border-color="#c7c7cc" class="custom-divider"/>
                <div class="bottom_item">
                    <span class="bottom_text">当前出单</span>
                    <span class="bottom_dqcd">{{ item.plan_info.now }}</span>
                </div>
            </div>
            <div class="caozuo">
                <div class="fuhe" @click="conformClick(item.plan_info.title,item.plan_info.code,index)">
                    <span>符合方案的近10场比赛</span>
                    <img src="@/assets/detail/blackright.png" />
                </div>
                <div class="tianjia" >
                    <button class="butt1" @click="del(item,index)">删除</button>
                    <button class="butt2" v-if="item.is_system === 1" @click="copy(item, index)">复制</button>
                    <button class="butt3" v-if="item.active === 0"  @click="lock(item,index)">查看</button>
                    <button class="butt4" v-if="item.active === 1" @click="cancel(item,index)">取消使用</button>
                </div>
            </div>
            <div class="fengetwo">
                <img src="@/assets/detail/fengexian.png" />
            </div>
            
        </div>
        <div class="footer" v-if="userRole !== 'tourist'">
            <span>没有更多了</span>
            <!-- <img src="@/assets/detail/blackright.png"  /> -->
            </div>
        </div>

        <app-error :show="showError" :content="errorMessage" @close="showError = !showError"/>
        <ScreenTable v-if="dialogCode" v-model="show" :index="selectedIndex" :dialogTitle="dialogTitle" :dialogCode="dialogCode" :selectedIndex="menuIndex"/>
    </div>
</template>
<script setup>
import fivefire from '@/assets/detail/fivefire.png'
import fourfire from '@/assets/detail/fourfire.png'
import threefire from '@/assets/detail/threefire.png'
import { ElMessageBox, ElMessage } from 'element-plus';
import { copyPlan, deletePlan, myPlans, ftInplay } from '../../../api/screen';
import ScreenTable from './ScreenTable.vue';
const props = defineProps({
    data:Array,
    selectedIndex: Int32Array
})
const menuIndex = props.selectedIndex
const emit = defineEmits(['update:selectedIndex'])
// 计算用户角色
const userStore = useUserStore();
const userRole = computed(() => userStore.roles);
const showError = ref(false); // 控制通知的显示
const errorMessage = ref(''); // 存储错误提示的内容
const getIconSrc = (ratio) => {
    const ratioStr = String(ratio); // 将 ratio 转换为字符串
    switch (ratioStr) {
        case '5':
            return fivefire;
        case '4':
            return fourfire;
        case '3':
            return threefire;
    }
}
const mainData = ref([])  //我的方案数据
mainData.value = props.data.my_plans
if(userRole.value !== 'tourist'){
    myPlans().then((res) => {
        mainData.value = res.my_plans;
    });
}

const router = useRouter();
const goToLogin = () =>{
    router.push('/login')
}
const goToJinXuan = () =>{
    emit('update:selectedIndex', 1);
}
const show = ref(false)
const selectedIndex = ref(null)
const dialogTitle = ref('')
const dialogCode = ref('')
const conformClick = (title, code, index) => {
    dialogTitle.value = title
    dialogCode.value = code
    selectedIndex.value = index;
    show.value = true
}

const copy = (item,index) => {
    copyPlan({code: item.plan_info.code}).then((res) => {
        myPlans().then((newData) => {
            mainData.value = JSON.parse(JSON.stringify(newData.my_plans))
        })
    })
}
const del = (item,index) => {
    const title = item.plan_info.title
    deletePlan({code: item.plan_info.code}).then(() => {
        ElMessage.success(`已删除${title}`);
        myPlans().then((newData) => {
            mainData.value = JSON.parse(JSON.stringify(newData.my_plans))
        })
    })
    
}

const lock = (item,index) => {
    const title = item.plan_info.title
    ftInplay({code: item.plan_info.code, uid: parseInt(localStorage.uid)}).then(() => {
        ElMessage.success(`已选择${title}`);
        item.active = 1
    })
}
const cancel = (item,index) => {
    const title = item.plan_info.title
    ftInplay({code: 'default', uid: parseInt(localStorage.uid)}).then(() => {
        ElMessage.success(`已取消使用${title}`);
        item.active = 0
    })
}
</script>
<style lang='scss' scoped>
.tourist-notice{
    background-color: rgba(242, 242, 247, 0.5);
    height: 100px;
    padding-top: 10px;
}
.notice{
    text-align: center;
}
.notice-text{
    margin-bottom: 10px;
    color: #999999;
}
.content_item{
    background-color: rgba(242, 242, 247, 0.5);
    width: 380px;
    height: 211px;
    box-sizing: border-box;
    padding: 20px 20px 0 20px; // 使padding包含在height内
}
.title{
    display: flex;
    justify-content: center; /* 水平居中 */
    align-items: center; /* 垂直居中 */
}
.title_text{
    margin: 0 10px;
    font-size: 14px;
    color: #2c2c2e;
}
.title_right{
    margin-left: auto;
}
.use{
    border-radius: 205px;
    height: 20px;
    width: 60px;
    color: #fff;
    background-color: #ff3b30;
    font-size: 14px;
    text-align: center;
}
.bmf{
    display: flex;
    justify-content: center; /* 水平居中 */
    align-items: center; /* 垂直居中 */
}
.bmf img{
    width: 14px;
    height: 14px;
    margin-top: -5px;
}
.money{
    margin-left: 5px;
    color: #ff3b30;
    font-size: 18px;
    font-weight: 600;
}
.money_text{
    font-size: 12px;
    font-weight: 0;
    margin-left: -5px;
}
.title_right img{
    position: relative;
    top: 2px;
    left: 2px;
}
.title_djck{
    font-size: 12px;
    color: #8e8e83;
}
.main{
    display: flex;
    flex-direction: column;
}
.main_textone{
    font-size: 16px;
    font-weight: 600;
    color: #2c2c2e;
    margin-top: 10px;
}
.main_texttwo{
    font-size: 12px;
    color: #8e8e83;
    margin-top: 5px;
}
.bottom{
    display:flex;
    align-items: center; /* 垂直居中 */
    margin-top: 12px;
    margin-left: -20px;
}
.bottom_item{
    margin-right: 16px;
    margin-left: 20px;
}
.bottom_text{
    font-size: 12px;
    color: #2c2c2e;
}
.bottom_num{
    color: #ff3b30;
    font-size: 12px;
}

.bottom_dqcd{
    font-size: 16px;
    font-weight: 600;
    background-color: rgba(255, 59, 48, 0.1);
    border-radius: 3px;
    color: #ff3b30;
    padding: 0 3px 0 3px;
    border: 1px solid rgba(255, 59, 48, 0.2);
    margin-left: 4px;
    position: relative; /* 添加相对定位 */
    top: 4px;
}
.custom-divider {
    border-color: #c7c7cc !important; /* 更改分割线的颜色 */
}
.footer{
    background-color: rgba(242, 242, 247, 0.5);
    border-radius: 0 0 10px 10px;
    width: 380px;
    height: 40px;
    padding-top: 20px;
    font-size: 14px;
    color: #2c2c2e;
    display: flex;
    justify-content: center; /* 水平居中 */
}
.footer img{
    height: 13px;
    position: relative;
    top: 2px;
    left: 2px;
}

.caozuo{
    display: flex;
    align-items: center; /* 垂直居中 */
    margin-top: 20px;
}
.fuhe{
    font-size: 12px;
    color: #2e2e2c;
    cursor: pointer; //手形
    display: flex;
}
.fuhe img{
    height: 11px;
    position: relative;
    top: 3px;
}
.tianjia{
    margin-left: auto;
}
//删除
.butt1{
    border-radius: 5px;
    height: 32px;
    border: 1px solid #c7c7cc;
    margin-left: 10px;
    width: 55px;
    color: #cfcfcf;
    background-color: rgba(242, 242, 247, 0.5);
    font-size: 14px;
    cursor: pointer;
}
//复制
.butt2{
    border-radius: 5px;
    height: 32px;
    border: 1px solid #ff3b30;
    margin-left: 10px;
    width: 55px;
    color: #ff3b30;
    background-color: rgba(242, 242, 247, 0.5);
    font-size: 14px;
    cursor: pointer;
}
//查看
.butt3{
    border-radius: 5px;
    height: 32px;
    border: 1px solid #ff3b30;
    margin-left: 10px;
    width: 55px;
    color: #fff;
    background-color: #ff3b30;
    font-size: 14px;
    cursor: pointer;
}
//取消使用
.butt4{
    border-radius: 5px;
    height: 32px;
    border: 1px solid #ff3b30;
    margin-left: 10px;
    width: 70px;
    color: #ff3b30;
    background-color: rgba(242, 242, 247, 0.5);
    font-size: 14px;
    cursor: pointer;
}
</style>