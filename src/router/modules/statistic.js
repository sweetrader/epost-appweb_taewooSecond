/** When your routing table is too long, you can split it into small modules **/

const statistic = {
  path: '/statistic',
  redirect: '/statistic/info',
  meta: {
    icon: '',
    roles: ['ADMIN', 'ORG', 'MCHT']
  },
  children: [
    {
      path: 'info',
      component: () => import('@/views/contents/statistic/index'),
      name: 'Statistic',
      meta: { title: 'statistic', icon: 'chart', noCache: true }
    }
  ]
}

export default statistic
