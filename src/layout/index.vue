<template>
  <div class="layout">
    <!-- 左边菜单 -->
    <div class="layout_slider" :class="{ fold: LayOutSettingStore.fold }">
      <Logo></Logo>
      <el-scrollbar class="scrollbar">
        <el-menu
          text-color="white"
          background-color="#001529"
          :default-active="$route.path"
          :collapse="LayOutSettingStore.fold ? true : false"
        >
          <Menu :menuList="userStore.menuRoutes"></Menu>
        </el-menu>
      </el-scrollbar>
    </div>
    <!-- 顶部导航 -->
    <div class="layout_tabbar" :class="{ fold: LayOutSettingStore.fold }">
      <Tabbar></Tabbar>
    </div>
    <!-- 右边内容区域 -->
    <div class="layout_main" :class="{ fold: LayOutSettingStore.fold }">
      <Main></Main>
    </div>
  </div>
</template>

<script setup lang="ts">
import Logo from '@/layout/logo/index.vue'
import useUserStore from '@/store/modules/useUserStore'
import Menu from '@/layout/menu/index.vue'
import Main from '@/layout/main/index.vue'
import Tabbar from '@/layout/tabbar/index.vue'
import { useRoute } from 'vue-router'
import useLayOutSettingStore from '@/store/modules/useLayoutSettingStore'
//用户menu数据仓库
let userStore = useUserStore()
//路由跳转
const $route = useRoute()

//获取layout配置的仓库
const LayOutSettingStore = useLayOutSettingStore()
</script>
<script lang="ts">
export default {
  name: 'Layout',
}
</script>

<style scoped lang="scss">
.layout {
  width: 100%;
  height: 100vh;
  .layout_slider {
    width: $base-menu-width;
    height: 100vh;
    background-color: $base-menu-background;
    transition: all 0.3s;

    .scrollbar {
      height: calc(100% - $base-menu-logo-height);
      .el-menu {
        border-right: none;
      }
    }

    &.fold {
      width: $base-menu-min-width;
    }
  }
  .layout_tabbar {
    position: absolute;
    left: $base-menu-width;
    top: 0;
    width: calc(100% - $base-menu-width);
    height: $base-tabbar-height;
    transition: all 0.3s;
    &.fold {
      width: calc(100vw - $base-menu-min-width);
      left: $base-menu-min-width;
    }
  }
  .layout_main {
    position: absolute;
    width: calc(100% - $base-menu-width);
    height: calc(100vh - $base-tabbar-height);
    left: $base-menu-width;
    top: $base-tabbar-height;
    padding: 20px;
    overflow: auto;
    transition: all 0.3s;

    &.fold {
      width: calc(100vw - $base-menu-min-width);
      left: $base-menu-min-width;
    }
  }
}
</style>
