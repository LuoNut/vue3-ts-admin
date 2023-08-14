interface ResponseData {
  code: number
  message: string
  ok: true
}

/**
 * category 单个分类类型
 */
export interface CategoryData {
  id: number | string
  createTime: string
  updateTime: string
  name: string
  category1Id?: number
  category2Id?: number
}

/**
 * category 全部分类集合数据类型
 */
export interface CategoryResponseData extends ResponseData {
  data: CategoryData[]
}

/**
 * 单个属性的值类型
 */
export interface AttrValue {
  id?: number
  valueName: string
  attrId?: number
}

/**
 * 多个属性值的数组
 */
export type AttrValueList = AttrValue[]

/**
 * 属性对象
 */
export interface Attr {
  id?: number
  attrName: string
  categoryId: number | string
  categoryLevel: number
  attrValueList: AttrValueList
}

/**
 * 属性对象组成的数组
 */
export type AttrList = Attr[]

export interface AttrResponseData extends ResponseData {
  data: Attr[]
}
