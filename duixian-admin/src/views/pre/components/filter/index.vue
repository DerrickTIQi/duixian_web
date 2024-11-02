<template>
    <div class="filter" v-loading="fullscreenLoading">
        <FilterLeft />
        <FilterTable v-if="matchData" :data="matchData" :total="matchTotal"/>
        <FilteHandicap />
    </div>
</template>
<script setup>
import FilterLeft from './components/FilterLeft.vue';
import FilterTable from './components/FilterTable.vue';
import FilteHandicap from './components/FilteHandicap.vue';
const mainData = ref([])  //方案数据
const matchData = ref([])   //当前筛选条件下的比赛数据
const matchTotal = ref([]) //当前筛选条件下的比赛条数
</script>
<style lang='scss' scoped>
.filter{
    height: calc(100vh - 160px);
    display: flex;
}
</style>