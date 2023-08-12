<template>
  <router-view v-slot="{ Component }">
    <transition name="fade">
      <!-- 渲染layout一级路由组件的子路由 -->
      <component :is="Component" v-if="flag"/>
    </transition>
  </router-view>
</template>

<script setup lang="ts">
import useLayoutSettingStore from '@/store/modules/useLayoutSettingStore'
import { nextTick, ref, watch } from 'vue';
const LayoutSettingStore =  useLayoutSettingStore()
let flag = ref(true)
watch(() => LayoutSettingStore.refsh, () => {
  flag.value = false
  nextTick(() => {
    flag.value = true
  })
})
</script>
<script lang="ts">
export default {
  name: 'Main',
}
</script>

<style scoped lang="scss">
.fade-enter-from {
  opacity: 0;
  transform: scale(0);
}

.fade-enter-active {
  transition: all 0.3s;
}

.fade-enter-to {
  opacity: 1;
  transform: scale(1);
}
</style>
