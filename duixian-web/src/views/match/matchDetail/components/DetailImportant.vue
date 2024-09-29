<template>
    <div class="curve">
        <div class="title">
            <DetailTitle
            type="small"
            quxianText="重要事件"
            quxianEnText="IMPORTANT EVENTS"
            />
        </div>
        <div class="content">
            <div style="padding-top: 20px;">
                <div class="content_item" v-for="(item, index) in contentData" :key="index">
                    <div class="times">
                        <span >{{ item.time }}</span>
                        <el-divider v-if="item.time !== '90\''" direction="vertical" border-color="#c7c7cc" class="divider"/>
                    </div>
                    <div class="content_detail">
                        <div class="photo">
                            <img :src="item.src" />
                        </div>
                        <span class="detail_text">{{ item.text }}</span>
                    </div>
                    
                </div>
            </div>
        </div>
        <div class="imgs">
            <div class="imgs_item" v-for="(event, index) in eventIcons" :key="index">
                <img :src="event.src" class="img" />
                <span>{{ event.label }}</span>
            </div>
        </div>
        
    </div>
</template>
<script setup>
import DetailTitle from './DetailTitle.vue';
const contentData = ref([
    {time:'0\'',src: '/src/assets/detail/shaozi.png', text:'比赛开始！'},
    {time:'15\'',src: '/src/assets/detail/huangpai_big.png', text:'哈兰德故意犯规（曼城）'},
    {time:'35\'',src: '/src/assets/detail/hr_big.png', text:'哈兰德 换下 梅西（曼城）'},
    {time:'中场休息',src: '/src/assets/detail/shaozi.png', text:'上半场结束,当前比分1-1'},
    {time:'88\'',src: '/src/assets/detail/jiaoqiu_big.png', text:'哈兰德 换下 梅西（曼城）'},
    {time:'90\'',src: '/src/assets/detail/jiashi.png', text:'加时赛开始'},
    {time:'88\'',src: '/src/assets/detail/jiaoqiu_big.png', text:'哈兰德 换下 梅西（曼城）'},
    {time:'90\'',src: '/src/assets/detail/jiashi.png', text:'加时赛开始'},
    {time:'88\'',src: '/src/assets/detail/jiaoqiu_big.png', text:'哈兰德 换下 梅西（曼城）'},
    {time:'90\'',src: '/src/assets/detail/jiashi.png', text:'加时赛开始'},
])

const eventIcons = ref([
    { src: '/src/assets/detail/jq.png', label: '进球' },
    { src: '/src/assets/detail/dq.png', label: '点球' },
    { src: '/src/assets/detail/wlq.png', label: '乌龙球' },
    { src: '/src/assets/detail/zg.png', label: '助攻' },
    { src: '/src/assets/detail/hr.png', label: '换人' },
    { src: '/src/assets/detail/jiaoqiu.png', label: '角球' },
    { src: '/src/assets/detail/yw.png', label: '越位' },
    { src: '/src/assets/detail/huangpai.png', label: '黄牌' },
    { src: '/src/assets/detail/hp.png', label: '红牌' },
    { src: '/src/assets/detail/lhyh.png', label: '两黄一红' },
])
</script>
<style lang='scss' scoped>
.content{
    background-color: rgba(242, 242, 247, 0.5);
    border-radius: 0px 10px 10px 10px;
    width: 800px;
    height: 380px;
    overflow-y: auto; /* 允许垂直滚动 */
}
.content_item{
    display: flex;
    margin-bottom: 20px;
    .times{
        position: relative;
        display: flex;
        flex-direction: column;
        justify-content: center; /* 水平居中 */
        align-items: center; /* 垂直居中 */
        width: 48px;
        margin: 0 20px;
        font-size: 12px;
        span {
            z-index: 1; /* 确保span在divider上方 */
        }
        
    }
    .content_detail{
        display: flex;
        align-items: center; /* 垂直居中 */
        background-color: #e5e5ea;
        border-radius: 20px;
        width: 692px;
        height: 40px;
        font-size: 14px;
        .photo{
            display: flex;
            justify-content: center; /* 水平居中 */
            align-items: center; /* 垂直居中 */
            background-color: rgba(255, 255, 255, 1);
            border-radius: 20px;
            height: 40px;
            border: 1px solid rgba(229, 229, 234, 1);
            width: 40px;
        }
        .detail_text{
            margin-left: 20px;
        }
    }
    .divider {
        position: absolute; /* 绝对定位 */
        top: 40px;
        bottom: 0;
        left: 15px;
        width: 0;
        height: 23px;
        z-index: 2; 
        border-color: #c7c7cc !important;
    }
}
.imgs{
    display: flex;
    width: 780px;
    height: 17px;
    margin: 20px 36px 61px 20px;
}
.imgs_item{
    display: flex;
    align-items: center; /* 垂直居中 */
    margin: 0 15px;
    font-size: 12px;
    color: #8e8e93;
}
.img{
    margin-right: 5px;
}
</style>