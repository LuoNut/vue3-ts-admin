import { CategoryData } from '@/api/product/attr/type'
import { RouteRecordRaw } from 'vue-router'
//定义小仓库state的状态
export interface userState {
  token: string | null
  menuRoutes: RouteRecordRaw[]
  username: string
  avatar: string
}

export interface tagetoryState {
  c1Arr: CategoryData[],
  c1Id: string,
  c2Arr: CategoryData[],
  c2Id: string,
  c3Arr: CategoryData[],
  c3Id: string,
  
}