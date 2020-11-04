import request from './config/axios'
import { objectToParam } from '@/utils/objectKey'

// RENT API
export function fetchSuplerRentList(data) {
  const url = '/demo/v1/spc/rent/supler' + objectToParam(data)
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }
  return request.get(url, config)
}

export function fetchCnsmrRentList(data) {
  const url = '/demo/v1/spc/rent/cnsmr' + objectToParam(data)
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }
  return request.get(url, config)
}

export function insertRent(data) {
  const url = '/demo/v1/spc/rent'
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }
  return request.post(url, data, config)
}

export function fetchRentDetail(data) {
  const url = '/demo/v1/spc/rent/' + data
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }
  return request.get(url, config)
}

export function editRent(data) {
  const url = '/demo/v1/spc/rent/' + data.rentRsrcId
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }
  return request.put(url, data, config)
}

export function editRentDel(data) {
  const url = '/demo/v1/spc/rent/del/' + data.rentRsrcId
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }
  return request.put(url, data, config)
}

export function deleteRent(data) {
  const url = '/demo/v1/spc/rent/' + data
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }
  return request.delete(url, config)
}

export function fetchSpaceOptions(data) {
  const url = '/demo/v1/spc/space/list' + objectToParam(data)
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }
  return request.get(url, config)
}
