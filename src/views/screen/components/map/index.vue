<template>
  <div class="map-container" ref="map"></div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import * as echarts from 'echarts'
import china from './china.json'

echarts.registerMap('china', china)
const map = ref()
onMounted(() => {
  const myEcharts = echarts.init(map.value)
  myEcharts.setOption({
    geo: [
      {
        map: 'china',
        roam: true,
        left: 150,
        top: 150,
        right: 150,
        zoom: 1.2,
        bottom: 0,
        label: {
          show: true, //文字显示出来
          color: 'white',
          fontSize: 14,
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
          opacity: 0.8,
        },
        emphasis: {
          label: {
            fontSize: 40,
          },
          itemStyle: {
            color: 'red',
          },
        },
      },
    ],
    //布局位置
    grid: {
      left: 0,
      top: 0,
      right: 0,
      bottom: 0,
    },
    series: [
      {
        type: 'lines',
        data: [
          {
            coords: [
              [116.405285, 39.904989], // 起点
              [109.312451, 29.066453], // 终点     // 如果 polyline 为 true 还可以设置更多的点
            ],
            lineStyle: {
              color: 'orange',
              width: 5,
            },
          },
          {
            coords: [
              [116.405285, 39.904989], // 起点
              [114.298572, 30.584355], // 终点
            ],
            // 统一的样式设置
            lineStyle: {
              color: 'yellow',
              width: 5,
            },
          },
        ],
        effect: {
          show: true,
          symbol: 'rect',
          color: 'black',
          symbolSize: 20,
        },
      },
    ],
  })
})
</script>

<style scoped lang="scss">
.map-container {
  height: 200px;
}
</style>
