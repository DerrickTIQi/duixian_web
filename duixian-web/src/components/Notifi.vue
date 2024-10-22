<template>
    <div v-if="show" class="notifi" >
        <div class="img-bg">
            <img src="@/assets/tanchuang-bg.png" />
            <div class="title">
                <div class="left">
                    <div class="left_one">{{ title }}</div>
                    <div class="left_two">当前方案有【<span style="color: #e92937;">1</span>个新比赛】</div>
                </div>
                <div class="right" @click="closeNotification">
                    <img src="@/assets/table/icon-close-gray-default.png"/>
                </div>
            </div>
        </div>
        <div class="content">
            <div class="num">1</div>
            <div class="match">
                <div class="leagues">{{ match.NCN?.LEAGUE }}</div>
                【
                <div class="hteam">{{ match.NCN?.TEAM_H }}</div>
                <img src="@/assets/img-vs-s.png" style="margin: 0 3px;"/>
                <div class="ateam">{{ match.NCN?.TEAM_C }}</div>
                】
            </div>
        </div>
    </div>
</template>
<script setup>
const props = defineProps({
  match: Object, // 父组件传递的比赛信息
  title: String, // 父组件传递的描述
  show: Boolean // 用于显示/隐藏通知的状态
});

// 发射事件用于关闭通知
const emit = defineEmits(['close']);

// 关闭通知
const closeNotification = () => {
  emit('close'); // 通知父组件关闭
};
</script>
<style lang='scss' scoped>
.notifi{
    width: 600px;
    height: 180px;
    position: absolute;
    top: 70%;
    left: 35%;
    border-radius: 4px;
    box-shadow: 0 4px 16px 0 rgba(0, 0, 0, 0.2);
    background-color: #fff;
    z-index: 100000;
}
.img-bg{
    position: relative;
}
.title{
    position: absolute;
    top: 24px;
    left: 188px;
}
.left{
    display: flex;
    flex-direction: column;
    text-align: center;
}
.left_one{
    font-size: 18px;
    font-weight: bold;
}
.left_two{
    margin-top: 8px;
    width: 200px;
    height: 24px;
    border-radius: 16px;
    background-image: linear-gradient(to right, #d0eeff, #fcd4d0);
    font-size: 14px;
    padding-top: 2px;
}
.right{
    position: absolute;
    top: -21px;
    right: -190px;
    cursor: pointer;
}
.content{
    display: flex;
    justify-content: center;
    position: relative;
    margin-top: 16px;
}
.num{
    position: absolute;
    left: 40px;
}
.match{
    display: flex;
    justify-content: center;
}
.hteam{
    color: #e92937;
}
.ateam{
    color: #0071ff;
}
</style>