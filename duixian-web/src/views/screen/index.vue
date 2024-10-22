<template>
    <div class="screen">
        <div class="screen_left">
            <ScreenLeft :count="ftInplayCount" @startStatus="Status"/>
        </div>
        <div class="screen_right">
            <ScreenRight @updateCount="updateCounts" :start="updateStart"/>
        </div>
        
    </div>
</template>
<script setup>
import ScreenLeft from './components/ScreenLeft.vue';
import ScreenRight from './components/ScreenRight.vue';
const ftInplayCount = ref(null); // 筛选器接口中的 totalCount
const updateStart = ref() //收藏状态

// 筛选器项调用 ftInplay 接口，获取 totalCount
const updateCounts = (count) => {
    ftInplayCount.value = count;
};
const Status = (item) =>{
    updateStart.value = item.value
    console.log(updateStart.value);
    
}

</script>
<style lang='scss' scoped>
.screen{
    display: flex;
    width: 1880px;
    margin: 0 auto;
}
.screen_left{
    margin: 20px 20px 20px 0;
}
.screen_right{
    margin: 20px 0 20px 0;
}
</style>