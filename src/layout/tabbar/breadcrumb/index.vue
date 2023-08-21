<template>
  <div class="tabbar_left">
    <el-icon @click="changeIcon" style="margin-right: 10px">
      <component :is="LayOutSettingStore.fold ? 'Fold' : 'Expand'"></component>
    </el-icon>
    <el-breadcrumb separator-icon="ArrowRight">
      <el-breadcrumb-item v-for="item in $route.matched" :key="item.path" :to="item.path" v-show="item.meta.title">
        <el-icon>
          <component :is="item.meta.icon"></component>
        </el-icon>
        {{ item.meta.title }}
      </el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script setup lang="ts">
import useLayOutSettingStore from '@/store/modules/useLayoutSettingStore'
import { useRoute } from 'vue-router'
const LayOutSettingStore = useLayOutSettingStore()
const changeIcon = function () {
  LayOutSettingStore.fold = !LayOutSettingStore.fold
}
const $route = useRoute()
</script>
<script lang="ts">
export default {
  name: 'Breadcrumb',
}
</script>
<style scoped lang="scss">
.tabbar_left {
  display: flex;
  align-items: center;
  margin-left: 20px;
}
</style>
@/store/modules/useLayoutSettingStore
