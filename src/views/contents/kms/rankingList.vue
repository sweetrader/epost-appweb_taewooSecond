<template>
  <div v-loading="dataLoading" class="app-container">
    <header>
      <a href="#" class="back" @click="$router.back()"/><h1 class="jisik_masters">지식마스터</h1>
    </header>
    <div class="jisik_master_detail_header">
      <b>1위</b><span>{{ registerNm }}</span>
      <em>답변 {{ totCnt | toThousandFilter }}</em><em class="ona">채택 {{ selTotCnt | toThousandFilter }}</em>
    </div>
    <div class="jisik_master_detail_list_wrap">
      <div v-for="kmsBoardReply in kmsBoardReplyList" :key="kmsBoardReply.rplId" class="jisik_master_detail_list_wrap_cell">
        <router-link :to="{ name: 'KmsDetail', params: { id: kmsBoardReply.kmsId }}" class="link-type">
          {{ getCnByPublicYn(kmsBoardReply.kmsBoard.kmsSj, kmsBoardReply.kmsBoard.publicYn, false) }}<b>{{ html2Text(getCnByPublicYn(kmsBoardReply.rplCn, kmsBoardReply.publicYn, true)) }}</b><span>{{ getDateStr(kmsBoardReply.registerDt) }}</span><span>{{ registerNm }}</span>
          <div v-if="kmsBoardReply.selected === 'Y'" class="answer picked_answer">채택</div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { getKmsBoardReplySearchList } from '@/api/kms'
import { html2Text } from '@/utils/index'
import { getDateStr } from '@/utils/kms'
import { selectMberInfo } from '@/api/mberInfo'

export default {
  name: 'KmsRankingList',
  props: {
    registerId: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      kmsBoardReplySearchParams: {
        page: 1,
        size: 10,
        registerId: this.registerId,
        sortType: 2
      },
      kmsBoardReplyList: null,
      totCnt: 0,
      selTotCnt: 0,
      registerNm: '',
      dataLoading: false
    }
  },
  created() {
    this.dataLoading = true
    this.getMberInfo()
    this.getKmsBoardReplySearchList()
    setTimeout(() => {
      this.dataLoading = false
    }, 300)
  },
  methods: {
    async getKmsBoardReplySearchList() {
      const response = await getKmsBoardReplySearchList(this.kmsBoardReplySearchParams)
      console.log(response)
      this.kmsBoardReplyList = response.resData.kmsBoardReplyList
      this.selTotCnt = response.resData.selTotCnt
      this.totCnt = response.resData.totCnt
    },
    html2Text(val) {
      return html2Text(val)
    },
    getCnByPublicYn(cn, publicYn, isReply) {
      if (publicYn === 'Y') {
        return cn
      } else {
        return '관리자에 의해 비공개 처리된 글입니다.'
      }
    },
    getDateStr(value) {
      return getDateStr(value)
    },
    async getMberInfo() {
      const response = await selectMberInfo(this.registerId)
      this.registerNm = response.data.mberNm
      setTimeout(() => {
        this.dataLoading = false
      }, 300)
    }
  }
}
</script>
