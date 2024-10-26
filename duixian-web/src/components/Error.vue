<template>
    <div v-if="show" class="error">
        <div class="img-bg">
            <dic class="img1">
                <img src="@/assets/tanchuang-bg2.png" />
            </dic>
            <div class="img2">
                <img src="@/assets/tanchuang-wrong.png" />
            </div>
            <div class="img3"  @click="closeError">
                <img src="@/assets/table/icon-close-gray-default.png"/>
            </div>
        </div>
        <div class="content" >
            <span v-for="(word, index) in formattedContent" 
                  :key="index" 
                  @click="handleClick(word)" 
                  :class="{ highlight: word.isHighlighted }">
                {{ word.text }}
            </span>
        </div>
    </div>
</template>
<script setup>
const props = defineProps({
  content: String, // 父组件传递的内容
  show: Boolean // 用于显示/隐藏通知的状态
});
const router = useRouter();
// 发射事件用于关闭通知
const emit = defineEmits(['close']);

// 关闭通知
const closeError = () => {
  emit('close'); // 通知父组件关闭
};

// 处理内容，生成可点击的数组
const formattedContent = computed(() => {
  const words = props.content.split(/(登录|开通会员)/);
  return words.map(word => {
    if (word === '登录') {
      return { text: word, isHighlighted: true };
    } else if (word === '开通会员') {
      return { text: word, isHighlighted: true };
    }
    return { text: word, isHighlighted: false };
  });
});
// 处理点击事件
const handleClick = (word) => {
  if (word.text === '登录') {
    router.push('/login')
  } else if (word.text === '开通会员') {
    router.push('/product')
  }
};
</script>
<style lang='scss' scoped>
.error{
    width: 400px;
    height: 248px;
    position: fixed;
    top: 50vh;
    left: 65vh;
    border-radius: 4px;
    box-shadow: 0 4px 16px 0 rgba(0, 0, 0, 0.2);
    background-color: #fff;
    z-index: 100000;
}
.img-bg{
    position: relative;
}
.img2{
    position: absolute;
    top: 40px;
    left: 152px;
}
.img3{
    position: absolute;
    top: 0px;
    right: 0px;
    cursor: pointer;
}
.content{
    display: flex;
    justify-content: center;
    font-size: 14px;
    margin-top: 20px;
}
.highlight {
    color: #fe392b;
    font-weight: bold;
    cursor: pointer;
}
</style>