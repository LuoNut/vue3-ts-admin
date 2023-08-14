<template>
  <div class="login_container">
    <el-row>
      <el-col :span="12" :xs="0"></el-col>
      <el-col :span="12" :xs="24">
        <el-form
          class="login_form"
          :model="loginFrom"
          :rules="rules"
          ref="loginForms"
          status-icon
        >
          <h1>Hello</h1>
          <h2>Welcome Admin</h2>
          <el-form-item prop="username">
            <el-input
              v-model="loginFrom.username"
              :prefix-icon="User"
            ></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              v-model="loginFrom.password"
              :prefix-icon="Lock"
              type="password"
              show-password
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button
              :loading="loading"
              class="login_btn"
              type="primary"
              @click="login"
            >
              登录
            </el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { User, Lock } from '@element-plus/icons-vue'
import useUserStore from '@/store/modules/useUserStore'
import { ref, reactive } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ElNotification } from 'element-plus'
import { getTime } from '@/utils/time'

const { userLogin } = useUserStore()
const $router = useRouter()
const $route = useRoute()
const loginFrom = reactive({ username: 'admin', password: 'atguigu123' })
const loading = ref(false)
/**
 * 账号自定义检验规则
 */
const validatorUserName = (rule: any, value: any, callback: any) => {
  if (value.length < 5) {
    callback(new Error('账号不能小于5位'))
  } else if (value.length > 10) {
    callback(new Error('账号不能大于10位'))
  } else {
    callback()
  }
}

/**
 * 密码自定义检验规则
 */
const validatorPassWord = (rule: any, value: any, callback: any) => {
  if (value.length < 6) {
    callback(new Error('密码不能小于6位'))
  } else if (value.length > 10) {
    callback(new Error('密码不能大于10位'))
  } else {
    callback()
  }
}

//表单校验规则
const rules = reactive({
  username: [
    // { required: true, min: 5, message: '账号长度至少为5位', trigger: 'change' },
    { validator: validatorUserName, trigger: 'change' },
  ],
  password: [
    // { required: true, min: 6, message: '密码长度至少为6位', trigger: 'change' },
    { validator: validatorPassWord, trigger: 'change' },
  ],
})

let loginForms = ref()
async function login() {
  await loginForms.value.validate()

  try {
    loading.value = true
    await userLogin(loginFrom)
    $router.push({ path: ($route.query.redirect as string) || '/' })
    loading.value = false
    ElNotification({
      type: 'success',
      title: '你好',
      message: `HI, ${getTime()}好`,
    })
  } catch (error) {
    loading.value = false
    ElNotification({
      type: 'error',
      title: 'ERROR',
      message: (error as Error).message,
    })
  }
}
</script>

<style lang="scss" scoped>
.login_container {
  width: 100%;
  height: 100vh;
  background: url('@/assets/images/background.jpg');
  background-size: cover;
  .login_form {
    position: relative;
    top: 30vh;
    width: 80%;
    background: url('@//assets/images/login_form.png');
    background-size: cover;
    padding: 40px;

    h1 {
      color: white;
      font-size: 40px;
    }

    h2 {
      color: white;
      font-size: 20px;
      margin: 20px 0;
    }

    .login_btn {
      width: 100%;
    }
  }
}
</style>
