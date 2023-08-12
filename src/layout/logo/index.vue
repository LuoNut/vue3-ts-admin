<template>
  <div class="logo" v-show="setting.isShowLogo">
    <img :src="setting.logoSrc" alt="" srcset="" />
    <p>{{ setting.title }}</p>
  </div>
</template>

<script setup lang="ts">
import setting from '@/setting'
</script>
<script lang="ts">
export default {
    name: 'Logo'
}
</script>

<style scoped lang="scss">
.logo {
  display: flex;
  height: $base-menu-logo-height;
  width: $base-menu-width;
  align-items: center;
  padding: 20px;
  color: white;

  img {
    width: 25px;
    height: 25px;
  }
  p {
    font-size: $base-logo-title-fontSize;
    margin-left: 10px;
  }
}
</style>
