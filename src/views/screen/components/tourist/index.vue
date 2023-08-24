<template>
  <div class="tourist-container">
    <div class="top">
      <p class="title">实时游客统计</p>
      <p class="bg"></p>
      <p class="text">
        可预约总量
        <span>9999</span>
        人
      </p>
    </div>
    <div class="number">
      <span v-for="(item, index) in peopel" :key="index">{{ item }}</span>
    </div>
    <div class="charts" ref="charts"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import * as echarts from 'echarts'
import 'echarts-liquidfill'
const peopel = ref<string>('215908人')

//获取节点
let charts = ref()
onMounted(() => {
  //获取echarts类的实例
  let mycharts = echarts.init(charts.value)
  //设置实例的配置项
  mycharts.setOption({
    //标题组件
    title: {
      text: '水球图',
    },
    //x|y轴组件
    xAxis: {},
    yAxis: {},
    //系列:决定你展示什么样的图形图标
    series: {
      type: 'liquidFill', //系列
      data: [0.6, 0.4, 0.2], //展示的数据
      waveAnimation: true, //动画
      animationDuration: 3,
      animationDurationUpdate: 0,
      radius: '100%', //半径
    },
    //布局组件
    grid: {
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
    },
  })
})
</script>

<style scoped lang="scss">
.tourist-container {
  margin-top: 10px;
  background: url(../../images/dataScreen-main-lb.png) no-repeat;
  background-size: 100% 100%;
  .top {
    margin: 10px;
    .title {
      font-size: 20px;
      color: white;
    }
    .bg {
      width: 68px;
      height: 7px;
      background: url(../../images/dataScreen-title.png) no-repeat;
      background-size: 100% 100%;
      margin-top: 10px;
    }
    .text {
      float: right;
      font-size: 20px;
      color: white;
      span {
        color: #29fcff;
      }
    }
  }
  .number {
    margin-top: 50px;
    padding: 0 10px;
    display: flex;
    span {
      flex: 1;
      height: 40px;
      background: url(../../images/total.png);
      background-size: 100% 100%;
      line-height: 40px;
      text-align: center;
      font-size: 20px;
      color: #29fcff;
    }
  }
  .charts {
    width: 100%;
    height: 270px;
  }
}
</style>
