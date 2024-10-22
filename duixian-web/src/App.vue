<template>
  <div id="app">
    <RouterView /> <!-- 主内容区域 -->

    <!-- 全局消息通知组件 -->
    <app-message />
  </div>
</template>

<script setup>
</script>

<style scoped lang="scss">
@font-face {
  font-family: 'DINAlternate';
  src: url('@/libs/iconfont/DIN-RegularAlternate-2.otf') ;
  font-weight: normal;
  font-size: normal;
}
@font-face{
  font-family: 'AlibabaPuHuiTi_2_55';
  src: url('@/libs/iconfont/AlibabaPuHuiTi_2_55_Regular.ttf') ;
  font-weight: normal;
  font-size: normal;
}
*, body {
  font-family: AlibabaPuHuiTi_2_55;
}
</style>
