<template>
  <div class="app-container">
    <header>
      <a href="#" class="back"/><h1>질문 상세</h1>
    </header>
    <div class="jisik_list mtop59">
      <div class="question_title">
        <b>택배 수령인이 전화를 안 받을 때</b>
        <span>홍길동</span><span>2020-10-07</span>
        <div class="more"/>
        <div class="question_more_action" style="display:none;">
          <a href="#">수정</a>
          <a href="#">삭제</a>
        </div>
      </div>
      <div class="question_content">
        택배 수령인이 배송전에 꼭 전화를 달라고 기재했는데<br>
        전화를 받지 않습니다.<br>
        이럴 땐 어떻게 하는게 좋을까요?<br>
        그냥 문 앞에 두고 가도 되는 걸까요? ㅠㅠ<br>
      </div>
      <a href="#" class="question_answer_btn">
        <div class="question_answer_btn_i"/>답변등록
      </a>
    </div>
    <div class="answer_cell">
      <div class="whos_answer">
        <div class="answer">답변</div>
        <span>김연지님의 답변</span><b>2020-10-07</b>
        <div class="more"/>
      </div>
    </div>
    <div class="answer_content">
      안녕하세요. 상황이 난처하신 것 같아요.
      수령인이 모르는 번호라서 전화를 안 받은 것 아닐까요? 문 앞에 두고 문자로 상황을 설명하시거나 택배 보내신분께 전화해 보는 것은 어떨까요?
      이 방법 추천 드립니다~~
      <div class="answer_content_bottom">
        <div>추천 <span>0</span></div>
        <div>댓글 <span>0</span></div>
        <div>채택하기</div>
      </div>
    </div>
    <div class="answer_cell">
      <div class="whos_answer">
        <div class="picked_answer">채택</div>
        <span>김연지님의 답변</span><b>2020-10-07</b>
        <div class="more"/>
      </div>
    </div>
    <div class="answer_content">
      안녕하세요. 상황이 난처하신 것 같아요.
      수령인이 모르는 번호라서 전화를 안 받은 것 아닐까요? 문 앞에 두고 문자로 상황을 설명하시거나 택배 보내신분께 전화해 보는 것은 어떨까요?
      이 방법 추천 드립니다~~
      <div class="answer_content_bottom">
        <div>추천 <span>0</span></div>
        <div>댓글 <span>0</span></div>
      </div>
    </div>

    <div class="answer_cell">
      <div class="whos_answer">
        <div class="answer">답변</div>
        <span>김연지님의 답변</span><b>2020-10-07</b>
        <div class="more"/>
      </div>
    </div>
    <div class="answer_content">
      안녕하세요. 상황이 난처하신 것 같아요.
      수령인이 모르는 번호라서 전화를 안 받은 것 아닐까요? 문 앞에 두고 문자로 상황을 설명하시거나 택배 보내신분께 전화해 보는 것은 어떨까요?
      이 방법 추천 드립니다~~
      <div class="answer_content_bottom">
        <div class="choochun_on">추천 <span>1</span></div>
        <div class="open_dat">댓글 <span>3</span></div>
        <div>채택하기</div>

      </div>
    </div>
    <div class="dat_bg">
      <div class="dat_cell">
        <b>김철수님</b><span>2020-10-07</span><br>
        덕분에 좋은 정보 얻어갑니다.
        <a href="#"/>
      </div>
      <div class="dat_cell">
        <b>김철수님</b><span>2020-10-07</span><br>
        저라면 일단 다시 가지고 가고, 마지막에 한번 더 들려볼 것 같아요.
        <a href="#"/>
      </div>
      <div class="dat_cell">
        <b>김철수님</b><span>2020-10-07</span><br>
        덕분에 좋은 정보 얻어갑니다.
        <a href="#"/>
        <textarea placeholder="댓글 입력"/><button>등록</button>
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
  name: 'KmsList',
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
