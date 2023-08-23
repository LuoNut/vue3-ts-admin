<template>
  <div class="year_container">
    <div class="title">
      <p>年度游客量对比</p>
      <img src="../../images/dataScreen-title.png" alt="" />
    </div>
    <div class="charts" ref="charts"></div>
  </div>
</template>

<script setup lang="ts">
import * as echarts from 'echarts'
import { onMounted, ref } from 'vue'

const charts = ref()
onMounted(() => {
  const myCharts = echarts.init(charts.value)
  myCharts.setOption({
    title: {
      text: '散点图',
      left: 'center',
      textStyle: {
        color: 'white',
      },
    },
    xAxis: {
      type: 'category',
      show: true,
    },
    yAxis: {
      show: false,
    },
    series: [
      {
        type: 'scatter',
        data: [33, 88, 21, 9, 88, 234, 113, 1231, 674, 3, 88, 33, 21, 888, 3332, 313, 123, 5, 657, 7],
        symbol: 'diamond',
        symbolSize: 16,
        label: {
          show: true,
          position: 'top',
          color: 'red',
        },
        itemStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              {
                offset: 0,
                color: 'red', // 0% 处的颜色
              },
              {
                offset: 1,
                color: 'blue', // 100% 处的颜色
              },
            ],
            global: false, // 缺省为 false
          },
        },
      },
    ],
    grid: {
      left: 20,
      bottom: 20,
      right: 0,
      top: 20,
    },
  })
})
</script>

<style scoped lang="scss">
.year_container {
  width: 100%;
  height: 100%;
  background: url(../../images/dataScreen-main-cb.png) no-repeat;
  background-size: 100% 100%;
  .title {
    font-size: 20px;
    color: white;
  }
  .charts {
    height: calc(100% - 20px);
  }
}
</style>
