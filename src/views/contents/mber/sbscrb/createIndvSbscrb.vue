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
        <input type="text" placeholder="기본주소 입력"><button>찾기</button>
      </div>
      <input type="text" placeholder="상세주소 입력">
      <a href="#" class="next_btn2" @click="nextBtnClick()">다음</a>
    </div>
  </div>
</template>
<script>
import waves from '@/directive/waves'
import { validEmail } from '@/utils/validate'
export default {
  name: 'CreateIndvSbscrb',
  directives: { waves },
  data() {
    return {
      subAgreCheakYn_4: false,
      indvInsertData: {
        mberNm: '',
        birth: '',
        gender: '',
        mbtlNo: '',
        mberPassword: '',
        mberSeCd: '',
        mberRePassword: '',
        emailAddr: '',
        sbscrbDe: ''
      },
      valirule: {
        emailAddrCheak: false
      }
    }
  },
  watch: {
    indvInsertData: {
      deep: true,
      handler(after) {
        console.log(after.mberPassword)
      }
    }
  },
  created() {
    this.subAgreCheakYn_4 = this.$route.params.subAgreCheakYn_4
    this.indvInsertData.mberNm = '성춘향'
    this.indvInsertData.birth = '17540804'
    this.indvInsertData.gender = '여'
    this.indvInsertData.mbtlNo = '01017540804'
    console.log('변수값 확인 : ' + this.subAgreCheakYn_4)
  },
  methods: {
    valiCheak() {
      this.valirule.emailAddrCheak = validEmail(this.indvInsertData.emailAddr)
      if (!this.valirule.emailAddrCheak) {
        this.$message.error('이메일 형식을 지켜 주셔야 합니다.')
      }
      console.log(this.valirule.emailAddrCheak)
    },
    historyBack() {
      this.$router.go(-1)
    },
    nextBtnClick() {
      this.valiCheak()
    }
  }
}
</script>
