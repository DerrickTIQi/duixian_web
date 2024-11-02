<template>
    <div class="menu">
      <div class="menu-item" 
         v-for="item in menus" 
         :key="item.value"
         :class="{ 'menu-item--active': isActiveMenu(item.path) }"
         @click.prevent="selectMenuItem(item.path)">
          <img :src="isActiveMenu(item.path) ? item.pg1 : item.pg" class="pg"/>
          <span class="item-text">{{ item.label }}</span>
      </div>
    </div>
</template>
<script setup>
import saishi from '@/assets/icon-saishi.png'
import saishi2 from '@/assets/icon-saishi-2.png'
import filter from '@/assets/icon-filter.png'
import filter2 from '@/assets/icon-filter-2.png'
import filtersz from '@/assets/icon-filter-sz.png'
import filtersz2 from '@/assets/icon-filter-sz-2.png'
const route = useRoute()
const router = useRouter()

// const activeMenu = computed(() => {
//   if (route.meta.rootPath) {
//     return route.meta.rootPath
//   } else {
//     return route.path
//   }
// })
const isActiveMenu = (menuPath) => {
  if (menuPath === '/match') {
    return route.path.startsWith('/match'); // 包含所有与赛事相关的路径
  }else if (menuPath === '/afoot') {
    return route.path.startsWith('/afoot'); 
  }else if (menuPath === '/pre') {
    return route.path.startsWith('/pre'); 
  }
  return route.path === menuPath; // 精确匹配其他路径
};
const selectMenuItem = (path) => {
  // 跳转到对应的路径
  router.push(path)
}

const menus = [
  { label: '赛事', path: '/match' ,pg: saishi, pg1: saishi2},
  { label: '赛前过滤器', path: '/pre' ,pg: filter, pg1: filter2},
  { label: '赛中过滤器', path: '/afoot' ,pg: filtersz, pg1: filtersz2},
]

</script>
<style lang='scss' scoped>
.menu {
  flex: 1;
  display: flex;
  background-color: #fff;
}
.menu-item{
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}
.link{
  display: flex;
}
.pg{
  margin-right: 8px;
}
.item-text{
  margin-right: 40px;
}
.menu-item--active{
  color: #e92937;
}
</style>