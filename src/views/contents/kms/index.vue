<template>
  <div v-loading="dataLoading" class="app-container">
    <header>
      <router-link to="$router.go(-1)" class="back"/>
      <h1>지식게시판</h1>
      <router-link :to="{ name: 'CreateKmsEditor', params: { isReply: false }}" class="forward">등록</router-link>
    </header>
    <div class="bn"><!--<div class="x"/>--></div>
    <div class="jisik_list">
      <div class="total">
        총 {{ kmsListTotCnt }}건 <!-- <div class="filter"/> -->
      </div>
      <template>
        <div v-for="kmsBoard in kmsList" :key="kmsBoard.kmsId" class="jisik_list_cell">
          <b>{{ kmsBoard.kmsSj }}</b><span>{{ kmsBoard.registerDt }}</span><span>{{ kmsBoard.registerNm }}</span>
          <div class="divv"><div>답변<br><em>{{ kmsBoard.replyCnt }}</em></div></div>
        </div>
      </template>
      <a href="#" class="seemorethings">더보기</a>
    </div>
    <div class="jisik_list">
      <div class="mytotal">내가 등록한 지식<span>{{ myKmsListTotCnt }}</span></div>
      <div v-for="myKmsBoard in myKmsList" :key="myKmsBoard.kmsId" class="jisik_list_cell">
        <b>{{ myKmsBoard.kmsSj }}</b><span>{{ myKmsBoard.registerDt }}</span><span>{{ myKmsBoard.registerNm }}</span>
        <div class="divv"><div>답변<br><em>{{ myKmsBoard.replyCnt }}</em></div></div>
      </div>
      <a href="#" class="seemorethings">더보기</a>
    </div>
    <div class="jisik_master">
      <h5>지식마스터</h5>
      <div class="jisik_master_cell">
        <div class="soonwi">
          <b>1</b>위<br><span>홍길동</span>
        </div>
        <div class="det">
          지식점수<br><span>95점</span>
        </div>
        <div class="det">
          지식점수<br><span>95점</span>
        </div>
      </div>
      <div class="jisik_master_cell">
        <div class="soonwi">
          <b>2</b>위<br><span>김민수</span>
        </div>
        <div class="det">
          지식점수<br><span>95점</span>
        </div>
        <div class="det">
          지식점수<br><span>95점</span>
        </div>
      </div>
      <div class="jisik_master_cell">
        <div class="soonwi">
          <b>3</b>위<br><span>이민우</span>
        </div>
        <div class="det">
          지식점수<br><span>95점</span>
        </div>
        <div class="det">
          지식점수<br><span>95점</span>
        </div>
      </div>
    </div>
    <a v-waves href="#" class="seemorethings">더보기</a>
  </div>
</template>

<script>
import { SEARCH_TYPE, CATEGORY_TYPE } from '@/utils/kms'
import { getKmsSearchList } from '@/api/kms'
import waves from '@/directive/waves'

export default {
  name: 'KmsMain',
  directives: { waves },
  data() {
    return {
      kmsList: null,
      myKmsList: null,
      kmsListTotCnt: 0,
      myKmsListTotCnt: 0,
      kmsListQuery: {
        page: 1,
        size: 10,
        searchType: null,
        searchKeyword: null,
        categoryList: CATEGORY_TYPE.ALL,
        sortType: 2 // 1 : regdate asc, 2 or null : regdate desc
      },
      myKmsListQuery: {
        page: 1,
        size: 10,
        searchType: SEARCH_TYPE.REG_ID,
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
      const response = await getKmsSearchList(this.myKmsListQuery)
      this.myKmsListTotCnt = response.resData.totCnt
      this.myKmsList = response.resData.kmsBoardList
      console.log(response)
    },
    registerKmsBoard() {
      console.log('registerKmsBoard')
    }
  }
}
</script>
