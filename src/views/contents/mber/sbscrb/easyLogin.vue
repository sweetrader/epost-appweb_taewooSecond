<template>
  <div class="app-container">
    <header>
      <a href="#" class="back"/><h1>회원가입</h1><a href="#" class="forward">건너뛰기</a>
    </header>
    <div class="easy_login_area">
      간편 로그인을 사용하시겠습니까?<br>간편 로그인에 사용할 방법을 선택해 주세요.<br><br>
      <a href="#" class="on onning"><div/><br>지문 등록</a>
      <a href="#" class="on"><div/><br>핀번호 등록</a>
      <a href="#" class="next_btn2 itsok">확인</a>
    </div>
  </div>
</template>
<script>
import waves from '@/directive/waves'

export default {
  name: 'EasyLogin',
  directives: { waves },
  data() {
    return {
    }
  },
  created() {
  },
  methods: {
    historyBack() {
      this.$emit('historyback', 2)
    },
    nextBtnActiveCheak() {

    }

  }
}
</script>

