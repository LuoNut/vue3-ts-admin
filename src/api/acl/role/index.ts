import request from '@/utils/request'
import { ResponseAllRoleData, RoleData } from './type'

enum API {
  ALLROLE_UER = '/admin/acl/role/',
  ADDROLE_URL = '/admin/acl/role/save/',
  UPDATAROLE_URL = '/admin/acl/role/update/',
  ALLPERMISSION_URL = '/admin/acl/permission/toAssign/',
  SETPERMISSION_URL = '/admin/acl/permission/doAssign/',
  DELETEROLE_URL = '/admin/acl/role/remove/'
}

/**
 * 获取所有的角色
 */
export const reqAllRole = (page: number, limit: number, keyword: string) =>
  request.get<any, ResponseAllRoleData>(API.ALLROLE_UER + page + '/' + limit + '?roleName=' + keyword)

/**
 * 添加或跟新角色
 */
export const AddOrUpdataRole = (data: RoleData) => {
  if (data.id) {
    return request.put<any, any>(API.UPDATAROLE_URL, data)
  } else {
    return request.post<any, any>(API.ADDROLE_URL, data)
  }
}

/**
 * 获取全部的权限
 */
export const reqAllPermission = (roleId: number) => request.get<any, any>(API.ALLPERMISSION_URL + roleId)

/**
 * 为用户设置权限
 */
export const setPermission = (roleId: number, permissionId: number[]) =>
  request.post<any, any>(API.SETPERMISSION_URL + `?roleId=${roleId}&permissionId=${permissionId}`)

/**
 * 删除角色
 */
export const reqDeleteRole = (roleId: number) => request.delete<any, any>(API.DELETEROLE_URL + roleId)