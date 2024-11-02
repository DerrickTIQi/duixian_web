<template>
    <div class="curve">
        <div class="title1">
            <DetailTitle 
            quxianText="过滤器预测方案"
            />
            <div class="title-Tright">
                <span @click="show">查看更多</span>
                <img src="@/assets/detail/blackright.png"/>
            </div>
            
        </div>
        <div class="title-under"></div>
        <div class="content">
            <template v-if="userRole === 'tourist' || userRole === 'normal'">
                <div class="no-access">
                    <span class="no-access-text">非会员用户无法查看赛中比赛推荐方案，<span @click="openProductPage" class="open-product">点击开通会员</span></span>
                </div>
            </template>
            <template v-else>
                <div class="content_item" v-for="(item, index) in screenData" :key="index" :class="{first_item: index === 0}">
                    <div class="title">
                        <img :src="item.user_info.avatar" style="width: 30px; height: 30px;border-radius: 15px;"/>
                        <span class="title_text">{{ item.user_info.name }}</span>
                        <div style="margin-left: auto"><img :src="getIconSrc(item.user_info.ratio)" style="width: 70px;height: 12px;"></div>
                        <!-- <div class="title_right">
                            <span class="title_djck" @click="show">点击查看</span>
                            <img src="@/assets/detail/whiteright.png" />
                        </div> -->
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
                    <div class="footer">
                        <span @click="show">查看方案</span>
                        <img src="@/assets/detail/blackright.png"/>
                    </div>
                    <div class="title-under"></div>
                        <!-- <img src="@/assets/detail/fengexian.png" /> -->
                </div>
                <!-- <div class="footer">
                    <span v-if="screenData.length === 0">暂时没有任何方案符合本场比赛</span>
                </div> -->
            </template>
            
        </div>
    </div>
</template>
<script setup>
import fivefire from '@/assets/detail/fivefire.png'
import fourfire from '@/assets/detail/fourfire.png'
import threefire from '@/assets/detail/threefire.png'
import { computed } from 'vue';
import DetailTitle from './DetailTitle.vue';
// 计算用户角色
const userStore = useUserStore();
const userRole = computed(() => userStore.roles);
const props = defineProps({
  data: Object,
});
const screenData = computed(() => props.data?.PLANS || []);
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
const router = useRouter();
const show = () => {
    router.push('/afoot/recommend')
}
</script>
<style lang='scss' scoped>
.content_item{
    width: 330px;
    box-sizing: border-box;
    padding: 16px 16px 0 16px;
}
.no-access{
    background-color: rgba(242, 242, 247, 1);
    width: 330px;
    height: 160px;
    box-sizing: border-box;
    padding: 20px;
    font-size: 20px;
}
.open-product{
    font-weight: bold;
    color: #ff3b30;
    cursor: pointer;
}
.first_item{
    border-radius: 0px 10px 0 0;
}
.title1{
    display: flex;
}
.title{
    display: flex;
    justify-content: center; /* 水平居中 */
    align-items: center; /* 垂直居中 */
}
.title-Tright{
    font-size: 12px;
    opacity: 0.7;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-left: auto;
    cursor: pointer;
}
.title-under{
    width: 330px;
    height: 1px;
    margin-top: 16px;
    background-color: #ebebeb;
}
.title_text{
    margin: 0 8px;
    font-size: 14px;
    color: #000;
}
.title_right{
    margin-left: auto;
}
.title_right img{
    position: relative;
    top: 2px;
    left: 2px;
}
.title_djck{
    font-size: 12px;
    color: #8e8e83;
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
    align-items: center; /* 垂直居中 */
    justify-content: center;
    margin-top: 12px;
    margin-left: -20px;
}
.bottom_item{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-right: 16px;
    margin-left: 16px;
}
.bottom_text{
    font-size: 12px;
    color: #000;
    opacity: 0.7;
}
.bottom_num{
    color: #e92937;
    font-size: 16px;
    font-weight: bold;
}
.footer{
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 12px;
    opacity: 0.7;
    margin-top: 16px;
    cursor: pointer;
}
// .fenge {
//     position: relative;
//     height: 23px;
// }
// .fenge img {
//     position: absolute;
//     bottom: 0;
//     left: 0;
// }
.custom-divider {
    border-color: #ebebeb !important; /* 更改分割线的颜色 */
    height: 36px;
}
// .footer{
//     background-color: rgba(242, 242, 247, 0.5);
//     border-radius: 0 0 10px 10px;
//     width: 380px;
//     height: 40px;
//     padding-top: 20px;
//     font-size: 14px;
//     color: #2c2c2e;
//     display: flex;
//     justify-content: center; /* 水平居中 */
//     cursor: pointer;
// }
// .footer img{
//     height: 13px;
//     position: relative;
//     top: 2px;
//     left: 2px;
// }
</style>