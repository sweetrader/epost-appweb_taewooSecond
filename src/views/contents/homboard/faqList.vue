<template>
  <div class="app-container">
    <header>
      <a href="#" class="back" @click="$router.back()"/><h1>FAQ</h1>
    </header>
    <div class="faq_header">
      <div class="faq_header_cell_wrap">
        <a :class="isFaqCategory(ctgryAll) ? 'faq_on' : ''" @click="changeFaqCategory(ctgryAll)">{{ ctgryAll }}</a>
        <a v-for="ctgry in faqCategoryList" :key="ctgry" href="#" :class="isFaqCategory(ctgry) ? 'faq_on' : ''" @click="changeFaqCategory(ctgry)">{{ ctgry }}</a>
      </div>
    </div>
    <div class="faq_list_wrap">
      <div v-for="faq in list" :key="faq.faqId">
        <div class="faq_list_wrap_cell" @click="showDetailFaq(faq.faqId)">
          <span>{{ faq.ctgry }}</span><b>{{ faq.sj }}</b>
          <div :class="(detailFaqId === faq.faqId) ? 'open closed' : 'open'"/>
        </div>
        <div v-show="(detailFaqId === faq.faqId)" class="faq_list_wrap_cell_answer">
          <pre class="answer">{{ faq.cn }}</pre>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { selectFaqList } from '@/api/admCommunity'
import { selectCodeDtlList } from '@/api/admCode'

export default {
  name: 'FaqList',
  data() {
    return {
      listQuery: {
        searchKeyword: '',
        searchType: '',
        ctgry: null,
        page: 1,
        size: 10
      },
      adm: {
        codeId: 'FAQ_CT',
        ordr: 1,
        size: 999
      },
      totCnt: 0,
      list: null,
      ctgryAll: '전체',
      faqCategory: '',
      faqCategoryList: [],
      detailFaqId: 0,
      getCodeDtl: null,
      dataLoading: false
    }
  },
  created() {
    this.dataLoading = true
    this.faqCategory = this.ctgryAll
    this.selectCodeDtlList()
    this.selectFaqList()
    setTimeout(() => {
      this.dataLoading = false
    }, 300)
  },
  methods: {
    async selectCodeDtlList() {
      const response = await selectCodeDtlList(this.adm)
      this.getCodeDtl = response.list
      this.getCodeDtl.forEach((code, i) => {
        this.faqCategoryList.push(code.dtlNm)
      })
      // console.log(this.faqCategoryList)
    },
    async selectFaqList() {
      const response = await selectFaqList(this.listQuery)
      this.list = response.list
      this.totCnt = response.totCnt
      this.detailFaqId = 0
      // console.log(response)
    },
    isFaqCategory(key) {
      if (this.faqCategory === key) {
        return true
      } else {
        return false
      }
    },
    changeFaqCategory(key) {
      this.faqCategory = key
      if (this.faqCategory === this.ctgryAll) {
        this.listQuery.ctgry = null
      } else {
        this.listQuery.ctgry = key
      }
      this.selectFaqList()
    },
    showDetailFaq(faqId) {
      // console.log(this.detailFaqId === faqId)
      if (this.detailFaqId === faqId) {
        this.detailFaqId = 0
      } else {
        this.detailFaqId = faqId
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.answer { font-size:12px;font-weight:normal;text-align:left;color:#495057; font-family: 'Noto Sans KR', sans-serif !important; word-break: break-all;  white-space: pre-wrap; }
</style>

