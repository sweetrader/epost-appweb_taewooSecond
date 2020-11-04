import request from './config/axios'
import { objectToParam } from '@/utils/objectKey'

const url_prefix = 'demo/v1'
const req_config = {
  headers: {
    'Content-Type': 'application/json'
  }
}

/**
 * 코드상세리스트
 * @param {String} codeId
 * 코드상세에서 codeId 인 코드상세 리스트를 반환(codeId 필수)
 * @return Array
 */
export function selectCodeList(codeId) {
  const params = {
    codeId: codeId
  }
  const url = url_prefix + '/adm/codeDTLList/' + objectToParam(params)
  const config = req_config
  return request.get(url, config)
}

/**
 * 로그등록

 public String mberId;  //회원ID
 public String logCl;  //로그분류 ( COM : 공통 | LOG_IN : 로그인 | LOG_OUT : 로그아웃 | MENU : 메뉴로그 |  SVC : 서비스 )
 public String logNm;  //로그명
 public String cn;     //내용

 * @param data
 * @returns {AxiosPromise<any>}
 */
export function insertLog(data) {
  const url = url_prefix + '/adm/log'
  const config = req_config
  return request.post(url, data, config)
}

