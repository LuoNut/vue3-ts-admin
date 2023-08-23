import request from '@/utils/request'
import { TradeMark, TradeMarkResponseData } from './type'

enum API {
  TRADEMARK_URL = '/admin/product/baseTrademark/',
  ADDTRADEMARK_URL = '/admin/product/baseTrademark/save',
  UPDATATRADEMARK_URL = '/admin/product/baseTrademark/update',
  REMOVETRADEMARK_URL = '/admin/product/baseTrademark/remove/',
}
/**
 * 获取指定页码色数据
 * @param page 页码
 * @param limit 每页的数据个数
 * @returns
 */
export const reqHasTrademark = (page: number, limit: number) =>
  request.get<any, TradeMarkResponseData>(API.TRADEMARK_URL + `${page}/${limit}`)
/**
 * 新增或修改商品
 * @param data
 */
export const reqAddAndUpdataTrademark = (data: TradeMark) => {
  if (data.id) {
    return request.put<any, any>(API.UPDATATRADEMARK_URL, data)
  } else {
    return request.post<any, any>(API.ADDTRADEMARK_URL, data)
  }
}

export const deleteTrademark = (id: number) => request.delete<any, any>(API.REMOVETRADEMARK_URL + id)
