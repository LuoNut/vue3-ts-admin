<template>
  <el-card>
    <div class="box">
      <img class="img" :src="userStore.avatar" alt="" />
      <div class="title">
        <h3 class="user">{{ userStore.username + getTime() + '好' }}</h3>
        <p class="text">admin后台管理系统</p>
      </div>
    </div>
  </el-card>
  <div class="buttom">
    <SvgIcon name="welcome" width="600px" height="300px"></SvgIcon>
  </div>
</template>

<script setup lang="ts">
import useUserStore from '@/store/modules/useUserStore'
import { getTime } from '@/utils/time'
const userStore = useUserStore()
</script>

<style scoped lang="scss">
.box {
  display: flex;
  .img {
    width: 100px;
    height: 100px;
    border-radius: 50%;
  }
  .title {
    margin: 0 30px;
    .user {
      font-size: 30px;
      font-weight: 900;
      margin: 10px 0;
    }
    .text {
      margin: 20px 0 0 0;
      font-style: italic;
      color: skyblue;
    }
  }
}
.buttom {
  display: flex;
  justify-content: center;
  margin: 70px 0 0 0;
}
</style>
