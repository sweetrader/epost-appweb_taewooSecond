import request from './config/axios'
import { objectToParam } from '@/utils/objectKey'

const url_prefix = 'api/v1'
const req_config = {
  headers: {
    'Content-Type': 'application/json'
  }
}
/* ----------------------알람 조회--------------------------- */
// 알람 조회 (web 에서 메세지 공지 리스트)
//
export function selectNotiList(data) {
  const url = url_prefix + '/noti/mssage' + objectToParam(data)
  const config = req_config
  return request.get(url, config)
}

