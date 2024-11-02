<template>
    <div class="curve">
        <div class="title">
            <DetailTitle
            quxianText="技术指标"
            />
        </div>
        <div class="content">
            <div class="top">
                <div class="top-progress-item" v-for="(item, index) in progressTop" :key="index">
                    <!-- <div class="top-progress-label">
                        <span class="top-label-text">{{ item.label }}</span>
                        <span class="top-percentage">{{ item.percentage }}<span class="top-percent">%</span></span>
                    </div> -->
                    <div :ref="el => echartRefs[index] = el" class="echarts-container"></div>
                    <!-- <el-progress
                        :percentage="item.percentage"
                        class="top-progress"
                    /> -->
                </div>
            </div>
            <div class="main">
                <div class="main-progress-item" v-for="(item,index) in progressMain" :key="index">
                    <div class="main-progress-lable" >
                        <span class="hteam-percentage">{{ index === 0 ? item.hteamper + '%' : item.hteamper }}</span>
                        <span class="main-label-text">{{ item.label }}</span>
                        <span class="gteam-percentage">{{ index === 0 ? item.gteamper + '%' : item.gteamper }}</span>
                    </div>
                    <div class="progress-container">
                        <el-progress
                            :percentage="item.hteamper"
                            class="hteam-progress"
                        />
                        <el-progress
                            :percentage="item.gteamper"
                            class="gteam-progress"
                        />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import { onMounted } from 'vue';
import * as echarts from 'echarts';
import DetailTitle from './DetailTitle.vue';
const props = defineProps({
  data: Object,
});

const progressTop = computed(() => [
  { label: '全场压力', percentage: props.data?.OV_INFO?.oi?.average + props.data?.OV_INFO?.oi?.current || 0 }, // 如果有需要全场压力的字段可以替换
  { label: '平均压力', percentage: props.data?.OV_INFO?.oi?.average || 0 },
  { label: '近10分压力', percentage: props.data?.OV_INFO?.oi?.current || 0 }
]);

// home 和 away 的进攻数据
const progressMain = computed(() => [
  { label: '控球率', hteamper: props.data?.OV_INFO?.stats?.home?.possession || 0, gteamper: props.data?.OV_INFO?.stats?.away?.possession || 0 },
  { label: '射正', hteamper: props.data?.OV_INFO?.stats?.home?.shotontarget || 0, gteamper: props.data?.OV_INFO?.stats?.away?.shotontarget || 0 },
  { label: '进攻', hteamper: props.data?.OV_INFO?.stats?.home?.attacks || 0, gteamper: props.data?.OV_INFO?.stats?.away?.attacks || 0 },
  { label: '射偏', hteamper: props.data?.OV_INFO?.stats?.home?.shotofftarget || 0, gteamper: props.data?.OV_INFO?.stats?.away?.shotofftarget || 0 },
  { label: '危险进攻', hteamper: props.data?.OV_INFO?.stats?.home?.dangerousattacks || 0, gteamper: props.data?.OV_INFO?.stats?.away?.dangerousattacks || 0 },
  { label: '红牌', hteamper: props.data?.OV_INFO?.stats?.home?.redcards || 0, gteamper: props.data?.OV_INFO?.stats?.away?.redcards || 0 },
  { label: '角球', hteamper: props.data?.OV_INFO?.stats?.home?.corners || 0, gteamper: props.data?.OV_INFO?.stats?.away?.corners || 0 },
  { label: '黄牌', hteamper: props.data?.OV_INFO?.stats?.home?.yellowcards || 0, gteamper: props.data?.OV_INFO?.stats?.away?.yellowcards || 0 }
])

const echartRefs = ref([]); // 保存多个 ECharts 实例的引用
let chartInstances = []; // 用来存储每个图表实例

// ECharts 图表选项
const echartOptions = (item) => ({
  series: [
    {
      type: 'pie',
      radius: ['50px', '60px'],
      avoidLabelOverlap: false,
      label: { show: false, position: 'center' },
      emphasis: {
        scale: false, //鼠标悬停放大
        label: {
          show: true,
          fontSize: '30',
          fontWeight: 'bold'
        }
      },
      labelLine: { show: false },
      data: [
        { value: item.percentage, itemStyle: { color: '#e92937' } },
        { value: 100 - item.percentage, itemStyle: { color: '#ebebeb' } }
      ]
    }
  ],
//   tooltip: {
//       trigger: 'item',
//       formatter: function(params) {
//         return `${params.name}: ${(params.value / 100 * 100).toFixed(2)}%`;
//       }
//     }, 鼠标悬停提示
  graphic: {
    type: 'group',
    left: 'center',
    top: 'center',
    children: [
      {
        type: 'text',
        z: 100,
        left: 'center',
        top: 'middle',
        style: {
          text: `{value|${item.percentage}}{percent|%}`,
          textAlign: 'center',
          rich: {
            value: { fontSize: 18, fontWeight: 'bold', fill: '#e92937' },
            percent: { fontSize: 18, fill: '#e92937' }
          }
        }
      },
      {
        type: 'text',
        z: 100,
        left: 'center',
        top: 15,
        style: {
          text: `{label|${item.label}}`,
          textAlign: 'center',
          rich: {
            label: { fontSize: 12, fill: '#8a8a8a' }
          }
        }
      }
    ]
  }
});

// 初始化 ECharts 实例
const initCharts = () => {
  progressTop.value.forEach((item, index) => {
    const chartRef = echartRefs.value[index];

    if (chartRef) {
      if (!chartInstances[index]) {
        // 仅当实例不存在时初始化
        chartInstances[index] = echarts.init(chartRef);
      }

      const options = echartOptions(item); // 获取当前的图表配置
      if (options) {
        chartInstances[index].setOption(options); // 更新图表配置
      }
    }
  });
};

// 监听数据变化更新图表
onMounted(() => {
  initCharts(); // 组件挂载时初始化图表

  // 窗口大小改变时，自动调整图表大小
  window.addEventListener('resize', () => {
    chartInstances.forEach(instance => instance && instance.resize());
  });
});

onBeforeUnmount(() => {
  // 在组件销毁前销毁图表实例，防止内存泄漏
  chartInstances.forEach(instance => instance && instance.dispose());
});

watch(
  () => progressTop.value, // 监听 progressTop 的变化
  (newVal, oldVal) => {
    if (newVal !== oldVal) {
      initCharts(); // 重新初始化图表，应用新数据
    }
  },
  { deep: true } // 深度监听，捕捉对象内的变化
);

</script>
<style lang='scss' scoped>
.curve{
    padding-top: 40px;
    margin-left: 16px;
}
.content{
    
    width: 980px;
    height: 420px;
}
.top {
    display: flex;
    justify-content: center;
    padding-top: 16px;
}
.top-progress-item {
    position: relative;
    margin: 0 32px;
}
.hteam-percentage,
.gteam-percentage{
    font-size: 14px;
    font-weight: bold;
}
.echarts-container {
    width: 120px;
    height: 120px;
    margin-top: 10px;
}

.top-progress{
    border-radius: 0;
    width: 182px;
    stroke-width: 8px !important; /* 强制设置 */
    height: 8px !important; /* 强制设置 */
}

.main {
    display: flex;
    flex-wrap: wrap; /* 允许换行 */
    margin-top: 8px;
}
.main-progress-item{
    margin: 24px 0 0 63px;
}
.main-progress-lable {
    display: flex;
    font-size: 14px;
    .hteam-percentage{
        margin-right: auto;
    }
    .gteam-percentage{
        margin-left: auto;
    }
}
.progress-container {
    display: flex;
    justify-content: space-between; /* 使进度条在一行中均匀分布 */
    margin-top: 8px; /* 添加间距 */
}
.hteam-progress{
    transform: scaleX(-1);
}
.hteam-progress,
.gteam-progress {
    margin-right: 8px;
    width: 180px; /* 进度条宽度 */
}

:deep(.hteam-progress .el-progress-bar__inner){
    background-color: #e92937;
    height: 8px !important;
    border-radius: 0 !important;
}
:deep(.hteam-progress .el-progress-bar__outer){
    background-color: #ebebeb;
    height: 8px !important;
    border-radius: 0 !important;
}
:deep(.gteam-progress .el-progress-bar__inner){
    background-color: #0071ff;
    height: 8px !important;
    border-radius: 0 !important;
}
:deep(.gteam-progress .el-progress-bar__outer){
    background-color: #ebebeb;
    height: 8px !important;
    border-radius: 0 !important;
}


</style>
<style>
.content .el-progress__text {
  display: none;
}
</style>