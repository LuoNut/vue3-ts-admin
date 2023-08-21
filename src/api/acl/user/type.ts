interface ResponseData {
  code: number
  message: string
  ok: boolean
}

/**
 * 单个用户的信息
 */
export interface userInfo {
  id?: number
  createTime?: string
  updateTime?: string
  username: string
  password: string
  name: string
  phone?: null
  roleName?: string
}

/**
 * 请求所有用户接口返回的用户类型
 */
export interface ResponseAllUserInfo extends ResponseData {
  data: {
    records: userInfo[]
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
 * 单个用户角色的数据
 */
export interface RoleData {
  id?: number
  createTime?: string
  updateTime?: string
  roleName: string
  remark: null
}

/**
 * 用户角色列表
 */
export type RoleDataList = RoleData[]

/**
 * 用户角色列表返回的数据
 */
export interface ResponseRoleData extends ResponseData {
  data: {
    allRolesList: RoleDataList
    assignRoles: RoleDataList
  }
}

/**
 * 设置用户权限接口携带的参数类型
 */
export interface SetUserParams {
  roleIdList: number[]
  userId: number
}
