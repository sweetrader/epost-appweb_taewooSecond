import request from './config/axios'
import { objectToParam } from '@/utils/objectKey'

const url_prefix = 'demo/v1/adm'
const req_config = {
  headers: {
    'Content-Type': 'application/json'
  }
}

/* ---------------------------------------코드관리 -------------------------------------------------- */
// 코드분류 등록
export function insertCodeCl(data) {
  const url = url_prefix + '/codeCl' // + objectToParam(data)
  const config = req_config
  return request.post(url, data, config)
}

// 코드분류 수정
export function updateCodeCl(data) {
  const url = url_prefix + '/codeCl/' + data.codeCl
  const config = req_config
  return request.put(url, data, config)
}
// 코드분류 삭제
export function deleteCodeCl(data) {
  const url = url_prefix + '/codeCl/' + data.codeCl
  const config = req_config
  return request.delete(url, config)
}

// 코드분류 상세
export function selectCodeCl(data) {
  const url = url_prefix + '/codeCl/' + data
  const config = req_config
  return request.get(url, config)
}

// 코드분류 리스트
export function selectCodeClList(data) {
  const url = url_prefix + '/codeClList' + objectToParam(data)
  const config = req_config
  return request.get(url, config)
}
// ----------------------------------------------------------------
// 코드관리 등록
export function insertCode(data) {
  const url = url_prefix + '/code' // + objectToParam(data)
  const config = req_config
  return request.post(url, data, config)
}

// 코드관리 수정
export function updateCode(data) {
  const url = url_prefix + '/code/' + data.codeId
  const config = req_config
  return request.put(url, data, config)
}
// 코드삭제
export function deleteCode(data) {
  const url = url_prefix + '/code/' + data.codeId
  const config = req_config
  return request.delete(url, config)
}

// 코드상세
export function selectCode(data) {
  const url = url_prefix + '/code/' + data
  const config = req_config
  return request.get(url, config)
}

// 코드 조회
export function selectCodeCk(data) {
  const url = url_prefix + '/codeCk/' + data
  const config = req_config
  return request.get(url, config)
}

// 코드리스트
export function selectCodeList(data) {
  const url = url_prefix + '/codeList' + objectToParam(data)
  const config = req_config
  return request.get(url, config)
}
// ----------------------------------------------------------------
// 코드상세 등록
export function insertCodeDtl(data) {
  const url = url_prefix + '/codeDTL' // + objectToParam(data)
  const config = req_config
  return request.post(url, data, config)
}

// 코드상세 수정
export function updateCodeDtl(data) {
  const url = url_prefix + '/codeDTL' + objectToParam(data)
  const config = req_config
  return request.put(url, data, config)
}
// 코드상세 삭제
export function deleteCodeDtl(data) {
  const url = url_prefix + '/codeDTL' + objectToParam(data)
  const config = req_config
  return request.delete(url, config)
}

// 코드상세
export function selectCodeDtl(data) {
  const url = url_prefix + '/codeDTL' + objectToParam(data)
  const config = req_config
  return request.get(url, config)
}

// 코드상세 리스트
export function selectCodeDtlList(data) {
  const url = url_prefix + '/codeDTLList' + objectToParam(data)
  const config = req_config
  return request.get(url, config)
}
