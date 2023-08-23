interface ResponseData {
  code: number
  message: string
  ok: true
}

/**
 * 单个角色的数据
 */
export interface RoleData {
  id?: number
  createTime?: string
  updateTime?: string
  roleName: string
  remark?: null
}

/**
 * 角色数据列表
 */
export type RoleDataList = RoleData[]

/**
 * 获取所示接口返回的数据类型
 */
export interface ResponseAllRoleData extends ResponseData {
  data: {
    records: RoleDataList
    total: number
    size: number
    current: number
    orders: []
    optimizeCountSql: boolean
    hitCount: boolean
    countId: null
    maxLimit: null
    searchCount: boolean
    pages: number
  }
}

/**
 * 单个权限的数据
 */
export interface PermissionData {
  id?: number
  createTime: string
  updateTime: string
  pid: number
  name: string
  code: string
  toCode: string
  type: number
  status: null
  level: number
  children: PermissionDataList
  select: boolean
}

/**
 * 权限的数据列表
 */
export type PermissionDataList = PermissionData[]

/**
 * 全部权限的接口返回的数据类型
 */
export interface ResponseAllPerssion extends ResponseData {
  data: PermissionDataList[]
}
