<template>
  <div class="app-container">
    <header>
      <a href="#" class="back" @click="historyBack()"/><h1>회원탈퇴</h1>
    </header>
    <div class="out">

      <span class="out_noti">회원탈퇴를 하기 전에 안내 사항을 꼭 확인해 주세요.</span>
      <div class="div_line"/>
      <b>아이디 재사용 및 복구 불가</b>
      사용하고 계신 아이디를 탈퇴하시면 본인과 타인 모두<br>
      재사용 및 복구가 불가하오니 신중하게 선택하시기 바랍니다.<br>
      <b class="m10">회원정보/개인형 서비스 이용기록 삭제</b>
      회원정보 및 개인형 서비스 이용기록은 모두 삭제되며, 삭제된<br>
      데이터는 복구되지 않습니다.
      <div class="div_line"/>
      <div class="checks4">
        <input id="agreemet_01" v-model="agreemetCheakYn" type="checkbox" @click="checkOnOff('agreemetCheakYn')">
        <label for="agreemet_01">
          위 내용을 모두 확인하였으며, 동의 합니다.
        </label>
      </div>
    </div>
    <a href="#" :class="{ 'next_btn' : !agreemetCheakYn, 'next_btn itsok' : agreemetCheakYn }" @click="withdrMberButton()">회원탈퇴</a>
  </div>
</template>
<script>
import waves from '@/directive/waves'
import { updateWithdrMber } from '@/api/mberInfo'

export default {
  name: 'WithdrMber',
  directives: { waves },
  props: {

  },
  data() {
    return {
      agreemetCheakYn: false,
      withdrMberData: {
        mberId: ''
      }
    }
  },
  created() {

  },
  methods: {
    historyBack() {
      this.$router.go(-1)
    },
    checkOnOff(target) {
      switch (target) {
        case 'agreemetCheakYn':
          this.agreemetCheakYn ? this.agreemetCheakYn = false : this.agreemetCheakYn = true
          break
      }
    },
    withdrMberButton() {
      if (!this.agreemetCheakYn) {
        alert('동의서에 확인 해주셈')
      // this.$message.error('동의서에 확인하지 않으면 회원탈퇴가 되지 않습니다.')
      } else {
        this.logout()
      }
    },
    async logout() {
      this.withdrMberData.mberId = this.$store.getters.mberId
      await updateWithdrMber(this.withdrMberData)
      await this.$store.dispatch('user/logout')
      this.$router.push(`/login`)
      setTimeout(() => {
        this.dataLoading = false
      }, 300)
    }
  }
}
</script>
