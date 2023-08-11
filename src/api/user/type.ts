//登录接口请求的参数类型
export interface loginFormData {
  username: string
  password: string
}

interface responseData {
  token?: string
  message?: string
}
//登录接口返回的参数类型
export interface loginResponseData {
  code: number
  data: responseData
}

interface userData {
  userId: number
  avatar: string
  username: string
  password: string
  desc: string
  roles: string[]
  button: string[]
  routes: string[]
  token: string
}

//定义获取用户信息返回数据类型
export interface userResponseData {
  code: number
  data: userData
}
