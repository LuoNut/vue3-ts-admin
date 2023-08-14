import request from '@/utils/request'
import { AttrResponseData, CategoryResponseData, Attr } from './type'

enum API {
  C1_URL = '/admin/product/getCategory1',
  C2_URL = '/admin/product/getCategory2/',
  C3_URL = '/admin/product/getCategory3/',
  Attr_URL = '/admin/product/attrInfoList/',
  ADDORUPDATAATTR_URL = '/admin/product/saveAttrInfo'
}

/**
 * 请求一级分类
 * @returns
 */
export const reqC1 = () => request.get<any, CategoryResponseData>(API.C1_URL)

/**
 * 请求二级分类
 * @returns
 */
export const reqC2 = (category1Id: number | string) =>
  request.get<any, CategoryResponseData>(API.C2_URL + category1Id)

/**
 * 请求三级分类
 * @returns
 */
export const reqC3 = (category2Id: number | string) =>
  request.get<any, CategoryResponseData>(API.C3_URL + category2Id)

/**
 * 请求属性与属性值
 * @returns
 */
export const reqAttr = (
  category1Id: number | string,
  category2Id: number | string,
  category3Id: number | string,
) => request.get<any, AttrResponseData>(API.Attr_URL + category1Id + '/' + category2Id + '/' + category3Id )

export const addOrUpdataArrt = (data: Attr) => 
request.post<any, any>(API.ADDORUPDATAATTR_URL, data)