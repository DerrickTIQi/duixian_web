<template>
    <div class="legend">
        <div class="legend-one">
            <span class="one-text">图例说明</span>
            <div class="imgs">
                <div class="imgs_item" v-for="(event, index) in eventIcons" :key="index">
                    <img :src="event.src" class="img" />
                    <span style="width: 50px;">{{ event.label }}</span>
                </div>
            </div>
        </div>
        <div class="br"></div>
        <div class="legend-two">
            <div class="left">
                <img :src= logo />
            </div>
            <div class="right">
                <div class="right_one">
                    为您提供体育足球独特进攻压力曲线图数据、即时比分、赛事推荐等服务
                </div>
                <div class="right_two">
                    体育实时对抗数据分析筛选工具，无需亲临现场，给您最真实的体育竞技实况数据，独有体育竞技实况进程算法，通过动态数据真实还原比赛场上的实时战况
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import jq from '@/assets/detail/jq.png'
import dianqiu from '@/assets/detail/dq.png'
import wlq from '@/assets/detail/wlq.png'
import zg from '@/assets/detail/zg.png'
import huanren from '@/assets/detail/hr.png'
import jiao from '@/assets/detail/jiaoqiu.png'
import yw from '@/assets/detail/yw.png'
import huang from '@/assets/detail/huangpai.png'
import hong from '@/assets/detail/hp.png'
import logo from '@/assets/logo.png'
import top from '@/assets/table/top.png'
import start from '@/assets/table/start.png'
const eventIcons = ref([
    { src: jq, label: '进球' },
    { src: dianqiu, label: '点球' },
    { src: wlq, label: '乌龙球' },
    { src: zg, label: '助攻' },
    { src: huanren, label: '换人' },
    { src: jiao, label: '角球' },
    { src: yw, label: '越位' },
    { src: huang, label: '黄牌' },
    { src: hong, label: '红牌' },
    { src: top, label: '置顶' },
    { src: start, label: '收藏' },
])
</script>
<style lang='scss' scoped>
.legend{
    width: 1200px;
    height: 200px;
    background-color: #fff;
    margin-bottom: 20px;
}
.legend-one{
    display: flex;
    height: 30px;
    margin-left: 20px;
    padding-top: 30px;
}
.one-text{
    margin:-2px 20px 0 20px;
}
.imgs{
    display: flex;
    // align-items: center; /* 垂直居中 */
    // justify-content: center;
    height: 17px;
}
.imgs_item{
    display: flex;
    font-size: 12px;
    color: #8e8e93;
}
.img{
    margin-right: 5px;
}
.br{
    margin-top: 20px;
    border: 0.5px solid #dcdcdc;
}
.legend-two{
    display: flex;
}
.left{
    margin-top: 40px;
    padding-left: 20px;
}
.right{
    margin-top: 30px;
    margin-left: 20px;
}
.right_one{
    font-size: 16px;
    font-weight: bold;
    color: #555555;
}
.right_two{
    margin-top: 10px;
    font-size: 14px;
    color: #777777;
}
</style>