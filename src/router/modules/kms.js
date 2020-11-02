/** When your routing table is too long, you can split it into small modules **/

// import Layout from '@/layout'

const kms = {
  path: '/kms',
  redirect: '/kms/index',
  children: [
    {
      path: 'create',
      name: 'CreateKmsEditor',
      hidden: true,
      props: true,
      component: () => import('@/views/contents/kms/create')
    }
  ]
}

export default kms
