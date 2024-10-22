<template>
  <div class="curve" >
    <div class="title">
      <DetailTitle
        type="big"
        quxianText="进攻压力曲线"
        quxianEnText="DEFENSIVE PRESSURE CURVE"
      />
    </div>
    <div class="content">
      <!-- <div class="switch-control">
        <div class="qb">
          <span class="qb_text">全部</span>
        </div>
        <div class="min">近10分钟</div>
      </div> -->
      <div ref="chartRef" style="width: 793px; height: 438px">
        <!-- 加载中提示 -->
        <div v-if="loading" class="loading-spinner">数据加载中...</div>
      </div>
      <div class="footer">
        <div class="one">
          <div class="name">进攻压力曲线</div>
          <div class="hteam">
            <div class="red"></div>
            <span class="team">主队</span>
          </div>
          <div class="gteam">
            <div class="blue"></div>
            <span class="team">客队</span>
          </div>
        </div>
        <div class="two">
          *进攻压力曲线代表双方进攻施压值，理论上压力值越高，代表该只队伍进攻越好，越容易发生进球等事件
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import DetailTitle from "./DetailTitle.vue";
import ballBlue from "@/assets/detail/ball_blue.png";
import ballRed from "@/assets/detail/ball_red.png";
import { ref, onMounted, onBeforeUnmount } from "vue";
import * as echarts from "echarts";
//图表引用和实例
const chartRef = ref(null);
let chartInstance = null;
const props = defineProps({
  data: Object,
});
// 定义加载状态
const loading = ref(true);

// 计算属性来处理 props.data 变化
// const chartOptions = computed(() => {
//   if (!props.data?.OV_INFO?.pi) return null;
  
//   return {
//     grid: {
//       left: "21px",
//       right: "21px",
//       top: "20px",
//       bottom: "20px",
//       containLabel: true,
//     },
//     xAxis: {
//       type: "value",
//       boundaryGap: false,
//       splitLine: { show: true },
//       axisTick: { show: false },
//       min: 0,
//       max: 100,
//       interval: 10,
//       axisLine: {
//         lineStyle: {
//           color: "#CCC7CC",
//         },
//       },
//     },
//     yAxis: {
//       type: "value",
//       splitLine: { show: false },
//       axisLine: { show: true },
//       axisLabel: { show: true },
//       axisTick: { show: false },
//       min: 0,
//       max: 100,
//       interval: 10,
//       axisLine: {
//         lineStyle: {
//           color: "#CCC7CC",
//         },
//       },
//     },
//     series: [
//       {
//         data: props.data.OV_INFO.pi.ah1.s
//           .concat(props.data.OV_INFO.pi.ah2.s)
//           .map((point) => [point.x, point.y]),
//         type: "line",
//         symbol: "none",
//         lineStyle: {
//           color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
//             { offset: 0, color: "#C9DFFC" },
//             { offset: 0.5, color: "#60ABFD" },
//             { offset: 1, color: "#007AFF" },
//           ]),
//         },
//         areaStyle: {
//           color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
//             { offset: 0, color: "#CBE1FC" },
//             { offset: 1, color: "#F2F5FB" },
//           ]),
//         },
//         markPoint: {
//           symbol: `image://${ballBlue}`,
//           symbolSize: [20, 20],
//           data: props.data.OV_INFO.pi.ag.s.map((point) => ({
//             coord: [point.x, point.y],
//           })),
//         },
//       },
//       {
//         data: props.data.OV_INFO.pi.hh1.s
//           .concat(props.data.OV_INFO.pi.hh2.s)
//           .map((point) => [point.x, point.y]),
//         type: "line",
//         symbol: "none",
//         lineStyle: {
//           color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
//             { offset: 0, color: "#F9DDDC" },
//             { offset: 0.5, color: "#F4BCBA" },
//             { offset: 1, color: "#FF3B30" },
//           ]),
//         },
//         areaStyle: {
//           color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
//             { offset: 0, color: "#F9DCDD" },
//             { offset: 1, color: "#F8F4F6" },
//           ]),
//         },
//         markPoint: {
//           symbol: `image://${ballRed}`,
//           symbolSize: [20, 20],
//           data: props.data.OV_INFO.pi.hg.s.map((point) => ({
//             coord: [point.x, point.y],
//           })),
//         },
//       },
//     ],
//   };
// });

// // 初始化图表函数
// const initChart = () => {
//   if (chartRef.value && chartOptions.value) {
//     chartInstance = echarts.init(chartRef.value);
//     chartInstance.setOption(chartOptions.value);
//     loading.value = false; // 数据加载完毕，隐藏加载状态
//   }
// };

// // 在组件挂载时初始化图表
// onMounted(() => {
//   initChart();
//   window.addEventListener("resize", () => chartInstance && chartInstance.resize());
// })

const chartOptions = () => {
  if (!props.data?.OV_INFO?.pi) return null; // 确保数据存在

  return {
    grid: {
      left: '21px',
      right: '21px',
      top: '20px',
      bottom: '20px',
      containLabel: true, // 确保标签在图表内部
    },
    xAxis: {
      type: 'value',
      boundaryGap: false,
      splitLine: { show: true },
      axisTick: { show: false },
      min: 0,
      max: 100,
      interval: 10,
      axisLine: {
        lineStyle: {
          color: '#CCC7CC',
        },
      },
    },
    yAxis: {
      type: 'value',
      splitLine: { show: false },
      axisLine: { show: true },
      axisLabel: { show: true },
      axisTick: { show: false },
      min: 0,
      max: 100,
      interval: 10,
      axisLine: {
        lineStyle: {
          color: '#CCC7CC',
        },
      },
    },
    series: [
      {
        data: props.data.OV_INFO.pi.ah1.s
          .concat(props.data.OV_INFO.pi.ah2.s)
          .map((point) => [point.x, point.y]),
        type: 'line',
        symbol: 'none',
        lineStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
            { offset: 0, color: '#C9DFFC' },
            { offset: 0.5, color: '#60ABFD' },
            { offset: 1, color: '#007AFF' },
          ]),
        },
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: '#CBE1FC' },
            { offset: 1, color: '#F2F5FB' },
          ]),
        },
        markPoint: {
          symbol: `image://${ballBlue}`,
          symbolSize: [20, 20],
          data: props.data.OV_INFO.pi.ag.s.map((point) => ({
            coord: [point.x, point.y],
          })),
        },
      },
      {
        data: props.data.OV_INFO.pi.hh1.s
          .concat(props.data.OV_INFO.pi.hh2.s)
          .map((point) => [point.x, point.y]),
        type: 'line',
        symbol: 'none',
        lineStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
            { offset: 0, color: '#F9DDDC' },
            { offset: 0.5, color: '#F4BCBA' },
            { offset: 1, color: '#FF3B30' },
          ]),
        },
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: '#F9DCDD' },
            { offset: 1, color: '#F8F4F6' },
          ]),
        },
        markPoint: {
          symbol: `image://${ballRed}`,
          symbolSize: [20, 20],
          data: props.data.OV_INFO.pi.hg.s.map((point) => ({
            coord: [point.x, point.y],
          })),
        },
      },
    ],
  };
};

// 初始化图表函数
const initChart = () => {
  if (chartRef.value) {
    if (!chartInstance) {
      // 仅在图表实例为空时初始化
      chartInstance = echarts.init(chartRef.value);
    }

    const options = chartOptions(); // 获取当前图表配置
    if (options) {
      chartInstance.setOption(options); // 更新图表配置，而不是销毁实例
    }
  }
};

// 在组件挂载时初始化图表
onMounted(() => {
  initChart();
  window.addEventListener("resize", () => chartInstance && chartInstance.resize());
})
// 在组件卸载前销毁图表实例
onBeforeUnmount(() => {
  if (chartInstance) {
    chartInstance.dispose();
  }
});

watch(
  () => props.data, // 监听 props.data
  (newValue, oldValue) => {
    if (newValue !== oldValue) {
      setTimeout(() => {
        initChart(); // 重新初始化图表
      });
    }
  },
  { deep: true } // 深度监听数据的变化
);
// // 监听 props.data 的变化，当数据准备好后重新渲染图表
// watch(() => props.data, (newData) => {
//   if (newData) {
//     nextTick(() => initChart());
//   }
// });

// // 在组件挂载时初始化图表
// onMounted(() => {
//   initChart();
//   window.addEventListener("resize", () => chartInstance && chartInstance.resize());
// });

// onBeforeUnmount(() => {
//   if (chartInstance) {
//     chartInstance.dispose(); // 销毁实例防止内存泄露
//   }
// })
</script>
<style lang='scss' scoped>
.content {
  background-color: rgba(242, 242, 247, 0.5);
  border-radius: 0px 10px 10px 10px;
  width: 800px;
  height: 548px;
  padding-top: 20px;
}
.switch-control {
  display: flex;
  justify-content: center; /* 水平居中 */
  align-items: center; /* 垂直居中 */
  margin-left: 21px;

  background-color: rgba(242, 242, 247, 1);
  border-radius: 20px;
  width: 153px;
  height: 24px;
  font-size: 12px;
  color: #8e8e93;
  .qb {
    background-color: rgba(255, 255, 255, 1);
    border-radius: 20px;
    height: 20px;
    width: 62px;
    margin: 2px 0 0 2px;
    .qb_text {
      margin: 0 18px;
      color: #2c2c2e;
    }
  }
  .min {
    margin: 0 19px;
  }
}
.footer {
  margin-left: 51px;
  font-size: 12px;
  .one {
    display: flex;
    .name {
      font-size: 14px;
      color: #2c2c2e;
      font-weight: 600;
    }
    .hteam {
      display: flex;
      align-items: center; /* 垂直居中 */
      margin-left: 60px;
      .red {
        background-color: #ff3b30;
        border-radius: 4px;
        width: 30px;
        height: 2px;
      }
    }
    .gteam {
      display: flex;
      align-items: center; /* 垂直居中 */
      margin-left: 60px;
      .blue {
        background-color: #007aff;
        border-radius: 4px;
        width: 30px;
        height: 2px;
      }
    }
  }
  .two {
    color: #c7c7cc;
    margin-top: 5px;
  }
  .team {
    color: #8e8e93;
    margin-left: 5px;
  }
}
</style>