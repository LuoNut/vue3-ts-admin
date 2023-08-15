<template>
  <!-- 选择器 -->
  <Category :scene="scene"></Category>

  <!-- table列表 -->
  <el-card style="margin: 10px 0">
    <!-- spu属性显示 -->
    <div v-show="scene === 0">
      <el-button
        type="primary"
        size="default"
        icon="Plus"
        @click="addSpu"
        :disabled="!CategoryStore.c3Id"
      >
        添加SPU
      </el-button>
      <el-table border style="margin: 10px 0" :data="spuData">
        <el-table-column
          label="序号"
          type="index"
          align="center"
        ></el-table-column>
        <el-table-column label="SPU名称" prop="spuName"></el-table-column>
        <el-table-column
          label="SPU描述"
          prop="description"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column label="SPU操作">
          <template #="{ row, $index }">
            <el-button
              type="primary"
              size="small"
              @click=""
              icon="Plus"
              title="添加SPU"
            ></el-button>
            <el-button
              type="success"
              size="small"
              @click="editSpu"
              icon="Edit"
              title="修改SPU"
            ></el-button>
            <el-button
              type="warning"
              size="small"
              @click=""
              icon="View"
              title="查看SPU列表"
            ></el-button>
            <el-button
              type="danger"
              size="small"
              @click=""
              icon="Delete"
              title="删除SPU"
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页器 -->
      <el-pagination
        v-model:current-page="currentPage"
        v-model:page-size="pageSize"
        :page-sizes="[3, 5, 7, 9]"
        background
        layout="prev, pager, next, jumper, -> , sizes ,total"
        :total="total"
        @current-change="getSpuData"
        @size-change="changeSize"
      />
    </div>
    <!-- spu属性添加|修改 -->
    <spuForm v-show="scene === 1" @changeScene="changeScene"></spuForm>
    <!-- sku属性添加 -->
    <skuForm v-show="scene === 2"></skuForm>
  </el-card>
</template>

<script setup lang="ts">
import { reqHasSpu } from '@/api/product/spu'
import { SpuResponseData, records } from '@/api/product/spu/type'
import useCategoryStore from '@/store/modules/useCategoryStore'
import { ref, watch } from 'vue'
import skuForm from './skuForm.vue'
import spuForm from './spuForm.vue'
let scene = ref<number>(0)
let currentPage = ref<number>(1)
let pageSize = ref<number>(3)
let spuData = ref<records>([])
let total = ref<number>(0)

const CategoryStore = useCategoryStore()
watch(
  () => CategoryStore.c3Id,
  () => {
    spuData.value = []
    total.value = 0
    if (CategoryStore.c3Id) {
      getSpuData()
    }
  },
)

/**
 * 增加spu
 */
const addSpu = () => {
  scene.value = 1
}

/**
 * 修改spu
 */
const editSpu = () => {
  scene.value = 1
}
/**
 * 获取三级分类下的spu的数据
 */
const getSpuData = async (pager = 1) => {
  currentPage.value = pager
  const res: SpuResponseData = await reqHasSpu(
    currentPage.value,
    pageSize.value,
    CategoryStore.c3Id,
  )
  if (res.code === 200) {
    spuData.value = res.data.records
    total.value = res.data.total
  }
}

/**
 * 分页器下拉菜单改变显示
 */
const changeSize = () => {
  getSpuData()
}

/**
 * 增加、修改spu取消
 */
const changeScene = (number: number) => {
  scene.value = number
}
</script>

<style scoped></style>
