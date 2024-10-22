<template>
    <div>
        <div class="table">
            <MatchTable v-if="tableData" :data="tableData" :activeIndex="activeIndex" :flag="flag"/>
        </div>
    </div>
</template>
<script setup>
import { favorEarly } from '../../../api/match';
import MatchTable from './MatchTable.vue';
const props = defineProps({
  activeIndex: Int32Array
});
const tableData = ref([])
const flag = 'course'
let intervalId = null;

// const fetchTableData = () => {
//     favorRealy({time: Date.now()}).then((res) => {
//         tableData.value = res.list;
//         favorUpRealy({time: Date.now()})
//     });
// };
const fetchTableData = () => {
    favorEarly().then((res) => {
        tableData.value = res
    })
};

onMounted(() => {
    // 组件挂载时调用一次接口
    fetchTableData();

    // 每10秒调用一次接口
    intervalId = setInterval(() => {
        fetchTableData();
    }, 10000);
});

onBeforeUnmount(() => {
    // 组件卸载时清除定时器
    clearInterval(intervalId);
})
</script>
<style lang='scss' scoped>

</style>