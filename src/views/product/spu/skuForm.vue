<template>
  <el-form label-width="100px">
    <el-form-item label="SKU名称">
      <el-input placeholder="SKU名称" v-model="skuParams.skuName"></el-input>
    </el-form-item>
    <el-form-item label="价格（元）">
      <el-input placeholder="价格（元）" type="number" v-model="skuParams.price"></el-input>
    </el-form-item>
    <el-form-item label="重量（g）">
      <el-input placeholder="重量（g）" v-model="skuParams.weight"></el-input>
    </el-form-item>
    <el-form-item label="SKU描述">
      <el-input placeholder="SKU描述" v-model="skuParams.skuDesc" type="textarea"></el-input>
    </el-form-item>
    <el-form-item label="平台属性">
      <el-form inline>
        <el-form-item v-for="item in arrtData" :key="item.id" :label="item.attrName">
          <el-select v-model="item.attridAndValueid">
            <el-option
              :value="`${item.id}:${sel.id}`"
              v-for="sel in item.attrValueList"
              :key="sel.id"
              :label="sel.valueName"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </el-form-item>
    <el-form-item label="销售属性">
      <el-form inline>
        <el-form-item v-for="item in slaeArrt" :key="item.id" :label="item.saleAttrName">
          <el-select v-model="item.saleidAndValueid">
            <el-option
              :value="`${item.id}:${sel.id}`"
              v-for="sel in item.spuSaleAttrValueList"
              :key="sel.id"
              :label="sel.saleAttrValueName"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </el-form-item>
    <el-form-item>
      <el-table border :data="skuImage" ref="imgTable">
        <el-table-column type="selection" width="80px" />
        <el-table-column label="图片">
          <template #="{ row, $index }">
            <img :src="row.imgUrl" style="width: 100px; height: 100px" />
          </template>
        </el-table-column>
        <el-table-column label="名称" prop="imgName" />
        <el-table-column label="操作">
          <template #="{ row, $index }">
            <el-button size="samll" type="warning" @click="changeImage(row)">设置默认</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="confirm">保存</el-button>
      <el-button @click="cancel">取消</el-button>
    </el-form-item>
  </el-form>
</template>

<script setup lang="ts">
import { reqAttr } from '@/api/product/attr'
import { reqHasArrt, reqImageList, addSku } from '@/api/product/spu'
import { SkuData } from '@/api/product/spu/type'
import { reactive, ref } from 'vue'
import { ElMessage } from 'element-plus'

const $emit = defineEmits(['changeScene'])

const arrtData = ref<any>([])
const slaeArrt = ref<any>([])
const skuImage = ref<any>([])
const skuParams = reactive<SkuData>({
  category3Id: '', //三级分类的ID
  spuId: '', //已有的SPU的ID
  tmId: '', //SPU品牌的ID
  skuName: '', //sku名字
  price: '', //sku价格
  weight: '', //sku重量
  skuDesc: '', //sku的描述
  skuAttrValueList: [],
  skuSaleAttrValueList: [],
  skuDefaultImg: '', //sku图片地址
})
const imgTable = ref()

/**
 * 初始化sku
 */
const initSkuData = async (c1Id: any, c2Id: any, row: any) => {
  skuParams.category3Id = row.category3Id
  skuParams.spuId = row.id
  skuParams.tmId = row.tmId

  const arrtRes = await reqAttr(c1Id, c2Id, row.category3Id)
  const slaeArrtRes = await reqHasArrt(row.id)
  const skuImageRes = await reqImageList(row.id)

  arrtData.value = arrtRes.data
  slaeArrt.value = slaeArrtRes.data
  skuImage.value = skuImageRes.data
}

/**
 * 选择图片
 */
const changeImage = (row: any) => {
  imgTable.value.clearSelection()
  imgTable.value.toggleRowSelection(row, true)
  skuParams.skuDefaultImg = row.imgUrl
}

/**
 * 点击取消
 */
const cancel = () => {
  $emit('changeScene', { flag: 0, Params: '' })
}

/**
 * 点击确定按钮
 */
const confirm = async () => {
  skuParams.skuAttrValueList = arrtData.value.reduce((prev: any, next: any) => {
    if (next.attridAndValueid) {
      const [attrId, valueId] = next.attridAndValueid.split(':')
      prev.push({
        attrId,
        valueId,
      })
    }
    return prev
  }, [])

  skuParams.skuSaleAttrValueList = slaeArrt.value.reduce((prev: any, next: any) => {
    if (next.saleidAndValueid) {
      const [saleAttrId, saleAttrValueId] = next.saleidAndValueid.split(':')
      prev.push({
        saleAttrId,
        saleAttrValueId,
      })
    }
    return prev
  }, [])

  const res = await addSku(skuParams)

  if (res.code === 200) {
    ElMessage({
      type: 'success',
      message: '添加成功',
    })
    $emit('changeScene', { flag: 0, Params: '' })
  } else {
    ElMessage({
      type: 'error',
      message: '添加失败',
    })
  }
}
defineExpose({ initSkuData })
</script>

<style scoped></style>
