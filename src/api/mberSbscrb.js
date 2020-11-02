import request from './config/axios'
// import { objectToParam } from '@/utils/objectKey'

const url_prefix = 'api/v1/mber'
const req_config = {
  headers: {
    'Content-Type': 'application/json'
  }
}
/* ----------------------회원 정보--------------------------- */
// 회원상세
export function selectMberInfo(data) {
  const url = url_prefix + '/mng/' + data
  const config = req_config
  return request.get(url, config)
}
