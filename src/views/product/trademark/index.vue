<template>
  <el-card class="box-card">
    <!-- 添加按钮 -->
    <el-button type="primary" @click="addTrademark" icon="Plus">
      添加品牌
    </el-button>
    <!-- 表格 -->
    <el-table style="margin: 10px 0" border :data="trademark">
      <el-table-column label="序号" width="80px" align="center" type="index" />
      <el-table-column label="品牌名称" prop="tmName" />
      <el-table-column label="品牌Logo">
        <template #="{ row }">
          <img :src="row.logoUrl" alt="" style="width: 100px; height: 100px" />
        </template>
      </el-table-column>
      <el-table-column label="品牌操作">
        <template #="{ row }">
          <el-button size="small" type="warning" @click="updateTrademark(row)">
            修改
          </el-button>
          <el-popconfirm
            :title="`确定删除${row.tmName}`"
            icon="delete"
            width="250px"
            @confirm="removeTrademark(row.id)"
          >
            <template #reference>
              <el-button size="small" type="danger">删除</el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页器 -->
    <el-pagination
      @current-change="getHasTrademark"
      @size-change="sizeChange"
      v-model:current-page="pageNo"
      v-model:page-size="limit"
      :page-sizes="[2, 4, 6, 8]"
      background
      layout="prev, pager, next, jumper, ->, total, sizes"
      :total="total"
    />
    <!-- 弹出框 -->
    <el-dialog
      v-model="dialogFormVisible"
      :title="trademarkParams.id ? '修改商品' : '添加商品'"
    >
      <el-form :model="trademarkParams" :rules="rules" ref="formRef">
        <el-form-item label="商品名称" label-width="80px" prop="tmName">
          <el-input v-model="trademarkParams.tmName" />
        </el-form-item>
        <el-form-item label="商品图片" label-width="80px" prop="logoUrl">
          <el-upload
            class="avatar-uploader"
            :show-file-list="false"
            action="/api/admin/product/fileUpload"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img
              v-if="trademarkParams.logoUrl"
              :src="trademarkParams.logoUrl"
              class="avatar"
            />
            <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
          </el-upload>
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="cancel">取消</el-button>
        <el-button type="primary" @click="confirm">确定</el-button>
      </template>
    </el-dialog>
  </el-card>
</template>

<script setup lang="ts">
import { nextTick, onMounted, reactive, ref } from 'vue'
import {
  reqAddAndUpdataTrademark,
  reqHasTrademark,
} from '@/api/product/trademark'
import {
  TradeMark,
  TradeMarkResponseData,
  records,
} from '@/api/product/trademark/type'
import { ElMessage, type UploadProps } from 'element-plus'
import { deleteTrademark } from '@/api/product/trademark/index'

let pageNo = ref<number>(1)
let limit = ref<number>(3)
let total = ref<number>(0)
let trademark = ref<records>([])
let dialogFormVisible = ref(false)
let trademarkParams = reactive<TradeMark>({
  tmName: '',
  logoUrl: '',
})
let formRef = ref()

/**
 * trademarkParams表单 tmName 的校验规则
 * @param rule
 * @param value
 * @param callback
 */
const validatorTmName = (rule: any, value: any, callback: any) => {
  if (value.trim().length >= 2) {
    callback()
  } else {
    callback(new Error('品牌名称必须大于两位'))
  }
}
/**
 * trademarkParams表单 logoUrl 的校验规则
 * @param rule
 * @param value
 * @param callback
 */
const validatorLogoUrl = (rule: any, value: any, callback: any) => {
  if (value) {
    callback()
  } else {
    callback(new Error('图片不能为空'))
  }
}
const rules = {
  tmName: [
    //required:这个字段务必校验,表单项前面出来五角星
    //trigger:代表触发校验规则时机[blur、change]
    { required: true, trigger: 'blur', validator: validatorTmName },
  ],
  logoUrl: [{ required: true, validator: validatorLogoUrl }],
}

/**
 * 请求所有商品数据
 */
const getHasTrademark = async (pager = 1) => {
  pageNo.value = pager
  const res: TradeMarkResponseData = await reqHasTrademark(
    pageNo.value,
    limit.value,
  )
  if (res.code === 200) {
    total.value = res.data.total
    trademark.value = res.data.records
  }
}
/**
 * 改变一个的数据个数时触发
 */
const sizeChange = () => {
  getHasTrademark()
}
/**
 * 添加商品的回调函数
 */
const addTrademark = () => {
  nextTick(() => {
    formRef.value.clearValidate('logoUrl')
    formRef.value.clearValidate('tmName')
  })
  trademarkParams.id = 0
  trademarkParams.tmName = ''
  trademarkParams.logoUrl = ''
  dialogFormVisible.value = true
}
/**
 * 修改商品的回调函数
 */
const updateTrademark = (row: TradeMark) => {
  nextTick(() => {
    formRef.value.clearValidate('logoUrl')
    formRef.value.clearValidate('tmName')
  })

  Object.assign(trademarkParams, row)
  dialogFormVisible.value = true
}
/**
 * 点击弹出框的取消按钮
 */
const cancel = () => {
  dialogFormVisible.value = false
}
/**
 * 点击弹出框的确定按钮
 */
const confirm = async () => {
  await formRef.value.validate()

  const res: any = await reqAddAndUpdataTrademark(trademarkParams)
  console.log(res)

  if (res.code === 200) {
    ElMessage({
      type: 'success',
      message: trademarkParams.id ? '修改品牌成功' : '添加品牌成功',
    })
    dialogFormVisible.value = false
    getHasTrademark(trademarkParams.id ? pageNo.value : 1)
  } else {
    ElMessage({
      type: 'error',
      message: trademarkParams.id ? '修改品牌成功' : '添加品牌成功',
    })
    dialogFormVisible.value = false
  }
}
/**
 * 文件上传前的钩子
 */
const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile) => {
  if (
    rawFile.type == 'image/jpeg' ||
    rawFile.type == 'image/png' ||
    rawFile.type == 'image/gif'
  ) {
    if (rawFile.size / 1024 / 1024 < 4) {
      return true
    } else {
      ElMessage.error('文件大小需要小于4M!')
      return false
    }
  } else {
    ElMessage.error('需要是jpeg，png，gif格式的文件')
    return false
  }
}
/**
 * 文件上传成功后的钩子
 * @param response
 * @param uploadFile
 */
const handleAvatarSuccess: UploadProps['onSuccess'] = (response) => {
  trademarkParams.logoUrl = response.data
  formRef.value.clearValidate('logoUrl')
}
/**
 * 点击删除按钮并确定删除的回调
 */
const removeTrademark = async (id: number) => {
  const res = await deleteTrademark(id)
  if (res.code === 200) {
    ElMessage({
      type: 'success',
      message: '删除成功',
    })
    getHasTrademark(
      trademark.value.length > 1 ? pageNo.value : pageNo.value - 1,
    )
  } else {
    ElMessage({
      type: 'error',
      message: '删除失败',
    })
  }
}

onMounted(() => {
  getHasTrademark()
})
</script>

<style scoped>
.avatar-uploader .avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
</style>
