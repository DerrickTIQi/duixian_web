<template>
  <div class="item">
    <el-select v-model="selectedValue" size="large" class="select" @change="updateValue">
      <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      />
    </el-select>
  </div>
</template>
<script setup>
const props = defineProps({
    options:Array,
    modelValue:String,
})
const emit = defineEmits()
const selectedValue = ref(props.modelValue)

watch(selectedValue, (newValue) => {
  emit('update:modelValue', newValue);
})
</script>
<style lang='scss' scoped>
.select{
    width: 330px;
    border: solid 1px #cccccc;
    margin-left: 5px;
}
.item {
  display: flex;
  margin-top: 10px;
}
:deep(.el-select__placeholder,.el-input__placeholder){
  font-size: 16px;
  color: #606266;
}
:deep(.el-select__wrapper){
    background-color: rgba(242, 242, 247, 0.5);
}
:deep(.el-select__wrapper.is-focused){
  --el-color-primary: normal
}
</style>