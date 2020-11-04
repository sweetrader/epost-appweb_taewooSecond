<template>
  <div class="app-container">
    <div class="dark_wall"/>
    <div class="lpop_01">
      본인인증을 진행합니다.<br>
      본인인증 완료 후<br>
      회원가입을 진행 할 수 있습니다.
      <a href="#" class="lpop_01_ok" @click="moveCreateIndvSbscrb()">확인</a>
    </div>
  </div>
</template>
<script>
import waves from '@/directive/waves'

export default {
  name: 'IndvSbscrbNice',
  directives: { waves },
  props: {
  // 유형(등록: add, 수정: edit)
    subAgreCheakYn4: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {

    }
  },
  created() {
    console.log(this.subAgreCheakYn_4)
  },
  methods: {
    moveCreateIndvSbscrb() {
    // 원래는 나이스 인증 모듈 쪽으로 화면이 이동되거나 인증모듈을 실행시키는 함수임
    // 테스트 하기 위하여 지금은 일단 기본 회원 가입 쪽으로 넘기는 방향으로 하였음
      this.$router.push({ name: 'createIndvSbscrb', params: { subAgreCheakYn_4: this.subAgreCheakYn_4 }})
    }
  }
}
</script>
