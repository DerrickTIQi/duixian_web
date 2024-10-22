import { defineStore } from 'pinia';
import { historyLastTen, myPlansNew } from '../api/screen';  

export const useNotificationStore = defineStore('notification', {
  state: () => ({
    showNotification: false,      // 控制通知的显示
    currentPlanTitle: '',         // 当前方案的标题
    nowHistory: {},               // 当前比赛数据
    initialNow: {},               // 保存比赛数据的状态
    audioElement: null,           // 音频元素
  }),
  actions: {
    async fetchAllData() {
      try {
        const res = await myPlansNew();
        const newPlanData = res;

        newPlanData.forEach(async (newPlan) => {
          const code = newPlan.plan_info.code;
          const newNow = newPlan.plan_info.now;

          if (!this.initialNow[code]) {
            this.initialNow[code] = { code, now: newNow };
          } else {
            const oldNew = this.initialNow[code].now;
            if (newNow > oldNew) {
              this.initialNow[code].now = newNow;

              // 获取比赛数据
              const historyRes = await historyLastTen({ code });
              this.currentPlanTitle = newPlan.plan_info.title;
              this.nowHistory = historyRes[0];

              // 触发通知和音频
              this.showNotification = true;
              this.playAudio();

              // 设置定时隐藏通知
              setTimeout(() => {
                this.shshowNotificationow = false;
              }, 3000);
            }
          }
        });
      } catch (error) {
        console.error('数据获取失败', error);
      }
    },
    // 播放音频
    playAudio() {
      if (this.audioElement) {
        this.audioElement.play().catch((error) => {
          console.error('音频播放失败', error);
        });
      }
    },
    setAudioElement(audioRef) {
      this.audioElement = audioRef;
    },
    // 启动定时器
    startTimer() {
      setInterval(() => {
        this.fetchAllData();
      }, 5000); // 每 5 秒获取一次数据
    },
  },
});