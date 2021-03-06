import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
// import Layout from '@/layout'

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
import space from './modules/space'
import kms from './modules/kms'
import homeBoard from './modules/homeBoard'
import mssage from './modules/mssage'
import chtt from './modules/chtt'
import hnfdmand from './modules/hnfdmand'

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
    path: '/spc/rent',
    name: 'RentManagement',
    component: () => import('@/views/contents/spc/rentManageForm'),
    hidden: true,
    props: true
  },
  {
    path: '/spc/rent/list/supler',
    name: 'RentListSupler',
    component: () => import('@/views/contents/spc/rentListSupler'),
    hidden: true
  },
  {
    path: '/spc/rent/info',
    name: 'RentInfo',
    component: () => import('@/views/contents/spc/rentInfo'),
    hidden: true,
    props: true
  },
  {
    path: '/mber/sbscrb/mberSbscrb',
    name: 'mberSbscrb',
    component: () => import('@/views/contents/mber/sbscrb/index'),
    hidden: true,
    props: true
  },
  {
    path: '/404',
    component: () => import('@/views/error-page/404'),
    hidden: true
  },
  {
    path: '/redirect',
    component: () => import('@/views/redirect/index'),
    hidden: true,
    children: [
      {
        path: '/redirect/:path*',
        component: () => import('@/views/redirect/index')
      }
    ]
  },
  {
    path: '/hnf/dmand',
    name: 'HnfDmandListManagement',
    component: () => import('@/views/contents/hnf/dmand/hnfDmandList'),
    props: true
  },
  {
    path: '/hnf/dmandRegister',
    name: 'HnfDmandRegisterManagement',
    component: () => import('@/views/contents/hnf/dmand/hnfDmandRegister'),
    props: true
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
  space,
  kms,
  homeBoard,
  mssage,
  chtt,
  hnfdmand,

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
