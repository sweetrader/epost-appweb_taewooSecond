<template>
  <div class="app-container">
    <!-- 헤더 -->
    <div class="last_cert_header_area">
      <div class="empty_flex_div"/>
      <span class="last_cert_header_text" align="center">
        {{ header }}
      </span>
      <img src="@/assets/image/close_button.png" class="close_icon" @click="justClose">
    </div>
    <div class="last_cert_empty_header"/>

    <!-- 첫번째 (방식 선택) -->
    <div v-if="certProgress === 1" class="last_cert_first_page" align="center">

      <img src="@/assets/image/icon_11.png" class="icon_image">
      <div class="last_cert_guide_text1 white_space" v-html="guideTextTitle"/>
      <div class="last_cert_guide_text2" v-html="guideText"/>
      <div class="last_select_cert_type">
        <div class="type_id_card" :class="picIdClass" align="center" @click="selectType('idNo')">
          <img src="@/assets/image/icon_12.png">
          주민
        </div>
        <div class="type_license_card" :class="picLicenseClass" align="center" @click="selectType('license')">
          <img src="@/assets/image/icon_13.png">
          운전
        </div>
      </div>

    </div>

    <div v-if="certProgress === 1" class="last_cert_first_page_guide" align="left">
      <div class="guide_title">
        {{ picTip }}
      </div>
      <div class="guide_contents" v-html="picTipContent"/>
    </div>

    <!-- 두번째 (신분증 인증)-->
    <div v-if="certProgress === 2 || certProgress === 2.5" class="last_cert_second">
      <!-- 촬영 모드 -->
      <div align="center">
        <div v-if="certProgress === 2.5" class="scan_empty_area_half"/>

        <div class="photo_area" @click="takePhoto"/>

        <div v-if="certProgress !== 2.5" class="scan_guide">{{ scanGuide }}</div>
        <div v-if="certProgress !== 2.5" class="scan_empty_area"/>
        <img v-if="certProgress !== 2.5" src="@/assets/image/scan_icon.png" class="scan_icon">
      </div>
      <!-- 데이터 확인 -->
      <div v-if="certProgress === 2.5" class="scan_data_area">
        <div class="second_input_title white_space">
          {{ issuDtTitle }}
        </div>
        <input
          v-model="issuDt"
          type="text"
          class="input_style white_space_half">

        <div class="second_issu_guide">
          {{ issuGuide }}
        </div>

        <div class="second_input_title white_space">
          {{ issuOrgnTitle }}
        </div>
        <input
          v-model="issuOrgn"
          type="text"
          class="input_style white_space_half">

        <div class="scan_guide_title white_space_half">
          {{ picTip }}
        </div>
        <div class="scan_guide_content white_space_half" v-html="picTipContent2"/>
      </div>
    </div>

    <!-- 3단계 계좌 인증 -->
    <div v-if="certProgress === 3" class="last_cert_third" align="center">
      <img src="@/assets/image/icon_14.png" class="icon_image">
      <div class="last_cert_guide_text1 white_space" v-html="accountGuideTextTitle"/>
    </div>

    <div v-if="certProgress === 3" class="last_cert_third_page_account" align="left">
      <div class="flex_swiper_title">
        <div class="selected_bank_title">{{ selectedBank }}</div>
        <img :src="bankSlideProgressImg[activeSlideIndex]" class="select_bank_progress">
      </div>

      <!-- swiper -->
      <swiper ref="mySwiper2" class="swiper_table2" @slideChange="changeSlideProgressImg">
        <swiper-slide>
          <table>
            <tr v-for="(line, i) in bankTable1" :key="i">
              <td v-for="(data, j) in line" :key="j" :class="data.class" @click="changeSelectedBank(data)">
                {{ data.text }}
              </td>
            </tr>
          </table>
        </swiper-slide>
        <swiper-slide>
          <table>
            <tr v-for="(line, i) in bankTable2" :key="i">
              <td v-for="(data, j) in line" :key="j" :class="data.class" @click="changeSelectedBank(data)">
                {{ data.text }}
              </td>
            </tr>
          </table>
        </swiper-slide>
        <swiper-slide>
          <table>
            <tr v-for="(line, i) in bankTable3" :key="i">
              <td v-for="(data, j) in line" :key="j" :class="data.class" @click="changeSelectedBank(data)">
                {{ data.text }}
              </td>
            </tr>
          </table>
        </swiper-slide>
      </swiper>

      <div class="account_title">
        {{ accountTitle }}
      </div>
      <div class="account_input_area">
        <input
          v-model="accountNo"
          :placeholder="accountNoPlaceholder"
          type="text"
          class="input_account_no white_space_half">
        <div class="check_account_button white_space" align="center" @click="checkAccountButton()">
          {{ checkAccount }}
        </div>
      </div>
    </div>

    <!-- 4단계 마지막 -->
    <div v-if="certProgress === 4" class="last_cert_fourth" align="center">
      <img src="@/assets/image/icon_15.png" class="icon_image">
      <div class="last_cert_guide_text1 white_space" v-html="sendAccountInfo"/>
      <div class="last_cert_guide_text2" v-html="sendAccountInfoSub"/>
    </div>

    <div v-if="certProgress === 4" class="last_cert_fourth_input" align="left">

      <div class="send_info_box">
        <div class="title">
          {{ sendAccountNmTitle }}
        </div>
        <div class="wrapper">
          <div class="left_title">
            {{ sendAccountNm }}
          </div>
          <div class="right_won" v-html="oneWon"/>
        </div>
      </div>

      <div class="auth_title">
        {{ accountTitle }}
      </div>
      <div class="auth_input_area">
        <input
          v-model="authNo"
          :placeholder="authNoPlaceholder"
          type="text"
          class="input_auth_no white_space_half">
        <div class="check_auth_button white_space" align="center" @click="checkAuthNoButton()">
          {{ authButton }}
        </div>
      </div>
    </div>

    <!-- 푸터-->
    <div v-if="certProgress !== 2 && certProgress !== 2.5" class="last_cert_footer_area" align="center" @click="clickFooter">
      {{ footer }}
    </div>
    <!-- 2단계 사진 촬영 푸터 -->
    <div v-if="certProgress === 2.5" class="last_cert_footer_area2">
      <div class="footer_left" align="center" @click="retake">
        {{ footer }}
      </div>
      <div class="footer_right" align="center" @click="clickFooter">
        {{ secondFooter }}
      </div>
    </div>

  </div>
</template>

<script>
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'

let app = null

export default {
  name: 'LastCertificate',
  directives: {},
  components: {
    swiper,
    swiperSlide
  },
  filters: {

  },
  props: {
    justClose: {
      type: Function,
      default: null
    }
  },
  data() {
    return {
      // 1: 인증 선택, 2: 신분증 인증, 3: 본인인증, 4: 추가 인증
      certProgress: 1,
      header: '본인인증',
      // 1단계
      guideTextTitle: '본인 확인을 위해<br>신분증 촬영을 시작합니다.',
      guideText: '신분증을 선택해 주세요.',
      idCard: '주민등록증',
      licenseCard: '운전면허증',
      picTip: 'Ⓘ 촬영 시 확인해주세요!',
      picTipContent: '- 신분증을 네모 영역에 잘 맞게 촬영해주세요.<br>- 어두운 배경 위에서 촬영해주세요.<br>- 빛이 반사되지 않도록 주의해주세요.<br>- 훼손이 심한 신분증은 거절될 수 있습니다.',
      picIdClass: 'shadow_off',
      picLicenseClass: 'shadow_off',
      // 2단계
      photoData: null,
      scanGuide: '프레임 내에서 신분증을 정렬해 스캔',
      issuDt: '',
      issuDtTitle: '발급일자',
      issuGuide: '*  발급일자가 신분증과 다른 경우 수정해 주세요.',
      issuOrgn: '',
      issuOrgnTitle: '발급 기관명',
      picTipContent2: '- 신분증 정보가 정확하게 입력되었는지 확인해주세요.<br>- 잘못 입력된 정보는 수정해주세요.',
      // 3단계
      accountGuideTextTitle: '본인 명의로 개설된<br>타행 계좌번호를 입력해주세요.',
      selectedBank: '자동이체 은행',
      bankSlideProgressImg: [
        require('@/assets/image/progress2_1.png'),
        require('@/assets/image/progress2_2.png'),
        require('@/assets/image/progress2_3.png')
      ],
      activeSlideIndex: 0,
      bankTable1: [
        [{ text: 'SC제일', class: 'off' }, { text: 'KEB하나', class: 'off' }, { text: 'NH농협', class: 'off' }, { text: '국민', class: 'off' }],
        [{ text: '기업', class: 'off' }, { text: '신한', class: 'off' }, { text: '우리', class: 'off' }, { text: '우리', class: 'off' }],
        [{ text: '선택', class: 'off' }, { text: '선택', class: 'off' }, { text: '선택', class: 'off' }, { text: '선택', class: 'off' }]
      ],
      bankTable2: [
        [{ text: '투투', class: 'off' }, { text: 'KEB하나', class: 'off' }, { text: 'NH농협', class: 'off' }, { text: '국민', class: 'off' }],
        [{ text: '기업', class: 'off' }, { text: '신한', class: 'off' }, { text: '우리', class: 'off' }, { text: '우리', class: 'off' }],
        [{ text: '선택', class: 'off' }, { text: '선택', class: 'off' }, { text: '선택', class: 'off' }, { text: '선택', class: 'off' }]
      ],
      bankTable3: [
        [{ text: '쓰리', class: 'off' }, { text: 'KEB하나', class: 'off' }, { text: 'NH농협', class: 'off' }, { text: '국민', class: 'off' }],
        [{ text: '기업', class: 'off' }, { text: '신한', class: 'off' }, { text: '우리', class: 'off' }, { text: '우리', class: 'off' }],
        [{ text: '선택', class: 'off' }, { text: '선택', class: 'off' }, { text: '선택', class: 'off' }, { text: '선택', class: 'off' }]
      ],
      accountTitle: '계좌번호',
      accountNo: '',
      accountNoPlaceholder: '숫자만 입력하세요.',
      checkAccount: '계좌확인',
      // 4단계
      sendAccountInfo: '입력하신 계좌로 1원을 보내 드렸습니다.',
      sendAccountInfoSub: '입금자명에 표시된 하나저축 다음 숫자 3자리<br>입력 후 인증번호를 검증해주세요.',
      sendAccountNmTitle: '입금자명',
      sendAccountNm: '하나저축 ● ● ●',
      oneWon: '1<span>원</span>',
      authNo: '',
      authNoPlaceholder: '인증번호를 입력하세요.',
      authButton: '번호검증',
      // 푸터
      footer: '확인',
      secondFooter: ''
    }
  },
  computed: {
    swiper() {
      return this.$refs.mySwiper2.swiper
    }
  },
  watch: {
    certProgress(page) {
      switch (page) {
        case 1:
          app.header = '본인인증'
          app.footer = '확인'
          app.secondFooter = ''
          break
        case 2:
          app.header = '신분증 인증'
          app.footer = '재촬영'
          app.secondFooter = ''
          break
        case 2.5:
          app.header = '신분증 인증'
          app.footer = '재촬영'
          app.secondFooter = '신분증 인증'
          break
        case 3:
          app.header = '본인인증'
          app.footer = '확인'
          app.secondFooter = ''
          break
        case 4:
          app.header = '추가 인증'
          app.footer = '확인'
          app.secondFooter = ''
          break
      }
    },
    certList() {
      if (app.certList.length > 0) {
        app.certSecondPageClass = 'last_cert_second_page'
      } else {
        app.certSecondPageClass = 'none_last_cert_second_page'
      }
    }
  },
  created() {
    app = this
  },
  methods: {
    // 타입 버튼
    selectType(type) {
      switch (type) {
        case 'idNo':
          app.picIdClass = ''
          app.picLicenseClass = 'shadow_off'
          break
        case 'license':
          app.picIdClass = 'shadow_off'
          app.picLicenseClass = ''
          break
      }
    },
    // 푸터 클릭(다음 버튼)
    clickFooter() {
      if (app.certProgress < 4) {
        if (app.certProgress === 2.5) {
          app.certProgress = 3
        } else {
          app.certProgress++
        }
      } else if (app.certProgress === 4) {
        // 인증, 대출 신청 끝
        // 완료 페이지 이동
        app.$router.push({ path: '/end' })
      }
    },
    takePhoto() {
      // 사진촬영
      app.certProgress = 2.5
    },
    retake() {
      // 재촬영
    },
    // 자동이체 은행 선택 슬라이드
    changeSlideProgressImg() {
      app.activeSlideIndex = app.swiper.activeIndex
    },
    changeSelectedBank(data) {
      // 나머지 off 후 해당 데이터 on
      for (let i = 0; i < app.bankTable1.length; i++) {
        for (let j = 0; j < app.bankTable1[i].length; j++) {
          app.bankTable1[i][j].class = 'off'
        }
      }
      for (let i = 0; i < app.bankTable2.length; i++) {
        for (let j = 0; j < app.bankTable2[i].length; j++) {
          app.bankTable2[i][j].class = 'off'
        }
      }
      for (let i = 0; i < app.bankTable3.length; i++) {
        for (let j = 0; j < app.bankTable3[i].length; j++) {
          app.bankTable3[i][j].class = 'off'
        }
      }
      data.class = 'on'
      console.log(data.text)
    },
    checkAccountButton() {
      // 계좌 확인
      console.log('계좌확인!')
    },
    checkAuthNoButton() {
      // 계좌 인증번호 확인
      console.log('인증번호 확인!')
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
// 헤더
.last_cert_header_area {
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
  .close_icon {
    width: 0.34rem;
    height: 0.34rem;
    margin-top: 0.05rem;
    margin-right: 0.24rem;
  }
}
.last_cert_empty_header {
  width: 10rem;
  height: 1.75rem;
}

// 바디
// 1page
.last_cert_first_page {
  width: 100%;
  height: calc(100vh - 7.3rem - 1rem);
  background-color: #F4F4F4;
  overflow-y: auto;
  display: flex;
  flex-wrap: nowrap;
  flex-direction: column;
  justify-content: center;

  .icon_image {
    width: 2.5rem;
    height: 2.5rem;
    margin-bottom: 0.47rem;
  }

  .last_cert_guide_text1{
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
  .last_cert_guide_text2 {
    font-size: 0.37rem;
    line-height: 0.56rem;
    color: #717171;
  }
  .last_select_cert_type {
    width: 8.96rem;
    margin-top: 0.47rem;
    display: flex;
    justify-content: space-between;
    font-size: 0.48rem;
    line-height: 0.48rem;
    color: #1FB1A7;
    font-family: 'hanaB';
    .type_id_card {
      width: 4.37rem;
      height: 2.45rem;
      border: 2px solid #1AA296;
      box-sizing: border-box;
      background-color: #fff;
      padding-top: 0.43rem;
    }
    .type_license_card {
      width: 4.37rem;
      height: 2.45rem;
      border: 2px solid #1AA296;
      box-sizing: border-box;
      background-color: #fff;
      padding-top: 0.43rem;
    }
    img {
      width: 1.07rem;
      height: 0.93rem;
      margin-bottom: 0.25rem;
    }
    .shadow_off {
      border: 2px solid rgba(26, 162, 150, 0.6) !important;
      color: rgba(31, 177, 167, 0.6) !important;
      background-color: rgba(255, 255, 255, 0.6) !important;
      img {
        opacity: 0.6 !important;
      }
    }
  }
}
.last_cert_first_page_guide {
  padding:0.87rem 0 0 0.59rem;
  .guide_title {
    font-size: 0.46rem;
    line-height: 0.71rem;
    color: #1FB1A7;
    font-family: 'hanaM';
  }
  .guide_contents {
    margin-top: 0.51rem;
    font-size: 0.39rem;
    line-height: 0.56rem;

  }
}

// 2page
// 인증서 없을때
.last_cert_second {
  height: calc(100vh - 1.75rem - 1.59rem);
  overflow-y: auto;
  display: flex;
  flex-wrap: nowrap;
  flex-direction: column;
  justify-content: center;
  .photo_area {
    width: 8.93rem;
    height: 5.81rem;
    background-color: #AFAFAF;
    margin-bottom: 0.71rem;
  }
  .scan_guide {
    color: #1FB1A7;
    font-size: 0.45rem;
    line-height: 0.68rem;
    font-family: 'hanaM';
  }
  .scan_empty_area {
    height: 5rem;
  }
  .scan_empty_area_half {
    height: 0.3rem;
  }
  .scan_icon {
    position: fixed;
    left: 3.34rem;
    bottom: 0;
    width: 3.75rem;
    height: 3.75rem;
  }

  .scan_data_area {
    padding-left: 0.53rem;
    .second_input_title {
      font-family: 'hanaB';
      font-size: 0.4rem;
      line-height: 0.4rem;
      margin-bottom: 0.25rem;
    }
    .input_style {
      background-color: #F6F6F6;
      width: 8.47rem;
      height: 1.18rem;
      border: none;
      padding-left: 0.46rem;
      font-size: 0.39rem;
      line-height: 0.5rem;
      margin-bottom: 0.25rem;
    }
    .second_issu_guide {
      font-size: 0.39rem;
      line-height: 0.5rem;
      color: #FF3737;
      margin-bottom: 0.35rem;
    }
    .scan_guide_title {
      font-size: 0.46rem;
      font-family: 'hanaM';
      color: #1FB1A7;
      margin-bottom: 0.25rem;
    }
    .scan_guide_content {
      font-size: 0.39rem;
      line-height: 0.56rem;
      color: #373737;
      padding-bottom: 0.4rem;
    }
  }
}
// 세번째
.last_cert_third {
  width: 100%;
  height: calc(100vh - 10.5rem - 1rem);
  background-color: #F4F4F4;
  overflow-y: auto;
  display: flex;
  flex-wrap: nowrap;
  flex-direction: column;
  justify-content: center;

  .icon_image {
    width: 2.5rem;
    height: 2.5rem;
    margin-bottom: 0.47rem;
  }

  .last_cert_guide_text1{
    font-family: 'hanaM';
    font-size: 0.48rem;
    line-height: 0.6rem;
    color: #1AA296;
  }
  br {
      line-height: 0;
      font-size: 0;
  }
}
.last_cert_third_page_account {
  padding:0.67rem 0 0 0.59rem;
  .flex_swiper_title {
    display: flex;
    justify-content: space-between;
    margin-bottom: 0.43rem;
    .selected_bank_title {
      font-size: 0.43rem;
      line-height: 0.43rem;
      font-family: 'hanaB';
      color: #373737;
      margin: 0;
    }
    .select_bank_progress {
      width: 0.85rem;
      height: 0.18rem;
      margin-top: 0.23rem;
      margin-right: 0.53rem;
      vertical-align: middle;
    }
  }

  .swiper_table2 {
    margin-bottom: 0.42rem;
    table {
      border-spacing: 0;
      width: 8.93rem;
      height: 3.53rem;
      font-size: 0.39rem;
      line-height: 0.5rem;
      text-align: center;
      vertical-align: middle;
      box-sizing: border-box;
      border: 1px solid #D5D5D5 !important;
      tr {
        td {
          width: 2.25rem;
          height: 1.18rem;
          box-sizing: border-box;
          border: 0.5px solid #D5D5D5;
        }
      }
    }
    .on {
      background-color: #1FB1A7;
      color: #fff;
    }
  }

  .account_title {
    font-size: 0.43rem;
    line-height: 0.43rem;
    font-family: 'hanaB';
    color: #373737;
    margin-bottom: 0.37rem;
  }
  .account_input_area {
    display: flex;
    justify-content: space-between;
    margin-bottom: 0.84rem;
    .input_account_no {
      background-color: #F6F6F6;
      width: 6rem;
      height: 1.18rem;
      border: none;
      padding-left: 0.46rem;
      font-size: 0.39rem;
      line-height: 0.5rem;
      color: #373737;
    }
    .input_account_no::placeholder {
      font-size: 0.39rem;
      line-height: 0.5rem;
      color: #AFAFAF;
    }
    .check_account_button {
      width: 2.18rem;
      height: 1.18rem;
      font-size: 0.48rem;
      line-height: 1.18rem;
      vertical-align: middle;
      color: #1FB1A7;
      font-family: 'hanaB';
      border: 2px solid #1FB1A7;
      box-sizing: border-box;
      margin-right: 0.54rem;
    }
  }
}

// 네번째
.last_cert_fourth {
  width: 100%;
  height: calc(100vh - 10rem - 1rem);
  background-color: #F4F4F4;
  overflow-y: auto;
  display: flex;
  flex-wrap: nowrap;
  flex-direction: column;
  justify-content: center;

  .icon_image {
    width: 2.5rem;
    height: 2.5rem;
    margin-bottom: 0.47rem;
  }

  .last_cert_guide_text1{
    font-family: 'hanaM';
    font-size: 0.48rem;
    line-height: 0.6rem;
    color: #1AA296;
    margin-bottom: 0.42rem;
  }
    br {
      line-height: 0;
      font-size: 0;
  }
  .last_cert_guide_text2 {
    font-size: 0.37rem;
    line-height: 0.56rem;
    color: #717171;
  }
}
.last_cert_fourth_input {
  padding:0.67rem 0.59rem 0 0.59rem;

  .send_info_box {
    width: 8.15rem;
    height: 2.14rem;
    border: 1px solid #D5D5D5;
    padding: 0.59rem 0 0 0.78rem;
    margin-bottom: 0.84rem;
    .title {
      font-size: 0.39rem;
      line-height: 0.5rem;
      margin-bottom: 0.5rem;
      color: #717171;
    }
    .wrapper {
      color: #151515;
      font-size: 0.65rem;
      display: flex;
      justify-content: space-between;
      .right_won {
        margin-right: 0.57rem;
        span {
          font-size: 0.51rem;
        }
      }
    }
  }
  .auth_title {
    font-size: 0.43rem;
    line-height: 0.43rem;
    font-family: 'hanaB';
    color: #373737;
    margin-bottom: 0.37rem;
  }
  .auth_input_area {
    display: flex;
    justify-content: space-between;
    margin-bottom: 0.84rem;
    .input_auth_no {
      background-color: #F6F6F6;
      width: 6rem;
      height: 1.18rem;
      border: none;
      padding-left: 0.46rem;
      font-size: 0.39rem;
      line-height: 0.5rem;
      color: #373737;
    }
    .input_auth_no::placeholder {
      font-size: 0.39rem;
      line-height: 0.5rem;
      color: #AFAFAF;
    }
    .check_auth_button {
      width: 2.18rem;
      height: 1.18rem;
      font-size: 0.48rem;
      line-height: 1.18rem;
      vertical-align: middle;
      color: #1FB1A7;
      font-family: 'hanaB';
      border: 2px solid #1FB1A7;
      box-sizing: border-box;
    }
  }
}

// 푸터
.last_cert_footer_area {
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
.last_cert_footer_area2 {
  position: fixed;
  bottom: 0;
  width: 10rem;
  height: 1.59rem;
  font-size: 0.62rem;
  line-height: 1.59rem;
  vertical-align: middle;
  color: #fff;
  font-family: 'hanaM';
  display: flex;
  justify-content: space-between;

  .footer_left {
    width: 5rem;
    height: 1.59rem;
    background-color: #10847C;
  }
  .footer_right {
    width: 5rem;
    height: 1.59rem;
    background-color: #50A69D;
  }
}
</style>
