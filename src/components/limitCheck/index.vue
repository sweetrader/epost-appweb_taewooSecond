<template>
  <div class="app-container">
    <!-- 헤더 -->
    <div class="limit_check_header_area">
      <div class="empty_flex_div"/>
      <span class="cert_header_text" align="center">
        {{ header }}
      </span>
      <div class="empty_flex_div"/>
    </div>
    <div class="limit_check_empty_header"/>

    <!-- 조건 미충족 -->
    <div v-if="!limitStatus" class="sry_message_area" align="center">
      <img src="@/assets/image/icon_01.png" class="icon_img">
      <div class="cust_nm white_space" v-html="failData.custNm + failData.custNmText"/>
      <div class="fail_reason" v-html="failData.failReason"/>
      <div class="margin_line"/>
      <div class="result_text" align="left" v-html="failData.resultText"/>
    </div>

    <!-- 대출 가능 -->
    <div v-if="limitStatus" class="limit_data_area" align="center">
      <div class="check_text white_space" v-html="successData.custNm + successData.custNmText"/>
      <div class="box_area">
        <div class="left_area">
          <div class="left_title" align="left">{{ successData.expectedLimit }}</div>
          <div class="left_value" align="left" v-html="getExpectedLimitValue"/>
        </div>
        <div class="limit_line">
          <div class="line_color"/>
        </div>
        <div class="right_area">
          <div class="right_title" align="left">{{ successData.expectedRate }}</div>
          <div class="right_value" align="right" v-html="getExpectedRateValue"/>
        </div>
      </div>
      <div class="guide" align="left" v-html="successData.guide"/>
    </div>

    <!-- 푸터-->
    <div class="limit_check_footer_area" align="center" @click="clickFooter">
      {{ footer }}
    </div>
    <div v-if="limitStatus" class="limit_check_footer_area_plus" align="left" v-html="footerPlus"/>
  </div>
</template>

<script>
let app = null

export default {
  name: 'LimitCheck',
  directives: {},
  components: {},
  filters: {

  },
  props: {
    limitStatus: { // false: 조건 미충족, true: 대출 가능
      type: Boolean,
      default: false
    },
    closeLimitCheck: {
      type: Function,
      default: null
    }
  },
  data() {
    return {
      // 1: 조건 미충족, 2: 대출 가능
      header: '하나 ○○○대출',
      failData: {
        custNm: '<span>홍길동</span>',
        custNmText: '님 죄송합니다.',
        failReason: '입력하신 정보로 대출한도를 산출해본 결과,<br>본 상품의 대출신청이 불가합니다.',
        resultText: '오늘도 저희 하나저축은행을 찾아주셔서 감사합니다.<br>다음에 더욱 좋은 서비스로 찾아 뵙겠습니다.'
      },
      successData: {
        custNm: '<span>홍길동</span>',
        custNmText: '님의 예상한도와<br>예상 금리를 확인하세요.',
        expectedLimit: '예상한도',
        expectedLimitValue: 50000000,
        expectedRate: '예상금리',
        expectedRateValue: 0.05413,
        guide: '최대 대출예상한도는 조회 당일까지 유효합니다.'
      },
      footer: '인증서 가져오기',
      footerPlus: '더 이상 기다리지 마세요!<br>5분만에 대출 신청!'
    }
  },
  computed: {
    getExpectedLimitValue() {
      const result = (+app.successData.expectedLimitValue || 0).toString().replace(/^-?\d+/g, m => m.replace(/(?=(?!\b)(\d{3})+$)/g, ','))
      return result + '<span>원</span>'
    },
    getExpectedRateValue() {
      const result = Math.round(app.successData.expectedRateValue * 1000000, -4) / 10000

      return result + '<span>%</span>'
    }
  },
  watch: {
    limitStatus(status) {
      if (status) {
        app.footer = '대출 신청'
      } else {
        app.footer = '확인'
      }
    }
  },
  created() {
    app = this

    // 최초 페이지 로드 시 데이터 세팅
    if (app.limitStatus) {
      app.footer = '대출 신청'
    } else {
      app.footer = '확인'
    }
  },
  methods: {
    // 푸터 버튼 (한도 조회 닫기)
    clickFooter() {
      if (app.limitStatus) {
        // 대출 진행
        app.closeLimitCheck(true)
      } else {
        // 대출 불가
        app.closeLimitCheck(false)
      }
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
// 헤더
.limit_check_header_area {
  position: fixed;
  top: 0;
  width: 9.3rem;
  height: 1rem;
  background-color: #fff;
  padding: 0.75rem 0.35rem 0 0.35rem;
  font-size: 0.53rem;
  line-height: 0.53rem;
  color: #373737;
  font-family: 'hanaB';
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #AFAFAF;
  .empty_flex_div {
    width: 0.21rem;
    height: 0.43rem;
  }
  .back_image {
    width: 0.21rem;
    height: 0.43rem;
  }
}
.limit_check_empty_header {
  width: 10rem;
  height: 1.75rem;
}

// 실패
.sry_message_area {
  width: 100%;
  padding-top: 2.06rem;
  min-height: calc(100vh - 3.81rem);
  background-color: #F4F4F4;
  .icon_img {
    width: 3.01rem;
    height: 3.01rem;
    margin-bottom: 0.67rem;
  }
  .cust_nm {
    margin-bottom: 0.62rem;
    font-size: 0.48rem;
    line-height: 0.6rem;
    font-family: 'hanaM'
    span {
      color: #1AA296;
    }
  }
  .fail_reason {
    font-size: 0.37rem;
    line-height: 0.56rem;
    color: #717171;
  }
  .margin_line {
    width: 100%;
    height: 1.48rem;
    margin-bottom: 0.93rem;
    border-bottom: 1px solid #AFAFAF;
  }
  .result_text {
    padding-left: 1.2rem;
    font-size: 0.37rem;
    line-height: 0.56rem;
    color: #717171;
  }
}
// 성공
.limit_data_area {
  width: 100%;
  padding-top: 1.4rem;
  min-height: calc(100vh - 3.15rem);
  background-color: #F4F4F4;
  .check_text {
    font-size: 0.48rem;
    line-height: 0.6rem;
    margin-bottom: 1.17rem;
    span {
      color: #1AA296;
    }
  }
  .box_area {
    width: 7.77rem;
    height: 1.8rem;
    border: 1px solid #D5D5D5;
    background-color: #fff;
    margin-bottom: 0.46rem;
    padding: 0.4rem 0.62rem 0.53rem 0.56rem;
    display: flex;
    justify-content: space-between;
    .left_area {
      min-width: 3.32rem;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      .left_title {
        font-size: 0.34rem;
        line-height: 0.62rem;
        color: #717171;
      }
      .left_value {
        font-size: 0.64rem;
        color: #FF0000;
        span {
          font-size: 0.39rem;
        }
      }
    }
    .limit_line {
      display: flex;
      flex-direction: column;
      justify-content: center;
      .line_color {
        height: 1.01rem;
        border-left: 1px solid #D5D5D5;
      }
    }
    .right_area {
      width: 3.14rem;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      .right_title {
        font-size: 0.34rem;
        line-height: 0.62rem;
        color: #717171;
      }
      .right_value {
        font-size: 0.64rem;
        color: #FF0000;
        span {
          font-size: 0.39rem;
        }
      }
    }
  }
  .guide {
    padding-left: 0.85rem;
    font-size: 0.37rem;
    line-height: 0.56rem;
    color: #717171;
  }
}

// 푸터
.limit_check_footer_area {
  position: fixed;
  bottom: 0;
  width: 10rem;
  height: 1.59rem;
  background-color: #50A69D;
  font-size: 0.62rem;
  line-height: 1.59rem;
  vertical-align: middle;
  color: #fff;
  font-family: 'hanaM';
}
.limit_check_footer_area_plus {
  position: fixed;
  left: 3.25rem;
  bottom: 2.6rem;
  font-size: 0.4rem;
  line-height: 0.53rem;
  color: #0D315A;
  font-family: 'hanaM';
}
</style>
