/** When your routing table is too long, you can split it into small modules **/

const dashboard = {
  path: '/main',
  redirect: '/main/dashboard',
  meta: {
    icon: 'dashboard',
    roles: ['ADMIN', 'ORG', 'MCHT']
  },
  children: [
    {
      path: 'dashboard',
      component: () => import('@/views/contents/main/dashboard'),
      name: 'Dashboard',
      meta: { title: 'dashboard', icon: 'dashboard', noCache: true }
    }
  ]
}

export default dashboard
