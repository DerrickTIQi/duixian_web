<template>
    <div class="title">
        <span class="quxian_text">{{quxianText}}</span>
    </div>
</template>
<script setup>
const props = defineProps({
    quxianText: String,
})

const quxianHWidth = computed(() => {
  return props.type === 'big' ? 106 : 70;
})
</script>
<style lang='scss' scoped>
.quxian_text{
    font-size: 18px;
    font-weight: bold;
    color: #000;
}

</style>