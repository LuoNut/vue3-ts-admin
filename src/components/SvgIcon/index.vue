<template>
  <div>
    <svg :style="{ width, height }">
      <use :xlink:href="prefix + name" :fill="color"></use>
    </svg>
  </div>
</template>

<script setup lang="ts">
defineProps({
  prefix: {
    type: String,
    default: '#icon-',
  },
  name: String,
  color: {
    type: String,
    defult: '',
  },
  height: {
    type: String,
    defult: '16px',
  },
  width: {
    type: String,
    defult: '16px',
  },
})
</script>

<style lang="scss" scoped></style>
