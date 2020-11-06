/** When your routing table is too long, you can split it into small modules **/

const mcht = {
  path: '/mcht',
  component: () => import('@/views/contents/management/mcht/index'),
  redirect: '/mcht/list',
  name: 'Mcht',
  meta: {
    icon: 'example',
    title: 'mcht',
    roles: ['ADMIN', 'ORG']
  },
  children: [
    {
      path: 'list',
      name: 'Mchtlist',
      component: () => import('@/views/contents/management/mcht/index'),
      meta: {
        icon: 'user',
        title: 'mchtManagement'
      }
    },
    {
      path: 'notice',
      name: 'MchtManagement',
      component: () => import('@/views/contents/management/notice/list'),
      meta: {
        icon: 'user',
        title: 'notice'
      }
    },
    {
      path: 'excel',
      name: 'MchtExcel',
      component: () => import('@/views/contents/management/mcht/mchtExcel'),
      hidden: true,
      meta: {
        title: 'mchtExcel'
      }
    }
  ]
}

export default mcht
