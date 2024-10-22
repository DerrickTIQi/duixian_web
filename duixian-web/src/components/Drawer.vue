<template>
    <el-drawer
    :visible.sync="isDrawerVisible"
    direction="rtl"
    size="20%"
    title="欢迎使用对线体育"
    :custom-class="customDrawerClass"
    @close="closeDrawer"
  >
    <div class="title">
        <img :src="userInfo.avatar"  class="title-img"/>
        <div class="title-text">{{ userInfo.name }}</div>
    </div>
    <div class="content">
      <div v-if="userInfo.products && userInfo.products.length > 0">
        <div
          v-for="(product, index) in userInfo.products"
          :key="index"
          class="content-item"
        >
          <!-- 判断 dcode 并设置对应的会员类型和字体颜色 -->
          <div class="lv" :class="getMemberClass(product.dcode)">
            {{ getMemberType(product.dcode) }}
          </div>
          <div class="time">到期时间: {{ product.end_at }}</div>
        </div>
      </div>
      <!-- 如果没有产品权限，显示过期提示 -->
      <div v-else class="content-item">
        <div class="expired">您的权限已过期，请联系客服</div>
      </div>
    </div>
    <!-- <div class="bottom">
        <div>更多特权请咨询客服人员</div>
    </div> -->
  </el-drawer>

</template>
<script setup>
import { ref, watch, toRef } from 'vue';

const props = defineProps({
  userInfo: Object,
  isDrawerVisible: Boolean,
});

const emit = defineEmits(['close']);

const closeDrawer = () => {
  emit('close'); // 触发父组件的关闭事件
};

// 根据 dcode 判断会员类型
const getMemberType = (dcode) => {
  if (dcode === 'oddsindex:ft:inplay:lv2') {
    return '特权会员';
  } else if (dcode === 'oddsindex:ft:inplay:lv3') {
    return '专业会员';
  }
};
// 根据 dcode 动态设置不同的字体颜色类
const getMemberClass = (dcode) => {
  if (dcode === 'oddsindex:ft:inplay:lv2') {
    return 'privileged-member'; // 特权会员 (黄色)
  } else if (dcode === 'oddsindex:ft:inplay:lv3') {
    return 'professional-member'; // 专业会员 (红色)
  }
};
</script>
<style lang='scss' scoped>
.custom-drawer {
  z-index: 9999 !important;
}
.title{
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
}
.title-img{
    width: 60px;
    height: 60px;
    border: 1px solid #dcdcdc;
    border-radius: 50%;
}
.title-text{
    margin-top: 10px;
}
.content{
    margin-top: 20px;
}
.content-item{
    width: 300px;
    height: 50px;
    border: 1px solid #e1e1e1;
    padding: 10px;
    border-radius: 3px;
}
.lv {
  font-size: 16px;
}

.time {
  font-size: 14px;
  color: #999;
  margin-top: 10px;
}
.privileged-member {
  color: #ff9000; /* 黄色 */
}

.professional-member {
  color: #e92937; /* 红色 */
}

/* 过期提示的样式 */
.expired {
  color: #ff9000;
  font-size: 16px;
  font-weight: bold;
}
.bottom{
    position: absolute;
    bottom: 0;
    right: 0;
    color: #e92937;
}

</style>
<style>
.el-drawer.rtl.open{
  height: 45%;
}
.el-drawer.rtl{
  height: 45%;
}

</style>