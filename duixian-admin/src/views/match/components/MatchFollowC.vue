<template>
    <div>
        <div class="table">
            <MatchTable v-if="tableData" 
            :data="paginatedData" 
            :total="totalMatch" 
            :current-page="currentPage"
            :page-size="pageSize"
            @update:currentPage="onPageChange"
            @update:pageSize="onPageSizeChange"
            :height="height"/>
        </div>
    </div>
</template>
<script setup>
import { favorEarly } from '../../../api/match';
import MatchTable from './MatchTable.vue';
const height = 'calc(100vh - 178px)'
const tableData = ref([])
let intervalId = null;
const currentPage = ref(1);
const pageSize = ref(20);
const totalMatch = ref(0);
// 计算分页数据
const paginatedData = computed(() => {
  const start = (currentPage.value - 1) * pageSize.value;
  const end = start + pageSize.value;
  return tableData.value.slice(start, end);
});
const onPageChange = (page) => {
  currentPage.value = page; // 更新当前页
};

const onPageSizeChange = (size) => {
  pageSize.value = size; // 更新每页条目数
  currentPage.value = 1; // 重置为第一页
};
// const fetchTableData = () => {
//     favorRealy({time: Date.now()}).then((res) => {
//         tableData.value = res.list;
//         favorUpRealy({time: Date.now()})
//     });
// };
const body = {
  data: "",
  lids: [],
  time: Date.now(),
  uid: localStorage.uid
};
const fetchTableData = () => {
    favorEarly(body).then((res) => {
        tableData.value = res
        totalMatch.value = res.length
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