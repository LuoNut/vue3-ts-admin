//登录接口请求的参数类型
export interface loginFormData {
  username: string
  password: string
}

//返回数据都拥有的类型
export interface ResponseData {
  code: number
  message: string
  ok: string
}

//登录接口返回的数据
export interface loginResponseData extends ResponseData {
  data: string
}

//用户信息接口返回的数据
export interface userInfoReponseData extends ResponseData {
  data: {
    routes: string[]
    buttons: string[]
    roles: string[]
    name: string
    avatar: string
  }
}
