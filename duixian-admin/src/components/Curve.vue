<template>
    <div class="curve">
      <div class="content">
        <div class="switch-control">
          <div class="qb">
            <span class="qb_text">全部</span>
          </div>
          <div class="min">近10分钟</div>
        </div>
        <div ref="chartRef" :style="{width: getHeight(), height: '300px'}">
          <!-- 加载中提示 -->
          <div v-if="loading" class="loading-spinner">数据加载中...</div>
        </div>
        <div class="footer">
          <div class="one">
            <div class="hteam">
              <div class="red"></div>
              <span class="team">主队</span>
            </div>
            <div class="gteam">
              <div class="blue"></div>
              <span class="team">客队</span>
            </div>
          </div>
          
        </div>
      </div>
    </div>
</template>
<script setup>
import { ref, onMounted } from 'vue';
import ballBlue from "@/assets/detail/ball_blue.png";
import ballRed from "@/assets/detail/ball_red.png";
import * as echarts from 'echarts';
const chartRef = ref(null);
let chartInstance = null;
const route = useRoute()
const props = defineProps({
  data: Object,
});
function getHeight() {
  if(route.path.includes('/match')){
    return '900px'
  } else{
    return '645px'
  }
}

// 定义加载状态
const loading = ref(true);
const chartOptions = () => {
  if (!props.data?.OV_INFO?.pi) return null; // 确保数据存在

  return {
    grid: {
      left: '0',
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
</script>
<style lang='scss' scoped>
.content {
  width: 981px;
  height: 360px;
}
.switch-control {
  display: flex;
  justify-content: center; /* 水平居中 */
  align-items: center; /* 垂直居中 */
  margin-top: 12px;
  background-color: #ebebeb;
  width: 135px;
  height: 28px;
  font-size: 12px;
  .qb {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #fff;
    height: 26px;
    width: 66px;
    margin: 1px;
    .qb_text {
      color: #e92937;
    }
  }
  .min {
    margin: 0 8px;
  }
}
.footer {
  width: 600px;
  font-size: 12px;
  .one {
    display: flex;
    justify-content: center;
    .name {
      font-size: 12px;
      color: #000;
      opacity: 0.7;
      font-weight: 600;
    }
    .hteam {
      display: flex;
      align-items: center; /* 垂直居中 */
      margin-left: 60px;
      .red {
        background-color: #e92937;
        border-radius: 4px;
        width: 16px;
        height: 2px;
      }
    }
    .gteam {
      display: flex;
      align-items: center; /* 垂直居中 */
      margin-left: 60px;
      .blue {
        background-color: #0071ff;
        border-radius: 4px;
        width: 16px;
        height: 2px;
      }
    }
  }
  .team {
    color: #8e8e93;
    margin-left: 5px;
  }
}
</style>