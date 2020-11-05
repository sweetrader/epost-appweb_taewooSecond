/** When your routing table is too long, you can split it into small modules **/
const myInfo = {
  path: '/myInfo',
  hidden: true,
  children: [
    {
      path: '',
      name: 'MyInfo',
      component: () => import('@/views/contents/system/manager/myInfo'),
      hidden: true,
      meta: {
        title: 'myInfo'
      }
    }
  ]
}

export default myInfo
