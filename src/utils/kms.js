import store from '@/store'

export const KMS_CONTENTS_MAX = 3990
export const KMS_TITLE_MAX = 250

export const SEARCH_TYPE = Object.freeze({
  REG_NM: { value: 'REG_NM', label: '이름' },
  REG_ID: { value: 'REG_ID', label: '아이디' },
  TITLE: { value: 'TITLE', label: '제목' },
  CONTENTS: { value: 'CONTENTS', label: '내용' }
})

export const EVENT_TYPE = Object.freeze({
  ALL: { value: 'ALL', label: '전체' },
  ING: { value: 'ING', label: '진행중' },
  END: { value: 'END', label: '종료' }
})

export const CATEGORY_TYPE = Object.freeze({
  ORG: 'ORG', // default
  DLVY: 'DLVY', // 택배 배송
  PRC_CL: 'PRC_CL', // 소포 분류
  DLVY_PIC: 'DLVY_PIC', // 택배 픽업
  VHC_TRNS: 'VHC_TRNS', // 차량 운송
  SPC_RENT: 'SPC_RENT', // 공간 임대
  ROOM_RES: 'ROOM_RES', // 회의실 예약
  ALL: 'ALL'
})

export const HOME_BOARD_TYPE = Object.freeze({
  SC: { value: 'SC', label: '지원센터' },
  SB: { value: 'SB', label: '지원사업' },
  SP: { value: 'SP', label: '사업홍보' },
  CP: { value: 'CP', label: '업체홍보' },
  EV: { value: 'EV', label: '이벤트' }
})

export function isEmpty(value) {
  if (value === '' || value === null || value === undefined ||
    (value !== null && typeof value === 'object' && !Object.keys(value).length)) {
    return true
  } else {
    return false
  }
}

export function getCategory() {
  var categoryList = []

  for (let i = 0; i < store.getters.roles.length; i++) {
    switch (store.getters.roles[i].authority) {
      case 'S_DLVY':
      case 'D_DLVY':
        categoryList.push(CATEGORY_TYPE.DLVY)
        break
      case 'S_PRC_CL':
      case 'D_PRC_CL':
        categoryList.push(CATEGORY_TYPE.PRC_CL)
        break
      case 'S_DLVY_PIC':
      case 'D_DLVY_PIC':
        categoryList.push(CATEGORY_TYPE.DLVY_PIC)
        break
      case 'S_VHC_TRNS':
      case 'D_VHC_TRNS':
        categoryList.push(CATEGORY_TYPE.VHC_TRNS)
        break
      case 'S_SPC_RENT':
      case 'D_SPC_RENT':
        categoryList.push(CATEGORY_TYPE.SPC_RENT)
        break
      case 'S_ROOM_RES':
      case 'D_ROOM_RES':
        categoryList.push(CATEGORY_TYPE.ROOM_RES)
        break
      case 'ORG':
        categoryList.push(CATEGORY_TYPE.ORG)
        break
    }
  }

  return categoryList
}

export function getBoardTypeStr(value) {
  let boardTypeStr = '지원센터'

  switch (value) {
    case HOME_BOARD_TYPE.SC.value:
      boardTypeStr = HOME_BOARD_TYPE.SC.label
      break
    case HOME_BOARD_TYPE.SB.value:
      boardTypeStr = HOME_BOARD_TYPE.SB.label
      break
    case HOME_BOARD_TYPE.SP.value:
      boardTypeStr = HOME_BOARD_TYPE.SP.label
      break
    case HOME_BOARD_TYPE.CP.value:
      boardTypeStr = HOME_BOARD_TYPE.CP.label
      break
    case HOME_BOARD_TYPE.EV.value:
      boardTypeStr = HOME_BOARD_TYPE.EV.label
      break
  }

  return boardTypeStr
}

export function getDateStr(value) {
  return isEmpty(value) ? '' : value.split(' ')[0]
}
