<template>
  <div class="top">
    <div class="left">
      <span class="lbtn">首页</span>
    </div>
    <div class="cneter">
      <div class="title">可视化数据大屏</div>
    </div>
    <div class="right">
      <span class="rbtn">统计报告</span>
      <span class="time">当前时间: {{ time }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import moment from 'moment'
let time = ref(moment().format('YYYY年MM月DD日 hh:mm:ss'))
</script>

<style scoped lang="scss">
.top {
  display: flex;
  .left {
    flex: 1.5;
    background: url(../../images/dataScreen-header-left-bg.png) no-repeat;
    background-size: cover;
    .lbtn {
      width: 150px;
      height: 40px;
      float: right;
      background: url(../../images/dataScreen-header-btn-bg-l.png) no-repeat;
      background-size: 100% 100%;
      font-size: 20px;
      text-align: center;
      line-height: 40px;
      color: #29fcff;
    }
  }
  .cneter {
    flex: 2;
    height: 74px;
    background: url(../../images/dataScreen-header-center-bg.png) no-repeat;
    line-height: 74px;
    font-size: 30px;
    text-align: center;
    color: #29fcff;
  }
  .right {
    flex: 1.5;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: url(../../images/dataScreen-header-right-bg.png) no-repeat;
    background-size: cover;
    color: #29fcff;
    .rbtn {
      width: 150px;
      height: 40px;
      background: url(../../images/dataScreen-header-btn-bg-r.png) no-repeat;
      font-size: 18px;
      text-align: center;
      line-height: 40px;
    }
    .time {
      font-size: 20px;
    }
  }
}
</style>
