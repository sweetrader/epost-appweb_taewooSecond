/** When your routing table is too long, you can split it into small modules **/

const kms = {
  path: '/kms',
  component: () => import('@/views/contents/kms/index'),
  name: 'KmsMain',
  redirect: '/kms/index',
  children: [
    {
      path: '/index',
      name: 'KmsMain',
      component: () => import('@/views/contents/kms/index'),
      hidden: true
    },
    {
      path: '/ranking',
      name: 'KmsRanking',
      hidden: true,
      component: () => import('@/views/contents/kms/ranking')
    },
    {
      path: '/ranking/list',
      name: 'KmsRankingList',
      props: true,
      hidden: true,
      component: () => import('@/views/contents/kms/rankingList')
    }
  ]
}

export default kms
