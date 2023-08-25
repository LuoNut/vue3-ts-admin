<template>
  <el-card style="height: 80px">
    <el-form inline class="form">
      <el-form-item label="用户名">
        <el-input placeholder="请输入要搜索的用户名" v-model="keyword"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" size="default" @click="search" :disabled="!keyword.length">搜索</el-button>
        <el-button type="primary" size="default" @click="reset">重置</el-button>
      </el-form-item>
    </el-form>
  </el-card>

  <el-card style="margin: 10px 0">
    <el-button type="primary" size="default" @click="addUser" v-has="`btn.User.add`">添加用户</el-button>
    <el-button type="primary" size="default" @click="selectDeleteUser" :disabled="!selectUser.length" v-has="`btn.User.remove`">
      批量删除
    </el-button>

    <el-table border style="margin: 10px 0" :data="userInfoList" @selection-change="seleteUser">
      <el-table-column align="center" type="selection"></el-table-column>
      <el-table-column type="index" align="center" label="#"></el-table-column>
      <el-table-column prop="id" align="center" label="ID"></el-table-column>
      <el-table-column prop="username" align="center" label="用户名字"></el-table-column>
      <el-table-column prop="name" align="center" label="用户名称"></el-table-column>
      <el-table-column prop="roleName" align="center" label="用户角色"></el-table-column>
      <el-table-column prop="createTime" align="center" show-overflow-tooltip label="创建时间"></el-table-column>
      <el-table-column prop="updateTime" align="center" show-overflow-tooltip label="更新时间"></el-table-column>
      <el-table-column prop="" align="center" label="操作" width="300px">
        <template #="{ row, $index }">
          <el-button type="primary" size="small" @click="setRole(row)" icon="User" v-has="`btn.User.assgin`">分配角色</el-button>
          <el-button type="primary" size="small" @click="updataUser(row)" icon="Edit" v-has="`btn.User.update`">编辑</el-button>
          <el-popconfirm :title="`是否要删除${row.username}?`" @confirm="deleteUser(row)" width="200px">
            <template #reference>
              <el-button type="primary" size="small" icon="Delete" v-has="`btn.User.remove`">删除</el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination
      v-model:current-page="currentPage"
      v-model:page-size="pageSize"
      :page-sizes="[5, 7, 9, 11]"
      background
      layout="prev, pager, next, jumpe, ->, total, sizes"
      :total="total"
      @current-change="getUserinfo"
      @size-change="changePageSize"
    />
  </el-card>

  <!-- 添加/修改用户 -->
  <el-drawer v-model="drawer">
    <template #header>
      <h4>{{ userParams.id ? '修改用户' : '添加用户' }}</h4>
    </template>
    <template #default>
      <el-form :model="userParams" :rules="rules" ref="refForm">
        <el-form-item label="用户姓名" prop="username">
          <el-input v-model="userParams.username" placeholder="请输入用户姓名"></el-input>
        </el-form-item>
        <el-form-item label="用户昵称" prop="name">
          <el-input v-model="userParams.name" placeholder="请输入用户昵称"></el-input>
        </el-form-item>
        <el-form-item label="用户密码" prop="password" v-if="!userParams.id">
          <el-input v-model="userParams.password" placeholder="请输入用户密码"></el-input>
        </el-form-item>
      </el-form>
    </template>
    <template #footer>
      <div style="flex: auto">
        <el-button @click="cancelClick">取消</el-button>
        <el-button type="primary" @click="save">确定</el-button>
      </div>
    </template>
  </el-drawer>

  <!-- 分配角色 -->
  <el-drawer v-model="drawerRole">
    <template #header>
      <h4>分配角色（职位）</h4>
    </template>
    <template #default>
      <el-form>
        <el-form-item label="用户姓名">
          <el-input v-model="userParams.username" disabled></el-input>
        </el-form-item>
        <el-form-item label="职位列表">
          <el-checkbox v-model="checkAll" :indeterminate="isIndeterminate" @change="handleCheckAllChange">全选</el-checkbox>
          <el-checkbox-group v-model="userRole" @change="handleCheckedCitiesChange">
            <el-checkbox v-for="(role, index) in allRole" :key="index" :label="role">{{ role.roleName }}</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
      </el-form>
    </template>
    <template #footer>
      <div style="flex: auto">
        <el-button @click="cancelSetRole">取消</el-button>
        <el-button type="primary" @click="confirmClick">确定</el-button>
      </div>
    </template>
  </el-drawer>
</template>

<script setup lang="ts">
import { nextTick, onMounted, reactive, ref } from 'vue'
import { reqAllUserInfo, addAndUpdataInfo, AllRoleData } from '@/api/acl/user'
import { RoleDataList, SetUserParams, userInfo } from '@/api/acl/user/type'
import { ElMessage } from 'element-plus'
import { RemoveUser, SelectRemoveUser, setUserRole } from '@/api/acl/user/index'
import useLayoutSettingStore from '@/store/modules/useLayoutSettingStore'

let currentPage = ref<number>(1)
let pageSize = ref<number>(5)
let total = ref<number>(0)
let userInfoList = ref<userInfo[]>([])
let drawer = ref<boolean>(false)
let userParams = ref<userInfo>({
  username: '',
  name: '',
  password: '',
})
let refForm = ref()

const validatorUsername = (rule: any, value: any, callback: any) => {
  if (value.trim().length >= 5) {
    callback()
  } else {
    callback(new Error('用户姓名至少需要五位'))
  }
}
const validatorName = (rule: any, value: any, callback: any) => {
  if (value.trim().length >= 5) {
    callback()
  } else {
    callback(new Error('用户昵称至少需要五位'))
  }
}
const validatorPassword = (rule: any, value: any, callback: any) => {
  if (value.trim().length >= 6) {
    callback()
  } else {
    callback(new Error('用户密码至少需要六位'))
  }
}
/**
 * 验证规则
 */
const rules = reactive({
  username: [{ requeired: true, validator: validatorUsername, trigger: 'blur' }],
  name: [{ requeired: true, validator: validatorName, trigger: 'blur' }],
  password: [{ requeired: true, validator: validatorPassword, trigger: 'blur' }],
})

//搜索功能
let keyword = ref<string>('')
const LayoutSettingStore = useLayoutSettingStore()
const search = () => {
  getUserinfo()
}
const reset = () => {
  LayoutSettingStore.refsh = !LayoutSettingStore.refsh
}

/**
 * 获取所有用户信息
 */
const getUserinfo = async (page = 1) => {
  currentPage.value = page
  const res = await reqAllUserInfo(currentPage.value, pageSize.value, keyword.value)
  if (res.code === 200) {
    total.value = res.data.total
    userInfoList.value = res.data.records
  }
}

/**
 * 分页器下拉菜单改变
 */
const changePageSize = () => {
  getUserinfo()
}

/**
 * 添加用户
 */
const addUser = () => {
  Object.assign(userParams.value, {
    id: 0,
    username: '',
    name: '',
    password: '',
  })
  drawer.value = true
  nextTick(() => {
    refForm.value.clearValidate('username')
    refForm.value.clearValidate('name')
    refForm.value.clearValidate('password')
    // refForm.value.resetFields()
  })
}

/**
 * 修改用户
 */
const updataUser = (row: userInfo) => {
  userParams.value = row
  drawer.value = true

  nextTick(() => {
    refForm.value.clearValidate('username')
    refForm.value.clearValidate('name')
  })
}

/**
 * 添加或修改用户后点击取消按钮
 */
const cancelClick = () => {
  drawer.value = false
}

/**
 * 添加或修改用户后点击确定按钮
 */
const save = async () => {
  //验证整个表单
  await refForm.value.validate()

  const res = await addAndUpdataInfo(userParams.value)
  if (res.code === 200) {
    ElMessage({
      type: 'success',
      message: userParams.value.id ? '修改成功' : '新增成功',
    })
    drawer.value = false
    window.location.reload()
  } else {
    ElMessage({
      type: 'error',
      message: userParams.value.id ? '修改失败' : '新增失败',
    })
    drawer.value = false
  }
}

//分配角色
let checkAll = ref<boolean>(false)
let isIndeterminate = ref(true)
let drawerRole = ref<boolean>(false)
let allRole = ref<RoleDataList>([])
let userRole = ref<RoleDataList>([])
let selectUser = ref<userInfo[]>([])
const setRole = async (row: userInfo) => {
  userParams.value = row

  const res = await AllRoleData(userParams.value.id!)
  if (res.code === 200) {
    allRole.value = res.data.allRolesList
    userRole.value = res.data.assignRoles
    drawerRole.value = true
  }
}

/**
 * 全选按钮
 */
const handleCheckAllChange = (val: boolean) => {
  userRole.value = val ? allRole.value : []
  isIndeterminate.value = false
}

/**
 * 勾选单个属性的回调
 */
const handleCheckedCitiesChange = (val: RoleDataList) => {
  userRole.value = val
  checkAll.value = allRole.value.length === val.length
  isIndeterminate.value = val.length > 0 && val.length != allRole.value.length
}

/**
 * 点击确定按钮
 */
const confirmClick = async () => {
  let data: SetUserParams = {
    roleIdList: userRole.value.map((item) => item.id!),
    userId: userParams.value.id!,
  }

  const res = await setUserRole(data)
  if (res.code === 200) {
    ElMessage({
      type: 'success',
      message: '设置角色成功！',
    })
    drawerRole.value = false
    getUserinfo(currentPage.value)
  } else {
    ElMessage({
      type: 'error',
      message: '设置角色失败',
    })
  }
}

/**
 * 点击取消按钮
 */
const cancelSetRole = () => {
  drawerRole.value = false
}

/**
 * 点击删除按钮
 */
const deleteUser = async (row: userInfo) => {
  const res: any = await RemoveUser(row.id!)
  if (res.code === 200) {
    ElMessage({
      type: 'success',
      message: '删除成功！',
    })
    getUserinfo(userInfoList.value.length > 1 ? currentPage.value : currentPage.value - 1)
  } else {
    ElMessage({
      type: 'error',
      message: '删除失败！',
    })
  }
}

/**
 * tabble选项发送变化时触发该事件
 */
const seleteUser = (val: any) => {
  selectUser.value = val
}

/**
 * 批量删除按钮的回调
 */
const selectDeleteUser = async () => {
  let idList = selectUser.value.map((item) => item.id!)
  const res: any = await SelectRemoveUser(idList)
  if (res.code === 200) {
    ElMessage({
      type: 'success',
      message: '删除成功！',
    })
    getUserinfo(userInfoList.value.length > 1 ? currentPage.value : currentPage.value - 1)
  } else {
    ElMessage({
      type: 'error',
      message: '删除失败！',
    })
  }
}

onMounted(() => {
  getUserinfo()
})
</script>

<style scoped>
.form {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
