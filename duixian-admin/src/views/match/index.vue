<template>
  <app-layout >
    <div class="match"  ref="scrollContainer">
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
        <div class="feature" ref="featureContainer">
          <div class="audio" @click="toggleSoundMenu" :class="{ active: isSoundMenuVisible }">
            <img
              :src="isSoundMenuVisible ? soundSelected : soundDefault"
              style="margin-right: 4px"
            />
            <span :style="{ color: isSoundMenuVisible ? 'red' : 'inherit' }">{{ selectedSound }}</span>
            <img :src="isSoundMenuVisible ? downSelected : downDefault" />
          </div>
          <ul v-if="isSoundMenuVisible" class="dropdown-menu1" @click.stop>
            <li
              v-for="sound in sounds"
              :key="sound.value"
              @click="selectSound(sound)"
              :class="{ active: selectedSound === sound.label }"
              class="dropdown-item"
            >
              {{ sound.label }}
            </li>
          </ul>
          <div class="setting" @click="toggleSettingMenu" :class="{ active: isSettingMenuVisible }">
            <img
              :src="isSettingMenuVisible ? settingSelected : settingDefault"
              style="margin-right: 4px"
            />
            <span :style="{ color: isSettingMenuVisible ? 'red' : 'inherit' }">设置</span>
          </div>
          <ul v-if="isSettingMenuVisible" class="dropdown-menu2" @click.stop>
            <li>
              <label class="custom-checkbox">
                <input type="checkbox" v-model="settingOption1" @change="toggleOption1"/>
                <span class="checkbox-style"></span>
                只提示关注
              </label>
            </li>
            <li>
              <label class="custom-checkbox">
                <input type="checkbox" v-model="settingOption2"  @change="toggleOption2"/>
                <span class="checkbox-style"></span>
                提示窗
              </label>
            </li>
          </ul>
          <audio ref="audioElement" controls style="display: none;"></audio>
        </div>
      </div>
      <div class="table">
        <MatchTable v-if="pathname === '/match/live'" 
        :data="paginatedData" 
        :total="totalMatch" 
        :current-page="currentPage"
        :page-size="pageSize"
        @update:currentPage="onPageChange"
        @update:pageSize="onPageSizeChange"
        :height="height"/>
        <MatchCourse v-if="pathname === '/match/early'" />
        <MatchResult v-if="pathname === '/match/record'" />
        <MatchFollow v-if="pathname === '/match/followlive'" />
        <MatchFollowC v-if="pathname === '/match/followearly'" />
      </div>
      
      <app-error :show="showError" :content="errorMessage" @close="showError = !showError"/>
      <div v-if="(userRole === 'tourist' || userRole === 'normal') && (route.path.split('/')[2] === 'live')" ref="triggerPoint" class="trigger-point"></div> <!-- 空白触发点 -->
    </div>
    
  </app-layout>
</template>
<script setup>
import downSelected from '@/assets/table/down-selected.png'
import downDefault from '@/assets/table/down-default.png'
import soundSelected from '@/assets/table/sound-selected.png'
import soundDefault from '@/assets/table/sound-default.png'
import settingSelected from '@/assets/table/setting-selected.png'
import settingDefault from '@/assets/table/setting-default.png'
import ewmFloatHover from '@/assets/home/ewm-float-hover.png'
import ewmFloat from '@/assets/home/ewm-float.png'
import footballRed from '@/assets/table/img-football-red.png'
import footballBlue from '@/assets/table/img-football-blue.png'
import MatchTable from "./components/MatchTable.vue";
import MatchCourse from "./components/MatchCourse.vue";
import MatchResult from "./components/MatchResult.vue";
import MatchFollow from "./components/MatchFollow.vue";
import MatchFollowC from "./components/MatchFollowC.vue";
import { detailLive, listUpLive } from "../../api/match";
import { ElNotification } from "element-plus";
const height = 'calc(100vh - 178px)'
const route = useRoute();
const router = useRouter();
const naviItem = computed(() => {
  const allItems = ["进行中", "赛程", "赛果", "关注(进行中)", "关注(赛程)"];
  return userRole.value.includes('tourist') ? allItems.slice(0, 3) : allItems;
});
// const activeIndex = ref(0);
// const activeIndex = ref(route.query.activeIndex ? parseInt(route.query.activeIndex) : 0); // 默认值为 0 或传递的索引

// 根据索引返回对应的路径
const getPath = (index) => {
  const paths = ['/match/live', '/match/early', '/match/record', '/match/followlive', '/match/followearly'];
  return paths[index] || '/';
};
// 跳转到指定路径并更新 pathname
const navigateTo = (index) => {
  const path = getPath(index);
  router.push(path);
  pathname.value = path; // 更新 pathname
};
const pathname = ref(route.path)
const tableData = ref([]);
const selectedSound = ref("默认");
const sounds = [
  { label: "静音", value: "" },
  { label: "默认", value: "http://api.qubit-dance.com:7080/sound/dx1.mp3" },
  { label: "声音1", value: "http://api.qubit-dance.com:7080/sound/dx2.mp3" },
  { label: "声音2", value: "http://api.qubit-dance.com:7080/sound/dx3.mp3" },
  { label: "声音3", value: "http://api.qubit-dance.com:7080/sound/dx4.mp3" },
  { label: "声音4", value: "http://api.qubit-dance.com:7080/sound/dx5.mp3" },
];
const showError = ref(false); // 控制通知的显示
const errorMessage = ref(''); // 存储错误提示的内容
const settingOption1 = ref(false);
const settingOption2 = ref(true);
const audioElement = ref(null);
const isSoundMenuVisible = ref(false);
const isSettingMenuVisible = ref(false);
const currentPage = ref(1);
const pageSize = ref(20);
const totalMatch = ref(0);
// 计算用户角色
const userStore = useUserStore();
const userRole = computed(() => userStore.roles);

const initialScores = ref({});
// 当用户更改设置时，保存到 localStorage
const saveToLocalStorage = () => {
  localStorage.setItem('settingOption1', JSON.stringify(settingOption1.value));
  localStorage.setItem('settingOption2', JSON.stringify(settingOption2.value));
};
const toggleOption1 = () => {
  saveToLocalStorage();
};

const toggleOption2 = () => {
  saveToLocalStorage();
};
// 点击切换声音菜单
const toggleSoundMenu = (event) => {
  // 阻止事件冒泡，防止父级的点击事件处理
  event.stopPropagation();

  // 切换声音菜单的显示状态
  isSoundMenuVisible.value = !isSoundMenuVisible.value;

  // 当声音菜单打开时，关闭设置菜单
  if (isSoundMenuVisible.value) {
    isSettingMenuVisible.value = false;
  }
};

// 点击切换设置菜单
const toggleSettingMenu = (event) => {
  // 阻止事件冒泡，防止父级的点击事件处理
  event.stopPropagation();

  // 切换设置菜单的显示状态
  isSettingMenuVisible.value = !isSettingMenuVisible.value;

  // 当设置菜单打开时，关闭声音菜单
  if (isSettingMenuVisible.value) {
    isSoundMenuVisible.value = false;
  }
};
// 监听点击外部区域来关闭菜单
const featureContainer = ref(null);
const closeMenus = (event) => {
  // 如果点击的地方不是菜单本身，则关闭所有菜单
  if (!featureContainer.value.contains(event.target)) {
    isSoundMenuVisible.value = false;
    isSettingMenuVisible.value = false;
  }
};
const selectSound = (sound) => {
  selectedSound.value = sound.label;
  // 设置音频源并播放
  if (audioElement.value) {
    audioElement.value.src = sound.value; // 设置声音的URL
    audioElement.value.play(); // 播放音频
  }
  isSoundMenuVisible.value = false; // 选择后关闭菜单
};
const body = {
  data: "",
  lids: [],
  time: Date.now(),
  uid: localStorage.uid,
};
// 计算分页数据
const paginatedData = computed(() => {
  const start = (currentPage.value - 1) * pageSize.value;
  const end = start + pageSize.value;
  return tableData.value.slice(start, end);
});
const onPageChange = (page) => {
  currentPage.value = page; // 更新当前页
};

const onPageSizeChange = (size) => {
  pageSize.value = size; // 更新每页条目数
  currentPage.value = 1; // 重置为第一页
};

// 初始获取所有比赛数据
const fetchAllLiveData = () => {
  listAllLive(body).then((res) => {
    totalMatch.value = res.total
    
    if (userRole.value === 'tourist' || userRole.value === 'normal') {
      // 游客或普通用户只展示前10条数据
      tableData.value = res.list.slice(0, 10);
    } else {
      // 会员用户展示所有数据
      tableData.value = res.list;
    }
    tableData.value.map((match) => {
      initialScores.value[match.KEY] = match.NCN?.SCORE //获取初始所有的score
      // detailLive({ mid: match.KEY }).then((res) => {
      //   match.odds_display_early = res.odds_display_early;
        
      // });
    });
  });
};
const triggerPoint = ref(null);

const checkTriggerPoint = () => {
  nextTick(() => {
    if (triggerPoint.value) {
      const rect = triggerPoint.value.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // 当触发点出现在窗口底部时
      if (rect.top <= windowHeight) {
        if (userRole.value === 'tourist' || userRole.value === 'normal') {
          showError.value = true;
          errorMessage.value = '非会员用户仅能查看10场比赛信息，请联系客服开通会员。';
          // 移除事件监听器以避免多次触发
          window.removeEventListener('scroll', checkTriggerPoint);
        }
      }
    }
  });
};

// 定时调用 listUpLive 并更新 tableData
const fetchUpLiveData = () => {
  listUpLive(body).then((res) => {
    updateTableData(res); // 根据返回数据更新 tableData
  });
};
// 更新 tableData 数据，根据 listUpLive 返回内容
const updateTableData = async (response) => {
  const { delete_matchs, new_matchs, update_events, update_ncn } = response;

  //删除结束的比赛
  delete_matchs.forEach((deleteKEY) => {
    const index = tableData.value.findIndex((item) => item.KEY === deleteKEY);
    if (index !== -1) tableData.value.splice(index, 1);
    totalMatch.value -=1
  });

  //添加新的比赛
  for (const newMatch of new_matchs) {
    // 调用 detailLive 接口获取 odds_display_early
    // const oddsData = await detailLive({ mid: newMatch.KEY });
    // newMatch.odds_display_early = oddsData.odds_display_early; // 拼接 odds_display_early
    // 保存新比赛的初始 SCORE
    initialScores.value[newMatch.KEY] = newMatch.NCN?.SCORE
    tableData.value.push(newMatch);
    totalMatch.value +=1
  }

  // 更新 EVENTS.info 数据
  if (update_events) {
    Object.keys(update_events).forEach((eventKey) => {
      const match = tableData.value.find((item) => item.KEY === eventKey);
      if (match) {
        const eventInfo = update_events[eventKey];
        match.EVENTS?.info.unshift(eventInfo); // 在 EVENTS.info 首部添加事件
      }
    });
  }

  // 更新 NCN 数据
  if (update_ncn) {
    Object.keys(update_ncn).forEach((ncnKey) => {
      const match = tableData.value.find((item) => item.KEY === ncnKey);
      if (match) {
        match.NCN = update_ncn[ncnKey]; // 替换 NCN 数据
        const newScore = update_ncn[ncnKey]?.SCORE; //新比赛得分
        const oldScore = initialScores.value[ncnKey]; //旧得分
        // 比分没有变化，不执行更新逻辑
      if (newScore === oldScore) {
        return;
      }

      // 比较比分变化
      const [oldHome, oldAway] = oldScore?.split(":").map(Number);
      const [newHome, newAway] = newScore?.split(":").map(Number);

      if (newHome > oldHome) {
        // 主队进球
        showNotification(match, "left");
      } else if (newAway > oldAway) {
        // 客队进球
        showNotification(match, "right");
      }

      // 更新初始 SCORE，确保下一次检测时是新的得分
      initialScores.value[ncnKey] = newScore;
      }
    });
  }
};

const homeNotificationQueue = ref([]); // 主队通知队列
const awayNotificationQueue = ref([]); // 客队通知队列
const currentHomeNotificationCount = ref(0); // 当前主队显示的通知数量
const currentAwayNotificationCount = ref(0); // 当前客队显示的通知数量
const position = ref() //位置
const showNotification = (match, direction) => {

  // 如果 "只提示关注" 被选中，且比赛没有关注（FA !== 1），则不显示通知
  if (settingOption1.value && match.FA !== 1) {
    return; // 只有当“只提示关注”选中且比赛是被关注的，才显示通知
  }

  // 如果 "提示窗" 没有选中，则仅播放声音，不显示通知
  if (!settingOption2.value) {
    if (audioElement.value) {
      audioElement.value.src = sounds.find(sound => sound.label === selectedSound.value)?.value || "";
      audioElement.value.play();
    }
    return; // 只播放音效，不显示通知
  }
  position.value = direction === "left" ? "top-left" : "top-right";
  const goalImgSrc = direction === "left"
    ? footballRed
    : footballBlue;
  //播放选中的声音
  if (audioElement.value) {
    audioElement.value.src = sounds.find(sound => sound.label === selectedSound.value)?.value || "";
    audioElement.value.play();
  }
  const [homeScore, awayScore] = (match.NCN?.SCORE).split(':');
  console.log("进球比赛数据",match)
  const notificationContent = `
    <div class="wit"></div>
    <div class="left-section">
      <img class="left-img" src="${goalImgSrc}" alt="ball" />
      <div class="timer">${match.NCN?.TIMER}'</div>
    </div>
    <div class="right-section">
      <div class="league">${match.NCN?.LEAGUE}</div>
      <div class="teams">
        <span class="team1">${match.NCN?.TEAM_H}</span>
        <span class="score">
          <span class="home-score">${homeScore}</span> 
          -
          <span class="away-score">${awayScore}</span>
        </span>
        <span class="team2">${match.NCN?.TEAM_C}</span>
      </div>
    </div>
  `;

 // 将通知添加到相应的队列
  if (direction === "left") {
    homeNotificationQueue.value.push(notificationContent);
  } else {
    awayNotificationQueue.value.push(notificationContent);
  }
  processNotificationQueue();
};

const processNotificationQueue = () => {
  // 处理主队通知
  if (homeNotificationQueue.value.length > 0) {
    const notificationContent = homeNotificationQueue.value.shift(); // 从队列中取出一个通知
    currentHomeNotificationCount.value++; // 增加当前主队显示的通知数量

    const offset = 100 + currentHomeNotificationCount.value * 80; // 动态计算主队的 offset
    ElNotification({
      dangerouslyUseHTMLString: true,
      message: notificationContent,
      position: "top-left",
      showClose: false,
      duration: 8000,
      offset: offset,
      onClose: () => {
        currentHomeNotificationCount.value--; // 关闭后减少计数
        processNotificationQueue(); // 继续处理下一个通知
      }
    });
  }

  // 处理客队通知
  if (awayNotificationQueue.value.length > 0 ) {
    const notificationContent = awayNotificationQueue.value.shift(); // 从队列中取出一个通知
    currentAwayNotificationCount.value++; // 增加当前客队显示的通知数量

    const offset = 100 + currentAwayNotificationCount.value * 80; // 动态计算客队的 offset
    ElNotification({
      dangerouslyUseHTMLString: true,
      message: notificationContent,
      position: "top-right",
      showClose: false,
      duration: 8000,
      offset: offset,
      onClose: () => {
        currentAwayNotificationCount.value--; // 关闭后减少计数
        processNotificationQueue(); // 继续处理下一个通知
      }
    });
  }
};
const updateTimeAndFetch = () => {
  fetchUpLiveData();
};

let intervalId = null;  // 将定时器定义为全局变量，以便在任何地方都能访问和清除

// 监听 pathname 的变化
watch(pathname, (newPath) => {
  if (newPath === '/match/live') {
    // MatchTable 激活时调用接口并启动定时器
    fetchAllLiveData(); // 初次获取全部数据
    if (!intervalId) {  // 确保没有定时器在运行时才启动新的定时器
      intervalId = setInterval(updateTimeAndFetch, 3000); // 每3秒更新一次
    }
  } else {
    // 切换到其他组件时清除定时器
    clearInterval(intervalId); 
    intervalId = null; // 清除定时器后将变量置为 null
  }
});

onMounted(() => {
  const savedOption1 = localStorage.getItem('settingOption1');
  const savedOption2 = localStorage.getItem('settingOption2');
  
  if (savedOption1 !== null) {
    settingOption1.value = JSON.parse(savedOption1);
  }
  if (savedOption2 !== null) {
    settingOption2.value = JSON.parse(savedOption2);
  }
  document.addEventListener('click', closeMenus);
  window.addEventListener('scroll', checkTriggerPoint);
  if (route.path.split('/')[2] === 'live') {
    fetchAllLiveData(); // 初次加载数据
    intervalId = setInterval(updateTimeAndFetch, 3000); // 每3秒更新
  }
});

onUnmounted(() => {
  document.removeEventListener('click', closeMenus);
  clearInterval(intervalId); // 清除定时器，防止组件销毁后定时器依然在运行
  intervalId = null; // 确保变量重置为 null
});
</script>
<style lang='scss' scoped>
.audio.active, .setting.active {
  color: #e92937;
}
.match {
  overflow: hidden;
  height: 100%;
  background-color: #fff;
}
.trigger-point {
  height: 1px; /* 触发点的高度 */
  width: 100%; /* 触发点宽度 */
}
.navi {
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
.table {
  // height: 684px;
  padding: 16px;
  height: 100%;
  overflow: hidden;
}
.footer {
  color: rgba(142, 142, 147, 1);
  font-size: 14px;
  display: flex;
  justify-content: center; /* 水平居中 */
  align-items: center; /* 垂直居中 */
  margin: 40px 0;
}
.float-page {
    position: fixed;
    top: 80%;
    width: 1450px; /* 设置宽度 */
    left: 50%;
    transform: translate(-50%, -50%); /* 居中对齐 */
    z-index: 1000;
}
.float-ewm{
    text-align: center;
    font-size: 12px;
}
.float{
    float: right;
}
.feature {
  margin-left: auto;
  display: flex;
  align-items: center;
  position: relative;
  z-index: 1000;
}

.audio, .setting {
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}
.setting{
  margin-left: 24px
}

.dropdown-menu1 {
  position: absolute;
  top: 100%; /* 菜单在按钮正下方 */
  left: 0px; /* 对齐按钮的左侧 */
  background: white;
  border: 1px solid #ccc;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.1);
  border-radius: 2px;
  list-style: none;
  margin: 0;
  padding: 0;
  z-index: 1000;
  width: 70px;
  text-align: center;
}
.dropdown-menu2 {
  position: absolute;
  top: 100%; /* 菜单在按钮正下方 */
  left: 5px; /* 对齐按钮的左侧 */
  background: white;
  border: 1px solid #ccc;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.1);
  border-radius: 2px;
  list-style: none;
  margin: 0;
  padding: 0;
  z-index: 1000;
  width: 144px;
  height: 88px;
}

.dropdown-item {
  padding: 8px 12px;
  cursor: pointer;
}
.dropdown-item.active {
  color: red; /* 选中项字体颜色为红色 */
}
.dropdown-item:hover {
  background-color: #f5f5f5;
}

.custom-checkbox {
  display: flex;
  align-items: center;
  cursor: pointer;
  margin-top: 14px;
  margin-left: 16px;
}

.custom-checkbox input[type="checkbox"] {
  display: none;
}

.custom-checkbox .checkbox-style {
  width: 16px;
  height: 16px;
  background-color: #fff;
  border: 1px solid #ccc;
  margin-right: 8px;
  position: relative;
}

.custom-checkbox input[type="checkbox"]:checked + .checkbox-style {
  background-color: red; /* 方块背景为红色 */
}

.custom-checkbox input[type="checkbox"]:checked + .checkbox-style::after {
  content: '';
  position: absolute;
  width: 6px;
  height: 10px;
  border: solid white;
  border-width: 0 2px 2px 0;
  top: 1px;
  left: 4px;
  transform: rotate(45deg);
}
</style>
<style>
.el-notification.left {
  width: 488px;
  height: 80px;
  border-radius: 4px;
  background-image: linear-gradient(to right, #fcd4d0, #fff);
  display: flex;
  align-items: center;
  padding: 0;
  overflow: visible;
}
.el-notification.right {
  width: 488px;
  height: 80px;
  border-radius: 4px;
  background-image: linear-gradient(to right, #fff, #d0eeff);
  display: flex;
  align-items: center;
  padding: 0;
  overflow: visible;
}
.el-notification__content p{
  display: flex;
  align-items: center;
}
.el-notification.left .left-img{
  width: 50px;
  height: 50px;
  position: absolute;
  top: -42px;
}
.el-notification.right .left-img{
  width: 50px;
  height: 50px;
  position: absolute;
  top: -42px;
}
.el-notification.left .left-section {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  position: absolute;
  margin-left: 50px;
  /* bottom: 0; 
  left: 20%; 
  transform: translateY(50%); */
}
.el-notification.right .left-section {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    position: absolute;
    margin-left: 400px;
}
.el-notification__content .left-section .timer {
  font-size: 16px;
  margin-top: 5px;
  color: #e92937;
  font-weight: bold;
}
.el-notification.right .left-section .timer {
    font-size: 16px;
    color: #0071ff;
    margin-top: 5px;
    font-weight: bold;
}

.el-notification.left .right-section {
  /* display: flex;
  justify-content: center;
  align-items: center; */
  flex-direction: column;
  margin-left: 108px;
  margin-top: -20px;
}
.el-notification.right .right-section {
  /* display: flex;
  justify-content: center;
  align-items: center; */
  flex-direction: column;
  margin-left: 50px;
  margin-top: -20px;
}

.el-notification__content .right-section .league {
  font-size: 14px;
  text-align: center;
}

.el-notification__content .right-section .teams {
  font-size: 14px;
  display: flex;
  align-items: center;
  display: block;
  overflow: hidden; /* 隐藏溢出的内容 */
  white-space: nowrap; /* 不换行 */
  text-overflow: ellipsis;
}

.el-notification.left .right-section .team1 {
  margin-right: 16px;
  color: #e92937;
}
.el-notification.left .right-section .team2 {
  margin-left: 16px;
}
.el-notification.right .right-section .team1 {
  margin-right: 16px;
}
.el-notification.right .right-section .team2 {
  margin-left: 16px;
  color: #0071ff;
}

.el-notification__content .right-section .score {
  font-size: 18px;
  font-weight: bold;
  
}
.el-notification.left .right-section .score .home-score{
  color: #e92937;
}
.el-notification.right .right-section .score .away-score{
  color: #0071ff;
}
.el-notification__content .close-button {
  position: absolute;
  top: 0px;
  right: 0px;
  cursor: pointer;
}
.el-backtop{
    right: 7px !important;
    bottom: -42px !important;
    width: 45px;
    height: 45px;
    color: #000;
}
</style>