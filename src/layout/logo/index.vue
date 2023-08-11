<template>
  <div class="logo" v-show="setting.isShowLogo">
    <img :src="setting.logoSrc" alt="" srcset="" />
    <p>{{ setting.title }}</p>
  </div>
</template>

<script setup lang="ts">
import setting from '@/setting'
</script>

<style scoped lang="scss">
.logo {
  display: flex;
  width: 100%;
  height: $base-menu-logo-height;
  align-items: center;
  padding: 10px;
  color: white;
  img {
    width: 40px;
    height: 40px;
  }
  p {
    font-size: $base-logo-title-fontSize;
    margin-left: 10px;
  }
}
</style>
