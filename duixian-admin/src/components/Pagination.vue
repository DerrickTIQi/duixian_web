<template>
    <div class="pag">
      <el-pagination
        v-model:current-page="currentPage"
        v-model:page-size="pageSize"
        :size="size"
        :disabled="disabled"
        :background="background"
        layout="total, prev, pager, next"
        :total="total"
        @current-change="onPageChange" 
      />
      <el-select v-model="pageSize" @change="onPageSizeChange" class="select-style">
        <el-option v-for="size in pageSizes" :key="size.value" :label="size.label" :value="size.value" />
      </el-select>
    </div>
</template>
<script setup>
const props = defineProps({
    total: Number,
    currentPage: Number,
    pageSize: Number,
})
const emit = defineEmits(['update:currentPage', 'update:pageSize']);
const currentPage = ref(1); // 当前页数
const pageSize = ref(20); // 每页显示条目数
const size = ref('small'); // 组件大小
const disabled = ref(false); // 是否禁用
const background = ref(false); // 是否背景色
// 自定义分页大小选项
const pageSizes = [
  // { label: '每页10条', value: 10 },
  { label: '每页20条', value: 20 },
  { label: '每页40条', value: 40 },
  { label: '每页60条', value: 60 },
  // { label: '每页50条', value: 50 }
];

const onPageChange = (page) => {
  emit('update:currentPage', page); // 发射当前页
};

const onPageSizeChange = (size) => {
  emit('update:pageSize', size); // 发射每页条目数
  emit('update:currentPage', 1); // 重置为第一页
};
</script>
<style lang='scss' scoped>
.pag{
  display: flex;
  justify-content: center;
  margin-top: 16px;
}

/* 设置变量 */
.el-pagination {
  --el-pagination-font-size-small: 14px;
}
.el-select__placeholder{
  --el-menu-active-color:#e92937
}

:deep(.el-pager li.is-active){
  width: 24px;
  height: 28px;
  background-color: #f8f9fa;
  color: #e92937;
}
.el-select-dropdown .el-select-dropdown__item.is-selected{
  color: #e92937;
}
:deep(.el-pager li:hover){
  color: #e92937;
}
:deep(.el-select__wrapper){
  background-color: transparent !important
}
:deep(.el-select__wrapper.is-hovering:not(.is-focused)){
  box-shadow:none
}
:deep(.el-select__wrapper.is-focused){
  box-shadow:none
}
.el-select{
  font-size: 14px;
  width: 102px;
}
</style>
<style>
.select-style .el-select-dropdown .el-select-dropdown__item.is-selected{
  color: #e92937;
}
</style>