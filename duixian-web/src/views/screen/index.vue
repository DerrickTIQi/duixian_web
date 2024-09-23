<template>
    <div class="screen">
        <div class="screen_left">
            <ScreenLeft />
        </div>
        <div class="screen_right">
            <ScreenRight />
        </div>  
    </div>
</template>
<script setup>
import ScreenLeft from './components/ScreenLeft.vue';
import ScreenRight from './components/ScreenRight.vue';
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