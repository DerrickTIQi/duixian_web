<template>
  <div  class="message">
    <!-- 消息通知组件 -->
    <!-- <app-notifi
      :show="showNotification"
      :match="nowHistory"
      :title="currentPlanTitle"
      @close="closeNotification"
    /> -->
    <!-- 消息通知 -->
    <div v-if="showNotification" class="notifi">
      <div class="img-bg">
        <img src="@/assets/tanchuang-bg.png" />
        <div class="title">
          <div class="left">
            <div class="left_one">{{ currentPlanTitle }}</div>
            <div class="left_two">
              当前方案有【<span style="color: #e92937;">1</span>个新比赛】
            </div>
          </div>
          <div class="right" @click="closeNotification">
            <img src="@/assets/table/icon-close-gray-default.png" />
          </div>
        </div>
      </div>
      <div class="content">
        <div class="num">1</div>
        <div class="match">
          <div class="leagues">{{ nowHistory.NCN?.LEAGUE }}</div> 
          <span>【</span>
          <div class="hteam">{{ nowHistory.NCN?.TEAM_H }}</div>
          <img src="@/assets/img-vs-s.png" style="margin: 0 3px;" />
          <div class="ateam">{{ nowHistory.NCN?.TEAM_C }}</div>
          <span>】</span> 
        </div>
      </div>
    </div>

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
          }else{
            initialNow.value[code].now = newNow;
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
  position: fixed;
  top: 50vh;
  left: 52vh;
  z-index: 1000000
}
.notifi {
  width: 600px;
  height: 180px;
  border-radius: 4px;
  box-shadow: 0 4px 16px 0 rgba(0, 0, 0, 0.2);
  background-color: #fff;
}
.img-bg {
  position: relative;
}
.title {
  position: absolute;
  top: 24px;
  left: 188px;
}
.left {
  display: flex;
  flex-direction: column;
  text-align: center;
}
.left_one {
  font-size: 18px;
  font-weight: bold;
}
.left_two {
  margin-top: 8px;
  width: 200px;
  height: 24px;
  border-radius: 16px;
  background-image: linear-gradient(to right, #d0eeff, #fcd4d0);
  font-size: 14px;
  padding-top: 2px;
}
.right {
  position: absolute;
  top: -21px;
  right: -190px;
  cursor: pointer;
}
.content {
  display: flex;
  justify-content: center;
  position: relative;
  margin-top: 16px;
}
.num {
  position: absolute;
  left: 40px;
}
.match {
  display: flex;
  justify-content: center;
}
.leagues{
  width: 130px;
  display: block;
  overflow: hidden; /* 隐藏溢出的内容 */
  white-space: nowrap; /* 不换行 */
  text-overflow: ellipsis;
}
.hteam {
  /* width: 140px; */
  color: #e92937;
  display: block;
  overflow: hidden; /* 隐藏溢出的内容 */
  white-space: nowrap; /* 不换行 */
  text-overflow: ellipsis;
}
.ateam {
  /* width: 140px; */
  color: #0071ff;
  display: block;
  overflow: hidden; /* 隐藏溢出的内容 */
  white-space: nowrap; /* 不换行 */
  text-overflow: ellipsis;
}
</style>
  