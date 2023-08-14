import router from './router'
//@ts-expect-error nprogress特殊问题
import nprogress from 'nprogress'
nprogress.configure({ showSpinner: false })
import 'nprogress/nprogress.css'
import setting from '@/setting'
import useUserStore from '@/store/modules/useUserStore'
import pinia from '@/store'
const userStore = useUserStore(pinia)

router.beforeEach(async (to, from, next) => {
  document.title = `${setting.title} - ${to.meta.title}`
  nprogress.start()
  const token = userStore.token
  const username = userStore.username

  if (token) {
    if (to.path === '/login') {
      next({ path: '/' })
    } else {
      if (username) {
        next()
      } else {
        try {
          await userStore.userInfo()
          next()
        } catch (error) {
          await userStore.userLogout()
          next({ path: '/login', query: { redirect: to.path } })
        }
      }
    }
  } else {
    if (to.path === '/login') {
      next()
    } else {
      next({ path: '/login', query: { redirect: to.path } })
    }
  }
})

router.afterEach((route) => {
  nprogress.done()
})
