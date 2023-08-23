<template>
  <el-card>
    <el-table border :data="skuArr">
      <el-table-column label="序号" type="index" align="center" width="80px"></el-table-column>
      <el-table-column prop="skuName" label="名称" width="200px" show-overflow-tooltip></el-table-column>
      <el-table-column prop="skuDesc" label="描述" width="200px" show-overflow-tooltip></el-table-column>
      <el-table-column label="图片" width="200px">
        <template #="{ row, $index }">
          <img :src="row.skuDefaultImg" alt="" style="width: 100px; height: 100px" />
        </template>
      </el-table-column>
      <el-table-column prop="weight" label="重量" width="200px"></el-table-column>
      <el-table-column prop="price" label="价格" width="200px"></el-table-column>
      <el-table-column label="操作" width="250px" fixed="right">
        <template #="{ row, $index }">
          <el-button type="primary" size="default" @click="upDataSku(row)" :icon="row.isSale ? 'Bottom' : 'Top'"></el-button>
          <el-button type="primary" size="default" @click="EditSku" icon="Edit"></el-button>
          <el-button type="primary" size="default" @click="showSkuInfo(row)" icon="InfoFilled"></el-button>
          <el-popconfirm :title="`是否删除${row.skuName}商品?`" @confirm="removeSku(row)" style="width: 200px">
            <template #reference>
              <el-button type="primary" size="default" @click="" icon="Delete"></el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页器 -->
    <el-pagination
      v-model:current-page="currentPage"
      v-model:page-size="pageSize"
      :page-sizes="[10, 20, 30, 40]"
      background
      layout=" prev, pager, next, jumper, ->, total, sizes,"
      :total="total"
      @size-change="handler"
      @current-change="getSkuData"
    />
    <!-- drawer -->
    <el-drawer v-model="showDrawer">
      <template #header>
        <h4>查看商品详情</h4>
      </template>
      <template #default>
        <el-row style="margin: 10px 0">
          <el-col :span="6">名称</el-col>
          <el-col :span="18">{{ skuInfo.skuName }}</el-col>
        </el-row>
        <el-row style="margin: 10px 0">
          <el-col :span="6">描述</el-col>
          <el-col :span="18">{{ skuInfo.skuDesc }}</el-col>
        </el-row>
        <el-row style="margin: 10px 0">
          <el-col :span="6">价格</el-col>
          <el-col :span="18">{{ skuInfo.price }}</el-col>
        </el-row>
        <el-row style="margin: 10px 0">
          <el-col :span="6">平台属性</el-col>
          <el-col :span="18">
            <el-tag style="margin: 5px" v-for="item in skuInfo.skuAttrValueList" :key="item.attrId">{{ item.valueName }}</el-tag>
          </el-col>
        </el-row>
        <el-row style="margin: 10px 0">
          <el-col :span="6">销售属性</el-col>
          <el-col :span="18">
            <el-tag style="margin: 5px" v-for="item in skuInfo.skuSaleAttrValueList">{{ item.saleAttrValueName }}</el-tag>
          </el-col>
        </el-row>
        <el-row style="margin: 10px 0">
          <el-col :span="6">商品图片</el-col>
          <el-col :span="18">
            <el-carousel :interval="4000" type="card" height="200px">
              <el-carousel-item v-for="item in skuInfo.skuImageList" :key="item.id" indicator-position="none">
                <img :src="item.imgUrl" alt="" style="width: auto; height: 100%" />
              </el-carousel-item>
            </el-carousel>
          </el-col>
        </el-row>
      </template>
    </el-drawer>
  </el-card>
</template>

<script setup lang="ts">
import { cancelSku, onSku, reqAllSku, reqDeleteSku, reqSkuInfo } from '@/api/product/sku'
import { SkuData } from '@/api/product/sku/type'
import { ElMessage } from 'element-plus'
import { onMounted, ref } from 'vue'

let currentPage = ref<number>(1)
let pageSize = ref<number>(10)
let total = ref<number>(0)
let skuArr = ref<SkuData[]>([])
let showDrawer = ref<boolean>(false)
let skuInfo = ref<any>({})

/**
 * 获取sku数据
 */
const getSkuData = async (page = 1) => {
  currentPage.value = page
  const res = await reqAllSku(currentPage.value, pageSize.value)
  console.log(res)
  if (res.code === 200) {
    total.value = res.data.total
    skuArr.value = res.data.records
  }
}

/**
 * 分页器下拉菜单发生改变时触发
 */
const handler = () => {
  getSkuData()
}

/**
 * 更新sku状态
 */
const upDataSku = async (row: SkuData) => {
  if (row.isSale == 1) {
    const res = await cancelSku(row.id!)
    if (res.code === 200) {
      ElMessage({
        type: 'success',
        message: '下架成功！',
      })
      getSkuData(currentPage.value)
    } else {
      ElMessage({
        type: 'error',
        message: '下架失败！',
      })
    }
  } else {
    const res = await onSku(row.id!)
    if (res.code === 200) {
      ElMessage({
        type: 'success',
        message: '上架成功！',
      })
      getSkuData(currentPage.value)
    } else {
      ElMessage({
        type: 'error',
        message: '上架失败！',
      })
    }
  }
}

/**
 * 修改sku
 */
const EditSku = () => {
  ElMessage({
    type: 'warning',
    message: '正在开发',
  })
}

/**
 * 显示sku的信息
 */
const showSkuInfo = async (row: SkuData) => {
  const res = await reqSkuInfo(row.id!)
  if (res.code === 200) {
    skuInfo.value = res.data
  } else {
    ElMessage({
      type: 'error',
      message: '获取内容出错',
    })
  }
  showDrawer.value = true
}

/**
 * 删除sku
 */
const removeSku = async (row: SkuData) => {
  const res = await reqDeleteSku(row.id)
  if (res.code === 200) {
    ElMessage({
      type: 'success',
      message: '删除成功',
    })
    getSkuData(skuArr.value.length > 1 ? currentPage.value : currentPage.value - 1)
  } else {
    ElMessage({
      type: 'error',
      message: '删除失败',
    })
  }
}

onMounted(() => {
  getSkuData()
})
</script>

<style scoped>
.el-carousel__item h3 {
  color: #475669;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
  text-align: center;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
</style>
