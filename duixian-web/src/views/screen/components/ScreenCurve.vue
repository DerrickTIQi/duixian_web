<template>
    <div class="curve">
        <div class="switch-control">
              <div class="qb">
                  <span class="qb_text">全部</span>
              </div>
              <div class="min">近10分钟</div>
          </div>
          <div ref="chartRef" style="width: 863px; height: 360px;"></div>
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
</template>
<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import * as echarts from 'echarts';
const chartRef = ref(null);
let chartInstance = null;
// 图表选项
const option = {
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
    max: 90,
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
      data: [
        [0, 0], [2, 21], [5, 23], [7, 60], [10, 44], [12, 46], [15, 11], [18, 2], [20, 4], [26, 38], [28, 30], [30, 13], [33, 5], [35, 8], [38, 21], [40, 75], [45, 50], [48, 60], [50, 45], [52, 12], [55, 5], [60, 20], [65, 5], [80, 38],
      ],
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
      emphasis: {
        disabled: true,
        focus: 'none', // 取消鼠标悬浮高亮
      },
      markPoint: {
        symbol: 'circle',
        symbolSize: 10,
        data: [
          {
            coord: [80, 38],
            itemStyle: {
              color: '#007AFF',
            },
          },
        ],
      },
      
    },
    {
      data: [
        [0, 0], [10, 3], [20, 22], [30, 18], [40, 28], [50, 55], [60, 70], [70, 40], [80, 45],
      ],
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
      emphasis: {
        disabled: true,
        focus: 'none', // 取消鼠标悬浮高亮
      },
      markPoint: {
        symbol: 'circle',
        symbolSize: 10,
        data: [
          {
            coord: [80, 45],
            itemStyle: {
              color: '#FF3B30',
            },
          },
        ],
      },
    },
  ],
  
};

// 创建图表实例并初始化
const initChart = () => {
  if (chartRef.value) {
    chartInstance = echarts.init(chartRef.value);
    chartInstance.setOption(option);
  }
};

// 在组件挂载时初始化图表
onMounted(() => {
  initChart();
  window.addEventListener('resize', () => chartInstance && chartInstance.resize());
});
</script>
<style lang='scss' scoped>
.curve{
    width: 840px;
    height: 461px;
}
.switch-control{
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
    .qb{
        background-color: rgba(255, 255, 255, 1);
        border-radius: 20px;
        height: 20px;
        width: 62px;
        margin: 2px 0 0 2px;
        .qb_text{
            margin: 0 18px;
            color: #2c2c2e;

        }
    }
    .min{
        margin: 0 19px;
    }
}
.footer{
    margin-left: 51px;
    font-size: 12px;
    .one{
        display: flex;
        .name{
            font-size: 14px;
            color: #2c2c2e;
            font-weight: 600;
        }
        .hteam{
            display: flex;
            align-items: center; /* 垂直居中 */
            margin-left: 60px;
            .red{
                background-color: #ff3b30;
                border-radius: 4px;
                width: 30px;
                height: 2px;
            }
            
        }
        .gteam{
            display: flex;
            align-items: center; /* 垂直居中 */
            margin-left: 60px;
            .blue{
                background-color: #007aff;
                border-radius: 4px;
                width: 30px;
                height: 2px;
            }
        }
    }
    .two{
        color: #c7c7cc;
        margin-top: 5px;
    }
    .team{
        color: #8e8e93;
        margin-left: 5px;
    }
}
</style>