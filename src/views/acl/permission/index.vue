<template>
  <el-table :data="permissionList" style="width: 100%" row-key="id" border>
    <el-table-column prop="name" label="名称" />
    <el-table-column prop="code" label="权限值" />
    <el-table-column prop="updateTime" label="修改时间" />
    <el-table-column label="操作">
      <template #="{ row, $index }">
        <el-button type="primary" size="small" @click="addPermission(row)" :disabled="row.level === 4">
          {{ row.level === 3 ? '添加功能' : '添加菜单' }}
        </el-button>
        <el-button type="primary" size="small" @click="EditPermission(row)" :disabled="row.level === 1">编辑</el-button>
        <el-popconfirm :title="`确定删除${row.name}吗?`" @confirm="removePermission(row)" width="260px" >
          <template #reference>
            <el-button type="primary" size="small" :disabled="row.level === 1">删除</el-button>
          </template>
        </el-popconfirm>
      </template>
    </el-table-column>
  </el-table>

  <!-- dialog对话框 -->
  <el-dialog v-model="dialogVisible" title="添加菜单" width="30%">
    <el-form>
      <el-form-item label="名称">
        <el-input placeholder="请您输入菜单名称" v-model="permissionParams.name"></el-input>
      </el-form-item>
      <el-form-item label="权限">
        <el-input placeholder="请您输入权限数值" v-model="permissionParams.code"></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="permissionSave">确定</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { addOrUpdataPermission, deletePermission, reqPermissionAll } from '@/api/acl/permission'
import { MenuParams, PermissionData, PermissionDataList } from '@/api/acl/permission/type'
import { ElMessage } from 'element-plus'
import { onMounted, reactive, ref } from 'vue'
const permissionList = ref<PermissionDataList>([])
const dialogVisible = ref<boolean>(false)

/**
 * 获取全部菜单权限数据
 */
const getPermissionData = async () => {
  const res = await reqPermissionAll()
  if (res.code === 200) {
    permissionList.value = res.data
  }
}

const permissionParams = reactive<MenuParams>({
  code: '',
  id: 0,
  level: 0,
  name: '',
  pid: 0,
})
/**
 * 添加菜单权限数据
 */
const addPermission = (row: PermissionData) => {
  Object.assign(permissionParams, {
    code: '',
    id: 0,
    level: 0,
    name: '',
    pid: 0,
  })
  console.log(row)

  permissionParams.level = row.level + 1
  permissionParams.pid = row.id
  dialogVisible.value = true
}

/**
 * 修改菜单权限
 */
const EditPermission = (row: PermissionData) => {
  Object.assign(permissionParams, row)
  dialogVisible.value = true
}

/**
 * 增加或修改权限的确认按钮的回调
 */
const permissionSave = async () => {
  const res = await addOrUpdataPermission(permissionParams)
  if (res.code === 200) {
    ElMessage({
      type: 'success',
      message: '添加成功！',
    })
    getPermissionData()
  } else {
    ElMessage({
      type: 'error',
      message: '添加失败',
    })
  }

  dialogVisible.value = false
}

/**
 * 删除权限的回调
 */
const removePermission = async (row: PermissionData) => {
  const res = await deletePermission(row.id)
  if (res.code === 200) {
    ElMessage({
      type: 'success',
      message: '删除成功！',
    })
    getPermissionData()
  } else {
    ElMessage({
      type: 'error',
      message: '删除失败',
    })
  }
}

onMounted(() => {
  getPermissionData()
})
</script>

<style scoped></style>
