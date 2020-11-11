<template>
  <div class="app-container">
    <header>
      <a href="#" class="back" @click="$router.back()"/><h1>지식게시판</h1>
      <router-link :to="{ name: 'CreateKmsEditor', params: { isReply: false }}" class="forward">등록</router-link>
    </header>
    <div class="bn"><!--<div class="x"/>--></div>
    <div class="jisik_list">
      <div class="total">
        총 {{ kmsListTotCnt | toThousandFilter }}건 <!-- <div class="filter"/> -->
      </div>
      <template>
        <div v-for="kmsBoard in kmsList" :key="kmsBoard.kmsId" class="jisik_list_cell">
          <router-link :to="{ name: 'KmsDetail', params: { id: kmsBoard.kmsId }}" class="link-type">
            <b>{{ kmsBoard.kmsSj }}</b><span>{{ getDateStr(kmsBoard.registerDt) }}</span><span>{{ kmsBoard.registerNm }}</span>
            <div class="divv"><div>답변<br><em>{{ kmsBoard.replyCnt }}</em></div></div>
          </router-link>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import { CATEGORY_TYPE } from '@/utils/kms'
import { getKmsSearchList } from '@/api/kms'
import { getDateStr } from '@/utils/kms'
import { html2Text } from '@/utils'

export default {
  name: 'KmsList',
  data() {
    return {
      kmsList: null,
      kmsListTotCnt: 0,
      kmsListQuery: {
        page: 1,
        size: 10,
        searchType: null,
        searchKeyword: null,
        categoryList: CATEGORY_TYPE.ALL,
        sortType: 2 // 1 : regdate asc, 2 or null : regdate desc
      },
      dataLoading: false
    }
  },
  created() {
    this.dataLoading = true
    this.getKmsList()
    setTimeout(() => {
      this.dataLoading = false
    }, 300)
  },
  methods: {
    async getKmsList() {
      const response = await getKmsSearchList(this.kmsListQuery)
      this.kmsListTotCnt = response.resData.totCnt
      this.kmsList = response.resData.kmsBoardList
    },
    html2Text(val) {
      return html2Text(val)
    },
    getCnByPublicYn(cn, publicYn, isReply) {
      if (publicYn === 'Y') {
        return cn
      } else {
        return isReply ? '관리자에 의해 비공개 처리된 답변입니다.' : '관리자에 의해 비공개 처리된 글입니다.'
      }
    },
    getDateStr(value) {
      return getDateStr(value)
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
