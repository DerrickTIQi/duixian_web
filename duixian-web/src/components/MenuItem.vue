<template>
    <el-menu-item class="menu-item" :class="{'menu-item--active': active,}" >
      <a :href="menu.path" >
        <span>{{ menu.label }}</span>
        <div class="underline" />
      </a>
    </el-menu-item>
</template>
<script setup>
const props = defineProps({
  menu: Object,
  active: Boolean,
})
</script>
<style lang='scss' scoped>
.menu-item{
  height: 64px;
  padding: 0 16px;
  background-color: transparent;
}
a{
    text-decoration: none; //去下划线
}
.menu-item .underline {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background-color: #e92937;
  opacity: 0;  // 默认不可见
  transition: opacity 0.3s, transform 0.3s;
  transform: scaleX(0);  // 默认缩放至不可见
}

.menu-item:hover .underline {
  opacity: 1;  // 悬停时出现红色横线
  transform: scaleX(1);  // 横线扩展到整个宽度
}
.menu-item:hover{
  --el-menu-hover-bg-color: #f5f5f5;
  --el-menu-hover-text-color: #000;
}

.menu-item--active span {
  color: #e92937;  // 选中时字体颜色变为红色
  --el-color-primary-light-9: #f5f5f5;
}

.menu-item--active .underline {
  opacity: 1;  // 选中时横线保持显示
  transform: scaleX(1);  // 横线保持扩展状态
}
</style>

<style>
.menu-item--active{
  background: #f8f9fa !important;
}
</style>