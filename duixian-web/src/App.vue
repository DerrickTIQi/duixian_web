<template>
  <RouterView />
</template>

<script setup></script>

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
