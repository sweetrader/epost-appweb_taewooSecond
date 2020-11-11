<template>
  <div class="app-container">
    <header>
      <a href="#" class="back" @click="$router.back()"/><h1 class="jisik_masters">지식마스터</h1>
    </header>
    <div class="wrap">
      <div v-for="(kmsRanking, index) in kmsRankingList" :key="kmsRanking.registerId" class="jm_cell">
        <div class="jm_cell_tit">
          <span>{{ index + 1 }}</span><b>{{ kmsRanking.registerNm }}</b>
          <div>답변<br><em>{{ kmsRanking.kmsBoardReplyList.length | toThousandFilter }} 개</em></div>
          <div>지식점수<a href="#"/><br><em>{{ kmsRanking.kmsPointSum | toThousandFilter }} 점</em></div>
        </div>
        <div v-for="(kmsBoardReply) in kmsRanking.kmsBoardReplyList" :key="kmsBoardReply.rplId" class="master_list_wrap">
          <router-link :to="{ name: 'KmsDetail', params: { id: kmsBoardReply.kmsId }}" class="link-type">
            <div class="master_list_wrap_cell">
              {{ getCnByPublicYn(kmsBoardReply.kmsBoard.kmsSj, kmsBoardReply.kmsBoard.publicYn, false) }}
              <b>{{ html2Text(getCnByPublicYn(kmsBoardReply.rplCn, kmsBoardReply.publicYn, true)) }}</b>
              <span>{{ getDateStr(kmsBoardReply.registerDt) }}</span>
            </div>
          </router-link>
        </div>
        <router-link :to="{ name: 'KmsRankingList', params: { registerId: kmsRanking.registerId, registerNm: kmsRanking.registerNm }}" class="seemorethings">더보기</router-link>
        <!-- <a href="#" class="seemorethings">더보기</a> -->
      </div>
    </div>
  </div>
</template>

<script>
import { getKmsBoardRanking } from '@/api/kms'
import { html2Text } from '@/utils/index'
import { getDateStr } from '@/utils/kms'

export default {
  name: 'KmsRanking',
  data() {
    return {
      kmsRankingList: null,
      dataLoading: false
    }
  },
  created() {
    this.dataLoading = true
    this.getKmsBoardRanking()
    setTimeout(() => {
      this.dataLoading = false
    }, 300)
  },
  methods: {
    async getKmsBoardRanking() {
      const kmsBoardRankingParams = {
        size: 10
      }
      const response = await getKmsBoardRanking(kmsBoardRankingParams)
      this.kmsRankingList = response.resData.kmsRankingList
      console.log(response)
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
    }
  }
}
</script>
