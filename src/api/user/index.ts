import request from '@/utils/request'
import { loginFormData, loginResponseData, userInfoReponseData } from './type'
// import { loginFormData, loginResponseData, userResponseData } from './type'

enum API {
  LOGIN_URL = '/admin/acl/index/login',
  USERINFO_ERL = '/admin/acl/index/info',
  LOGOUT_URL = '/admin/acl/index/logout'
}

export const reqLogin = (data: loginFormData) =>
  request.post<any, loginResponseData>(API.LOGIN_URL, data)

export const reqUserInfo = () =>
  request.get<any, userInfoReponseData>(API.USERINFO_ERL)

  export const reqLogout = () => 
  request.post<any, any>(API.LOGOUT_URL)