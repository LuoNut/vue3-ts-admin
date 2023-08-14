<template>
  <!-- 顶部分类 -->
  <Category :scene="scene" />
  <!-- 数据显示表格 -->

  <el-card style="margin: 10px 0">
    <div v-show="scene === 0">
      <el-button
        type="primary"
        icon="Plus"
        :disabled="CategoryStore.c3Id ? false : true"
        @click="addAttr"
      >
        添加属性
      </el-button>
      <el-table border style="margin: 10px 0" :data="AttrArr">
        <el-table-column
          label="序号"
          width="80px"
          type="index"
        ></el-table-column>
        <el-table-column
          label="属性名称"
          width="120px"
          prop="attrName"
        ></el-table-column>
        <el-table-column label="属性值名称">
          <template #="{ row, column, $index }">
            <el-tag
              style="margin: 5px"
              type="success"
              v-for="item in row.attrValueList"
              :key="item.attrId"
            >
              {{ item.valueName }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="120px">
          <template #="{ row, column, $index }">
            <el-button
              type="primary"
              size="small"
              icon="Edit"
              @click="editAttr"
            ></el-button>
            <el-button type="primary" size="small" icon="Delete"></el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div v-show="scene === 1">
      <el-form inline>
        <el-form-item label="属性名称">
          <el-input
            v-model="attrParam.attrName"
            placeholder="请输入属性名称"
          ></el-input>
        </el-form-item>
      </el-form>
      <el-button
        type="primary"
        icon="Plus"
        :disabled="!attrParam.attrName"
        @click="addAttrValue"
      >
        添加属性
      </el-button>
      <el-button @click="cancel">取消</el-button>
      <el-table border style="margin: 10px 0" :data="attrParam.attrValueList">
        <el-table-column
          label="序号"
          width="80px"
          align="center"
          type="index"
        ></el-table-column>
        <el-table-column label="属性值名称">
          <template #="{ row, $index }">
            <el-input v-model="row.valueName"></el-input>
          </template>
        </el-table-column>
        <el-table-column label="属性值操作"></el-table-column>
      </el-table>
      <el-button type="primary" @click="save">保存</el-button>
      <el-button @click="cancel">取消</el-button>
    </div>
  </el-card>
</template>

<script setup lang="ts">
import { addOrUpdataArrt, reqAttr } from '@/api/product/attr'
import { AttrResponseData } from '@/api/product/attr/type'
import useCategoryStore from '@/store/modules/useCategoryStore'
import { reactive, ref, watch } from 'vue'
import { AttrList } from '@/api/product/attr/type'
import { Attr } from '@/api/product/attr/type'
import { ElMessage } from 'element-plus'
const CategoryStore = useCategoryStore()
let AttrArr = ref<AttrList>([])
/**
 * 获取属性值的功能函数
 */
const getAttr = async () => {
  const { c1Id, c2Id, c3Id } = CategoryStore
  const res: AttrResponseData = await reqAttr(c1Id, c2Id, c3Id)
  if (res.code === 200) {
    AttrArr.value = res.data
    console.log(AttrArr.value)
  }
}
//监控三级选择器, 选择后获取数据
watch(
  () => CategoryStore.c3Id,
  () => {
    AttrArr.value = []
    if (!CategoryStore.c3Id) return
    getAttr()
  },
)

let scene = ref<number>(1)
const attrParam = reactive<Attr>({
  attrName: '',
  attrValueList: [],
  categoryId: '',
  categoryLevel: 3,
})

/**
 * 增加属性按钮的回调
 */
const addAttr = () => {
  Object.assign(attrParam, {
    attrName: '',
    attrValueList: [],
    categoryId: CategoryStore.c3Id,
    categoryLevel: 3,
  })
  scene.value = 1
}

/**
 * 修改属性按钮的回调函数
 */
const editAttr = () => {
  Object.assign(attrParam, {
    attrName: '',
    attrValueList: [],
    categoryId: CategoryStore.c3Id,
    categoryLevel: 3,
  })
  scene.value = 1
}

/**
 * 添加属性或修改属性或点击取消回调函数
 */
const cancel = () => {
  scene.value = 0
}

/**
 * 点击添加属性的具体值按钮的回调
 */
const addAttrValue = () => {
  attrParam.attrValueList.push({
    valueName: '',
  })
}
/**
 * 点击添加属性值的确定按钮
 */
const save = async () => {
  const res = await addOrUpdataArrt(attrParam)
  if (res.code === 200) {
    ElMessage({
      type: 'success',
      message: attrParam.id ? '修改成功' : '添加成功',
    })
    scene.value = 0
    getAttr()
  } else {
    ElMessage({
      type: 'error',
      message: attrParam.id ? '修改失败' : '添加失败',
    })
  }
}
</script>

<style scoped></style>
