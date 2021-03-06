/** When your routing table is too long, you can split it into small modules **/

const calculate = {
  path: '/calculate',
  component: () => import('@/views/contents/calculate/index'),
  redirect: '/calculate/info',
  meta: {
    icon: '',
    roles: ['ADMIN', 'ORG']
  },
  children: [
    {
      path: 'info',
      component: () => import('@/views/contents/calculate/index'),
      name: 'Calculate',
      meta: { title: 'calculate', icon: 'excel', noCache: true }
    }
  ]
}

export default calculate
