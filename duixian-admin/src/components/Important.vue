<template>
    <div class="screen-important">
        <el-scrollbar class="sc-scroll">
            <div class="content">
                <el-timeline>
                    <el-timeline-item
                        v-for="(item, index) in contentData"
                        :key="index"
                        placement="top"
                        :color="index === 0 ? '#e92937' : '#fff'"
                        :type="index === 0 ? 'primary' : ''"
                        hide-timestamp>
                        <div class="content_item">
                            <span class="timeline-time">{{ item.time }}</span>
                            <div class="content_detail">
                                <div class="photo">
                                    <img :src="item.src" />
                                </div>
                                <span class="detail_text">{{ item.text }}</span>
                            </div>
                        </div>
                    </el-timeline-item>
                </el-timeline>
            </div>
        </el-scrollbar>
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
.sc-scroll{
    height: 306px;
}
.content{
    margin-top: 16px;
    width: 340px;
    height: 306px;
    position: relative;
}
// :deep(.timeline-item){
//     position: absolute !important;
//     top: 0 !important;
//     left: -26px !important;
// }
.content_item{
    display: flex;
    position: absolute;
    left: 90px;
    margin-bottom: 10px;
    .times{
        position: relative;
        display: flex;
        flex-direction: column;
        justify-content: center; /* 水平居中 */
        align-items: center; /* 垂直居中 */
        width: 40px;
        margin: 0 20px;
        font-size: 12px;
        span {
            z-index: 1; /* 确保span在divider上方 */
        }
        
    }
    .content_detail{
        display: flex;
        align-items: center; /* 垂直居中 */
        background: linear-gradient(to right, #ebebeb, #ebebeb00);
        border-radius: 20px;
        border-top-right-radius: 0px;
        border-end-end-radius: 0px;
        width: 300px;
        height: 35px;
        font-size: 14px;
        margin-left: -15px;
        .photo{
            display: flex;
            justify-content: center; /* 水平居中 */
            align-items: center; /* 垂直居中 */
            background-color: rgba(255, 255, 255, 1);
            border-radius: 25px;
            width: 35px;
            height: 35px;
            border: solid 2px #ebebeb;
        }
        .detail_text{
            font-size: 14px;
            margin-left: 10px;
        }
    }
    
}
.timeline-time{
    padding: 0;
    position: absolute;
    top: 10px;
    left: -65px;
    font-size: 12px;
    font-weight: bold;
}
.el-timeline-item{
    height: 35px !important;
}
:deep(.el-timeline-item__node--normal){
    top: 10px;
    border: 2px solid #e92937;
}
:deep(.el-timeline-item__tail){
    border-left: 2px solid #e92937;
    top: 10px;
}
.el-timeline{
    padding-inline-start: 15px;
}

</style>