/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const spc = {
  path: '/spc',
  component: Layout,
  redirect: '/spc/list',
  name: 'Spc',
  meta: {
    icon: 'zip',
    title: 'spc.spc'
  },
  children: [
    {
      path: 'space/list',
      name: 'SpaceList',
      component: () => import('@/views/contents/spc/spaceList'),
      meta: {
        icon: 'clipboard',
        title: 'spc.space'
      }
    },
    {
      path: 'space',
      name: 'SpaceManagement',
      component: () => import('@/views/contents/spc/spaceManageForm'),
      props: true
    },
    {
      path: 'space/info',
      name: 'SpaceInfo',
      component: () => import('@/views/contents/spc/spaceInfo'),
      props: true
    },
    {
      path: 'rent/list/supler',
      name: 'RentListSupler',
      component: () => import('@/views/contents/spc/rentListSupler'),
      meta: {
        icon: 'component',
        title: 'spc.regRent'
      }
    },
    {
      path: 'rent/list/cnsmr',
      name: 'RentListCnsmr',
      component: () => import('@/views/contents/spc/rentListCnsmr'),
      meta: {
        icon: 'fullscreen',
        title: 'spc.rentList'
      }
    },
    {
      path: 'rent',
      name: 'RentManagement',
      component: () => import('@/views/contents/spc/rentManageForm'),
      props: true
    },
    {
      path: 'rent/info',
      name: 'RentInfo',
      component: () => import('@/views/contents/spc/rentInfo'),
      props: true
    },
    {
      path: 'dmand/list/cnsmr',
      name: 'DmandListCnsmr',
      component: () => import('@/views/contents/spc/dmandListCnsmr'),
      meta: {
        icon: 'user',
        title: 'spc.regDmand'
      }
    },
    {
      path: 'dmand/list/supler',
      name: 'DmandListSupler',
      component: () => import('@/views/contents/spc/dmandListSupler'),
      meta: {
        icon: 'skill',
        title: 'spc.dmandList'
      }
    },
    {
      path: 'dmand',
      name: 'DmandManagement',
      component: () => import('@/views/contents/spc/dmandManageForm'),
      props: true
    },
    {
      path: 'dmand/info',
      name: 'DmandInfo',
      component: () => import('@/views/contents/spc/dmandInfo'),
      props: true
    },
    {
      path: 'mch/supler',
      name: 'MchListSupler',
      component: () => import('@/views/contents/spc/mchListSupler'),
      meta: {
        icon: 'eye-open',
        title: 'spc.prog'
      }
    },
    {
      path: 'mch/cnsmr',
      name: 'MchListCnsmr',
      component: () => import('@/views/contents/spc/mchListCnsmr'),
      meta: {
        icon: 'star',
        title: 'spc.mch'
      }
    },
    {
      path: 'mch/info/supler',
      name: 'MchInfoSupler',
      component: () => import('@/views/contents/spc/mchInfoSupler'),
      props: true
    },
    {
      path: 'mch/info/cnsmr',
      name: 'MchInfoCnsmr',
      component: () => import('@/views/contents/spc/mchInfoCnsmr'),
      props: true
    },
    {
      path: 'cntr/supler',
      name: 'CntrListSupler',
      component: () => import('@/views/contents/spc/cntrListSupler'),
      meta: {
        icon: 'list',
        title: 'spc.cntr'
      }
    },
    {
      path: 'cntr/cnsmr',
      name: 'CntrListCnsmr',
      component: () => import('@/views/contents/spc/cntrListCnsmr'),
      meta: {
        icon: 'table',
        title: 'spc.cntrInfo'
      }
    },
    {
      path: 'cntr/info/supler',
      name: 'CntrInfoSupler',
      component: () => import('@/views/contents/spc/cntrInfoSupler'),
      props: true
    },
    {
      path: 'cntr/info/cnsmr',
      name: 'CntrInfoCnsmr',
      component: () => import('@/views/contents/spc/cntrInfoCnsmr'),
      props: true
    }
  ]
}

export default spc
