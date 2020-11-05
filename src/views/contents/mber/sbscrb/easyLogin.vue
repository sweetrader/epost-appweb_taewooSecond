<template>
  <div class="app-container">
    <header>
      <a href="#" class="back" @click="historyBack()"/><h1>회원가입</h1><a href="#" class="forward" @click="easyLoginPass()">건너뛰기</a>
    </header>
    <div class="easy_login_area">
      간편 로그인을 사용하시겠습니까?<br>간편 로그인에 사용할 방법을 선택해 주세요.<br><br>
      <a href="#" class="on onning"><div/><br>지문 등록</a>
      <a href="#" class="on"><div/><br>핀번호 등록</a>
      <a href="#" class="next_btn2 itsok" @click="nextBtnActiveCheak()">확인</a>
    </div>
  </div>
</template>
<script>
import waves from '@/directive/waves'

export default {
  name: 'EasyLogin',
  directives: { waves },
  props: {
    index: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      pinNoUseYn: this.index.pinNoUseYn,
      bmtRcgnUseYn: this.index.bmtRcgnUseYn
    }
  },
  created() {
    console.log(this.index)
  },
  methods: {
    historyBack() {
      this.$emit('historyback', 5)
    },
    easyLoginPass() {
      alert('그냥 건너뛰고 회원 가입 할거임?')
    },
    nextBtnActiveCheak() {
      alert('트럼프 좃됨 ㅋㅋ')
      this.$emit('easyLogin')
    }
  }
}
</script>

