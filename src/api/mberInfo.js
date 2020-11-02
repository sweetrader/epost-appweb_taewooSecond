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

// 회원탈퇴
export function updateWithdrMber(data) {
  const url = url_prefix + '/withdr'
  const config = req_config
  return request.put(url, data, config)
}
