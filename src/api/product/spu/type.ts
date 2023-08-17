interface ResponstData {
  code: number
  message: string
  ok: string
}

/**
 * 单个spu数据
 */
export interface SpuData {
  id?: string
  spuName: string
  description: string
  category3Id: number | string
  tmId: number | string
  spuSaleAttrList: null | SaleArrtList
  spuImageList: null | ImageList
}

/**
 * spu数据组成的数组
 */
export type records = SpuData[]

/**
 * 三级分类下的所有spu数据
 */
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

/**
 * 单个品牌数据类型
 */
export interface Trademark {
  id: number
  createTime: string
  updateTime: string
  tmName: string
  logoUrl: string
}

/**
 * 品牌数据组成的数组
 */
export type TrademarkList = Trademark[]

/**
 * 品牌接口返回的数据
 */
export interface ResponseTardemarkData extends ResponstData {
  data: TrademarkList
}

/**
 * 单张图片的数据类型
 */
export interface Image {
  id?: number
  imgName?: string
  imgUrl?: string
  createTime?: string
  updateTime?: string
  spuId?: number
  name?: string
  url?: string
}

/**
 * 图片数据组成的数组类型
 */
export type ImageList = Image[]

/**
 * 图片数据接口返回的数据类型
 */
export interface ResponseImageData extends ResponstData {
  data: ImageList
}

/**
 * 销售属性的具体数据类型
 */
export interface SaleArrtValue {
  id?: number
  spuId?: number
  baseSaleAttrId: number | string
  saleAttrValueName: string
  saleAttrName?: string
  isChecked?: null
}

/**
 * 销售属性的具体数据类型数组
 */
export type SaleArrtValueList = SaleArrtValue[]

/**
 * 销售属性的数据类型
 */
export interface SaleArrt {
  id?: number
  createTime?: null
  updateTime?: null
  spuId?: number
  baseSaleAttrId: number | string
  saleAttrName: string
  spuSaleAttrValueList: SaleArrtValueList
  flag?: boolean
  saleAttrValue?: string
}

/**
 * 销售属性的数据类型数组
 */
export type SaleArrtList = SaleArrt[]

/**
 * 返回已有销售类型的接口数据类型
 */
export interface ResponseSaleArrtData extends ResponstData {
  data: SaleArrtList
}

/**
 * 返回的单个销售类型数据
 */
export interface BaseSaleArrt {
  id: number
  createTime: string
  updateTime: string
  name: string
}

/**
 * 返回的销售型类数据数组
 */
export type BaseSaleArrtList = BaseSaleArrt[]

/**
 * 返回的所有销售类型接口的数据类型
 */
export interface ResponseSaleData extends ResponstData {
  data: BaseSaleArrtList
}

export interface Attr {
  attrId: number | string //平台属性的ID
  valueId: number | string //属性值的ID
}
export interface saleArr {
  saleAttrId: number | string //属性ID
  saleAttrValueId: number | string //属性值的ID
}
/**
 * sku的类型
 */
export interface SkuData {
  category3Id: string | number //三级分类的ID
  spuId: string | number //已有的SPU的ID
  tmId: string | number //SPU品牌的ID
  skuName: string //sku名字
  price: string | number //sku价格
  weight: string | number //sku重量
  skuDesc: string //sku的描述
  skuAttrValueList?: Attr[]
  skuSaleAttrValueList?: saleArr[]
  skuDefaultImg: string //sku图片地址
}
