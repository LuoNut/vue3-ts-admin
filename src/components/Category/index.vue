<template>
  <el-card>
    <el-form inline>
      <el-form-item label="一级分类">
        <el-select
          v-model="CategoryStore.c1Id"
          @change="handlerC1"
          :disabled="scene"
        >
          <el-option
            v-for="item in CategoryStore.c1Arr"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="二级分类">
        <el-select
          v-model="CategoryStore.c2Id"
          @change="handlerC2"
          :disabled="scene"
        >
          <el-option
            v-for="item in CategoryStore.c2Arr"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="三级分类">
        <el-select
          v-model="CategoryStore.c3Id"
          @change="handlerC3"
          :disabled="scene"
        >
          <el-option
            v-for="item in CategoryStore.c3Arr"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script setup lang="ts">
import useCategoryStore from '@/store/modules/useCategoryStore'
import { onMounted } from 'vue'
defineProps(['scene'])
const CategoryStore = useCategoryStore()

const getC1 = () => {
  CategoryStore.getC1()
}

/**
 * 一级选择器选中值发生变化时触发
 */
const handlerC1 = () => {
  CategoryStore.c2Id = ''
  CategoryStore.c3Arr = []
  CategoryStore.c3Id = ''
  CategoryStore.getC2()
}

/**
 * 二级选择器选中值发生变化时触发
 */
const handlerC2 = () => {
  CategoryStore.c3Id = ''
  CategoryStore.getC3()
}

/**
 * 三级选择器选中值发生变化时触发
 */
const handlerC3 = () => {}

onMounted(() => {
  getC1()
})
</script>

<style scoped></style>
