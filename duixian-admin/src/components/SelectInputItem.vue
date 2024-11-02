<template>
  <div class="item">
    <el-select
      v-model="selectedValue"
      size="large"
      class="select"
      :style="{width: getdisabled(props.data.disabledinput)}"
      popper-class="type-popper"
      :placeholder="placeholderText"
      @change="emitData"
    >
      <el-option
        v-for="item in props.data.select"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      />
    </el-select>
    <div v-if="props.data.disabledinput === 'false'">
      <el-input v-model="minValue" type="number" class="input" placeholder="最低" @input="emitData"/>
      <el-input v-model="maxValue" type="number" class="input" placeholder="最高" @input="emitData"/>
    </div>
  </div>
</template>
<script setup>
import { ref } from "vue";
const props = defineProps({
  data: Object
});
// console.log(props.data)
const emit = defineEmits()
// 定义选项值和输入框的值
// 初始化选中的值，检查是否有与 selectValue 匹配的选项
const selectedValue = ref(null);

// 根据 selectValue 和 select 列表计算 placeholder 文本
const placeholderText = computed(() => {
  const foundItem = props.data.select.find(item => item.value === props.data.selectValue);
  return foundItem ? foundItem.label : props.data.title;
});

// 当 props.data.selectValue 变化时，更新 selectedValue
watch(() => props.data.selectValue, (newValue) => {
  const foundItem = props.data.select.find(item => item.value === newValue);
  selectedValue.value = foundItem ? newValue : null;
});
const minValue = ref(props.data.min);
const maxValue = ref(props.data.max);



// 定义一个函数，用于将所有数据打包并 emit 给父组件
const emitData = () => {
  let newSelectValue = selectedValue.value;

  // 如果没有选择，检查 placeholderText 是否有对应的选项
  if (!newSelectValue) {
    const foundItem = props.data.select.find(item => item.label === placeholderText.value);
    newSelectValue = foundItem ? (foundItem.value === 0 ? 1 : foundItem.value) : 1; // 如果没有找到则使用1,如果找到的为0，也使用1
  }
  emit('update:data', {
    ...props.data,
    selectValue: newSelectValue,
    min: minValue.value,
    max: maxValue.value
  });
};

// 监听 props.data.min 和 props.data.max 的变化，更新子组件的 minValue 和 maxValue
watch(() => props.data.min, (newValue) => {
  minValue.value = newValue;
});

watch(() => props.data.max, (newValue) => {
  maxValue.value = newValue;
});

function getdisabled(disabledinput){
  if(disabledinput === 'false') return '160px'
  if(disabledinput === 'true') return '320px'
}
</script>
<style lang='scss' scoped>
.select {
  border: solid 1px #cccccc;
  margin-left: 5px;
  border-radius: 4px;
}
.item {
  display: flex;
  margin: 10px 0;
}
.input {
  height: 40px;
  width: 75px;
  margin: 0 5px;
  border-bottom: solid 1px #cccccc;
}
.type-popper {
  background: rgba(242, 242, 247, 0.5);
  // .el-select-dropdown__item {
  //   background: rgba(242, 242, 247, 0.5);
  // }
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
:deep(.el-input__wrapper) {
  background-color: rgba(242, 242, 247, 0.5);
  box-shadow: none;
}
:deep(.el-select__wrapper) {
  background-color: rgba(242, 242, 247, 0.5);
}
:deep(.el-select__wrapper.is-focused, .el-input__wrapper.is-focused) {
  --el-color-primary: normal;
}
:deep(.el-input__inner) {
  --el-color-primary: normal;
}



</style>