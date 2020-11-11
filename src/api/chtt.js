import request from './config/axios'
import { objectToParam } from '@/utils/objectKey'

const url_prefix = 'api/v1'
const req_config = {
  headers: {
    'Content-Type': 'application/json'
  }
}

/* 채팅API 관련 */
module.exports = {
  getChttRoomList: (data) => {
    const url = url_prefix + '/chtt/room' + objectToParam(data)
    const config = req_config
    return request.get(url, config)
  },
  getChttMssageList: (data) => {
    return 'asdf'
  }
}

//
// export function selectNotiList(data) {
//   const url = url_prefix + '/noti/mssage' + objectToParam(data)
//   const config = req_config
//   return request.get(url, config)
// }

