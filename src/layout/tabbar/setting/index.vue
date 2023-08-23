<template>
  <div class="tabbar_right">
    <el-button size="small" icon="Refresh" circle @click="changeRefsh" />
    <el-button size="small" icon="FullScreen" circle @click="fullScreen" />
    <el-popover placement="top-start" title="主题设置" :width="200" trigger="hover">
      <el-form>
        <el-form-item label="主题颜色">
          <el-color-picker
            @change="changeColor"
            style="margin-left: 24px"
            v-model="color"
            show-alpha
            :predefine="predefineColors"
          />
        </el-form-item>
        <el-form-item label="暗黑模式">
          <el-switch
            v-model="dark"
            classwitchDarks="mt-2"
            inline-prompt
            active-icon="Sunrise"
            inactive-icon="Sunny"
            @change="switchDark"
          />
        </el-form-item>
      </el-form>
      <template #reference>
        <el-button size="small" icon="Setting" circle />
      </template>
    </el-popover>

    <img :src="userStore.avatar" style="width: 24px; height: 24px; margin: 0 10px; border-radius: 50%" />
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
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
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
const logout = async () => {
  await userStore.userLogout()
  $router.push({ path: '/login', query: { redirect: $route.path } })
}

/**
 * 主题模式
 */
const dark = ref<boolean>(false)
const color = ref('rgba(255, 69, 0, 0.68)')
const predefineColors = ref([
  '#ff4500',
  '#ff8c00',
  '#ffd700',
  '#90ee90',
  '#00ced1',
  '#1e90ff',
  '#c71585',
  'rgba(255, 69, 0, 0.68)',
  'rgb(255, 120, 0)',
  'hsv(51, 100, 98)',
  'hsva(120, 40, 94, 0.5)',
  'hsl(181, 100%, 37%)',
  'hsla(209, 100%, 56%, 0.73)',
  '#c7158577',
])
/**
 * 切换暗黑模式
 */
const switchDark = () => {
  const html = document.documentElement
  html.className = dark.value ? 'dark' : ''
}

/**
 * 选择主题颜色
 */
const changeColor = () => {
  // document.documentElement 是全局变量时
  const el = document.documentElement

  // 设置 css 变量
  el.style.setProperty('--el-color-primary', color.value)
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
