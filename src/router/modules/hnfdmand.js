/** When your routing table is too long, you can split it into small modules **/
const hnfdmand = {
  path: '/hnf/dmand',
  component: () => import('@/views/contents/hnf/dmand/hnfDmandList'),
  redirect: '/hnf/list',
  name: 'hnf',
  meta: {
    icon: 'example',
    title: 'hnf.hnf',
    roles: ['A_ADM', 'ORG', 'D_DLVY', 'D_PRC_CL', 'D_DLVY_PIC', 'D_VHC_TRNS', 'S_DLVY', 'S_PRC_CL', 'S_DLVY_PIC', 'S_VHC_TRNS']
  },
  children: [
    {
      path: 'hnfDmandList',
      name: 'HnfDmandListManagement',
      component: () => import('@/views/contents/hnf/dmand/hnfDmandList'),
      meta: {
        icon: 'clipboard',
        title: 'hnf.hnfdmandMain',
        roles: ['A_ADM', 'D_DLVY', 'D_PRC_CL', 'D_DLVY_PIC', 'D_VHC_TRNS']
      }
    },
    {
      path: 'hnfDmandRegister',
      name: 'HnfDmandRegisterManagement',
      component: () => import('@/views/contents/hnf/dmand/hnfDmandRegister'),
      meta: {
        icon: 'clipboard',
        title: 'hnf.hnfRegister',
        roles: ['A_ADM', 'D_DLVY', 'D_PRC_CL', 'D_DLVY_PIC', 'D_VHC_TRNS']
      }
    }
  ]
}

export default hnfdmand
