import request from "@/utils/request";
import { MenuParams, ResponseAllPermissionData } from "./type";

enum API {
  PERMISSIONALL_URL = '/admin/acl/permission',
  ADDPERMISSION_URL = '/admin/acl/permission/save/',
  UPDATAPERMISSION_URL = '/admin/acl/permission/update',
  DELETEPERMISSION_URL = '/admin/acl/permission/remove/'
}

/**
 * 获取全部权限数据
 */
export const reqPermissionAll = () => request.get<any, ResponseAllPermissionData>(API.PERMISSIONALL_URL)

/**
 * 增加或修改权限
 */
export const addOrUpdataPermission = (data: MenuParams) => {
  if (data.id) {
    return request.put<any, any>(API.UPDATAPERMISSION_URL, data)
  } else {
    return request.post<any, any>(API.ADDPERMISSION_URL, data)
  }
}

/**
 * 删除某个权限
 */
export const deletePermission = (peId: number) => request.delete<any, any>(API.DELETEPERMISSION_URL + peId)