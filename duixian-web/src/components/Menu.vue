<template>
    <div class="menu">
      <el-menu :default-active="activeMenu" mode="horizontal"  :ellipsis="false">
        <app-menu-item
        v-for="item in menus"
        :key="item.value"
        :menu="item"
        :active="item.path === activeMenu"
        />
      </el-menu>
    </div>
</template>
<script setup>
// const activeMenu = computed(() => {
//   if (location.hash) {
//     return location.hash
//   }
// })
const activeMenu = ref(location.hash)
// const selectMenuItem = path =>{}
const menus = [
  { label: '首页', path: '#/' },
  { label: '赛事', path: '#/match/live'},
  { label: '筛选推单', path: '#/screen/jinxuan', },
  { label: '会员价格', path: '#/product', },
  { label: 'App下载', path: '#/app', },
]

// 监听浏览器hash变化
onMounted(() => {
  window.addEventListener("hashchange", () => {
    activeMenu.value = location.hash;
  });
});
</script>
<style lang='scss' scoped>
.menu {
  flex: 1;
  display: flex;
  background-color: #fff;
}
:deep(.el-menu){
    height: 64px;
    background-color: #fff;
}
:deep(.el-menu-item){
  padding: 0;
  font-size: 14px;
  color: #000;
}
</style>