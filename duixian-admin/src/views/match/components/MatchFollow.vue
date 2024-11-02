<template>
    <div>
        <div class="table">
            <MatchTable v-if="tableData" 
            :data="paginatedData"  
            @update-data="fetchTableData"
            :total="totalMatch" 
            :current-page="currentPage"
            :page-size="pageSize"
            @update:currentPage="onPageChange"
            @update:pageSize="onPageSizeChange"
            :height="height"/>
        </div>
    </div>
</template>
<script setup>
import { favorLive, favorUpLive } from '../../../api/match';
import MatchTable from './MatchTable.vue';
const tableData = ref([])
const currentPage = ref(1);
const pageSize = ref(20);
const totalMatch = ref(0);
const height = 'calc(100vh - 178px)'
const body = {
  data: "",
  lids: [],
  time: Date.now(),
  uid: localStorage.uid
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
  favorLive(body).then(res => {
    tableData.value = res.list;
    totalMatch.value = res.total
    //   tableData.value.map((match) => {
    //   detailLive({ mid: match.KEY, uid: parseInt(localStorage.uid) }).then((res) => {
    //     match.odds_early = res.odds_display_early;
    //   });
    // });
  });
};

// 定时调用 favorUpLive 并更新 tableData
const fetchUpLiveData = () => {
    favorUpLive(body).then(res => {
    updateTableData(res); // 根据返回数据更新 tableData
  });
};

// 更新 tableData 数据，根据 listUpLive 返回内容
const updateTableData = async(response) => {
  const { delete_matchs, new_matchs, update_events, update_ncn, update_ov_info } = response

  //删除结束的比赛
  delete_matchs.forEach(deleteKEY => {
      const index = tableData.value.findIndex(item => item.KEY === deleteKEY)
      if(index !== -1) tableData.value.splice(index, 1)
      totalMatch.value -=1
  });

  // 添加新比赛
  for (const newMatch of new_matchs) {
    // // 调用 detailLive 接口获取 odds_display_early
    // const oddsData = await detailLive({ mid: newMatch.KEY });
    // newMatch.odds_display_early = oddsData.odds_display_early; // 拼接 odds_display_early
    tableData.value.push(newMatch);
    totalMatch.value +=1
  }

  // 更新 EVENTS.info 数据
  if (update_events) {
    Object.keys(update_events).forEach(eventKey => {
      const match = tableData.value.find(item => item.KEY === eventKey);
      if (match) {
        const eventInfo = update_events[eventKey];
        match.EVENTS.info.unshift(eventInfo); // 在 EVENTS.info 首部添加事件
      }
    });
  }

  // 更新 NCN 数据
  if (update_ncn) {
    Object.keys(update_ncn).forEach(ncnKey => {
      const match = tableData.value.find(item => item.KEY === ncnKey);
      if (match) {
        match.NCN = update_ncn[ncnKey]; // 替换 NCN 数据
      }
    });
  }

  if(update_ov_info) {
    Object.keys(update_ov_info).forEach(infoKey => {
        const match = tableData.value.find(item => item.KEY === infoKey)
        if(match){
            match.OV_INFO = update_ov_info[infoKey] // 替换 OV_INFO 数据
        }
    })
  }
}
// 每秒更新 time 并调用 fetchUpLiveData
const updateTimeAndFetch = () => {
    fetchUpLiveData();
};
let intervalId;

onMounted(() => {
    // 组件挂载时调用一次接口
    fetchAllLiveData();
    intervalId = setInterval(updateTimeAndFetch, 3000); // 每3秒更新
});

onUnmounted(() => {
  clearInterval(intervalId); // 清除定时器
});
</script>
<style lang='scss' scoped>

</style>