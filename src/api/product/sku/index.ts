import request from "@/utils/request";
import { ResponseSkuData, SkuInfoData } from "./type";

enum API {
  ALLSKU_URL = '/admin/product/list/',
  CANCELSKU_URL = '/admin/product/cancelSale/',
  onSku_URL = '/admin/product/onSale/',
  SKUINFO_URL = '/admin/product/getSkuInfo/',
  DELETESKU_URL = '/admin/product/deleteSku/'

}

/**
 * 获取所有sku
 */
export const reqAllSku = (page: number, limit: number) => request.get<any, ResponseSkuData>(API.ALLSKU_URL + page + '/' + limit)

/**
 * 下架sku
 */
export const cancelSku = (skuId: number) => request.get<any, any>(API.CANCELSKU_URL + skuId)

/**
 * 上架sku
 */
export const onSku = (skuId: number) => request.get<any, any>(API.onSku_URL + skuId)

/**
 * 获取sku信息
 */
export const reqSkuInfo = (skuId: number) => request.get<any, SkuInfoData>(API.SKUINFO_URL + skuId)

/**
 * 删除sku
 */
export const reqDeleteSku = (skuId: number) => request.delete<any, any>(API.DELETESKU_URL + skuId)