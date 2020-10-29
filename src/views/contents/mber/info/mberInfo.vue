<template>
  <div class="app-container">
    <header>
      <a href="#" class="back"/>
      <h1>회원정보</h1>
    </header>
    <div class="namecard">
      <b>홍길동</b><br>
      <span>핸드폰 번호 &nbsp;&nbsp;|</span>
      <span>010-0000-0000</span>
      <div class="mem_face" @click="qrcode()"/>
      <!--  <a href="#" class="pro_ch"> </a> -->

    </div>
    <div class="pro_option">
      <a href="#">기본정보 변경</a>
      <a href="#">핸드폰 번호 변경</a>
      <a href="#">비밀번호 변경</a>
      <a href="#">간편로그인 설정</a>
      <a href="#">간편로그인 설정</a>
    </div>
    <a href="#" class="out">회원탈퇴 ></a>
  </div>
</template>
<script>
import waves from '@/directive/waves'
import { selectMberInfo } from '@/api/mberInfo'

export default {
  name: 'Mberinfo',
  directives: { waves },
  props: {
    mberId: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      mberInfo: {
        mberId: '',
        piCd: '',
        mbtlNo: '',
        mberNm: ''
      }
    }
  },
  created() {
    // 처음 페이지 시작시 멤버 데이터 불러오기
    this.callMberInfo()
  },
  methods: {
    qrcode() {
      this.$router.push({ name: 'qrCode' })
    },
    async callMberInfo() {
      const response = await selectMberInfo(this.$store.getters.mberId)

      console.log(response)
      console.log(this.$store.getters.mberId)
    }
  }
}
</script>
