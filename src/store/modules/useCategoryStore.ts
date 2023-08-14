import { reqC1, reqC2, reqC3 } from '@/api/product/attr'
import { CategoryResponseData } from '@/api/product/attr/type'
import { defineStore } from 'pinia'
import { tagetoryState } from './type/type'

const useCategoryStore = defineStore('category', {
  state: (): tagetoryState => {
    return {
      c1Arr: [],
      c1Id: '',
      c2Arr: [],
      c2Id: '',
      c3Arr: [],
      c3Id: '',
    }
  },

  actions: {
    /**
     * 获取一级分类的数据
     */
    async getC1() {
      let res: CategoryResponseData = await reqC1()

      if (res.code === 200) {
        this.c1Arr = res.data
      }
    },

    /**
     * 获取二级分类的数据
     */
    async getC2() {
      let res: CategoryResponseData = await reqC2(this.c1Id)

      if (res.code === 200) {
        this.c2Arr = res.data
      }
    },

    /**
     * 获取三级分类的数据
     */
    async getC3() {
      let res: CategoryResponseData = await reqC3(this.c2Id)

      if (res.code === 200) {
        this.c3Arr = res.data
      }
    },
  },
})

export default useCategoryStore
