<template>
  <div v-loading="dataLoading" class="app-container">
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
      <a href="#" class="seemorethings">더보기</a>
    </div>
    <div class="jisik_list">
      <div class="mytotal">내가 등록한 지식<span>{{ myKmsListTotCnt | toThousandFilter }}</span></div>
      <div v-for="myKmsBoard in myKmsList" :key="myKmsBoard.kmsId" class="jisik_list_cell">
        <b>{{ myKmsBoard.kmsSj }}</b><span>{{ getDateStr(myKmsBoard.registerDt) }}</span><span>{{ myKmsBoard.registerNm }}</span>
        <div class="divv"><div>답변<br><em>{{ myKmsBoard.replyCnt }}</em></div></div>
      </div>
      <a href="#" class="seemorethings">더보기</a>
    </div>
    <div class="jisik_master">
      <h5>지식마스터</h5>
      <div v-for="(kmsRanking, index) in kmsRankingList" :key="kmsRanking.registerId" class="jisik_master_cell">
        <div class="soonwi">
          <b>{{ index + 1 }}</b>위<br><span>{{ kmsRanking.registerNm }}</span>
        </div>
        <div class="det">
          지식점수<br><span>{{ kmsRanking.kmsPointSum | toThousandFilter }} 점</span>
        </div>
        <div class="det">
          답변<br><span>{{ kmsRanking.kmsBoardReplyList.length | toThousandFilter }} 개</span>
        </div>
      </div>
    </div>
    <router-link :to="{ name: 'KmsRanking' }" class="seemorethings">더보기</router-link>
  </div>
</template>

<script>
import { SEARCH_TYPE, CATEGORY_TYPE, isEmpty } from '@/utils/kms'
import { getKmsSearchList, getKmsBoardRanking } from '@/api/kms'
import { getDateStr } from '@/utils/kms'
import waves from '@/directive/waves'

export default {
  name: 'KmsMain',
  directives: { waves },
  data() {
    return {
      kmsList: null,
      myKmsList: null,
      kmsRankingList: null,
      kmsListTotCnt: 0,
      myKmsListTotCnt: 0,
      kmsListQuery: {
        page: 1,
        size: 5,
        searchType: null,
        searchKeyword: null,
        categoryList: CATEGORY_TYPE.ALL,
        sortType: 2 // 1 : regdate asc, 2 or null : regdate desc
      },
      myKmsListQuery: {
        page: 1,
        size: 5,
        searchType: SEARCH_TYPE.REG_ID.value,
        searchKeyword: this.$store.getters.mberId,
        categoryList: CATEGORY_TYPE.ALL,
        delYn: 'Y',
        sortType: 2 // 1 : regdate asc, 2 or null : regdate desc
      },
      dataLoading: false
    }
  },
  created() {
    this.dataLoading = true
    this.getKmsList()
    this.getMyKmsList()
    this.getKmsBoardRanking()
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
    async getMyKmsList() {
      if (isEmpty(this.$store.getters.mberId)) {
        return
      }
      const response = await getKmsSearchList(this.myKmsListQuery)
      this.myKmsListTotCnt = response.resData.totCnt
      this.myKmsList = response.resData.kmsBoardList
    },
    async getKmsBoardRanking() {
      const kmsBoardRankingParams = {
        size: 3
      }
      const response = await getKmsBoardRanking(kmsBoardRankingParams)
      this.kmsRankingList = response.resData.kmsRankingList
      console.log(response)
    },
    getDateStr(value) {
      return getDateStr(value)
    }
  }
}
</script>
