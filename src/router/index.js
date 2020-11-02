import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/* Router Modules */
import dashboard from './modules/dashboard'
import org from './modules/org'
import mcht from './modules/mcht'
import pointCard from './modules/pointCard'
import calculate from './modules/calculate'
import statistic from './modules/statistic'
import system from './modules/system'
import myInfo from './modules/myInfo'
import mberInfo from './modules/mberInfo'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    noCache: true                if set true, the page will no be cached(default is false)
    affix: true                  if set true, the tag will affix in the tags-view
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/mber/sbscrb',
    name: 'sbscrb',
    component: () => import('@/views/contents/mber/sbscrb/sbscrb'),
    hidden: true,
    children: [
      {
        path: '/sbscrb/stplat',
        name: 'stplat',
        component: () => import('@/views/contents/mber/sbscrb/stplat'),
        hidden: true
      },
      {
        path: 'indvStplatAgre',
        name: 'indvStplatAgre',
        component: () => import('@/views/contents/mber/sbscrb/indvStplatAgre'),
        hidden: true
      }
    ]
  },
  {
    path: '/kms/ranking',
    name: 'KmsRanking',
    component: () => import('@/views/contents/kms/ranking'),
    hidden: true
  },
  {
    path: '/kms/create',
    name: 'CreateKmsEditor',
    component: () => import('@/views/contents/kms/create'),
    hidden: true
  },
  {
    path: '/kms/index',
    name: 'KmsMain',
    component: () => import('@/views/contents/kms/index'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/error-page/404'),
    hidden: true
  },
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path*',
        component: () => import('@/views/redirect/index')
      }
    ]
  }
]

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
export const asyncRoutes = [
  // /연결 redirect 설정
  {
    path: '',
    redirect: dashboard.path
  },

  /** 메뉴 별 모듈 단위로 라우터 관리 **/
  dashboard,
  org,
  mcht,
  pointCard,
  calculate,
  statistic,
  system,
  myInfo,
  mberInfo,

  /** 라우터에 명시하지 않은 url 처리 **/
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  mode: 'history', // '#' 사용 X
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
