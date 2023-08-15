interface ResponstData {
  code: number
  message: string
  ok: string
}

/**
 * 单个spu数据
 */
export interface SpuData {
  id: string
  createTime: string
  updateTime: string
  spuName: string
  description: string
  category3Id: number
  tmId: number
  spuSaleAttrList: null
  spuImageList: null
  spuPosterList: null
}

/**
 * spu数据组成的数组
 */
export type records = SpuData[]

export interface SpuResponseData extends ResponstData {
  data: {
    records: records
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
