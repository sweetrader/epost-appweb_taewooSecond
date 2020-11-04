<template>
  <div class="app-container">
    <header>
      <a href="#" class="back" @click="historyBack()"/><h1>회원가입</h1>
    </header>
    <div class="join_info">
      <table>
        <tr>
          <th>이름</th>
          <td>{{ indvInsertData.mberNm }}</td>
        </tr>
        <tr>
          <th>생년월일</th>
          <td>{{ indvInsertData.birth }}</td>
        </tr>
        <tr>
          <th>성별</th>
          <td>{{ indvInsertData.gender }}</td>
        </tr>
        <tr>
          <th>핸드폰</th>
          <td>{{ indvInsertData.mbtlNo }}</td>
        </tr>
      </table>
    </div>
    <div class="form_input">
      <input v-model="indvInsertData.mberPassword" type="password" placeholder="비밀번호 입력">
      <input v-model="indvInsertData.mberRePassword" type="password" placeholder="비밀번호 재입력"><br>
      <ul>
        <li>띄어쓰기 없는 9~15자리의 영문 소문자, 숫자, 특수문자를<br>조합해야 합니다.</li>
        <li>생년월일, 일반전화 등의 개인정보로 이루어진 비밀번호 사용은<br>위험합니다.</li>
        <li>연속된 숫자, 동일 반복된 숫자 등 다른 사람이 쉽게 알아볼 수<br>있는 비밀번호 사용은 위험합니다.</li>
      </ul>
      <input v-model="indvInsertData.emailAddr" type="text" placeholder="이메일 입력">
      <div class="basic_address">
        <input id="address" type="text" placeholder="기본주소 입력" readonly><button @click="execDaumPostSearch">찾기</button>
      </div>
      <div>
        <input id="postNumber" type="text" placeholder="우편번호" style="width: 25%;" readonly>
        <input id="detailAddress" v-model="indvInsertData.addrDtl" type="text" placeholder="상세주소 입력" style="width: 74%;">
      </div>
      <a href="#" :class="{ 'next_btn2' : !nextBtnActive, 'next_btn2 itsok' : nextBtnActive }" @click="nextBtnClick()">다음</a>
    </div>
  </div>
</template>
<script>
import waves from '@/directive/waves'
import { validEmail } from '@/utils/validate'
export default {
  name: 'IndvSbscrb',
  directives: { waves },
  data() {
    return {
      nextBtnActive: true,
      indvInsertData: {
        mberNm: '',
        birth: '',
        gender: '',
        mbtlNo: '',
        mberPassword: '',
        mberSeCd: '',
        mberRePassword: '',
        emailAddr: '',
        sbscrbDe: '',
        addr: '',
        addrDtl: '',
        zip: ''
      },
      valirule: {
        emailAddrCheak: false,
        passwordCheak: false
      }
    }
  },
  computed: {
    // nextBtnActive() {
    //   if(this.valiCheak()){
    //     this.nextBtnActive = true
    //   }else {
    //     this.nextBtnActive = false
    //   }
    //   return nextBtnActive
    // }
  },
  created() {
    this.$nextTick(function() {
      const recaptchaScript = document.createElement('script')
      recaptchaScript.setAttribute('src', 'https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js')
      document.head.appendChild(recaptchaScript)
    })

    this.indvInsertData.mberNm = '성춘향'
    this.indvInsertData.birth = '17540804'
    this.indvInsertData.gender = '여'
    this.indvInsertData.mbtlNo = '01017540804'
  },
  methods: {
    execDaumPostSearch() {
      // eslint-disable-next-line no-undef
      new daum.Postcode({
        oncomplete: function(data) {
          // 팝업에서 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분.
          // 각 주소의 노출 규칙에 따라 주소를 조합한다.
          // 내려오는 변수가 값이 없는 경우엔 공백('')값을 가지므로, 이를 참고하여 분기 한다.
          var addr = '' // 주소 변수
          var extraAddr = '' // 참고항목 변수

          // 사용자가 선택한 주소 타입에 따라 해당 주소 값을 가져온다.
          if (data.userSelectedType === 'R') { // 사용자가 도로명 주소를 선택했을 경우
            addr = data.roadAddress
          } else { // 사용자가 지번 주소를 선택했을 경우(J)
            addr = data.jibunAddress
          }

          // 사용자가 선택한 주소가 도로명 타입일때 참고항목을 조합한다.
          if (data.userSelectedType === 'R') {
            // 법정동명이 있을 경우 추가한다. (법정리는 제외)
            // 법정동의 경우 마지막 문자가 "동/로/가"로 끝난다.
            if (data.bname !== '' && /[동|로|가]$/g.test(data.bname)) {
              extraAddr += data.bname
            }
            // 건물명이 있고, 공동주택일 경우 추가한다.
            if (data.buildingName !== '' && data.apartment === 'Y') {
              extraAddr += (extraAddr !== '' ? ', ' + data.buildingName : data.buildingName)
            }
            // 표시할 참고항목이 있을 경우, 괄호까지 추가한 최종 문자열을 만든다.
            if (extraAddr !== '') {
              extraAddr = ' (' + extraAddr + ')'
            }
            // 조합된 참고항목을 해당 필드에 넣는다.

            document.getElementById('address').value = addr + ' ' + extraAddr
          } else {
            document.getElementById('address').value = addr
          }

          // 우편번호와 주소 정보를 해당 필드에 넣는다.
          document.getElementById('postNumber').value = data.zonecode
          // document.getElementById('address').value = addr
          // 커서를 상세주소 필드로 이동한다.
          document.getElementById('detailAddress').focus()
        }
      }).open()
    },
    nextBtnClick() {
      // 상위 겍체로 값 올려주는 함수(부모쪽 함수로 변수를 전달해 주는 중요하 함수 기능이다.)
      if (this.valiCheak()) {
        this.$emit('indvSbscrb', this.indvInsertData)
      } else {
        alert('다음으로 진행 하는데 있어 유효성 검증에 문제가 있답니다.')
      }
    },
    valiCheak() {
      this.valirule.emailAddrCheak = validEmail(this.indvInsertData.emailAddr)
      this.indvInsertData.addr = document.getElementById('address').value
      this.indvInsertData.addrDtl = document.getElementById('detailAddress').value
      this.indvInsertData.zip = document.getElementById('postNumber').value
      if (this.indvInsertData.mberPassword === null || this.indvInsertData.mberPassword === '' || this.indvInsertData.mberRePassword === null || this.indvInsertData.mberRePassword === '') {
        alert('비밀 번호와 비밀번호 확인이 공백이면 안됩니다.')
        // this.$message.error('비밀 번호와 비밀번호 확인이 공백이면 안됩니다.')
        return false
      } else if (!(this.indvInsertData.mberPassword === this.indvInsertData.mberRePassword)) {
        alert('비밀 번호와 비밀번호 확인은 일치 해야 합니다.')
        // this.$message.error('비밀 번호와 비밀번호 확인은 일치 해야 합니다.')
        return false
      } else if (!this.valirule.emailAddrCheak) {
        alert('이메일 형식을 지켜 주셔야 합니다.')
        // this.$message.error('이메일 형식을 지켜 주셔야 합니다.')
        return false
      } else if (this.indvInsertData.addr === null || this.indvInsertData.addr === '') {
        alert('주소찾기를 눌러주세요.')
        // this.$message.error('이메일 형식을 지켜 주셔야 합니다.')
        return false
      } else if (this.indvInsertData.addrDtl === null || this.indvInsertData.addrDtl === '') {
        alert('상세주소를 입력해주세요')
        // this.$message.error('이메일 형식을 지켜 주셔야 합니다.')
        return false
      } else if (this.indvInsertData.zip === null || this.indvInsertData.zip === '') {
        alert('주소찾기를 눌러주세요.')
        // this.$message.error('이메일 형식을 지켜 주셔야 합니다.')
        return false
      }
      return true
    },
    historyBack() {
      this.$emit('historyback', 4)
    }
  }
}
</script>
