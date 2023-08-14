import { reqLogin, reqLogout, reqUserInfo } from '@/api/user'
import { constantRoute } from '@/router/routes'
import { GET_TOKEN, REMOVE_TOKEN, SET_TOKEN } from '@/utils/token'
import { defineStore } from 'pinia'
import { userState } from './type/type'
import { loginFormData, loginResponseData, userInfoReponseData } from '@/api/user/type'

const useUserStore = defineStore('user', {
  state: (): userState => {
    return {
      token: GET_TOKEN(),
      menuRoutes: constantRoute,
      username: '',
      avatar: '',
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
        this.token = result.data as string
        SET_TOKEN(this.token)
        return 'ok'
      } else {
        return Promise.reject(new Error(result.data))
      }
    },
    async userInfo() {
      const result: userInfoReponseData = await reqUserInfo()

      if (result.code === 200) {
        this.username = result.data.name
        this.avatar = result.data.avatar
        return 'ok'
      } else {
        return Promise.reject(new Error(result.message))
      }
    },
    async userLogout() {
      let result: any = await reqLogout()
      if (result.code === 200) {
        ;(this.token = ''), (this.username = ''), (this.avatar = '')
        REMOVE_TOKEN()
        return 'ok'
      } else {
        return Promise.reject(new Error(result.message))
      }
    },
  },
})

export default useUserStore
