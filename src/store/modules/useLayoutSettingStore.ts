import { defineStore } from "pinia";

const useLayoutSettingStore = defineStore('layoutSetting', {
  state: () => {
    return {
      fold: false,
      refsh: false, //仓库这个属性用于控制刷新效果
    }
  }
})

export default useLayoutSettingStore