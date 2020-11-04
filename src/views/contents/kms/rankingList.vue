<template>
  <div class="app-container">
    <header>
      <a href="#" class="back" @click="$router.back()"/><h1 class="jisik_masters">지식마스터</h1>
    </header>
    <div class="jisik_master_detail_header">
      <b>1위</b><span>홍길동</span>
      <em>답변 2,395</em><em class="ona">채택 235</em>
    </div>
    <div class="jisik_master_detail_list_wrap">
      <div class="jisik_master_detail_list_wrap_cell">
        택배 수령인이 전화를 안 받을 때??<b>문앞에 두고 문자를 남깁니다~</b><span>2020-10-07</span><span>홍길동</span>
        <div class="answer picked_answer">채택</div>
      </div>

      <div class="jisik_master_detail_list_wrap_cell">
        택배 수령인이 전화를 안 받을 때??<b>문 앞에 두고 문자로 상황을 설명하시거나 택배 보내신분께 전화해 보는 것은 어떨까요?이 방법 추천 드립니다~~</b><span>2020-10-07</span><span>홍길동</span>
        <div class="answer picked_answer">채택</div>

      </div>
      <div class="jisik_master_detail_list_wrap_cell">
        택배 수령인이 전화를 안 받을 때??<b>문앞에 두고 문자를 남깁니다~</b><span>2020-10-07</span><span>홍길동</span>
        <div class="answer picked_answer">채택</div>
      </div>

      <div class="jisik_master_detail_list_wrap_cell">
        택배 수령인이 전화를 안 받을 때??<b>문 앞에 두고 문자로 상황을 설명하시거나 택배 보내신분께 전화해 보는 것은 어떨까요?이 방법 추천 드립니다~~</b><span>2020-10-07</span><span>홍길동</span>
        <div class="answer picked_answer">채택</div>
      </div>

      <div class="jisik_master_detail_list_wrap_cell">
        택배 수령인이 전화를 안 받을 때??<b>문앞에 두고 문자를 남깁니다~</b><span>2020-10-07</span><span>홍길동</span>
      </div>

      <div class="jisik_master_detail_list_wrap_cell">
        택배 수령인이 전화를 안 받을 때??<b>문 앞에 두고 문자로 상황을 설명하시거나 택배 보내신분께 전화해 보는 것은 어떨까요?이 방법 추천 드립니다~~</b><span>2020-10-07</span><span>홍길동</span>
        <div class="answer picked_answer">채택</div>
      </div>

      <div class="jisik_master_detail_list_wrap_cell">
        택배 수령인이 전화를 안 받을 때??<b>문앞에 두고 문자를 남깁니다~</b><span>2020-10-07</span><span>홍길동</span>
        <div class="answer picked_answer">채택</div>
      </div>

      <div class="jisik_master_detail_list_wrap_cell">
        택배 수령인이 전화를 안 받을 때??<b>문 앞에 두고 문자로 상황을 설명하시거나 택배 보내신분께 전화해 보는 것은 어떨까요?이 방법 추천 드립니다~~</b><span>2020-10-07</span><span>홍길동</span>
        <div class="answer picked_answer">채택</div>
      </div>

      <div class="jisik_master_detail_list_wrap_cell">
        택배 수령인이 전화를 안 받을 때??<b>문앞에 두고 문자를 남깁니다~</b><span>2020-10-07</span><span>홍길동</span>
        <div class="answer picked_answer">채택</div>
      </div>

      <div class="jisik_master_detail_list_wrap_cell">
        택배 수령인이 전화를 안 받을 때??<b>문 앞에 두고 문자로 상황을 설명하시거나 택배 보내신분께 전화해 보는 것은 어떨까요?이 방법 추천 드립니다~~</b><span>2020-10-07</span><span>홍길동</span>
        <div class="answer picked_answer">채택</div>
      </div>
    </div>
  </div>
</template>

<script>
import { getKmsBoardReplySearchList } from '@/api/kms'
import { html2Text } from '@/utils/index'
import { getDateStr } from '@/utils/kms'

export default {
  name: 'KmsRankingList',
  props: {
    registerId: {
      type: String,
      default: ''
    },
    registerNm: {
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
      dataLoading: false
    }
  },
  created() {
    console.log('registerId : ' + this.registerId)
    console.log('registerNm : ' + this.registerNm)
    this.getKmsBoardReplySearchList()
  },
  methods: {
    async getKmsBoardReplySearchList() {
      this.dataLoading = true
      const response = await getKmsBoardReplySearchList(this.kmsBoardReplySearchParams)
      console.log(response)
      this.kmsBoardReplyList = response.resData.kmsBoardReplyList
      this.selTotCnt = response.resData.selTotCnt
      this.totCnt = response.resData.totCnt
      setTimeout(() => {
        this.dataLoading = false
      }, 300)
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
