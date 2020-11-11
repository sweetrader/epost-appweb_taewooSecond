/** When your routing table is too long, you can split it into small modules **/

const chtt = {
  path: '/mssage',
  component: () => import('@/views/contents/mssage/chtt/chttRoomList'),
  redirect: '/mssage/chtt/chttRoomList',
  children: [
    {
      path: 'chtt/chttRoomList',
      name: 'ChttRoomList',
      component: () => import('@/views/contents/mssage/chtt/chttRoomList'),
      hidden: true
    }
  ]
}

export default chtt
