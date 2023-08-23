import request from '@/utils/request'
import { ResponseAllUserInfo, ResponseRoleData, SetUserParams, userInfo } from './type'

enum API {
  ALLUDSERINFO_URL = '/admin/acl/user/',
  ADDUSER_URL = '/admin/acl/user/save',
  UPDATAUSER_URL = '/admin/acl/user/update',
  AllROLE_URL = '/admin/acl/user/toAssign/',
  SETROLE_URL = '/admin/acl/user/doAssignRole/',
  REMOVEUSER_URL = '/admin/acl/user/remove/',
  SELECTREMOVEUSER_URL = '/admin/acl/user/batchRemove/',
}

/**
 * 获取所有用户信息
 */
export const reqAllUserInfo = (page: number, limit: number, keyWord: string) =>
  request.get<any, ResponseAllUserInfo>(API.ALLUDSERINFO_URL + page + '/' + limit + '?username=' + keyWord)

/**
 * 新增或修改用户信息
 */
export const addAndUpdataInfo = (data: userInfo) => {
  if (data.id) {
    return request.put<any, any>(API.UPDATAUSER_URL, data)
  } else {
    return request.post<any, any>(API.ADDUSER_URL, data)
  }
}

/**
 * 获取所有权限的数组
 */
export const AllRoleData = (adminID: number) => request.get<any, ResponseRoleData>(API.AllROLE_URL + adminID)

/**
 * 设置用户权限
 */
export const setUserRole = (data: SetUserParams) => request.post<any, any>(API.SETROLE_URL, data)

/**
 * 删除单个用户
 */
export const RemoveUser = (id: number) => request.delete(API.REMOVEUSER_URL + id)

/**
 * 删除多个用户
 */
export const SelectRemoveUser = (userIdList: number[]) => request.delete(API.SELECTREMOVEUSER_URL, { data: userIdList })
