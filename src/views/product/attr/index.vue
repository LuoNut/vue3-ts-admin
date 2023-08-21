<template>
  <!-- 顶部分类 -->
  <Category :scene="scene" />
  <!-- 数据显示表格 -->

  <el-card style="margin: 10px 0">
    <div v-show="scene === 0">
      <el-button type="primary" icon="Plus" :disabled="CategoryStore.c3Id ? false : true" @click="addAttr">添加属性</el-button>
      <el-table border style="margin: 10px 0" :data="AttrArr">
        <el-table-column label="序号" width="80px" type="index"></el-table-column>
        <el-table-column label="属性名称" width="120px" prop="attrName"></el-table-column>
        <el-table-column label="属性值名称">
          <template #="{ row, column, $index }">
            <el-tag style="margin: 5px" type="success" v-for="item in row.attrValueList" :key="item.attrId">
              {{ item.valueName }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="120px">
          <template #="{ row, column, $index }">
            <el-button type="primary" size="small" icon="Edit" @click="editAttr(row)"></el-button>

            <el-popconfirm :title="`是否删除${row.attrName}属性`" @confirm="deleteArrt(row.id)" width="200px">
              <template #reference>
                <el-button type="primary" size="small" icon="Delete"></el-button>
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div v-show="scene === 1">
      <el-form inline>
        <el-form-item label="属性名称">
          <el-input v-model="attrParam.attrName" placeholder="请输入属性名称"></el-input>
        </el-form-item>
      </el-form>
      <el-button type="primary" icon="Plus" :disabled="!attrParam.attrName" @click="addAttrValue">添加属性</el-button>
      <el-button @click="cancel">取消</el-button>
      <el-table border style="margin: 10px 0" :data="attrParam.attrValueList">
        <el-table-column label="序号" width="80px" align="center" type="index"></el-table-column>
        <el-table-column label="属性值名称">
          <template #="{ row, $index }">
            <el-input v-model="row.valueName" v-if="row.flag" @blur="toLook(row, $index)" :ref="(vc: any) => (inputArr[$index] = vc)"></el-input>
            <div v-else @click="toEdit(row, $index)">
              {{ row.valueName }}
            </div>
          </template>
        </el-table-column>
        <el-table-column label="属性值操作">
          <template #="{ row, $index }">
            <el-button size="small" type="danger" icon="Delete" @click="attrParam.attrValueList.splice($index, 1)"></el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-button type="primary" @click="save">保存</el-button>
      <el-button @click="cancel">取消</el-button>
    </div>
  </el-card>
</template>

<script setup lang="ts">
import { addOrUpdataArrt, reqAttr } from '@/api/product/attr'
import { AttrResponseData, AttrValue } from '@/api/product/attr/type'
import useCategoryStore from '@/store/modules/useCategoryStore'
import { nextTick, onBeforeUnmount, reactive, ref, watch } from 'vue'
import { AttrList } from '@/api/product/attr/type'
import { Attr } from '@/api/product/attr/type'
import { ElMessage } from 'element-plus'
import { reqDeleteAttr } from '@/api/product/attr/index'
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

const deleteArrt = async (attId: number) => {
  console.log(attId)

  const res: any = await reqDeleteAttr(attId)
  console.log(res)

  if (res.code === 200) {
    ElMessage({
      type: 'success',
      message: '删除成功！',
    })
    getAttr()
  } else {
    ElMessage({
      type: 'error',
      message: '删除失败！',
    })
  }
}

let scene = ref<number>(0)
let inputArr = ref<any>([])
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
const editAttr = (row: Attr) => {
  Object.assign(attrParam, JSON.parse(JSON.stringify(row)))
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
    flag: true,
  })

  nextTick(() => {
    inputArr.value[attrParam.attrValueList.length - 1].focus()
  })
}
/**
 * 添加属性值后变成查看模式
 */
const toLook = (row: AttrValue, $index: number) => {
  //非法情况判断, row.valueName为空
  if (row.valueName.trim() == '') {
    attrParam.attrValueList.splice($index, 1)
    ElMessage({
      type: 'error',
      message: '属性值不能为空！',
    })
    return
  }

  //非法情况判断, row.valueName重复
  let repeat = attrParam.attrValueList.find((item) => {
    if (item != row) {
      return item.valueName === row.valueName
    }
  })

  if (repeat) {
    attrParam.attrValueList.splice($index, 1)
    ElMessage({
      type: 'error',
      message: '属性值不能重复！',
    })
    return
  }

  row.flag = false
}
/**
 * 添加属性值后变成编辑模式
 */
const toEdit = (row: AttrValue, $index: number) => {
  row.flag = true

  nextTick(() => {
    inputArr.value[$index].focus()
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

/**
 * 组件销毁时清除pinia相关数据
 */
onBeforeUnmount(() => {
  CategoryStore.$reset()
})
</script>

<style scoped></style>
