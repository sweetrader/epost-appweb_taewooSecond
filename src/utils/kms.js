import store from '@/store'

export const KMS_CONTENTS_MAX = 3990
export const KMS_TITLE_MAX = 250

export const SEARCH_TYPE = Object.freeze({
  REG_NM: 'REG_NM',
  REG_ID: 'REG_ID',
  TITLE: 'TITLE',
  CONTENTS: 'CONTENTS'
})

export const BOARD_TYPE = Object.freeze({
  ALL: 'ALL',
  MY_KMS_LIST: 'MY_KMS_LIST'
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
