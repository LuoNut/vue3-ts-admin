import { reqLogin, reqUserInfo } from '@/api/user'
import { loginFormData, loginResponseData, userResponseData } from '@/api/user/type'
import { constantRoute } from '@/router/routes'
import { GET_TOKEN, REMOVE_TOKEN, SET_TOKEN } from '@/utils/token'
import { defineStore } from 'pinia'
import { userState } from './type/type'

const useUserStore = defineStore('user', {
  state: (): userState => {
    return {
      token: GET_TOKEN(),
      menuRoutes: constantRoute,
      username: '',
      avatar: ''

    }
  },
  actions: {
    /**
     * 请求登录
     * @param loginFrom
     * @returns
     */
    async userLogin(loginFrom: loginFormData) {
      const result: loginResponseData = await reqLogin(loginFrom)
      if (result.code === 200) {
        this.token = result.data.token as string
        SET_TOKEN(this.token)
        return 'ok'
      } else {
        return Promise.reject(new Error(result.data.message))
      }
    },
    async userInfo() {
      const result: userResponseData = await reqUserInfo()
      if (result.code === 200) {
        this.username = result.data.username
        this.avatar = result.data.avatar
        return 'ok'
      } else {
        return Promise.reject(new Error(result.data.message))
      }
    },
    userLogout() {
      this.token = '',
      this.username = '',
      this.avatar = ''
      REMOVE_TOKEN()
    }
  },
})

export default useUserStore
