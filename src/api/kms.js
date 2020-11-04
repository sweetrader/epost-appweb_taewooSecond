import request from './config/axios'
import { objectToParam } from '@/utils/objectKey'

const url_prefix = '/kms/kms-board'
const req_config = {
  headers: {
    'Content-Type': 'application/json'
  }
}

export function getKmsSearchList(data) {
  const url = url_prefix + objectToParam(data)
  return request.get(url, req_config)
}

export function getKmsBoard(data) {
  const url = url_prefix + '/' + data.kmsId + objectToParam(data)
  return request.get(url, req_config)
}

export function getKmsBoardReply(data) {
  const url = url_prefix + '/reply/' + data.rplId + objectToParam(data)
  return request.get(url, req_config)
}

export function updateKmsBoardReply(data) {
  const url = url_prefix + '/reply/' + data.rplId
  return request.put(url, data, req_config)
}

export function deleteKmsBoardReply(data) {
  const url = url_prefix + '/reply/' + data.rplId
  return request.delete(url, req_config)
}

export function updateKmsBoardReplySelected(data) {
  const url = url_prefix + '/reply/' + data.rplId + '/selected'
  return request.put(url, data, req_config)
}

export function registerKmsBoard(data) {
  const url = url_prefix
  return request.post(url, data, req_config)
}

export function updateKmsBoard(data) {
  const url = url_prefix + '/' + data.kmsId
  return request.put(url, data, req_config)
}

export function deleteKmsBoard(data) {
  const url = url_prefix + '/' + data.kmsId
  return request.delete(url, req_config)
}

export function registerKmsBoardReply(data) {
  const url = url_prefix + '/reply'
  return request.post(url, data, req_config)
}

export function registerKmsBoardReplyRecommend(data) {
  const url = url_prefix + '/reply/' + data.rplId + '/recommend'
  return request.post(url, data, req_config)
}

export function updateKmsBoardPublicYn(data) {
  const url = url_prefix + '/' + data.kmsId + '/publicyn'
  return request.put(url, data, req_config)
}

export function updateKmsBoardReplyPublicYn(data) {
  const url = url_prefix + '/reply/' + data.rplId + '/publicyn'
  return request.put(url, data, req_config)
}

export function getKmsBoardRanking(data) {
  const url = url_prefix + '/ranking' + objectToParam(data)
  return request.get(url, req_config)
}

export function getKmsBoardReplySearchList(data) {
  const url = url_prefix + '/reply' + objectToParam(data)
  return request.get(url, req_config)
}
