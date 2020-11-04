import request from './config/axios'
import { objectToParam } from '@/utils/objectKey'

// SPACE API
export function fetchSpaceList(data) {
  const url = '/demo/v1/spc/space/list' + objectToParam(data)
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }
  return request.get(url, config)
}

export function insertSpace(data) {
  const url = '/demo/v1/spc/space'
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }
  return request.post(url, data, config)
}

export function fetchSpaceDetail(data) {
  const url = '/demo/v1/spc/space/' + data
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }
  return request.get(url, config)
}

export function editSpace(data) {
  const url = '/demo/v1/spc/space/' + data.spcRsrcId
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }
  return request.put(url, data, config)
}

export function editSpaceDel(data) {
  const url = '/demo/v1/spc/space/del/' + data.spcRsrcId
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }
  return request.put(url, data, config)
}

export function deleteSpace(data) {
  const url = '/demo/v1/spc/space/' + data
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }
  return request.delete(url, config)
}

export function fetchCodeList(data) {
  const url = '/demo/v1/spc/code/' + data
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }
  return request.get(url, config)
}

export function insertSpaceRent(data) {
  const url = '/demo/v1/spc/space/rent/' + data.spcRsrcId
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }
  return request.post(url, data, config)
}
