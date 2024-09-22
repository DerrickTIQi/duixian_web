<template>
    <div class="menu">
      <el-menu :default-active="activeMenu" mode="horizontal"  :ellipsis="false">
        <app-menu-item
        v-for="item in menus"
        :key="item.value"
        :menu="item"
        :active="item.path == activeMenu"
        @select="selectMenuItem"
        />
      </el-menu>
    </div>
</template>
<script setup>
const route = useRoute()
const router = useRouter()
const activeMenu = computed(() => {
  console.log(route)
  if (route.meta.rootPath) {
    return route.meta.rootPath
  } else {
    return route.path
  }
})
const selectMenuItem = path => router.push(path)
const menus = [
  { label: '首页', path: '/Home' },
  { label: '赛事', path: '/Match'},
  { label: '筛选推单', path: '/Screen', },
  { label: '数据服务', path: '/Service', },
  { label: '会员价格', path: '/Product', },
  { label: 'App下载', path: '/Download', },
  { label: '登录', path: '/Login', },
]

</script>
<style lang='scss' scoped>
.menu {
  flex: 1;
  display: flex;
  background-color: #f5f5f5;
}
:deep(.el-menu){
    height: 70px;
    background-color: #f5f5f5;
    margin-right: 60px;
}
:deep(.el-menu-item){
  padding: 0;
  font-size: 16px;
}
</style>