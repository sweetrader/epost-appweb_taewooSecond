/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const mberInfo = {
  path: '/mber/info',
  component: Layout,
  redirect: '/mber/info/mberInfo',
  name: 'MberInfo',
  meta: {
    icon: 'user',
    title: '회원정보 관리',
    roles: ['ADMIN', 'ORG']
  },
  children: [
    {
      path: 'mber/info/mberInfo',
      name: 'mberInfo',
      component: () => import('@/views/contents/mber/info/mberInfo'),
      meta: {
        icon: 'user',
        title: '회원정보'
      }
    },
    {
      path: 'mber/info/qrCode',
      name: 'qrCode',
      component: () => import('@/views/contents/mber/info/qrCode'),
      props: true
    }
  ]
}

export default mberInfo
