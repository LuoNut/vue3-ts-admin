<template>
  <div>
    <h1>我是一级路由home{{ userStore.username }}</h1>
  </div>
</template>

<script setup lang="ts">
import useUserStore from "@/store/modules/useUserStore";
const userStore = useUserStore()
</script>

<style scoped></style>
