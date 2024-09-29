<template>
    <div class="product">
        <div class="title">
            <div class="title-text1">我们为您提供两种不同的<span class="title-text2">会员服务</span></div>
            <div class="title-text3">凡推荐满 3 人的用户，可直接免费升级成为特权会员并享受返利，赶紧让小伙伴们加入我们吧！</div>
        </div>
        <div class="content">
            <div class="left">
                <div class="content-title">
                    <span class="left-title-text1">特权会员</span>
                    <img src="@/assets/product/vip.png" />
                    <div class="money">599<div class="money-one">元/月</div></div>
                </div>
                <div class="main">
                    <div class="main-item" v-for="lItem in lData" :key="lItem">
                        <img src="@/assets/product/gou.png">
                        <span class="item-text">{{ lItem.text }}</span>
                    </div>
                    <div class="footer">
                        <button @click="connectClick()">联系我们</button>
                    </div>
                </div>
                
            </div>
            <div class="right">
                <div class="content-title">
                    <span class="right-title-text1">专业会员</span>
                    <img src="@/assets/product/vip.png" />
                    <div class="money">799<div class="money-one">元/月</div></div>
                </div>
                <div class="main">
                    <div class="main-item" v-for="rItem in rData" :key="rItem">
                        <img src="@/assets/product/gou.png">
                        <span class="item-text">{{ rItem.text }}</span>
                    </div>
                    <div class="footer">
                        <button @click="connectClick()">联系我们</button>
                    </div>
                </div>
            </div>
        </div>
        <productDialog v-model="show"/>
    </div>
</template>
<script setup>
import productDialog from './components/productDialog.vue';
const lData = ref([
    {text: '查看全部实时比赛'},
    {text: '查看核心进攻压力数据图表'},
    {text: '查看赛中关键节点事件提醒'},
    {text: '最全面的多功能赛选器'},
    {text: '快速筛选以及收藏筛选功能'},
    {text: '保存的 3 个筛选方案可同时运行并实时提醒，让你不错过任何一场筛选比赛信息'},
])
const rData = ref([
    {text: '查看全部实时比赛'},
    {text: '查看核心进攻压力数据图表'},
    {text: '查看赛中关键节点事件提醒'},
    {text: '最全面的多功能赛选器'},
    {text: '快速筛选以及收藏筛选功能'},
    {text: '保存的 6 个筛选方案可同时运行并实时提醒，让你不错过任何一场筛选比赛信息'},
])
const show = ref(false)
const connectClick = () => {
    show.value = true
}
</script>
<style lang='scss' scoped>
.title{
    text-align: center;
    margin-top: 64px;
}
.title-text1{
    font-size: 32px;
    font-weight: bold;
    line-height: 1.5;
}
.title-text2{
    color: #ca9166;
}
.title-text3{
    font-size: 16px;
    margin-top: 16px;
}
.content{
    display: flex;
    justify-content: center;
}
.left{
    width: 592px;
    height: 528px;
    margin: 64px 16px 0 0;
    border-radius: 4px;
    box-shadow: 0 8px 24px 0 rgba(0, 0, 0, 0.1);
    background-image: linear-gradient(to right, #e9d3ba, #cb987b);
    position: relative;
}
.content-title{
    display: flex;
    position: relative;
}
.content-title img{
    margin-left: auto;
}
.left-title-text1{
    margin: 16px 0 0 48px;
    font-size: 24px;
    font-weight: bold;
    color: #543317;
}
.money{
    font-size: 32px;
    font-weight: bold;
    color: #fff;
    font-family: 'DINAlternate';
    position: absolute;
    top: 8px;
    right: 48px;
    display: flex;
    .money-one{
        font-size: 20px;
        font-weight: normal;
        margin-top: 14px;
    }
}
.main{
    position: relative;
    width: 592px;
    height: 464px;
    border-radius: 4px;
    margin-top: -8px;
    background-color: #fff;
}
.right{
    width: 592px;
    height: 528px;
    margin: 64px 16px 0 0;
    border-radius: 4px;
    box-shadow: 0 8px 24px 0 rgba(0, 0, 0, 0.1);
    background-image: linear-gradient(to right, #656976, #414249);
    position: relative;
}
.right-title-text1{
    margin: 16px 0 0 48px;
    font-size: 24px;
    font-weight: bold;
    color: #efccaa;
}
.main{
    box-sizing: border-box;
    padding: 40px 48px 0 48px;
}
.main-item{
    margin-bottom: 16px;
    
}
.item-text{
    margin-left: 32px;
    margin-top: -23px;
    display: flex;
}
.main button{
    width: 496px;
    height: 48px;
    margin: 64px 0 0;
    border-radius: 4px;
    background-color: #d4a988;
    color: #fff;
    border: none;
}
</style>