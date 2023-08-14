//返回数据的共有类型
interface ResponseData {
  code: number,
  message: string,
  ok: true
}

//单个商品的数据类型
export interface TradeMark {
        id?: number,
        tmName: string,
        logoUrl: string
}

//所有商品的数据类型
export type records = TradeMark[]

//获取已有全部品牌的数据类型
export interface TradeMarkResponseData extends ResponseData {
  data: {
    records: records,
    total: number,
    size: number,
    current: number,
    orders: [],
    optimizeCountSql: boolean,
    hitCount: boolean,
    searchCount: boolean,
    pages: number
  }
}