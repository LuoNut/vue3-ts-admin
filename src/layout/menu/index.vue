<template>
  <template v-for="item in menuList" :key="item.path">
    <template v-if="!item.children">
      <!-- 没有children -->
      <el-menu-item v-if="!item.meta.hidden" :index="item.path" @click="goRoute">
        <el-icon><component :is="item.meta.icon"></component></el-icon>
        <span>{{ item.meta.title }}</span>
      </el-menu-item>
    </template>
    <!-- 只有一个children -->
    <template v-if="item.children && item.children.length === 1">
      <el-menu-item v-if="!item.children[0].meta.hidden" :index="item.children[0].path" @click="goRoute">
        <el-icon>
          <component :is="item.children[0].meta.icon"></component>
        </el-icon>
        <span>{{ item.children[0].meta.title }}</span>
      </el-menu-item>
    </template>
    <!-- 有一个以上children -->
    <el-sub-menu v-if="item.children && item.children.length > 1" :index="item.path">
      <template #title>
        <el-icon><component :is="item.meta.icon"></component></el-icon>
        <span>{{ item.meta.title }}</span>
      </template>
      <Menu :menuList="item.children"></Menu>
    </el-sub-menu>
  </template>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
defineProps(['menuList'])
let $router = useRouter()
const goRoute = (ev: any) => {
  $router.push(ev.index)
}
</script>
<script lang="ts">
export default {
  name: 'Menu',
}
</script>

<style scoped></style>
