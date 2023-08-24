<template>
  <!-- 选择器 -->
  <Category :scene="scene"></Category>

  <!-- table列表 -->
  <el-card style="margin: 10px 0">
    <!-- spu属性显示 -->
    <div v-show="scene === 0">
      <el-button type="primary" size="default" icon="Plus" @click="addSpu" :disabled="!CategoryStore.c3Id" v-has="`btn.Spu.add`">添加SPU</el-button>
      <el-table border style="margin: 10px 0" :data="spuData">
        <el-table-column label="序号" type="index" align="center"></el-table-column>
        <el-table-column label="SPU名称" prop="spuName"></el-table-column>
        <el-table-column label="SPU描述" prop="description" show-overflow-tooltip></el-table-column>
        <el-table-column label="SPU操作">
          <template #="{ row, $index }">
            <el-button type="primary" size="small" @click="addSku(row)" icon="Plus" title="添加SKU" v-has="`btn.Spu.addsku`"></el-button>
            <el-button type="success" size="small" @click="editSpu(row)" icon="Edit" title="修改SPU" v-has="`btn.Spu.update`"></el-button>
            <el-button type="warning" size="small" @click="showSkudata(row)" icon="View" title="查看SPU列表" v-has="`btn.Spu.skus`"></el-button>
            <el-popconfirm :title="`你确定要删除${row.spuName}`" @confirm="deleteSpu(row)">
              <template #reference>
                <el-button type="danger" size="small" icon="Delete" title="删除SPU" v-has="`btn.Spu.delete`"></el-button>
              </template>
            </el-popconfirm>
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
        @current-change="getAllSpuData"
        @size-change="changeSize"
      />
    </div>
    <!-- spu属性添加|修改 -->
    <spuForm ref="spuVC" v-show="scene === 1" @changeScene="changeScene"></spuForm>
    <!-- sku属性添加 -->
    <skuForm ref="skuVC" v-show="scene === 2" @changeScene="changeScene"></skuForm>
    <!-- dialog对话框 -->
    <el-dialog v-model="dlgIsShow" title="SKU列表">
      <el-table border :data="skuData">
        <el-table-column label="SKU名字" prop="skuName"></el-table-column>
        <el-table-column label="SKU价格" prop="price"></el-table-column>
        <el-table-column label="SKU重量" prop="weight"></el-table-column>
        <el-table-column label="SKU图片">
          <template #="{ row, $index }">
            <img :src="row.skuDefaultImg" alt="" style="widows: 100px; height: 100px" />
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>
  </el-card>
</template>

<script setup lang="ts">
import { reqHasSpu, ReqAllSku, removeSpu } from '@/api/product/spu'
import { SpuData, SpuResponseData, records, SkuData } from '@/api/product/spu/type'
import useCategoryStore from '@/store/modules/useCategoryStore'
import { ref, watch } from 'vue'
import skuForm from './skuForm.vue'
import spuForm from './spuForm.vue'
import { ElMessage } from 'element-plus'
let scene = ref<number>(0)
let currentPage = ref<number>(1)
let pageSize = ref<number>(3)
let spuData = ref<records>([])
let total = ref<number>(0)
let dlgIsShow = ref<boolean>(false)
let skuData = ref<SkuData[]>([])

const CategoryStore = useCategoryStore()
watch(
  () => CategoryStore.c3Id,
  () => {
    spuData.value = []
    total.value = 0
    if (CategoryStore.c3Id) {
      getAllSpuData()
    }
  },
)

const spuVC = ref()
const skuVC = ref()

/**
 * 增加spu
 */
const addSpu = () => {
  spuVC.value.addSpuData(CategoryStore.c3Id)
  scene.value = 1
}

/**
 * 修改spu
 */
const editSpu = (row: SpuData) => {
  spuVC.value.getSpuData(row)
  scene.value = 1
}
/**
 * 获取三级分类下的spu的数据
 */
const getAllSpuData = async (pager = 1) => {
  currentPage.value = pager
  const res: SpuResponseData = await reqHasSpu(currentPage.value, pageSize.value, CategoryStore.c3Id)
  if (res.code === 200) {
    spuData.value = res.data.records
    total.value = res.data.total
  }
}

/**
 * 分页器下拉菜单改变显示
 */
const changeSize = () => {
  getAllSpuData()
}

/**
 * 增加、修改spu取消
 */
const changeScene = (data: any) => {
  scene.value = data.flag
  if (data.params === 'updata') {
    getAllSpuData(currentPage.value)
  } else if (data.params === 'add') {
    getAllSpuData()
  }
}

/**
 * 增加sku
 */
const addSku = (row: any) => {
  scene.value = 2
  skuVC.value.initSkuData(CategoryStore.c1Id, CategoryStore.c2Id, row)
}

/**
 * 显示sku列表
 */
const showSkudata = async (row: any) => {
  const res = await ReqAllSku(row.id)
  if (res.code === 200) {
    skuData.value = res.data
    dlgIsShow.value = true
  }
}

/**
 * 删除spu
 */
const deleteSpu = async (row: SpuData) => {
  const res = await removeSpu(row.id as string)
  if (res.code === 200) {
    ElMessage({
      type: 'success',
      message: '删除成功',
    })
    getAllSpuData(spuData.value.length === 1 ? currentPage.value - 1 : currentPage.value)
  } else {
    ElMessage({
      type: 'error',
      message: '删除失败',
    })
  }
}
</script>

<style scoped></style>
