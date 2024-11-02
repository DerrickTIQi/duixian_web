<template>
    <div class="navi">
        <div
            class="text"
            v-for="(item, index) in naviItem"
            :key="index"
            :class="{ active: pathname === getPath(index) }" 
            @click="navigateTo(index)"
        >
            
                <span>{{ item }}</span>
            
        </div>
    </div>
</template>
<script setup>
const router = useRouter()
const route = useRoute()
const naviItem = computed(() => {
  const allItems = ["过滤器", "推荐","关注", "保存"];
  return  allItems;
});
// 根据索引返回对应的路径
const getPath = (index) => {
  const paths = ['/pre/filter', '/pre/recommend', '/pre/follow', '/pre/save'];
  return paths[index] || '/';
};

// 跳转到指定路径并更新 pathname
const navigateTo = (index) => {
  const path = getPath(index);
  router.push(path);
  pathname.value = path; // 更新 pathname
};
const pathname = ref(route.path)
</script>
<style lang='scss' scoped>
.navi{
    display: flex;
    padding: 16px 16px 0 16px;
    cursor: pointer;
    font-size: 14px;
}
a{
    text-decoration: none; //去下划线
    color: #000;
}
.text {
  padding: 6px 12px;
}
.text.active {
  background-color: #e92937; // 选中时背景颜色为红色
  color: white !important;  // 选中时字体颜色为白色
}
.text.active a {
    color: white !important; /* 选中时字体颜色为白色 */
}
</style>