import request from './config/axios'
// import { objectToParamWithArray } from '@/utils/objectKey'

const url_prefix = '/homeboard'
const req_config = {
  headers: {
    'Content-Type': 'application/json'
  }
}

function objectToParamWithArray(Obj) {
  let returnArray = '?'
  const keys = Object.keys(Obj)
  keys.forEach(function(key) {
    if (typeof (Obj[key]) !== 'object' && typeof (Obj[key]) !== 'function' && Obj[key] !== '') {
      returnArray += key + '=' + Obj[key] + '&'
    } else if (Array.isArray(Obj[key])) {
      let returnArray2 = key + '='
      Obj[key].forEach(function(key2) {
        returnArray2 += key2 + ','
      })
      returnArray += returnArray2.substr(0, returnArray2.length - 1) + '&'
    }
  })
  return returnArray
}

export function getHomeBoardSearchList(data) {
  const url = url_prefix + objectToParamWithArray(data)
  return request.get(url, req_config)
}

export function getHomeBoard(boardId) {
  const url = url_prefix + '/' + boardId
  return request.get(url, req_config)
}
