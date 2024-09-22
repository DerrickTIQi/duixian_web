<template>
    <div class="match">
        <div class="navi">
            <div 
            class="text" 
            v-for="(item, index) in naviItem"
            :key="index"
            :class="{active: activeIndex === index}">
                <span>{{ item }}</span>
            </div>
        </div>
        <div class="table">
            <MatchTable />
        </div>
        <div class="footer">
            暂无更多数据~
        </div>
    </div>
</template>
<script setup>
import MatchTable from './components/MatchTable.vue';
const naviItem = ['进行中', '赛程', '赛果', '关注']
const activeIndex = ref(0)

</script>
<style lang='scss' scoped>
.match{
    width: 1200px;
    margin: 0 auto;
}
.navi{
    display: flex;
    margin-top: 20px;
}
.text{
    padding: 10px 20px;
    border-radius: 5px;
}
.text.active {
  background-color: #ff3b30; // 选中时背景颜色为红色
  color: white; // 选中时字体颜色为白色
  font-weight: 600;
}
.table{
    margin-top: 20px;
}
.footer{
    color: rgba(142, 142, 147, 1);
    font-size: 14px;
    display: flex;
    justify-content: center; /* 水平居中 */
    align-items: center; /* 垂直居中 */
    margin-top: 40px;
}
</style>