import SvgIcon from '@/components/SvgIcon/index.vue'
import Category from '@/components/Category/index.vue'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

//注册全部的全局插件

const allGloablComponent: any = { SvgIcon, Category }
export default {
  install(app: any) {
    Object.keys(allGloablComponent).forEach((k) => {
      app.component(k, allGloablComponent[k])
    })
    for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
      app.component(key, component)
    }
  },
}
