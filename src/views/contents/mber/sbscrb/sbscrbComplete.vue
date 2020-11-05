<template>
  <div class="app-container">
    <header>
      <h1>회원가입 완료</h1>
    </header>
    <div class="easy_login_area">
      <div class="postman"/>
      <br><br>
      <span class="span_17"><b>{{ completeData.mberNm }}</b>님! 반갑습니다.</span><br>
      <span class="span_14">우정물류공유플랫폼 <b>회원가입 완료</b>되었습니다.</span>
      <a href="#" class="next_btn2 itsok" @click=" nextBtnActiveCheak()">로그인</a>
    </div>
  </div>
</template>
<script>
import waves from '@/directive/waves'

export default {
  name: 'SbscrbComplete',
  directives: { waves },
  props: {
    index: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      completeData: {
        mberNm: this.index.mberNm
      }
    }
  },
  created() {

  },
  methods: {
    nextBtnActiveCheak() {
      this.$router.push({ name: 'login' })
    }
  }
}
</script>

