<template>
  <div class="tabbar">
    <!-- tabbar左侧 -->

      <Breadcrumb></Breadcrumb>

    <!-- tabbar右侧 -->

      <Setting></Setting>

  </div>
</template>

<script setup lang="ts">
import Breadcrumb from "@/layout/tabbar/breadcrumb/index.vue";
import Setting from "@/layout/tabbar/setting/index.vue";
</script>
<script lang="ts">
export default {
  name: 'Tabbar',
}
</script>


<style scoped lang="scss">
.tabbar {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
}

</style>
