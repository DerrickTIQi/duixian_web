<template>
    <div class="title">
        <img :src="imgSrc" class="img">
        <div class="quxian_h" :style="{ width: quxianHWidth + 'px' }"></div>
        <span class="quxian_text">{{quxianText}}</span>
        <span class="quxian_en">{{quxianEnText}}</span>
    </div>
</template>
<script setup>
const props = defineProps({
    quxianText: String,
    quxianEnText: String,
    type: String
})

const imgSrc = computed(() => {
  return props.type === 'big'
    ? '/src/assets/detail/title_big.png'
    : '/src/assets/detail/title_small.png';
})

const quxianHWidth = computed(() => {
  return props.type === 'big' ? 106 : 70;
})
</script>
<style lang='scss' scoped>
.title{
    position: relative;
    display: flex;
}
.img{
    display: block;
    position: relative;
    z-index: 1;
}
.quxian_h{
    position: absolute;
    background-color: rgba(229, 229, 234, 1);
    height: 4px;
    top: 36px;
    left:22px;
    z-index: 2;
}
.quxian_text{
    font-size: 18px;
    font-weight: 700;
    color: rgba(44, 44, 46, 1);
    position: absolute;
    top:16px;
    left:22px;
    z-index: 3;
}

.quxian_en{
    font-size: 12px;
    font-weight: 700;
    color: rgba(229, 229, 234, 1);
    margin: 17px 0 0 5px;
    position: relative;
    z-index: 2;

}
</style>