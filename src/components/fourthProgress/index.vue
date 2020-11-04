<template>
  <div class="app-container">
    <div class="fourth_content_title under_line white_space">{{ fourthData.text.title.productInfo }}</div>
    <div v-for="(index, i) in fourthData.prdtInfo" :key="i" class="under_line">
      <div class="label white_space_half">
        {{ index.label }}
      </div>
      <div class="label_value" align="left">
        {{ index.text }}
      </div>
    </div>
    <div class="prdt_guide">{{ fourthData.text.prdtGuide }}</div>

    <div class="fourth_content_title white_space">{{ fourthData.text.title.addressInfo }}</div>
    <div @click="openAddressSearch">
      <input
        v-model="fourthData.addressData.default"
        :placeholder="fourthData.text.addressDefault"
        type="text"
        disabled
        class="address_input_area white_space_half">
    </div>
    <input
      v-model="fourthData.addressData.detail"
      :placeholder="fourthData.text.addressDetail"
      type="text"
      class="address_input_area white_space_half">
    <div class="input_margin_area"/>

    <div class="fourth_content_title white_space">{{ fourthData.text.title.realNmCheckInfo }}</div>
    <div class="check_type_area">
      <div :class="fourthData.idNoClass" align="center" @click="checkButtonClick('id')">
        {{ fourthData.text.idNo }}
      </div>
      <div :class="fourthData.driveLicenseClass" align="center" @click="checkButtonClick('license')">
        {{ fourthData.text.driveLicense }}
      </div>
    </div>

    <div class="fourth_content_title white_space">{{ fourthData.text.title.issuOrnzInfo }}</div>
    <input
      v-model="fourthData.issuData.name"
      :placeholder="fourthData.text.ornzGuide"
      type="text"
      class="ornz_name_input_area white_space_half">
    <div class="input_margin_area"/>

    <div class="fourth_content_title white_space">{{ fourthData.text.title.issuDt }}</div>
    <div>
      <datepicker
        v-model="fourthData.issuData.date"
        :placeholder="fourthData.text.selectDay"
        :language="datePickerLanguage"/>
    </div>
    <div class="issu_dt_guide_area">
      <div class="issu_dt_guide_hipen">-</div>
      <div class="issu_dt_guide" v-html="fourthData.text.selectDayGuide"/>
    </div>

    <div class="fourth_content_title white_space">{{ fourthData.text.title.prdtServiceSelect }}</div>
    <div class="service_guide_area">
      <div v-for="(index, i) in fourthData.selectServiceInfo" :key="i" class="service_guide_div" @click="index.checked ? index.checked = false : index.checked = true">
        <input v-model="index.checked" class="service_check_box check_box" type="checkbox">
        <label class="service_check_box check_box" for="check_box"/>
        <div class="service_check_box_text white_space">{{ index.title }}</div>
      </div>
    </div>

    <!-- 주소 검색 컴포넌트 -->
    <search-address v-if="showSearchAddressPopup" :just-close="justClose" :select-address="getAddress"/>
  </div>
</template>

<script>
import searchAddress from '@/components/searchAddress/index.vue'
import Datepicker from 'vuejs-datepicker'
import { ko } from 'vuejs-datepicker/dist/locale'
let app = null

export default {
  name: 'LastJoinForm',
  directives: {},
  components: {
    searchAddress,
    Datepicker
  },
  filters: {

  },
  props: {
    returnData: {
      type: Function,
      default: null
    }
  },
  data() {
    return {
      datePickerLanguage: ko,
      showSearchAddressPopup: false,
      fourthData: {
        text: {
          title: {
            productInfo: '상품정보',
            addressInfo: '실거주지',
            realNmCheckInfo: '실명확인증 정보',
            issuOrnzInfo: '발급기관',
            issuDt: '발급일자',
            prdtServiceSelect: '상품 서비스 안내(선택)'
          },
          prdtGuide: '- 이미 본인인증 완료된 정보로, 수정을 하실 수 없습니다.',
          addressDefault: '기본주소',
          addressDetail: '상세주소',
          idNo: '주민등록증',
          driveLicense: '운전면허증',
          ornzGuide: '실명확인증 아래 표시된 발급기관명을 입력해주세요.',
          selectDay: '일자 선택',
          selectDayGuide: '주민등록증 발급신청 확인서인 경우 발급신청일자를<br>입력해주세요.'
        },
        prdtInfo: [
          {
            label: '이름',
            text: '홍길동'
          },
          {
            label: '주민등록번호',
            text: '901221-*********'
          },
          {
            label: '휴대폰번호',
            text: '010-1234-5678'
          }
        ],
        addressData: {
          default: '',
          detail: ''
        },
        idNoClass: 'id_no_button',
        driveLicenseClass: 'drive_license_button',
        issuData: {
          name: '',
          date: null // new Date 형식으로 들어오는 컴포넌트입니다.
        },
        selectServiceInfo: [
          {
            title: '전화',
            checked: false
          },
          {
            title: 'SMS',
            checked: false
          },
          {
            title: '이메일',
            checked: false
          },
          {
            title: '우편',
            checked: false
          }
        ]
      }
    }
  },
  computed: {

  },
  watch: {
    fourthData() { // 해당 컴포넌트의 데이터가 바뀔 때 마다 값을 상위 컴포넌트에 전달
      app.returnData(app.fourthData)
    }
  },
  created() {
    app = this
    console.log(app.datePickerLanguage)
  },
  methods: {
    // 인증 선택 버튼
    checkButtonClick(type) {
      switch (type) {
        case 'id':
          app.fourthData.idNoClass = 'id_no_button button_on'
          app.fourthData.driveLicenseClass = 'drive_license_button'
          break
        case 'license':
          app.fourthData.idNoClass = 'id_no_button'
          app.fourthData.driveLicenseClass = 'drive_license_button button_on'
          break
      }
    },
    // 주소 팝업 오픈
    openAddressSearch() {
      app.showSearchAddressPopup = true
      console.log(app.fourthData.issuData.date)
    },
    // 주소 팝업 닫기
    justClose() {
      app.showSearchAddressPopup = false
    },
    // 주소 가져오기
    getAddress(data) {
      app.fourthData.addressData.default = data
      app.justClose()
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
.fourth_content_title {
  margin-bottom: 0.43rem;
  font-size: 0.43rem;
  line-height: 0.43rem;
  font-family: 'hanaB';
  color: #373737;
}
.under_line {
  width: 8.89rem;
  border-bottom: 1px solid #707070;
  padding-bottom: 0.31rem;
  margin-bottom: 0.31rem;
  display: flex;
  justify-content: space-between;
  .label {
    width: 2.4rem;
    font-size: 0.39rem;
    line-height: 0.39rem;
    font-family: 'hanaM';
  }
  .label_value {
    width: 6.48rem;
    font-size: 0.39rem;
    color: #373737;
  }
}
.prdt_guide {
  margin-top: 0.15rem;
  margin-bottom: 0.78rem;
  font-size: 0.37rem;
  line-height: 0.56rem;
  color: #717171;
}

.address_input_area {
  background-color: #F6F6F6;
  width: 8.48rem;
  height: 1.18rem;
  border: none;
  margin-bottom: 0.17rem;
  padding-left: 0.45rem;
  font-size: 0.39rem;
  line-height: 0.5rem;
  color: #373737;
}
.address_input_area::placeholder {
  font-size: 0.39rem;
  line-height: 0.5rem;
  color: #AFAFAF;
}
.input_margin_area {
  padding-top: 0.67rem;
}

.check_type_area {
  width: 8.93rem;
  display: flex;
  justify-content: space-between;
  font-family: 'hanaB';
  margin-bottom: 0.84rem;

  .id_no_button {
    width: 4.37rem;
    height: 1.18rem;
    font-size: 0.48rem;
    line-height: 1.18rem;
    vertical-align: middle;
    box-sizing: border-box;
    border: 2px solid #D5D5D5;
    color: #D5D5D5;
  }
  .drive_license_button{
    width: 4.37rem;
    height: 1.18rem;
    font-size: 0.48rem;
    line-height: 1.18rem;
    vertical-align: middle;
    box-sizing: border-box;
    border: 2px solid #D5D5D5;
    color: #D5D5D5;
  }
  .button_on {
    border: 2px solid #1FB1A7;
    color: #1FB1A7;
  }
}

.ornz_name_input_area {
  background-color: #F6F6F6;
  width: 8.48rem;
  height: 1.18rem;
  border: none;
  margin-bottom: 0.17rem;
  padding-left: 0.45rem;
  font-size: 0.39rem;
  line-height: 0.5rem;
  color: #373737;
}
.ornz_name_input_area::placeholder {
  font-size: 0.39rem;
  line-height: 0.5rem;
  color: #AFAFAF;
}

.issu_dt_input_area {
  width: 8.48rem;
  height: 1.18rem;
  border: none;
  margin-bottom: 0.46rem;
  padding-left: 0.45rem;
  font-size: 0.39rem;
  line-height: 0.5rem;
  color: #373737;
  background: url('~@/assets/image/select_date.png') no-repeat 95% 50%;
  background-size: 100% 100%;
  /* 네이티브 외형 감추기 */
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
}
.issu_dt_input_area::placeholder {
  font-size: 0.39rem;
  line-height: 0.5rem;
  color: #AFAFAF;
}
.issu_dt_guide_area {
  display: flex;
  font-size: 0.37rem;
  line-height: 0.56rem;
  color: #717171;
  margin-bottom: 0.84rem;
  .issu_dt_guide_hipen {
    width: 0.4rem;
  }
}

.service_guide_area {
  display: flex;
  justify-content: space-between;
  padding-right: 0.53rem;
  .service_guide_div {
    display: flex;
    justify-content: space-between;
    font-size: 0.43rem;

    .check_box + label {
      display: block !important;
      float: left;
      margin: 0;
      background: url('~@/assets/image/check_rec_box_off.png') no-repeat 95% 50%;
      background-size: 100% 100%;
    }
    .check_box:checked + label {
      display: block !important;
      float: left;
      background: url('~@/assets/image/check_rec_box_on.png') no-repeat 95% 50%;
      background-size: 100% 100%;
    }
    .service_check_box {
      display: none;
      width: 0.84rem;
      height: 0.84rem;
    }
    .service_check_box_text {
      line-height: 0.84rem;
      vertical-align: middle;
      margin-left: 0.21rem;
    }
  }
}

// Date Picker Style
.vdp-datepicker {
  div {
    input {
      width: 8.93rem;
      height: 1.234rem;
      border: none;
      margin-bottom: 0.46rem;
      padding-left: 0.45rem;
      font-size: 0.39rem;
      line-height: 0.5rem;
      color: #373737;
      background: url('~@/assets/image/select_date.png') no-repeat 95% 50%;
      background-size: 100% 100%;
      /* 네이티브 외형 감추기 */
      -webkit-appearance: none;
      -moz-appearance: none;
      appearance: none;
    }
    input::placeholder {
      font-size: 0.39rem;
      line-height: 0.5rem;
      color: #AFAFAF;
    }
  }
}

</style>
