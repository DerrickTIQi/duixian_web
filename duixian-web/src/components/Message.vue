<template>
  <div  class="message">
    <!-- 消息通知组件 -->
    <app-notifi
      :show="showNotification"
      :match="nowHistory"
      :title="currentPlanTitle"
      @close="closeNotification"
    />

    <!-- 全局音频 -->
    <audio ref="audioElement" preload="auto">
      <source
        src="http://api.qubit-dance.com:7080/sound/dx2.mp3"
        type="audio/mp3"
      />
    </audio>
  </div>
</template>
  
<script setup>
import { ref, onMounted } from "vue";
import { historyLastTen, myPlansNew } from "@/api/screen";

const showNotification = ref(false); // 控制通知的显示
const nowHistory = ref({}); // 保存当前比赛信息
const currentPlanTitle = ref(""); // 保存当前方案标题
const audioElement = ref(null); // 引用音频元素
const initialNow = ref({}); // 保存方案的初始数据
// 计算用户角色
const userStore = useUserStore();
const userRole = computed(() => userStore.roles);

// 获取新比赛数据的函数
const fetchAllData = async () => {
  try {
    if( userRole.value !== 'tourist'){
      const res = await myPlansNew();
      const newPlanData = res;

      newPlanData.forEach(async (newPlan) => {
        const code = newPlan.plan_info.code;
        const newNow = newPlan.plan_info.now;

        // 判断是否是新方案数据
        if (!initialNow.value[code]) {
          initialNow.value[code] = { code, now: newNow };
          console.log("添加数据",initialNow.value[code])
        } else {
          const oldNew = initialNow.value[code].now;
          if (newNow > oldNew) {
            initialNow.value[code].now = newNow;

            // 获取比赛数据
            const historyRes = await historyLastTen({ code });
            currentPlanTitle.value = newPlan.plan_info.title;
            nowHistory.value = historyRes[0];
            console.log("有一场新的比赛",nowHistory.value)
            showNotification.value = true;
            playAudio();

            // 自动隐藏通知
            setTimeout(() => {
              showNotification.value = false;
            }, 10000);
          }
        }
      });
    }
    
  } catch (error) {
    console.error("数据获取失败", error);
  }
};

// 播放音频
const playAudio = () => {
  if (audioElement.value) {
    audioElement.value.play().catch((error) => {
      console.error("音频播放失败", error);
    });
  }
};

// 关闭通知
const closeNotification = () => {
  showNotification.value = false;
};

let timeoutId;

const fetchAllDataWithDelay = async () => {
  try {
    // 调用数据获取函数
    await fetchAllData(); // 等待数据获取完成

    // 在请求完成后，递归调用 setTimeout，再次启动下一个请求
    timeoutId = setTimeout(fetchAllDataWithDelay, 10000); // 10 秒后重新执行
  } catch (error) {
    // 即便出错，仍然在 10 秒后重新尝试请求
    timeoutId = setTimeout(fetchAllDataWithDelay, 10000);
  }
};


onMounted(() => {
  if(userRole.value !== 'tourist'){
    fetchAllDataWithDelay(); // 初次调用
  }
});
</script>
  
<style scoped>
.message{
  position: absolute;
  top: 70%;
  left: 35%;
}
</style>
  