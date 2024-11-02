<template>
  <div id="app">
    <RouterView /> <!-- 主内容区域 -->

    <!-- 全局消息通知组件 -->
    <app-message />
  </div>
</template>

<script setup>
import { getVersion } from '@/utils/getVersion'
import { getAppPackage } from '@/utils/getAppPackage'
const userStore = useUserStore()
const activeverison = ref('')
const packageJs = ref({})
onMounted(async () => {
  activeverison.value = await getVersion()
  packageJs.value = await getAppPackage()
  userStore.savepackageJs(packageJs.value)
  document.title = `${packageJs.value.productName} V${activeverison.value}`
}
)
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
