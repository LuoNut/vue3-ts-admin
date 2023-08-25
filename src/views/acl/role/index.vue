<template>
  <!-- 搜索框 -->
  <el-card style="height: 70px">
    <el-form inline class="form">
      <el-form-item label="职位搜索">
        <el-input placeholder="请你输入搜索职位的关键字" v-model="keyword"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" size="default" @click="search" :disabled="!keyword">搜索</el-button>
        <el-button type="primary" size="default" @click="reset">重置</el-button>
      </el-form-item>
    </el-form>
  </el-card>
  <!-- table表格 -->
  <el-card style="margin: 10px 0">
    <el-button type="primary" size="default" @click="addRole" icon="Plus" v-has="`btn.Role.add`">添加职位</el-button>
    <el-table border style="margin: 10px 0" :data="AllRole">
      <el-table-column label="#" align="center" type="index"></el-table-column>
      <el-table-column prop="id" label="ID" align="center" width="60px"></el-table-column>
      <el-table-column prop="roleName" label="职位名称" align="center"></el-table-column>
      <el-table-column prop="createTime" label="创建时间" align="center" show-overflow-tooltip></el-table-column>
      <el-table-column prop="updateTime" label="更新时间" align="center" show-overflow-tooltip></el-table-column>
      <el-table-column label="操作" align="center">
        <template #="{ row, $index }">
          <el-button type="primary" size="small" @click="setPermissions(row)" icon="User" v-has="`btn.Role.assgin`">
            分配权限
          </el-button>
          <el-button type="primary" size="small" @click="editRole(row)" icon="Edit" v-has="`btn.Role.update`">编辑</el-button>
          <el-popconfirm :title="`是否删除${row.roleName}`" @confirm="deleteRole(row)">
            <template #reference>
              <el-button type="primary" size="small" icon="Delete" v-has="`btn.Role.remove`">删除</el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
  </el-card>
  <!-- 分页器 -->
  <el-pagination
    v-model:current-page="currentPage"
    v-model:page-size="pageSize"
    :page-sizes="[10, 20, 30, 40]"
    background
    layout=" prev, pager, next, jumper, ->, total, sizes"
    :total="total"
    @size-change="handleSizeChange"
    @current-change="getAllRole"
  />
  <!-- 添加角色 -->
  <el-dialog v-model="dialogVisible" :title="RoleRarams.id ? '编辑职位' : '添加职位 '">
    <el-form :model="RoleRarams" :rules="rules" ref="form">
      <el-form-item label="职位名称" prop="roleName">
        <el-input placeholder="请您输入职位名称" v-model="RoleRarams.roleName"></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="saveRole">确定</el-button>
      </span>
    </template>
  </el-dialog>

  <!-- 设置权限 -->
  <el-drawer v-model="drawer">
    <template #header>
      <h4>分配菜单与按钮的权限</h4>
    </template>
    <template #default>
      <el-tree
        ref="tree"
        :data="perssionList"
        show-checkbox
        node-key="id"
        default-expand-all
        :default-checked-keys="permissionList"
        :props="defaultProps"
      />
    </template>
    <template #footer>
      <div style="flex: auto">
        <el-button @click="cancelClickPermission">取消</el-button>
        <el-button type="primary" @click="confirmClickPermission">确定</el-button>
      </div>
    </template>
  </el-drawer>
</template>

<script setup lang="ts">
import { AddOrUpdataRole, reqAllRole, reqDeleteRole, setPermission } from '@/api/acl/role'
import { reqAllPermission } from '@/api/acl/role/index'
import { PermissionDataList, RoleData, RoleDataList } from '@/api/acl/role/type'
import useLayoutSettingStore from '@/store/modules/useLayoutSettingStore'
import { ElMessage } from 'element-plus'
import { nextTick, onMounted, reactive, ref } from 'vue'
const currentPage = ref<number>(1)
const pageSize = ref<number>(10)
const keyword = ref<string>('')
const total = ref<number>(0)
const AllRole = ref<RoleDataList>([])
const LayoutSettingStore = useLayoutSettingStore()
const dialogVisible = ref<boolean>(false)
const RoleRarams = ref<RoleData>({
  roleName: '',
})
const form = ref()

const validatorRoleName = (rule: any, value: any, callback: any) => {
  if (value.trim().length >= 2) {
    callback()
  } else {
    callback(new Error('职位名称至少两位'))
  }
}

const rules = reactive({
  roleName: [{ required: true, trigger: 'blur', validator: validatorRoleName }],
})

/**
 * 获取所有权限列表
 */
const getAllRole = async (page = 1) => {
  currentPage.value = page
  const res = await reqAllRole(currentPage.value, pageSize.value, keyword.value)
  if (res.code === 200) {
    total.value = res.data.total
    AllRole.value = res.data.records
  }
}

/**
 * 搜索按钮的回调
 */
const search = () => {
  getAllRole()
}

/**
 * 重置按钮
 */
const reset = () => {
  LayoutSettingStore.refsh = !LayoutSettingStore.refsh
}

/**
 * 分页器下拉菜单改变
 */
const handleSizeChange = () => {
  getAllRole()
}

/**
 * 添加职位
 */
const addRole = async () => {
  Object.assign(RoleRarams.value, {
    id: 0,
    roleName: '',
  })
  dialogVisible.value = true
  nextTick(() => {
    form.value.clearValidate('roleName')
  })
}

/**
 * 编辑职位
 */
const editRole = (row: RoleData) => {
  Object.assign(RoleRarams.value, row)
  dialogVisible.value = true
  nextTick(() => {
    form.value.clearValidate('roleName')
  })
}

/**
 * 点击保存按钮
 */
const saveRole = async () => {
  await form.value.validate()

  const res = await AddOrUpdataRole(RoleRarams.value)
  if (res.code === 200) {
    ElMessage({
      type: 'success',
      message: RoleRarams.value.id ? '修改成功' : '添加成功',
    })
    dialogVisible.value = false
    getAllRole(RoleRarams.value.id ? currentPage.value : 1)
  } else {
    ElMessage({
      type: 'error',
      message: RoleRarams.value.id ? '修改失败' : '添加失败',
    })
    dialogVisible.value = false
  }
}

//设置权限
const drawer = ref<boolean>(false)
const perssionList = ref<PermissionDataList>([])
const permissionList = ref<number[]>([])
const tree = ref()
const defaultProps = {
  children: 'children',
  label: 'name',
}

/**
 * 点击分配权限按钮
 */
const setPermissions = async (row: RoleData) => {
  Object.assign(RoleRarams.value, row)
  const res = await reqAllPermission(RoleRarams.value.id!)
  if (res.code === 200) {
    perssionList.value = res.data
    permissionList.value = filterSelectArr(perssionList.value, [])
  }
  drawer.value = true
}

/**
 * 过滤基本权限的id
 */
const filterSelectArr = (allData: PermissionDataList, initArr: any) => {
  allData.forEach((item) => {
    if (item.select && item.level === 4) {
      initArr.push(item.id)
    }
    if (item.children && item.children.length > 0) {
      filterSelectArr(item.children, initArr)
    }
  })

  return initArr
}

/**
 * 分配权限点击确定按钮
 */
const confirmClickPermission = async () => {
  const pArr1 = tree.value.getCheckedKeys()
  const pArr2 = tree.value.getHalfCheckedKeys()
  const permissionId = pArr1.concat(pArr2)

  const res = await setPermission(RoleRarams.value.id!, permissionId)
  if (res.code === 200) {
    ElMessage({
      type: 'success',
      message: '权限设置成功！',
    })
    window.location.reload()
  } else {
    ElMessage({
      type: 'error',
      message: '权限设置失败',
    })
  }
  drawer.value = false
}

/**
 * 分配权限点击确定按钮
 */
const cancelClickPermission = () => {
  drawer.value = false
}

/**
 * 点击删除的确定按钮
 */
const deleteRole = async (row: RoleData) => {
  console.log(row)

  const res = await reqDeleteRole(row.id!)
  if (res.code === 200) {
    ElMessage({
      type: 'success',
      message: '删除成功！',
    })
    getAllRole(AllRole.value.length > 1 ? currentPage.value : currentPage.value - 1)
  } else {
    ElMessage({
      type: 'error',
      message: '删除失败',
    })
  }
}

onMounted(() => {
  getAllRole()
})
</script>

<style scoped>
.form {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
