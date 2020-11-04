import request from './config/axios'
import { objectToParam } from '@/utils/objectKey'

// SPACE API
export function fetchSuplerMchList(data) {
  const url = '/demo/v1/spc/mch/supler' + objectToParam(data)
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }
  return request.get(url, config)
}

export function fetchCnsmrMchList(data) {
  const url = '/demo/v1/spc/mch/cnsmr' + objectToParam(data)
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }
  return request.get(url, config)
}

export function insertMch(data) {
  const url = '/demo/v1/spc/mch'
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }
  return request.post(url, data, config)
}

export function fetchMchDetail(data) {
  const url = '/demo/v1/spc/mch/' + data
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }
  return request.get(url, config)
}

export function editMch(data) {
  const url = '/demo/v1/spc/mch/' + data.rsrcMchId
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }
  return request.put(url, data, config)
}

export function editMchDel(data) {
  const url = '/demo/v1/spc/mch/del/' + data.rsrcMchId
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }
  return request.put(url, data, config)
}

export function deleteMch(data) {
  const url = '/demo/v1/spc/mch/' + data
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }
  return request.delete(url, config)
}

export function editMchState(data) {
  const url = '/demo/v1/spc/mch/state'
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }
  return request.post(url, data, config)
}
