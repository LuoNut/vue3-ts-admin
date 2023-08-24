import { reqLogin, reqLogout, reqUserInfo } from '@/api/user'
import { constantRoute, asyncRoute, anyRoute } from '@/router/routes'
import { GET_TOKEN, REMOVE_TOKEN, SET_TOKEN } from '@/utils/token'
import { defineStore } from 'pinia'
import { userState } from './type/type'
import { loginFormData, loginResponseData, userInfoReponseData } from '@/api/user/type'
import router from '@/router'
//@ts-ignore
import cloneDeep from 'lodash/cloneDeep'

const filterAsyncRoute = (asyncRoute: any, routes: any) => {
  return asyncRoute.filter((item: any) => {
    if (routes.includes(item.name)) {
      if (item.children && item.children.length > 1) {
        item.children = filterAsyncRoute(item.children, routes)
        console.log('qqq')
      }
      return item
    }
  })
}

const useUserStore = defineStore('user', {
  state: (): userState => {
    return {
      token: GET_TOKEN(),
      menuRoutes: constantRoute,
      username: '',
      avatar: '',
      buttons: [],
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
        this.buttons = result.data.buttons 

        const userAsyncRouter = filterAsyncRoute(cloneDeep(asyncRoute), result.data.routes)

        this.menuRoutes = [...constantRoute, ...userAsyncRouter, ...anyRoute]
        ;[...userAsyncRouter, ...anyRoute].forEach((item) => {
          router.addRoute(item)
        })
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
