import request from './config/axios'
import { objectToParam } from '@/utils/objectKey'

// SPACE API
export function fetchSuplerCntrList(data) {
  const url = '/demo/v1/spc/cntr/supler' + objectToParam(data)
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }
  return request.get(url, config)
}

export function fetchCnsmrCntrList(data) {
  const url = '/demo/v1/spc/cntr/cnsmr' + objectToParam(data)
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }
  return request.get(url, config)
}

export function insertCntr(data) {
  const url = '/demo/v1/spc/cntr'
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }
  return request.post(url, data, config)
}

export function fetchCntrDetail(data) {
  const url = '/demo/v1/spc/cntr/' + data
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }
  return request.get(url, config)
}

export function editCntr(data) {
  const url = '/demo/v1/spc/cntr/' + data.rsrcCntrId
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }
  return request.put(url, data, config)
}

export function editCntrDel(data) {
  const url = '/demo/v1/spc/cntr/del/' + data.rsrcCntrId
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }
  return request.put(url, data, config)
}

export function deleteCntr(data) {
  const url = '/demo/v1/spc/cntr/' + data
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }
  return request.delete(url, config)
}

export function editCntrState(data) {
  const url = '/demo/v1/spc/cntr/state'
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }
  return request.post(url, data, config)
}
