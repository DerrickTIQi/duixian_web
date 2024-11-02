<template>
    <div class="filter_handicap">
        <div class="filter_handicap_tables">
            <el-scrollbar class="hand-scroll">
                <!-- 胜平负 -->
                <WinDrawLose />
                <!--大小球  -->
                <SizeBalls />
                <!-- 让球 -->
                <LetBallGo />
                <!-- 角球 -->
                <CornerKick />
            </el-scrollbar>
        </div>
    </div>
</template>
<script setup>
import WinDrawLose from './WinDrawLose.vue';
import SizeBalls from './SizeBalls.vue';
import LetBallGo from './LetBallGo.vue';
import CornerKick from './CornerKick.vue';
</script>
<style lang='scss' scoped>
.hand-scroll{
    height: 100%;
}
.mid{
    width: 406px;
    height: 143px;
    margin-left: 16px;
    border: solid 1px #ebebeb;
}
.filter_handicap {
    margin-left: 16px;
    width: calc(50% - 280px);
    height: calc(100vh - 175px);
    overflow: hidden;
}
.filter_handicap_tables{
    height: 100%;
}
</style>