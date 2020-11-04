<template>
  <div class="app-container">
    <!-- 헤더 -->
    <div class="cert_header_area">
      <div v-if="certProgress === 1 || certProgress === 5" class="empty_flex_div"/>
      <img v-if="certProgress === 2 || certProgress === 3 || certProgress === 4" src="@/assets/image/icon_06.png" class="back_image" @click="backPage">
      <span class="cert_header_text" align="center">
        {{ header }}
      </span>
      <div class="empty_flex_div"/>
    </div>
    <div v-if="(certProgress === 2 && certList.length !== 0) || certProgress === 3 || certProgress === 4" class="cert_empty_header"/>

    <!-- 첫번째 (공인인증서 로그인) -->
    <div v-if="certProgress === 1" class="cert_first_page" align="center">

      <img src="@/assets/image/icon_04.png" class="icon_image">
      <div class="cert_guide_text1 white_space">{{ certGuideText1 }}</div>
      <div class="cert_guide_text2" v-html="certGuideText2"/>

    </div>

    <!-- 두번째 (나의 공인인증서) -->
    <div v-if="certProgress === 2" :class="certSecondPageClass" align="center">
      <!-- 인증서 없을 때 (certList 배열 0) -->
      <div v-if="certList.length === 0" class="no_certificate_area">
        <img src="@/assets/image/icon_04.png" class="icon_image">
        <div class="no_cert_guide_text1 white_space">{{ certGuideText3 }}</div>
      </div>
      <!-- 인증서 있을 때 (certList 배열 0 이상) -->
      <div v-else class="certificate_area">
        <div v-for="(cert, i) in certList" :key="i" class="cert_card_list" @click="selectCertificate(cert)">
          <img src="@/assets/image/icon_05.png" class="cert_icon_image">
          <div class="cert_data_area" align="left">
            <div class="cert_title white_space_half">
              {{ cert.name + ' (' + cert.eng + ') ' + cert.pin }}
            </div>
            <div class="cert_sub white_space_half">
              {{ certTypeText + ' : ' + cert.type }}
              <br>
              {{ expireDtText + ' : ' + cert.expireDt }}
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 세번째 (나의 공인인증서 - 선택 -->
    <div v-if="certProgress === 3" class="cert_third_page">
      <div class="sel_cert_card_data">
        <img src="@/assets/image/icon_05.png" class="sel_cert_icon_image">
        <div class="sel_cert_data_area" align="left">
          <div class="sel_cert_title white_space_half">
            {{ selectedCert.name + ' (' + selectedCert.eng + ') ' + selectedCert.pin }}
          </div>
          <div class="sel_cert_sub white_space_half">
            {{ certTypeText + ' : ' + selectedCert.type }}
            <br>
            {{ expireDtText + ' : ' + selectedCert.expireDt }}
          </div>
        </div>
      </div>

      <div class="cert_pwd_input_area">
        <div class="pwd_title white_space">
          {{ certPwdTitle }}
        </div>

        <input
          v-model="inputPwd"
          :placeholder="certPwdPlaceholder"
          type="text"
          class="white_space_half">

        <div class="pwd_guide_area white_space_half">
          <div class="hipen">
            -
          </div>
          <div class="pwd_guide" v-html="certPwdGuide"/>
        </div>
      </div>
    </div>

    <!-- 네번째 (인증서 가져오기) -->
    <div v-if="certProgress === 4" class="cert_four_page">
      <div class="cert_check_no_area">
        <div class="check_no_title white_space">
          {{ certCheckNoTitle }}
        </div>

        <input
          v-model="checkNo"
          :placeholder="certCheckNoPlaceholder"
          type="text"
          class="white_space_half">

        <div class="check_no_guide_area white_space_half">
          <div class="hipen">
            -
          </div>
          <div class="check_no_guide" v-html="certCheckNoGuide"/>
        </div>
      </div>

      <div class="get_cert_image_guide_area" align="center">
        <div class="img_guide_wrapper">
          <div class="pc">
            <img src="@/assets/image/icon_07.png" class="icon_img">
            <div class="guide_text white_space">{{ pc }}</div>
          </div>
          <div class="arrow">
            <img src="@/assets/image/icon_09.png" class="arrow_img">
            <div class="arrow_text white_space">{{ arrow }}</div>
          </div>
          <div class="mobile">
            <img src="@/assets/image/icon_08.png" class="icon_img">
            <div class="guide_text white_space">{{ mobile }}</div>
          </div>
        </div>
      </div>
    </div>

    <!-- 다섯번째 (본인인증) -->
    <div v-if="certProgress === 5" class="cert_fifth_page" align="center">

      <img src="@/assets/image/icon_10.png" class="icon_image">
      <div class="cert_guide_text1 white_space">{{ certGuideText4 }}</div>
      <div class="cert_guide_text2" v-html="certGuideText5"/>

    </div>

    <!-- 푸터-->
    <div v-if="certProgress !== 1" class="cert_footer_area" align="center" @click="clickFooter">
      {{ footer }}
    </div>
  </div>
</template>

<script>
let app = null

export default {
  name: 'Certificate',
  directives: {},
  components: {},
  filters: {

  },
  props: {
    closeCertificate: {
      type: Function,
      default: null
    }
  },
  data() {
    return {
      // 1: 공인인증서 로그인, 2: 나의 공인인증서, 3: 나의 공인인증서(선택), 4: 인증서 가져오기, 5: 본인인증
      certProgress: 1,
      header: '공인인증서 로그인',
      certGuideText1: '브라우저 인증서 로그인',
      certGuideText2: '하나저축은행 홈페이지</span><br><span>(https://www.hanasavings.com/)</span><br><span>인증센터 메뉴를 통해 인증서를 가져오신 후</span><br><span>로그인 해주세요.',
      certGuideText3: '등록된 공인인증서가 없습니다',
      certGuideText4: '인증완료',
      certGuideText5: '공인인증서를 통한 고객 본인인증이 완료되었습니다.<br>아래 버튼을 눌러 고객님의 대출 한도를 조회하세요.',
      loadingText: '공인인증서 로딩중',
      certSecondPageClass: 'none_cert_second_page',
      certList: [], // 인증서 데이터는 getCertificate에서 세팅합니다.
      certTypeText: '용도',
      expireDtText: '만료일',
      selectedCert: { // 선택 인증서
        pin: '',
        name: '',
        eng: '',
        type: '',
        expireDt: ''
      },
      certPwdTitle: '인증서 암호',
      certPwdPlaceholder: '인증서 암호를 입력해주세요.',
      certPwdGuide: '안전한 금융거래를 위해 6개월마다  인증서 암호를<br>변경하시기 바랍니다.',
      inputPwd: '',
      certCheckNoTitle: '인증번호',
      certCheckNoPlaceholder: '인증번호를 입력해주세요.',
      certCheckNoGuide: 'PC화면에 표시된 인증번호를 확인 후 입력해주세요.',
      checkNo: '',
      pc: 'PC 홈페이지',
      arrow: '인증',
      mobile: '모바일',
      footer: '인증서 가져오기'
    }
  },
  computed: {

  },
  watch: {
    certProgress(page) {
      switch (page) {
        case 1:
          app.header = '공인인증서 로그인'
          app.footer = ''
          break
        case 2:
          app.header = '나의 공인인증서'
          app.footer = '인증서 가져오기'
          break
        case 3:
          app.header = '나의 공인인증서'
          app.footer = '확인'
          break
        case 4:
          app.header = '인증서 가져오기'
          app.footer = '인증서 가져오기'
          break
        case 5:
          app.header = '본인인증'
          app.footer = '대출한도조회'
          break
      }
    },
    certList() {
      if (app.certList.length > 0) {
        app.certSecondPageClass = 'cert_second_page'
      } else {
        app.certSecondPageClass = 'none_cert_second_page'
      }
    }
  },
  created() {
    app = this

    // 로딩
    setTimeout(() => {
      app.$hanaLoadingOn(app.loadingText)
      // 로딩 끝
      setTimeout(() => {
        app.$hanaLoadingOff()
        app.certProgress = 2
      }, 500)
    }, 500)
  },
  methods: {
    // 푸터 버튼
    clickFooter() {
      // app.certList = []
      // 인증서 가라 데이터
      const certificateInfo = {
        pin: '546gh5j4fgh56j4fgh654j',
        name: '홍길동',
        eng: 'Hong Gil Dong',
        type: '은행개인(금융결제원)',
        expireDt: '2020-02-07'
      }
      // 인증서 초기화
      const empty = {
        pin: '',
        name: '',
        eng: '',
        type: '',
        expireDt: ''
      }
      switch (app.certProgress) {
        // 인증서 가져오기 이동
        case 2:
          app.certProgress = 4
          break
        // 인증서 선택한것 인증하기
        case 3:
          app.selectedCert = empty
          app.certProgress = 5
          break
        case 4:
          app.certList.push(certificateInfo)
          app.certProgress = 2
          break
        case 5:
          app.closeCertificate(true)
          break
      }
    },
    // 인증서 선택
    selectCertificate(cert) {
      app.selectedCert = cert
      app.certProgress = 3
    },
    // 뒤로
    backPage() {
      const empty = {
        pin: '',
        name: '',
        eng: '',
        type: '',
        expireDt: ''
      }
      switch (app.certProgress) {
        // 인증서 가져오기 이동
        case 2:
          app.certProgress = 1
          break
        // 인증서 선택한것 인증하기
        case 3:
          app.selectedCert = empty
          app.certProgress = 2
          break
        case 4:
          app.certProgress = 2
          break
      }
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
// 헤더
.cert_header_area {
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
.cert_empty_header {
  width: 10rem;
  height: 1.75rem;
}

// 바디
// 1page
.cert_first_page {
  width: 100%;
  height: 100vh;
  background-color: #F4F4F4;
  display: flex;
  flex-wrap: nowrap;
  flex-direction: column;
  justify-content: center;

  .icon_image {
    width: 3.01rem;
    height: 3.01rem;
    margin-bottom: 0.89rem;
  }

  .cert_guide_text1{
    font-family: 'hanaM';
    font-size: 0.48rem;
    line-height: 0.6rem;
    color: #1AA296;
    margin-bottom: 0.34rem;
  }
  br {
      line-height: 0;
      font-size: 0;
  }
  .cert_guide_text2 {
    font-size: 0.37rem;
    line-height: 0.56rem;
    color: #717171;
  }
}

// 2page
// 인증서 없을때
.none_cert_second_page {
  width: 100%;
  height: 100vh;
  background-color: #F4F4F4;

  .no_certificate_area {
    height: 100%;
    display: flex;
    flex-wrap: nowrap;
    flex-direction: column;
    justify-content: center;
    .icon_image {
      width: 3.01rem;
      height: 3.01rem;
      margin-bottom: 0.89rem;
    }
    .no_cert_guide_text1 {
      font-family: 'hanaM';
      font-size: 0.48rem;
      line-height: 0.6rem;
      color: #1AA296;
      margin-bottom: 0.34rem;
    }
  }
}
// 인증서 있을 때
.cert_second_page {
  width: 100%;
  min-height: calc(100vh - 1.75rem);
  background-color: #F4F4F4;

  .certificate_area {
    padding: 0.59rem 0.53rem 1.59rem 0.53rem;
    .cert_card_list {
      display: inline-flex;
      width: 100%;
      height: 2.53rem;
      background-color: #fff;
      border: 1px solid #D5D5D5;
      box-sizing: border-box;
      padding: 0.48rem 0 0 0.7rem;
      margin-bottom: 0.59rem;
      .cert_icon_image {
        width: 1.37rem;
        height: 0.9rem;
        margin: 0.31rem 0.54rem 0 0;
      }
      .cert_data_area {
        width: 100%;
        .cert_title {
          width: 5.79rem;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
          font-size: 0.39rem;
          line-height: 0.64rem;
          font-family: 'hanaM'
        }
        br {
          font-size: 0;
          line-height: 0;
        }
        .cert_sub {
          font-size: 0.39rem;
          line-height: 0.56rem;
        }
      }
    }
  }
}

// 3page
.cert_third_page {
  width: calc(100% -1.06rem);
  min-height: calc(100vh - 1.75rem);
  background-color: #F4F4F4;
  padding: 0.59rem 0.53rem 1.59rem 0.53rem;
  .sel_cert_card_data {
    display: inline-flex;
    width: 100%;
    height: 2.53rem;
    background-color: #fff;
    border: 1px solid #D5D5D5;
    box-sizing: border-box;
    padding: 0.48rem 0 0 0.7rem;
    margin-bottom: 0.59rem;
    .sel_cert_icon_image {
      width: 1.37rem;
      height: 0.9rem;
      margin: 0.31rem 0.54rem 0 0;
    }
    .sel_cert_data_area {
      width: 100%;
      .sel_cert_title {
        width: 5.79rem;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        font-size: 0.39rem;
        line-height: 0.64rem;
        font-family: 'hanaM'
      }
      br {
        font-size: 0;
        line-height: 0;
      }
      .sel_cert_sub {
        font-size: 0.39rem;
        line-height: 0.56rem;
      }
    }
  }
  .cert_pwd_input_area {
    .pwd_title {
      font-size: 0.43rem;
      line-height: 0.43rem;
      font-family: 'hanaB';
      margin-bottom: 0.37rem;
    }
    input {
      background-color: #fff;
      border: 1px solid #D5D5D5;
      width: 8.47rem;
      height: 1.18rem;
      padding-left: 0.46rem;
      margin-bottom: 0.46rem;
      font-size: 0.39rem;
      line-height: 0.5rem;
    }
    input::placeholder {
      font-size: 0.39rem;
      line-height: 0.5rem;
      color: #AFAFAF;
    }
    .pwd_guide_area{
      display: flex;
      font-size: 0.39rem;
      line-height: 0.5rem;
      .hipen {
        margin-right: 0.15rem;
      }
    }
  }
}

// 4page
.cert_four_page {
  width: calc(100% -1.06rem);
  min-height: calc(100vh - 1.75rem);
  background-color: #F4F4F4;
  padding: 0.59rem 0.53rem 1.59rem 0.53rem;
  .cert_check_no_area {
    margin-bottom: 1.17rem;
    .check_no_title {
      font-size: 0.43rem;
      line-height: 0.43rem;
      font-family: 'hanaB';
      margin-bottom: 0.37rem;
    }
    input {
      background-color: #fff;
      border: 1px solid #D5D5D5;
      width: 8.47rem;
      height: 1.18rem;
      padding-left: 0.46rem;
      margin-bottom: 0.46rem;
      font-size: 0.39rem;
      line-height: 0.5rem;
    }
    input::placeholder {
      font-size: 0.39rem;
      line-height: 0.5rem;
      color: #AFAFAF;
    }
    .check_no_guide_area{
      display: flex;
      font-size: 0.39rem;
      line-height: 0.5rem;
      .hipen {
        margin-right: 0.15rem;
      }
    }
  }

  .get_cert_image_guide_area {
    .img_guide_wrapper {
      width: 7.28rem;
      display: flex;
      justify-content: space-between;
      .pc {
        .icon_img {
          width: 2.89rem;
          height: 2.89rem;
        }
      }
      .arrow {
        padding-top: 1.22rem;
        .arrow_img {
          width: 0.78rem;
          height: 0.46rem;
          margin-bottom: 0.25rem;
        }
        .arrow_text {
          color: #1AA296;
          font-size: 0.35rem;
          line-height: 0.45rem;
        }
      }
      .mobile {
        .icon_img {
          width: 2.89rem;
          height: 2.89rem;
        }
      }
      .guide_text {
        color: #1AA296;
        font-size: 0.48rem;
        line-height: 0.6rem;
        margin-top: 0.39rem;
        font-family: 'hanaM'
      }
    }

  }
}

// 5page
.cert_fifth_page {
  width: 100%;
  height: 100vh;
  background-color: #F4F4F4;
  display: flex;
  flex-wrap: nowrap;
  flex-direction: column;
  justify-content: center;

  .icon_image {
    width: 3.01rem;
    height: 3.01rem;
    margin-bottom: 0.89rem;
  }

  .cert_guide_text1{
    font-family: 'hanaM';
    font-size: 0.48rem;
    line-height: 0.6rem;
    color: #1AA296;
    margin-bottom: 0.34rem;
  }
  br {
      line-height: 0;
      font-size: 0;
  }
  .cert_guide_text2 {
    font-size: 0.37rem;
    line-height: 0.56rem;
    color: #717171;
  }
}

// 푸터
.cert_footer_area {
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
</style>
