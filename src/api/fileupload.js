import request from './config/axios'

export function fileUpload(data) {
  const url = '/file/upload'
  const config = {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  }
  return request.post(url, data, config)
}

export function excelUpload(data) {
  const url = '/excel/upload'
  const config = {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  }
  return request.post(url, data, config)
}

export function excelDownload(data) {
  const url = '/excel/download'
  const config = {
    responseType: 'blob',
    headers: {
      'Content-Type': 'application/octet-stream'
    }
  }
  return request.post(url, data, config)
}
