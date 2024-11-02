<template>
    <div class="comitem">
        <div class="item" v-for="item in data" :key="item">
            <div class="title">
                <img :src="item.user_info.avatar" style="width: 30px; height: 30px; border-radius: 15px;"/>
                <span class="title_text">{{ item.user_info.name }}</span>
                
                <div class="title_right">
                    <img :src="getIconSrc(item.user_info.ratio)" style="width: 70px; height: 12px; margin-right: 8px;">
                    <div class="gz" v-if="route.path !== '/afoot/save'">
                        <el-button v-if="item.own === 0" class="but1" @click="handleCom(item)">关注</el-button>
                        <el-button v-else class="but2" disabled>已关注</el-button>
                    </div>
                    <div v-if="item.active === 1 && route.path === '/afoot/save'" class="using">使用中</div>
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
                    <span class="bottom_num">{{ item.plan_info.now }}</span>
                </div>
            </div>
            <div class="caozuo">
                <div class="caozuo-left">
                    <img src="@/assets/afoot/icon-link.png" />
                    <span style="margin-left: 4px;">UGC</span>
                </div>
                <div class="fuhe" @click="conformClick(item.plan_info.title,item.plan_info.code,index,item.own)">
                    <span>符合方案的近10场比赛</span>
                    <img src="@/assets/afoot/down-default.png" />
                </div>
            </div>
            <div class="button-item" v-if="route.path === '/afoot/save'">
                <el-button class="but3" @click="del(item)">删除</el-button>
                <el-button class="but4" v-if="item.is_system === 1" @click="copy(item, index)">复制</el-button>
                <el-button class="but5" v-if="item.active === 0" @click="lock(item,index)">查看</el-button>
                <el-button class="but6" v-if="item.active === 1" @click="cancel(item,index)">取消使用</el-button>
            </div>
            <div class="fenge"></div>
        </div>
        
        <ComTable v-if="dialogCode" v-model="show"  :dialogTitle="dialogTitle" :dialogCode="dialogCode" :dialogOwn="dialogOwn"  :key="dialogCode" />
    </div>
</template>
<script setup>
import fivefire from '@/assets/detail/fivefire.png'
import fourfire from '@/assets/detail/fourfire.png'
import threefire from '@/assets/detail/threefire.png'
import ComTable from './ComTable.vue';
import { ElMessage } from 'element-plus';
const route = useRoute()
const props = defineProps({
    data:Array
})
console.log(props.data);

const emit = defineEmits(['updatePlans','del','copy','lock','cancel'])
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
const show = ref(false)
const dialogTitle = ref('')
const dialogCode = ref('')
const dialogOwn = ref('')
const conformClick = (title, code, index,own) => {
    dialogTitle.value = title
    dialogCode.value = code
    dialogOwn.value = own
    show.value = true
}

const handleCom = (item) => {
    buyPlan({code: item.plan_info.code}).then((res) => {
        Plans().then((newData) => {
            emit('updatePlans',newData)
            ElMessage.success('关注成功');
        })
    })
}

const del = (item) => {
    if(item.active === 1){
        ftInplay({code: 'default', uid: parseInt(localStorage.uid)}).then((newData) => {
            emit('cancel',newData)
            item.active = 0
        })
    }
    deletePlan({code: item.plan_info.code}).then(() => {
        myPlans().then((newData) => {
            emit('del',newData)
            ElMessage.success('删除成功');
        })
    })
}

const copy = (item) => {
    copyPlan({code: item.plan_info.code}).then((res) => {
        myPlans().then((newData) => {
            emit('copy',newData)
            ElMessage.success('复制成功');
        })
    })
}

const lock = (item) => {
    const title = item.plan_info.title
    ftInplay({code: item.plan_info.code, uid: parseInt(localStorage.uid)}).then((newData) => {
        emit('lock',newData)
        ElMessage.success(`已选择${title}`);
        item.active = 1
    })
}

const cancel = (item) => {
    const title = item.plan_info.title
    ftInplay({code: 'default', uid: parseInt(localStorage.uid)}).then((newData) => {
        emit('cancel',newData)
        ElMessage.success(`已取消使用${title}`);
        item.active = 0
    })
}

</script>
<style lang='scss' scoped>
.comitem{
    width: 330px;
    // height: 208px;
}
.item{
    padding: 16px;
}
.item:hover{
    background-color: #f8f9fa;
}
.title{
    display: flex;
    justify-content: center; /* 水平居中 */
    align-items: center; /* 垂直居中 */
}
.title_text{
    margin-left: 8px;
    font-size: 14px;
    color: #000;
}
.title_right{
    display: flex;
    justify-content: center; /* 水平居中 */
    align-items: center; /* 垂直居中 */
    margin-left: auto;
}
.using{
    display: flex;
    justify-content: center;
    align-items: center;
    width: 60px;
    height: 28px;
    background-color: #e92937;
    color: #fff;
    border-radius: 0;
    border: 0;
}
.but1{
    width: 60px;
    height: 28px;
    background-color: #e92937;
    color: #fff;
    border-radius: 0;
    border: 0;
    cursor: pointer;
}
.but2{
    width: 60px;
    height: 28px;
    opacity: 0.2;
    background-color: #e92937;
    color: #fff;
    border-radius: 0;
    border: 0;
    cursor: pointer;
}
.main{
    display: flex;
    flex-direction: column;
}
.main_textone{
    font-size: 18px;
    font-weight: 500;
    color: #000;
    margin-top: 16px;
}
.main_texttwo{
    font-size: 12px;
    color: #8a8a8a;
    margin-top: 4px;
}
.bottom{
    display:flex;
    justify-content: center;
    align-items: center; 
    margin-top: 12px;
}
.bottom_item{
    margin: 0 15px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
.bottom_text{
    font-size: 12px;
    color: #000;
}
.bottom_num{
    color: #e92937;
    font-size: 16px;
    font-weight: bold;
}
.el-divider--vertical{
    height: 36px;
    color: #ebebeb;
}
.caozuo{
    display: flex;
    margin-top: 20px;
}
.caozuo-left{
    font-size: 12px;
    color: #000;
    display: flex;
    justify-content: center;
    align-items: center;
}
.fuhe{
    margin-left: auto;
    font-size: 12px;
    color: #000;
    opacity: 0.7;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
}
.fenge{
    width: 320px;
    height: 1px;
    margin-left: -16px;
    margin-top: 16px;
    margin-bottom: -16px;
    background-color: #ebebeb;
}
.button-item{
    display: flex;
    justify-content: center;
    margin-top: 10px;
}
.but3{
    width: 60px;
    height: 32px;
    margin-right: 4px;
    background-color: #f8f9fa;
    color: #333333;
    border: 0;
    border-radius: 0;
}
.but4{
    width: 60px;
    height: 32px;
    margin-right: 4px;
    background-color: #fff;
    color: #e92937;
    border: 1px solid #e92937;
    border-radius: 0;
}
.but5{
    width: 60px;
    height: 32px;
    background-color: #e92937;
    color: #fff;
    border: 0;
    border-radius: 0;
}
.but6{
    width: 90px;
    height: 32px;
    background-color: #e92937;
    color: #fff;
    border: 0;
    border-radius: 0;
}
</style>