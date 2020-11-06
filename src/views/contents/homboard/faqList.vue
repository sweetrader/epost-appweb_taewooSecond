<template>
  <div class="app-container">
    <header>
      <a href="#" class="back" @click="$router.back()"/><h1>FAQ</h1>
    </header>
    <div class="faq_header">
      <div class="faq_header_cell_wrap">
        <a href="#" :class="isFaqCategory(0) ? 'faq_on' : ''" @click="changeFaqCategory(0)">{{ getFaqCategoryNm(0) }}</a>
        <a href="#" :class="isFaqCategory(1) ? 'faq_on' : ''" @click="changeFaqCategory(1)">{{ getFaqCategoryNm(1) }}</a>
        <a href="#" :class="isFaqCategory(2) ? 'faq_on' : ''" @click="changeFaqCategory(2)">{{ getFaqCategoryNm(2) }}</a>
        <a href="#" :class="isFaqCategory(3) ? 'faq_on' : ''" @click="changeFaqCategory(3)">{{ getFaqCategoryNm(3) }}</a>
        <a href="#" :class="isFaqCategory(4) ? 'faq_on' : ''" @click="changeFaqCategory(4)">{{ getFaqCategoryNm(4) }}</a>
        <a href="#" :class="isFaqCategory(5) ? 'faq_on' : ''" @click="changeFaqCategory(5)">{{ getFaqCategoryNm(5) }}</a>
        <a href="#" :class="isFaqCategory(6) ? 'faq_on' : ''" @click="changeFaqCategory(6)">{{ getFaqCategoryNm(6) }}</a>
        <a href="#" :class="isFaqCategory(7) ? 'faq_on' : ''" @click="changeFaqCategory(7)">{{ getFaqCategoryNm(7) }}</a>
      </div>
    </div>
    <div class="faq_list_wrap">
      <div v-for="faq in list" :key="faq.faqId">
        <div class="faq_list_wrap_cell" @click="showDetailFaq(faq.faqId)">
          <span>{{ getFaqCategoryNm(faq.ctgry) }}</span><b>{{ faq.Sj }}</b>
          <div :class="(detailFaqId === faq.faqId) ? 'open closed' : 'open'"/>
        </div>
        <div v-show="(detailFaqId === faq.faqId)" class="faq_list_wrap_cell_answer">
          <pre class="answer">{{ faq.Cn }}</pre>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const faqCategoryOption = [
  { key: 0, label: '전체' },
  { key: 1, label: '택배배송' },
  { key: 2, label: '소포분류' },
  { key: 3, label: '택배픽업' },
  { key: 4, label: '차량운송' },
  { key: 5, label: '공간임대' },
  { key: 6, label: '회의실 예약' },
  { key: 7, label: '기타' }
]

export default {
  name: 'FaqList',
  data() {
    return {
      listQuery: {
        searchKeyword: '',
        searchType: '',
        page: 1,
        size: 10
      },
      totCnt: 0,
      list: null,
      faqCategory: faqCategoryOption[0].key,
      detailFaqId: 0,
      dataLoading: false
    }
  },
  created() {
    this.selectFaqList()
  },
  methods: {
    async selectFaqList() {
      this.dataLoading = true
      // const response = await selectFaqList(this.listQuery)
      // this.list = response.list
      // this.totCnt = response.totCnt
      this.list = [
        { faqId: 1, Sj: '택배픽업입니다. 택배픽업입니다. 택배픽업입니다. 택배픽업입니다. 택배픽업입니다. 1111', Cn: '\'택배픽업입니다. 답변\n' +
            '\n' +
            '택배픽업입니다. 답변\n' +
            '\n' +
            '택배픽업입니다. 답변\n' +
            '\n' +
            '택배픽업입니다. 답변택배픽업입니다. 답변택배픽업입니다. 답변택배픽업입니다. 답변 111111111111111111111111111111111111\n' +
            '\n' +
            '택배픽업입니다. 답변\n' +
            '\'', ctgry: 1 },
        { faqId: 2, Sj: '2.회원가입은 어떻게 하나요?', Cn: '1. [회원가입]을 클릭합니다.\n\n 회원종류를 선택하여 이용약관에 동의하신 후 해당하는 버튼을 클릭합니다.\n\n 본인확인을 위한 실명확인을 합니다.\n\n 해당 회원가입페이지에서 회원정보를 순서대로 입력합니다. 모든 항목을 입력한 후 [확인]버튼을 클릭합니다.', ctgry: 1 },
        { faqId: 3, Sj: '3.회원가입은 어떻게 하나요?', Cn: '1. [회원가입]을 클릭합니다.\n\n 회원종류를 선택하여 이용약관에 동의하신 후 해당하는 버튼을 클릭합니다.\n\n 본인확인을 위한 실명확인을 합니다.\n\n 해당 회원가입페이지에서 회원정보를 순서대로 입력합니다. 모든 항목을 입력한 후 [확인]버튼을 클릭합니다.', ctgry: 2 },
        { faqId: 4, Sj: '1.회원가입은 어떻게 하나요?', Cn: '1. [회원가입]을 클릭합니다.\n\n 회원종류를 선택하여 이용약관에 동의하신 후 해당하는 버튼을 클릭합니다.\n\n 본인확인을 위한 실명확인을 합니다.\n\n 해당 회원가입페이지에서 회원정보를 순서대로 입력합니다. 모든 항목을 입력한 후 [확인]버튼을 클릭합니다.', ctgry: 1 },
        { faqId: 5, Sj: '2.회원가입은 어떻게 하나요?', Cn: '1. [회원가입]을 클릭합니다.\n\n 회원종류를 선택하여 이용약관에 동의하신 후 해당하는 버튼을 클릭합니다.\n\n 본인확인을 위한 실명확인을 합니다.\n\n 해당 회원가입페이지에서 회원정보를 순서대로 입력합니다. 모든 항목을 입력한 후 [확인]버튼을 클릭합니다.', ctgry: 1 },
        { faqId: 6, Sj: '3.회원가입은 어떻게 하나요?', Cn: '1. [회원가입]을 클릭합니다.\n\n 회원종류를 선택하여 이용약관에 동의하신 후 해당하는 버튼을 클릭합니다.\n\n 본인확인을 위한 실명확인을 합니다.\n\n 해당 회원가입페이지에서 회원정보를 순서대로 입력합니다. 모든 항목을 입력한 후 [확인]버튼을 클릭합니다.', ctgry: 3 },
        { faqId: 7, Sj: '1.회원가입은 어떻게 하나요?', Cn: '1. [회원가입]을 클릭합니다.\n\n 회원종류를 선택하여 이용약관에 동의하신 후 해당하는 버튼을 클릭합니다.\n\n 본인확인을 위한 실명확인을 합니다.\n\n 해당 회원가입페이지에서 회원정보를 순서대로 입력합니다. 모든 항목을 입력한 후 [확인]버튼을 클릭합니다.', ctgry: 4 },
        { faqId: 8, Sj: '2.회원가입은 어떻게 하나요?', Cn: '1. [회원가입]을 클릭합니다.\n\n 회원종류를 선택하여 이용약관에 동의하신 후 해당하는 버튼을 클릭합니다.\n\n 본인확인을 위한 실명확인을 합니다.\n\n 해당 회원가입페이지에서 회원정보를 순서대로 입력합니다. 모든 항목을 입력한 후 [확인]버튼을 클릭합니다.', ctgry: 5 },
        { faqId: 9, Sj: '3.회원가입은 어떻게 하나요?', Cn: '1. [회원가입]을 클릭합니다.\n\n 회원종류를 선택하여 이용약관에 동의하신 후 해당하는 버튼을 클릭합니다.\n\n 본인확인을 위한 실명확인을 합니다.\n\n 해당 회원가입페이지에서 회원정보를 순서대로 입력합니다. 모든 항목을 입력한 후 [확인]버튼을 클릭합니다.', ctgry: 6 },
        { faqId: 10, Sj: '1.회원가입은 어떻게 하나요?', Cn: '1. [회원가입]을 클릭합니다.\n\n 회원종류를 선택하여 이용약관에 동의하신 후 해당하는 버튼을 클릭합니다.\n\n 본인확인을 위한 실명확인을 합니다.\n\n 해당 회원가입페이지에서 회원정보를 순서대로 입력합니다. 모든 항목을 입력한 후 [확인]버튼을 클릭합니다.', ctgry: 7 },
        { faqId: 11, Sj: '2.회원가입은 어떻게 하나요?', Cn: '1. [회원가입]을 클릭합니다.\n\n 회원종류를 선택하여 이용약관에 동의하신 후 해당하는 버튼을 클릭합니다.\n\n 본인확인을 위한 실명확인을 합니다.\n\n 해당 회원가입페이지에서 회원정보를 순서대로 입력합니다. 모든 항목을 입력한 후 [확인]버튼을 클릭합니다.', ctgry: 3 },
        { faqId: 12, Sj: '3.회원가입은 어떻게 하나요?', Cn: '1. [회원가입]을 클릭합니다.\n\n 회원종류를 선택하여 이용약관에 동의하신 후 해당하는 버튼을 클릭합니다.\n\n 본인확인을 위한 실명확인을 합니다.\n\n 해당 회원가입페이지에서 회원정보를 순서대로 입력합니다. 모든 항목을 입력한 후 [확인]버튼을 클릭합니다.', ctgry: 4 },
        { faqId: 13, Sj: '1.회원가입은 어떻게 하나요?', Cn: '1. [회원가입]을 클릭합니다.\n\n 회원종류를 선택하여 이용약관에 동의하신 후 해당하는 버튼을 클릭합니다.\n\n 본인확인을 위한 실명확인을 합니다.\n\n 해당 회원가입페이지에서 회원정보를 순서대로 입력합니다. 모든 항목을 입력한 후 [확인]버튼을 클릭합니다.', ctgry: 5 },
        { faqId: 14, Sj: '2.회원가입은 어떻게 하나요?', Cn: '1. [회원가입]을 클릭합니다.\n\n 회원종류를 선택하여 이용약관에 동의하신 후 해당하는 버튼을 클릭합니다.\n\n 본인확인을 위한 실명확인을 합니다.\n\n 해당 회원가입페이지에서 회원정보를 순서대로 입력합니다. 모든 항목을 입력한 후 [확인]버튼을 클릭합니다.', ctgry: 6 },
        { faqId: 15, Sj: '3.회원가입은 어떻게 하나요?', Cn: '1. [회원가입]을 클릭합니다.\n\n 회원종류를 선택하여 이용약관에 동의하신 후 해당하는 버튼을 클릭합니다.\n\n 본인확인을 위한 실명확인을 합니다.\n\n 해당 회원가입페이지에서 회원정보를 순서대로 입력합니다. 모든 항목을 입력한 후 [확인]버튼을 클릭합니다.', ctgry: 7 }
      ]
      this.totCnt = 1
      this.detailFaqId = 0
      setTimeout(() => {
        this.dataLoading = false
      }, 300)
    },
    getFaqCategoryNm(key) {
      return faqCategoryOption[key].label
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

