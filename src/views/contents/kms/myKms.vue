<template>
  <div class="app-container">
    <header>
      <a href="#" class="back" @click="$router.back()"/><h1>내가 등록한 지식</h1>
    </header>
    <div class="tab">
      <div :class="tabIndex === 1 ? 'tab_cell tab_cell_sel' : 'tab_cell'" @click="changeTabIndex()">질문</div>
      <div :class="tabIndex === 2 ? 'tab_cell tab_cell_sel' : 'tab_cell'" @click="changeTabIndex()">답변</div>
    </div>
    <div v-if="tabIndex === 1" class="jisik_list margin-top-100">
      <div class="total">
        총 {{ kmsListTotCnt | toThousandFilter }}건<!--<div class="filter"/>-->
      </div>
      <div v-for="kmsBoard in kmsBoardList" :key="kmsBoard.kmsId" class="jisik_list_cell">
        <b>{{ getCnByPublicYn(kmsBoard.kmsSj, kmsBoard.publicYn, false) }}</b><span>{{ getDateStr(kmsBoard.registerDt) }}</span><span>{{ kmsBoard.registerNm }}</span>
        <div class="divv"><div>답변<br><em>{{ kmsBoard.replyCnt }}</em></div></div>
      </div>
    </div>
    <div v-if="tabIndex === 2" class="jisik_list margin-top-100">
      <div class="total">
        총 {{ kmsBoardReplyTotCnt | toThousandFilter }}건<!--<div class="filter"/>-->
      </div>
      <div v-for="kmsBoardReply in kmsBoardReplyList" :key="kmsBoardReply.rplId" class="jisik_list_cell2">
        <div class="answer">답변</div>
        <b>{{ html2Text(getCnByPublicYn(kmsBoardReply.rplCn, kmsBoardReply.publicYn, true)) }}</b>
        <span>{{ getDateStr(kmsBoardReply.registerDt) }}</span><span>{{ kmsBoardReply.registerNm }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { CATEGORY_TYPE, SEARCH_TYPE } from '@/utils/kms'
import { getKmsBoardReplySearchList, getKmsSearchList } from '@/api/kms'
import { getDateStr } from '@/utils/kms'
import { html2Text } from '@/utils'

export default {
  name: 'MyKms',
  data() {
    return {
      myKmsListQuery: {
        page: 1,
        size: 10,
        searchType: SEARCH_TYPE.REG_ID.value,
        searchKeyword: this.$store.getters.mberId,
        categoryList: CATEGORY_TYPE.ALL,
        sortType: 2 // 1 : regdate asc, 2 or null : regdate desc
      },
      tabIndex: 1,
      kmsBoardList: null,
      kmsListTotCnt: 0,
      kmsBoardReplySearchParams: {
        page: 1,
        size: 10,
        registerId: this.$store.getters.mberId,
        sortType: 2
      },
      kmsBoardReplyList: null,
      kmsBoardReplyTotCnt: 0,
      dataLoading: false
    }
  },
  created() {
    this.dataLoading = true
    this.getMyKmsList()
    this.getKmsBoardReplySearchList()
    setTimeout(() => {
      this.dataLoading = false
    }, 300)
  },
  methods: {
    async getMyKmsList() {
      const response = await getKmsSearchList(this.myKmsListQuery)
      this.kmsListTotCnt = response.resData.totCnt
      this.kmsBoardList = response.resData.kmsBoardList
      console.log(response)
    },
    async getKmsBoardReplySearchList() {
      const response = await getKmsBoardReplySearchList(this.kmsBoardReplySearchParams)
      console.log(response)
      this.kmsBoardReplyList = response.resData.kmsBoardReplyList
      this.kmsBoardReplyTotCnt = response.resData.totCnt
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
    changeTabIndex() {
      this.tabIndex = (this.tabIndex === 1) ? 2 : 1
    },
    getDateStr(value) {
      return getDateStr(value)
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
