import { createApp } from 'vue'
import App from './App.vue'
//引入模板的全局样式
import '@/styles/index.scss'
//引入element-plus插件与样式
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
//引入自定义插件对象，注册整个项目的全局组件
import globalComponent from '@/components'
//@ts-expect-error 特定写法
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
//获取应用实例
//svg插件需要配置代码
import 'virtual:svg-icons-register'
//引入路由
import router from '@/router/index'
import pinia from '@/store/index'
const app = createApp(App)
//安装element-plus插件
app.use(ElementPlus, {
  locale: zhCn,
})

//注册模板路由
app.use(router)
//安装自定义插件
app.use(globalComponent)
//将应用挂载到挂载点上
app.use(pinia).mount('#app')
