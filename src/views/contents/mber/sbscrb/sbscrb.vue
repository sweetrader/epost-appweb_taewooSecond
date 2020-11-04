<template>
  <div class="app-container">
    <header>
      <a href="#" class="back" @click="historyBack()"/><h1>회원가입</h1>
    </header>

    <div class="join_category">
      <div class="join_category_div" @click="moveStplatAgre('P')">
        <img src="../../../../assets/image/join_icon_01.png" alt=""><br>
        개인 회원<br>
        <span>만 18세 이상 가능(외국인포함)</span>
      </div>
      <div class="join_category_div" @click="moveStplatAgre('B')">
        <img src="../../../../assets/image/join_icon_02.png" alt=""><br>
        사업자 회원<br>
        <span>사업자등록증을 보유한 회원</span>
      </div>
    </div>
  </div>
</template>
<script>
import waves from '@/directive/waves'

export default {
  name: 'Sbscrb',
  directives: { waves },
  data() {
    return {
    }
  },
  created() {
  },
  methods: {
    moveStplatAgre(mberSeCd) {
      // 상위 겍체로 값 올려주는 함수(부모쪽 함수로 변수를 전달해 주는 중요하 함수 기능이다.)
      this.$emit('mberSe', mberSeCd)
    },
    historyBack() {
      this.$router.go(-1)
    }
  }
}
</script>
