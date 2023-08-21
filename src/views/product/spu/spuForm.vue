<template>
  <el-form label-width="100px">
    <el-form-item label="SPU名称">
      <el-input placeholder="请输入SPU名称" v-model="spuParams.spuName"></el-input>
    </el-form-item>
    <el-form-item label="SPU品牌">
      <el-select v-model="spuParams.tmId">
        <el-option v-for="item in tardemarkData" :key="item.id" :label="item.tmName" :value="item.id"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="SPU描述">
      <el-input type="textarea" placeholder="请输入SPU描述" v-model="spuParams.description"></el-input>
    </el-form-item>
    <el-form-item label="SPU图标">
      <el-upload
        v-model:file-list="imageData"
        action="/api/admin/product/fileUpload"
        list-type="picture-card"
        :on-preview="handlePictureCardPreview"
        :before-upload="beforeUpImg"
      >
        <el-icon><Plus /></el-icon>
      </el-upload>

      <el-dialog v-model="dialogVisible">
        <img w-full :src="dialogImageUrl" alt="Preview Image" style="width: 100%; height: 100%" />
      </el-dialog>
    </el-form-item>
    <el-form-item label="SPU销售属性">
      <el-select v-model="saleAttrIdAndValueName" :placeholder="unSaleAttr.length ? `还未选择${unSaleAttr.length}个` : '无'">
        <el-option :value="`${item.id}:${item.name}`" v-for="item in unSaleAttr" :key="item.id" :label="item.name"></el-option>
      </el-select>
      <el-button
        :disabled="!saleAttrIdAndValueName"
        style="margin-left: 10px"
        lable="SPU销售属性"
        type="primary"
        icon="Plus"
        @click="addSaleAttr"
      >
        添加属性值
      </el-button>
    </el-form-item>
    <el-form-item>
      <el-table border :data="hasSaleArrt">
        <el-table-column label="序号" type="index" align="center" width="80px"></el-table-column>
        <el-table-column label="销售属性名字" width="120px" prop="saleAttrName"></el-table-column>
        <el-table-column label="销售属性值">
          <template #="{ row, $index }">
            <el-tag
              style="margin: 0 5px"
              v-for="(tag, index) in row.spuSaleAttrValueList"
              :key="tag.name"
              closable
              :type="tag.type"
              @close="row.spuSaleAttrValueList.splice(index, 1)"
            >
              {{ tag.saleAttrValueName }}
            </el-tag>
            <el-input
              v-if="row.flag"
              @blur="toLook(row)"
              v-model="row.saleAttrValue"
              size="small"
              style="width: 100px; margin: 0 5px"
            ></el-input>
            <el-button v-else type="primary" icon="Plus" size="small" @click="addSaleValeu(row)"></el-button>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template #="{ row, $index }">
            <el-button type="danger" icon="delete" size="small" @click="hasSaleArrt.splice($index, 1)"></el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-form-item>
    <el-form-item>
      <el-button @click="cancel">取消</el-button>
      <el-button type="primary" @click="confirm" :disabled="hasSaleArrt.length <= 0">保存</el-button>
    </el-form-item>
  </el-form>
</template>

<script setup lang="ts">
import { reqAllTrademark, reqImageList, reqHasArrt, reqBaseArrt } from '@/api/product/spu'
import {
  BaseSaleArrtList,
  ImageList,
  ResponseImageData,
  ResponseSaleArrtData,
  ResponseSaleData,
  ResponseTardemarkData,
  SaleArrt,
  SaleArrtList,
  SaleArrtValue,
  SpuData,
  TrademarkList,
} from '@/api/product/spu/type'
import { computed, ref } from 'vue'
import { addOrUpdataSpu } from '@/api/product/spu'
import { ElMessage } from 'element-plus'
const $emit = defineEmits(['changeScene'])

const tardemarkData = ref<TrademarkList>([])
const imageData = ref<ImageList>([])
const hasSaleArrt = ref<SaleArrtList>([])
const baseSaleArrt = ref<BaseSaleArrtList>([])
const spuParams = ref<SpuData>({
  spuName: '',
  description: '',
  category3Id: '',
  tmId: '',
  spuSaleAttrList: [],
  spuImageList: [],
})
const dialogImageUrl = ref('')
const dialogVisible = ref(false)
//收集增加的销售属性
let saleAttrIdAndValueName = ref('')
/**
 * 未拥有的销售属性
 */
const unSaleAttr = computed(() => {
  let res = baseSaleArrt.value.filter((item1) => {
    return hasSaleArrt.value.every((item2) => {
      return item1.name != item2.saleAttrName
    })
  })
  return res
})

/**
 * 添加销售属性
 */
const addSaleAttr = () => {
  const [baseSaleAttrId, saleAttrName] = saleAttrIdAndValueName.value.split(':')

  let SaleAttr: SaleArrt = {
    baseSaleAttrId,
    saleAttrName,
    spuSaleAttrValueList: [],
  }

  hasSaleArrt.value.push(SaleAttr)

  saleAttrIdAndValueName.value = ''
}

/**
 * 添加销售属性值
 */
const addSaleValeu = (row: SaleArrt) => {
  row.flag = true
  row.saleAttrValue = ''
}

/**
 * 添加销售属性值后变成查看模式
 */
const toLook = (row: SaleArrt) => {
  const { saleAttrValue, baseSaleAttrId } = row

  const newSaleAttrObj: SaleArrtValue = {
    saleAttrValueName: saleAttrValue!,
    baseSaleAttrId,
  }

  if (saleAttrValue!.trim() === '') {
    ElMessage({
      type: 'error',
      message: '属性值不能为空',
    })
    return
  }

  const res = row.spuSaleAttrValueList.find((item) => item.saleAttrValueName === saleAttrValue)
  if (res) {
    ElMessage({
      type: 'error',
      message: '属性值不能重复',
    })
    return
  }

  row.spuSaleAttrValueList.push(newSaleAttrObj)
  row.flag = false
}

/**
 * 获取spu的数据用用于修改
 * @param spu
 */
const getSpuData = async (spu: SpuData) => {
  spuParams.value = spu

  const res1: ResponseTardemarkData = await reqAllTrademark()
  const res2: ResponseImageData = await reqImageList(spu.id as string)
  const res3: ResponseSaleArrtData = await reqHasArrt(spu.id as string)

  const res4: ResponseSaleData = await reqBaseArrt()

  tardemarkData.value = res1.data

  imageData.value = res2.data.map((item) => {
    return {
      name: item.imgName,
      url: item.imgUrl,
    }
  })
  hasSaleArrt.value = res3.data
  baseSaleArrt.value = res4.data
}

/**
 * 用于创建行spu模板
 */
const addSpuData = async (c3Id: number) => {
  spuParams.value = {
    spuName: '',
    description: '',
    category3Id: '',
    tmId: '',
    spuSaleAttrList: [],
    spuImageList: [],
  }
  imageData.value = []
  hasSaleArrt.value = []
  baseSaleArrt.value = []

  spuParams.value.category3Id = c3Id

  const res1: ResponseTardemarkData = await reqAllTrademark()
  const res4: ResponseSaleData = await reqBaseArrt()
  tardemarkData.value = res1.data
  baseSaleArrt.value = res4.data
}

/**
 * 图片预览
 */
const handlePictureCardPreview = (uploadFile: any) => {
  dialogImageUrl.value = uploadFile.url!
  dialogVisible.value = true
}
/**
 * 图片上传限制
 */
const beforeUpImg = (file: any) => {
  if (file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/gif') {
    if (file.size / 1024 / 1024 < 4) {
      ElMessage({
        type: 'success',
        message: '图片上传成功',
      })
      return true
    } else {
      ElMessage({
        type: 'error',
        message: '图片大小不能超过4M',
      })
      return false
    }
  } else {
    ElMessage({
      type: 'error',
      message: '图片只支持jpeg/png/gif格式',
    })
    return false
  }
}

/**
 * 点击取消按钮
 */
const cancel = () => {
  $emit('changeScene', { flag: 0, params: 'cancel' })
}

/**
 * 点击确定按钮
 */
const confirm = async () => {
  spuParams.value.spuImageList = imageData.value.map((item: any) => {
    return {
      imgName: item.name,
      imgUrl: (item.response && item.response.data) || item.url,
    }
  })

  spuParams.value.spuSaleAttrList = hasSaleArrt.value

  const res = await addOrUpdataSpu(spuParams.value)

  if (res.code === 200) {
    ElMessage({
      type: 'success',
      message: spuParams.value.id ? '修改成功' : '添加成功！',
    })
    $emit('changeScene', { flag: 0, params: spuParams.value.id ? 'updata' : 'add' })
  } else {
    ElMessage({
      type: 'success',
      message: spuParams.value.id ? '修改失败' : '添加失败！',
    })
  }
}
defineExpose({ getSpuData, addSpuData })
</script>

<style scoped></style>
