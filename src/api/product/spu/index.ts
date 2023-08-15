import request from '@/utils/request'
import { SpuResponseData } from './type'

enum API {
  HASSPU_URL = '/admin/product/',
}

/**
 * 获取某个三级分类下的spu数据
 */
export const reqHasSpu = (page: number, limit: number, c3Id: number | string) =>
  request.get<any, SpuResponseData>(
    API.HASSPU_URL + page + '/' + limit + '?category3Id=' + c3Id,
  )
