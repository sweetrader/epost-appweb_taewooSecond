<template>
  <div class="app-container">
    <header>
      <a href="#" class="back"/><h1 class="jisik_masters">지식마스터</h1>
    </header>
    <div class="wrap">
      <div v-for="(kmsRanking, index) in kmsRankingList" :key="kmsRanking.registerId" class="jm_cell">
        <div class="jm_cell_tit">
          <span>{{ index + 1 }}</span><b>{{ kmsRanking.registerNm }}</b>
          <div>답변<br><em>{{ kmsRanking.kmsBoardReplyList.length | toThousandFilter }} 개</em></div>
          <div>지식점수<a href="#"/><br><em>{{ kmsRanking.kmsPointSum | toThousandFilter }} 점</em></div>
        </div>
        <div v-for="(kmsBoardReply) in kmsRanking.kmsBoardReplyList" :key="kmsBoardReply.rplId" class="master_list_wrap">
          <div class="master_list_wrap_cell">
            {{ kmsBoardReply.kmsBoard.kmsSj }}
            <b>{{ html2Text(kmsBoardReply.rplCn) }}</b>
            <span>{{ kmsBoardReply.registerDt }}</span>
          </div>
        </div>
        <a href="#" class="seemorethings">더보기</a>
      </div>
    </div>
  </div>
</template>

<script>
import { getKmsBoardRanking } from '@/api/kms'
import { html2Text } from '@/utils/index'

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
        size: 3
      }
      const response = await getKmsBoardRanking(kmsBoardRankingParams)
      this.kmsRankingList = response.resData.kmsRankingList
      console.log(response)
    },
    html2Text(val) {
      return html2Text(val)
    }
  }
}
</script>
