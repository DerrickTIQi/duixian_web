<template>
    <div class="screen-important">
        <div class="content">
            <div class="content_item" v-for="(item, index) in contentData" :key="index">
                <div class="times">
                    <span >{{ item.time }}</span>
                    <el-divider v-if="index !== contentData.length - 1" direction="vertical" border-color="#c7c7cc" class="divider"/>
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
</template>
<script setup>
import jiaoqiu from '@/assets/detail/jiaoqiu_big.png'
import huangpai from '@/assets/detail/huangpai_big.png'
import hp from '@/assets/detail/hp_big.png'
import ballRed from '@/assets/detail/ball_red.png'
import hr from '@/assets/detail/hr_big.png'
import ballBlue from '@/assets/detail/ball_blue.png'
import dq from '@/assets/detail/dq_big.png'
import shaozi from '@/assets/detail/shaozi.png'
import jiashi from '@/assets/detail/jiashi.png'

const props = defineProps({
  data: Object,
});
const getIconSrc = (type) => {
    switch (type) {
        case 'hc':
        case 'gc':
        case 'd':
            return jiaoqiu; // 角球
        case 'hyc':
        case 'gyc':
            return huangpai; // 黄牌
        case 'hrc':
        case 'grc':
            return hp; // 红牌
        case 'hg':
        case 'hgc':
            return ballRed; // 主队进球
        case 'hs':
        case 'gs':
            return hr; // 换人
        case 'gg':
        case 'ggc':
            return ballBlue; // 客队进球
        case 'hp':
        case 'gp':
        case 'hmp':
        case 'gmp':
            return dq; // 点球
        case 'cd':
        case 'tq':
        case 'h':
        case 'e':
            return shaozi; // 开始/结束
        case 'it':
            return jiashi; // 时间
    }
};
const getTime = (content, type) => {
    if (type === 'cd' || type === 'tq') {
        return `0'`; // 开场或提前结束时间设置为 0'
    } else if (type === 'it') {
        if (content.includes('上半场')) {
            return `45'`; // 上半场时设置为 45'
        } else if (content.includes('下半场')) {
            return `90'`; // 下半场时设置为 90'
        }
    } else if (type === 'h') {
        return '中场休息'; // 中场休息不显示时间符号
    } else if (type === 'e') {
        return '比赛结束'; // 比赛结束不显示时间符号
    }else {
        const timeMatch = content.match(/^\d+(\+\d+)?/); // 检查字符串开头是否有数字
        return timeMatch ? `${timeMatch[0]}'` : ''; // 如果有数字，返回带分钟的格式，否则返回空字符串
    }
}

// 直接在 setup 中初始化 contentData
const initialEvent = {
    time: '0\'',
    src: shaozi, // 使用开始比赛的图片
    text: '比赛开始！' // 比赛开始的文本
};

const contentData = props.data.EVENTS.info.map(event => {
    return {
        time: getTime(event.c, event.t), // 从 .c 提取 time
        src: getIconSrc(event.t), // 根据 .t 获取图片
        text: event.c, // 使用整个 .c 作为文本
    };
})
// 添加比赛开始事件到 contentData 尾部
contentData.push(initialEvent);


</script>
<style lang='scss' scoped>
.content{
    background-color: rgba(242, 242, 247, 0.5);
    border-radius: 0px 10px 10px 10px;
    width: 550px;
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
        width: 420px;
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
    width: 550px;
    height: 17px;
    margin-top: -5px;
}
.imgs_item{
    display: flex;
    align-items: center; /* 垂直居中 */
    margin: 0 5px;
    font-size: 12px;
    color: #8e8e93;
}
.img{
    margin-right: 4px;
}
</style>