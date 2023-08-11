<template>
  <div class="layout">
    <!-- 左边菜单 -->
    <div class="layout_slider">
      <Logo></Logo>
      <el-scrollbar class="scrollbar">
        <el-menu background-color="$base-menu-background" text-color="white">
          <Menu :menuList="userStore.menuRoutes"></Menu>
        </el-menu>
      </el-scrollbar>
    </div>
    <!-- 顶部导航 -->
    <div class="layout_tabbar">222</div>
    <!-- 右边内容区域 -->
    <div class="layout_main">
      <Main></Main>
    </div>
  </div>
</template>

<script setup lang="ts">
import Logo from '@/layout/logo/index.vue'
import useUserStore from '@/store/modules/useUserStore'
import Menu from '@/layout/menu/index.vue'
import Main from '@/layout/main/index.vue'
let userStore = useUserStore()
</script>

<style scoped lang="scss">
.layout {
  width: 100%;
  height: 100vh;
  .layout_slider {
    width: $base-menu-width;
    height: 100vh;
    background-color: $base-menu-background;
    .scrollbar {
      height: calc(100% - $base-menu-logo-height);
    }
  }
  .layout_tabbar {
    position: absolute;
    left: $base-menu-width;
    top: 0;
    width: calc(100% - $base-menu-width);
    height: $base-menu-height;
    background-color: bisque;
  }
  .layout_main {
    position: absolute;
    left: $base-menu-width;
    top: $base-menu-height;
    width: calc(100% - $base-menu-width);
    height: calc(100vh - $base-menu-height);
    overflow: auto;
    padding: 20px;
  }
}
</style>
