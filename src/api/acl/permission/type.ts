interface ResponseData {
  code: number
  message: string
  ok: boolean
}

/**
 * 单个权限的数据
 */
export interface PermissionData {
  id: number
  createTime: string
  updateTime: string
  pid: number
  name: string
  code: string
  toCode: string
  type: number
  status: number
  level: number
  children: PermissionDataList
}

/**
 * 权限数据数组
 */
export type PermissionDataList = PermissionData[]

/**
 * 获取权限接口返回的数据类型
 */
export interface ResponseAllPermissionData extends ResponseData {
  data: PermissionDataList
}

/**
 * 更新或增加权限的数类型
 */
export interface MenuParams {
  code: string
  id?: number
  level: number
  name: string
  pid: number
}
