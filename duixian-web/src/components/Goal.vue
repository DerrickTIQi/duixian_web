<template>
  <div class="goal">
    <div class="left-section">
      <img class="left-img" src="/src/assets/table/img-football-red.png"  />
      <div class="timer">{{60}}'</div>
    </div>
    <div class="right-section">
      <div class="league">{{"丹麦乙级联赛 女子"}}</div>
      <div class="teams">
        <span class="team1">{{"弗雷登斯堡 女子" }}</span>
        <span class="score">
          <span class="home-score">{{0}}</span>
          -
          <span class="away-score">{{1}}</span>
        </span>
        <span class="team2">{{ "斯科夫伦德女足"}}</span>
      </div>
    </div>
    <div class="close" @click="closeGoal">
        <img src="/src/assets/table/icon-close-gray-default.png" />
    </div>
  </div>
</template>
<script setup>
const props = defineProps({
  match: Object, // 父组件传递的内容
  show: Boolean // 用于显示/隐藏通知的状态
});
// 发射事件用于关闭通知
const emit = defineEmits(['close']);

// 关闭通知
const closeGoal = () => {
  emit('close'); // 通知父组件关闭
};
</script>
<style lang='scss' scoped>
.goal{
    width: 488px;
    height: 80px;
    border-radius: 4px;
    background-image: linear-gradient(to right, #fcd4d0, #fff);
    display: flex;
    align-items: center;
    overflow: visible;
    position: absolute;
    top: 80%;
    left: 35%;
    z-index: 10000;
}
.left-img{
    width: 50px;
    height: 50px;
}
.left-section{
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    position: absolute;
    top: -20px;
    left: 44px;
}
.timer{
    color: #e92937;
    font-size: 16px;
    font-weight: bold;
}
.right-section{
    // display: flex;
    flex-direction: column;
    margin-left: 108px;
    margin-top: -20px;
}
.league{
    text-align: center;
    font-size: 14px;
}
.teams{
    font-size: 16px;
    margin-top: 8px;
}
.team1{
    color: #e92937;
}
.score{
    margin: 0 10px 0 10px;
}
.home-score{
    color: #e92937;
}
.close{
    position: absolute;
    top: 0;
    right: 0;
}
</style>