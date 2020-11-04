/** When your routing table is too long, you can split it into small modules **/

import Layout2 from '@/layout/index2'

const kms = {
  path: '/kms',
  redirect: '/kms/index',
  component: Layout2,
  children: [
    {
      path: 'index',
      name: 'KmsMain',
      component: () => import('@/views/contents/kms/index'),
      hidden: true
    },
    {
      path: 'create',
      name: 'CreateKmsEditor',
      hidden: true,
      props: true,
      component: () => import('@/views/contents/kms/create')
    },
    {
      path: 'ranking',
      name: 'KmsRanking',
      hidden: true,
      component: () => import('@/views/contents/kms/ranking')
    },
    {
      path: 'ranking/list',
      name: 'KmsRankingList',
      props: true,
      hidden: true,
      component: () => import('@/views/contents/kms/rankingList')
    }
  ]
}

export default kms
