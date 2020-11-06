/** When your routing table is too long, you can split it into small modules **/

const homeBoard = {
  path: '/homeBoard',
  redirect: '/homeBoard/jiwon',
  children: [
    {
      path: 'jiwon',
      name: 'HomeBoardList',
      hidden: true,
      component: () => import('@/views/contents/homboard/homeBoardList')
    },
    {
      path: 'jiwon/:boardId(\\d+)',
      name: 'HomeBoardDetail',
      props: true,
      hidden: true,
      component: () => import('@/views/contents/homboard/homeBoardDetail')
    },
    {
      path: 'event',
      name: 'EventList',
      hidden: true,
      component: () => import('@/views/contents/homboard/eventList')
    },
    {
      path: 'event/:boardId(\\d+)',
      name: 'EventDetail',
      props: true,
      hidden: true,
      component: () => import('@/views/contents/homboard/eventDetail')
    }
  ]
}

export default homeBoard
