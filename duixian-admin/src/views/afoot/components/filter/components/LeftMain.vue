<template>
    <div class="left-main">
        <el-collapse v-model="localActiveNames" @change="handleChange">
            <el-collapse-item :title="data.tip" name="1">
                <div class="xian"></div>
                <div class="item" v-for="(item, index) in data.filterList" :key="index">
                    <el-select
                    v-model="selectedValues[index]"
                    size="large"
                    class="select"
                    :style="{width: getdisabled(item.disabledinput)}"
                    popper-class="type-popper"
                    :placeholder="getPlaceholderText(item)"
                    @change="() => emitData(index)"
                    >
                    <el-option
                        v-for="item in item.select"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                    />
                    </el-select>
                    <div class="left-input" v-if="item.disabledinput === 'false'">
                        <el-input v-model="item.min" type="number" class="input" placeholder="最低" @input="() => emitData(index)"/>
                        -
                        <el-input v-model="item.max" type="number" class="input" placeholder="最高" @input="() => emitData(index)"/>
                    </div>
                </div>
            </el-collapse-item>
        </el-collapse>
    </div>
</template>
<script setup>
const props = defineProps({
  data: Object,
  status: Boolean,
  activeNames: Array
});
// console.log(props.data.filterList);

const emit = defineEmits(['update:data','reset','updateActiveNames'])
const selectedValues = ref([]);

// 使用 watchEffect 监控 data 的变化，并初始化 selectedValues
watchEffect(() => {
  if (props.data && props.data.filterList) {
    selectedValues.value = props.data.filterList.map(() => null);
  }
});
// console.log(selectedValues.value);

// const minValues = ref(props.data.filterList.map(item => item.min));
// const maxValues = ref(props.data.filterList.map(item => item.max));
// 计算 placeholder 文本的函数
const getPlaceholderText = (item) => {
  const foundItem = item.select.find(option => option.value === item.selectValue);
  return foundItem ? foundItem.label : item.title;
};

// 监听 props.data.filterList 中每个项目的 selectValue 变化
watch(() => props.data.filterList, (newFilterList) => {
  newFilterList.forEach((item, index) => {
    const foundItem = item.select.find(option => option.value === item.selectValue);
    selectedValues.value[index] = foundItem ? item.selectValue : null;
  });
}, { deep: true });

// 打包数据并 emit 给父组件
const emitData = (index) => {
  const newFilterList = props.data.filterList.map((item, i) => ({
    ...item,
    selectValue: selectedValues.value[i] || 1,
    min: item.min,
    max: item.max
  }));
  
  emit('update:data', {
    ...props.data,
    filterList: newFilterList
  });
};

// 清空数据并重置
const resetData = () => {
  selectedValues.value = props.data.filterList.map(() => 1); // 恢复 selectValue
  props.data.filterList.map(item => {
    item.min = ''; // 清空最低值
    item.max = ''; // 清空最高值
  });
  emit('reset'); // 通知父组件
};

// 监听清除事件
watch(() => props.data, (newData) => {
  if (newData) {
    resetData();
  }
});

function getdisabled(disabledinput){
  if(disabledinput === 'false') return '160px'
  if(disabledinput === 'true') return '320px'
}

// const activeNames = ref([]);
const localActiveNames = ref([...props.activeNames]); // 初始化本地折叠状态
// 监听折叠状态的变化
watch(() => props.status, (newStatus) => {
  localActiveNames.value = newStatus ? ['1'] : [];
});

watch(() => props.activeNames, (newActiveNames) => {
  localActiveNames.value = newActiveNames;
});

// 处理折叠状态变化
// const handleChange = (newActiveNames) => {
//   localActiveNames.value = newActiveNames;
//   emit('updateActiveNames', newActiveNames); // 通知父组件更新折叠状态
// };
// 监听 status 的变化
// watch(() => props.status, (newStatus) => {
//   if (newStatus) {
//     // 展开所有折叠项
//     activeNames.value = ['1']; // 每个折叠项的 name 为 1 
//   } else {
//     // 关闭所有折叠项
//     activeNames.value = [];
//   }
// });

// // 处理折叠状态变化
// const handleChange = (newActiveNames) => {
//   activeNames.value = newActiveNames;
// };
</script>
<style lang='scss' scoped>
.xian{
    width: 330px;
    height: 1px;
    background-color: #ebebeb;
}
.el-collapse-item__content{
  width: 330px;
}
.el-collapse-item__header{
  width: 330px;
}
.select {
  margin-left: 5px;
  border-radius: 4px;
  height: 28px;
}
.item {
  display: flex;
  margin: 10px 0;
}
.input {
  height: 28px;
  width: 50px;
}
.type-popper {
  background: rgba(242, 242, 247, 0.5);
  // .el-select-dropdown__item {
  //   background: rgba(242, 242, 247, 0.5);
  // }
}
.left-input{
    margin-left: auto;
    width: 120px;
    height: 28px;
    border: solid 1px #ebebeb;
}
.el-collapse-item__content{
  padding-bottom: 0
}
.el-select-dropdown .el-select-dropdown__item.is-selected{
  color: #e92937;
}
.el-collapse{
  border-top: none;
  border-bottom: none
}
:deep(.el-select__placeholder,.el-input__placeholder){
  font-size: 16px;
  color: #606266;
}
//去掉右侧上下按钮
:deep(
    .input input::-webkit-inner-spin-button,
    .input input::-webkit-outer-spin-button
  ) {
  -webkit-appearance: none;
  margin: 0;
}
:deep(.left-input .el-input__wrapper) {
  border: none !important;
  background: #fff;
  display: flex;
}
:deep(.left-input .el-input__wrapper.is-focus){
    box-shadow: none;
}
:deep(.select .el-select__wrapper) {
    border: none !important;
}
// :deep(.select .el-select__wrapper .is-hovering:not(.is-focused)) {
//     box-shadow: none !important;
// }
// :deep(.select .el-select){
//     display: flex;
// }
:deep(.select .el-select__placeholder){
    font-size: 14px !important;
    color: #000 ;
    opacity: 0.7;
}
:deep( .el-select--large .el-select__wrapper){
    padding: 0 !important;
    min-height: 28px
}
:deep(.el-select__wrapper.is-focused, .el-input__wrapper.is-focused) {
  --el-color-primary: normal;
}
:deep(.el-input__inner) {
  --el-color-primary: normal;
}
</style>