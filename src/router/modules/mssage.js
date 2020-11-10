/** When your routing table is too long, you can split it into small modules **/

const mssage = {
  path: '/mssage',
  component: () => import('@/views/contents/mssage/noti/notiList'),
  redirect: '/mssage/noti/notilist',
  children: [
    {
      path: 'noti/notiList',
      name: 'Notilist',
      component: () => import('@/views/contents/mssage/noti/notiList'),
      hidden: true
    }
  ]
}

export default mssage
