import request from './config/axios'
import { objectToParam } from '@/utils/objectKey'

// RENT API
export function fetchSuplerDmandList(data) {
  const url = '/demo/v1/spc/dmand/supler' + objectToParam(data)
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }
  return request.get(url, config)
}

export function fetchCnsmrDmandList(data) {
  const url = '/demo/v1/spc/dmand/cnsmr' + objectToParam(data)
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }
  return request.get(url, config)
}

export function insertDmand(data) {
  const url = '/demo/v1/spc/dmand'
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }
  return request.post(url, data, config)
}

export function fetchDmandDetail(data) {
  const url = '/demo/v1/spc/dmand/' + data
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }
  return request.get(url, config)
}

export function editDmand(data) {
  const url = '/demo/v1/spc/dmand/' + data.dmandCndtnId
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }
  return request.put(url, data, config)
}

export function editDmandDel(data) {
  const url = '/demo/v1/spc/dmand/del/' + data.dmandCndtnId
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }
  return request.put(url, data, config)
}

export function deleteDmand(data) {
  const url = '/demo/v1/spc/dmand/' + data
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

export function fetchRentOptions(data) {
  const url = '/demo/v1/spc/dmand/rent/' + data
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }
  return request.get(url, config)
}

export function insertMchOffer(data) {
  const url = '/demo/v1/spc/dmand/mch'
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }
  return request.post(url, data, config)
}
