import { RouteRecordRaw } from 'vue-router'
//定义小仓库state的状态
export interface userState {
  token: string | null
  menuRoutes: RouteRecordRaw[]
}
