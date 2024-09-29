<template>
  <div class="item">
    <el-select
      v-model="selectedValue"
      size="large"
      class="select"
      popper-class="type-popper"
      :placeholder="props.placeholder"
      @change="updateValue"
    >
      <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      />
    </el-select>
    <el-input v-model="minValue" type="number" class="input" placeholder="最低"></el-input>
    <el-input v-model="maxValue" type="number" class="input" placeholder="最高"></el-input>
  </div>
</template>
<script setup>
import { ref } from "vue";
const props = defineProps({
  options: Array,
  modelValue: String,
  placeholder: String,
});
const emit = defineEmits()
const selectedValue = ref(props.modelValue)
const minValue = ref(null);
const maxValue = ref(null);

watch(selectedValue, (newValue) => {
  emit('update:modelValue', newValue);
})
watch(minValue, (newValue) => {
  emit('update:minValue', newValue);
});

watch(maxValue, (newValue) => {
  emit('update:maxValue', newValue);
})
</script>
<style lang='scss' scoped>
.select {
  width: 160px;
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
  .el-select-dropdown__item {
    background: rgba(242, 242, 247, 0.5);
  }
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