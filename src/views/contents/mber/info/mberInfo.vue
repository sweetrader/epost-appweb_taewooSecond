<template>
  <div class="app-container">
    <header>
      <a href="#" class="back"/>
      <h1>회원정보</h1>
    </header>
    <div class="namecard">
      <b>{{ mberInfo.mberNm }} </b><br>
      <span>핸드폰 번호 &nbsp;&nbsp;|</span>
      <span>{{ mberInfo.mbtlNo }}</span>
      <div class="mem_face" @click="qrcode()"/>
      <!--  <a href="#" class="pro_ch"> </a> -->

    </div>
    <div class="pro_option">
      <a href="#">기본정보 변경</a>
      <a href="#">핸드폰 번호 변경</a>
      <a href="#">비밀번호 변경</a>
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
  //    watch : {
  //          this.$nextTick(() => {
  //           this.resetData()
  //           this.editCheck()
  //           this.$refs['ruleForm'].resetFields()
  //         })

  //   },
  created() {
    // 처음 페이지 시작시 멤버 데이터 불러오기
    this.callMberInfo()
  },
  methods: {
    qrcode() {
      this.$router.push({ name: 'qrCode', params: { piCd: this.mberInfo.piCd }})
    },
    async callMberInfo() {
      const response = await selectMberInfo(this.$store.getters.mberId)

      this.mberInfo.piCd = response.data.piCd
      this.mberInfo.mbtlNo = response.data.mbtlNo
      this.mberInfo.mberNm = response.data.mberNm
      console.log(response)
      console.log(this.mberInfo.piCd)
      console.log(this.mberInfo.mbtlNo)
      console.log(this.mberInfo.mberNm)
      console.log(this.$store.getters.mberId)
      setTimeout(() => {
        this.dataLoading = false
      }, 300)
    }
  }
}
</script>
