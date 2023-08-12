<template>
  <div class="tabbar_right">
    <el-button size="small" icon="Refresh" circle @click="changeRefsh" />
    <el-button size="small" icon="FullScreen" circle @click="fullScreen" />
    <img
      :src="userStore.avatar"
      style="width: 24px; height: 24px; margin: 0 10px; border-radius: 50%"
    />
    <el-dropdown>
      <span class="el-dropdown-link">
        {{ userStore.username }}
        <el-icon class="el-icon--right">
          <arrow-down />
        </el-icon>
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item @click="logout">退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script setup lang="ts">
import useLayoutSettingStore from '@/store/modules/useLayoutSettingStore'
import useUserStore from '@/store/modules/useUserStore'
import { useRouter, useRoute } from "vue-router";
const LayoutSettingStore = useLayoutSettingStore()
const userStore = useUserStore()
const $router = useRouter()
const $route = useRoute()
/**
 * main页面刷新
 */
const changeRefsh = () => {
  LayoutSettingStore.refsh = !LayoutSettingStore.refsh
}
/**
 * 全屏模式切换
 */
const fullScreen = () => {
  //判断是否是全屏模式
  let full = document.fullscreenElement
  console.log(full)

  if (!full) {
    //进入全屏模式
    document.documentElement.requestFullscreen()
  } else {
    //退出全屏模式
    document.exitFullscreen()
  }
}
/**
 * 退出登录的回调函数
 */
const logout = () => {
  userStore.userLogout()
  $router.push({ path: '/login', query: {redirect: $route.path}})
}
</script>
<script lang="ts">
export default {
  name: 'Setting',
}
</script>
<style scoped>
.tabbar_right {
  display: flex;
  align-items: center;
}
</style>
