/** When your routing table is too long, you can split it into small modules **/
const mberInfo = {
  path: '/mber/info',
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
      path: 'qrCode',
      name: 'qrCode',
      component: () => import('@/views/contents/mber/info/qrCode'),
      props: true
    },
    {
      path: 'mbtlNoChange',
      name: 'mbtlNoChange',
      component: () => import('@/views/contents/mber/info/mbtlNoChange'),
      props: true
    },
    {
      path: 'withdrMber',
      name: 'withdrMber',
      component: () => import('@/views/contents/mber/info/withdrMber'),
      props: true
    }
  ]
}

export default mberInfo
