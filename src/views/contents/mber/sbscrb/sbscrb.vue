<template>
  <div class="app-container">
    <header>
      <a href="#" class="back" @click="historyBack()"/><h1>회원가입</h1>
    </header>

    <div class="join_category">
      <div class="join_category_div" @click="moveIndvStplatAgre()">
        <img src="../../../../assets/image/join_icon_01.png" alt=""><br>
        개인 회원<br>
        <span>만 18세 이상 가능(외국인포함)</span>
      </div>
      <div class="join_category_div">
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
    moveIndvStplatAgre() {
      this.$router.push({ name: 'indvStplatAgre' })
    },
    historyBack() {
      this.$router.go(-1)
    }
  }
}
</script>
