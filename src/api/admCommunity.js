import request from './config/axios'
import { objectToParam } from '@/utils/objectKey'

const url_prefix = 'demo/v1/adm'
const req_config = {
  headers: {
    'Content-Type': 'application/json'
  }
}

/* ---------------------------------------  FAQ  -------------------------------------------------- */
// 등록
export function insertFaq(data) {
  const url = url_prefix + '/faq' // + objectToParam(data)
  const config = req_config
  return request.post(url, data, config)
}

// 수정
export function updateFaq(data) {
  const url = url_prefix + '/faq/' + data.faqId
  const config = req_config
  return request.put(url, data, config)
}
// 삭제
export function deleteFaq(data) {
  const url = url_prefix + '/faq/' + data.faqId
  const config = req_config
  return request.delete(url, config)
}

// 상세
export function selectFaq(data) {
  const url = url_prefix + '/faq/' + data
  const config = req_config
  return request.get(url, config)
}

// 리스트
export function selectFaqList(data) {
  const url = url_prefix + '/faqList' + objectToParam(data)
  const config = req_config
  return request.get(url, config)
}

/* ---------------------------------------  Q&A  -------------------------------------------------- */
// 등록
export function insertQna(data) {
  const url = url_prefix + '/qna' // + objectToParam(data)
  const config = req_config
  return request.post(url, data, config)
}

// 수정
export function updateQna(data) {
  const url = url_prefix + '/qna/' + data.qaId
  const config = req_config
  return request.put(url, data, config)
}
// 삭제
export function deleteQna(data) {
  const url = url_prefix + '/qna/' + data.qaId
  const config = req_config
  return request.delete(url, config)
}

// 상세
export function selectQna(data) {
  const url = url_prefix + '/qna/' + data
  const config = req_config
  return request.get(url, config)
}

// 리스트
export function selectQnaList(data) {
  const url = url_prefix + '/qnaList' + objectToParam(data)
  const config = req_config
  return request.get(url, config)
}
/* ---------------------------------------  NOTICE -------------------------------------------------- */
// 등록
export function insertNotice(data) {
  const url = url_prefix + '/notice' // + objectToParam(data)
  const config = req_config
  return request.post(url, data, config)
}

// 수정
export function updateNotice(data) {
  const url = url_prefix + '/notice/' + data.noticeId
  const config = req_config
  return request.put(url, data, config)
}
// 삭제
export function deleteNotice(data) {
  const url = url_prefix + '/notice/' + data.noticeId
  const config = req_config
  return request.delete(url, config)
}

// 상세
export function selectNotice(data) {
  const url = url_prefix + '/notice/' + data
  const config = req_config
  return request.get(url, config)
}

// 리스트
export function selectNoticeList(data) {
  const url = url_prefix + '/noticeList' + objectToParam(data)
  const config = req_config
  return request.get(url, config)
}

// 파일 리스트
export function selectNoticeFileList(data) {
  const url = url_prefix + '/noticeFileList' + objectToParam(data)
  const config = req_config
  return request.get(url, config)
}
