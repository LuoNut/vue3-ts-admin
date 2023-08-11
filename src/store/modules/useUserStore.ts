import { reqLogin } from '@/api/user'
import { loginFormData, loginResponseData } from '@/api/user/type'
import { constantRoute } from '@/router/routes'
import { GET_TOKEN, SET_TOKEN } from '@/utils/token'
import { defineStore } from 'pinia'
import { userState } from './type/type'

const useUserStore = defineStore('user', {
  state: (): userState => {
    return {
      token: GET_TOKEN(),
      menuRoutes: constantRoute,
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
  },
})

export default useUserStore
