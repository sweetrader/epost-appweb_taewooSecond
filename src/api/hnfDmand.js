import request from './config/axios'
import { objectToParam } from '@/utils/objectKey'

export function selectHnfDmandList(data) {
  const url = '/demo/v1/hnf/dmand' + objectToParam(data)
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }
  return request.get(url, config)
}

export function selectHnfAplyCnfList(data) {
  const url = '/demo/v1/hnf/aply' + objectToParam(data)
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }
  return request.post(url, data, config)
}

export function deleteHnfDmand(data) {
  const url = '/demo/v1/hnf/dmand/' + data
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }
  return request.delete(url, config)
}

export function selectHnfDmandDtl(data) {
  const url = '/demo/v1/hnf/dmand/' + data
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }
  return request.get(url, config)
}

export function insertHnfDmandRegister(data) {
  const url = '/demo/v1/hnf/dmand' + objectToParam(data)
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }
  return request.post(url, data, config)
}

export function updateHnfDmandDtl(data) {
  const url = '/demo/v1/hnf/dmand/' + data.hnfDmandId
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }
  return request.put(url, data, config)
}

export function selectHnfDcsnStCdCount(data) {
  const url = '/demo/v1/hnf/dmand/dcsnStCdCount' + objectToParam(data)
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }
  return request.get(url, config)
}

export function selectMobileNum(data) {
  const url = '/demo/v1/hnf/dmand/mobileNum' + objectToParam(data)
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }
  return request.get(url, config)
}

export function selectHnfAplyVolmCount(data) {
  const url = '/demo/v1/hnf/dmand/aplyVolmCount' + objectToParam(data)
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }
  return request.get(url, config)
}

export function hnfFileUpload(data) {
  console.log('js fileupload' + data)
  const url = '/demo/v1/hnf/dmand/fileUpload'
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }
  return request.post(url, data, config)
}

export function hnfFileUpdate(data) {
  console.log('hnfFileUpdate:: ' + data)
  const url = '/demo/v1/hnf/dmand/fileUpdate'
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }
  return request.post(url, data, config)
}

export function selectHnfAtchDtl(data) {
  const url = '/demo/v1/hnf/dmand/upload/' + data
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }
  return request.get(url, config)
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

export function selectCodeDtlOne(data) {
  const url = 'demo/v1/adm/codeDTL/' + objectToParam(data)
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }
  return request.get(url, config)
}

export function isEmpty(value) {
  if (value === '' || value === null || value === undefined || value === '0' ||
    (value !== null && typeof value === 'object' && !Object.keys(value).length)) {
    return true
  } else {
    return false
  }
}
