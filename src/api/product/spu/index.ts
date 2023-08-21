import request from '@/utils/request'
import {
  ResponseAllSku,
  ResponseImageData,
  ResponseSaleArrtData,
  ResponseSaleData,
  ResponseTardemarkData,
  SkuData,
  SpuData,
  SpuResponseData,
} from './type'

enum API {
  HASSPU_URL = '/admin/product/',
  ALLTRADEMARK_URL = '/admin/product/baseTrademark/getTrademarkList',
  IMAGE_URL = '/admin/product/spuImageList/',
  HASSALEATTR = '/admin/product/spuSaleAttrList/',
  BASESALEARRT_URL = '/admin/product/baseSaleAttrList/',
  UPDATASPU_URL = '/admin/product/updateSpuInfo/',
  ADDSPU_URL = '/admin/product/saveSpuInfo/',
  ADDSKU_URL = '/admin/product/saveSkuInfo',
  FINDSKU_URL = '/admin/product/findBySpuId/',
  DELETESPU_URL = '/admin/product/deleteSpu/',
}

/**
 * 获取某个三级分类下的spu数据
 */
export const reqHasSpu = (page: number, limit: number, c3Id: number | string) =>
  request.get<any, SpuResponseData>(API.HASSPU_URL + page + '/' + limit + '?category3Id=' + c3Id)

/**
 * 获取所有品牌的数组
 * @returns
 */
export const reqAllTrademark = () => request.get<any, ResponseTardemarkData>(API.ALLTRADEMARK_URL)

/**
 * 获取spu下的全部商品图片
 */
export const reqImageList = (spuId: number | string) => request.get<any, ResponseImageData>(API.IMAGE_URL + spuId)

/**
 * 获取spu已有的销售属性
 */
export const reqHasArrt = (spuId: number | string) => request.get<any, ResponseSaleArrtData>(API.HASSALEATTR + spuId)

/**
 * 获取所有的销售属性
 */
export const reqBaseArrt = () => request.get<any, ResponseSaleData>(API.BASESALEARRT_URL)

/**
 * 新增或修改一个spu
 */
export const addOrUpdataSpu = (data: SpuData) => {
  if (data.id) {
    return request.post<any, any>(API.UPDATASPU_URL, data)
  } else {
    return request.post<any, any>(API.ADDSPU_URL, data)
  }
}

/**
 * 添加sku
 */
export const addSku = (data: SkuData) => request.post<any, any>(API.ADDSKU_URL, data)

/**
 * 获取spu下的sku
 */
export const ReqAllSku = (skuId: number | string) => request.get<any, ResponseAllSku>(API.FINDSKU_URL + skuId)

/**
 * 删除spu
 */
export const removeSpu = (spuId: number | string) => request.delete<any, any>(API.DELETESPU_URL + spuId)