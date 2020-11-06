<template>
  <div class="app-container">
    <header>
      <a href="#" class="back" @click="historyBack()"/><h1>회원가입</h1><a href="#" class="forward" @click="easyLoginPass()">건너뛰기</a>
    </header>
    <div class="easy_login_area">
      간편 로그인을 사용하시겠습니까?<br>간편 로그인에 사용할 방법을 선택해 주세요.<br><br>
      <a href="#" class="on onning" @click="fnRegisterFingerPrint()"><div/><br>지문 등록</a>
      <a href="#" class="on"><div/><br>핀번호 등록</a>
      <a href="#" class="next_btn2 itsok" @click="nextBtn()">확인</a>
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
      easyLoginRegist: {
        pinNoUseYn: this.index.pinNoUseYn,
        bmtRcgnUseYn: this.index.bmtRcgnUseYn
      }
    }
  },
  created() {
    // eslint-disable-next-line no-undef
    Android.initFingerPrint()
  },
  methods: {
    historyBack() {
      this.$emit('historyback', 5)
    },
    easyLoginPass() {
      alert('그냥 건너뛰고 회원 가입 하실건가요?')
      this.$emit('easyLoginPass', this.easyLoginRegist)
    },
    nextBtn() {
      alert('다음으로 진행하시겠습니까')
      this.$emit('easyLogin')
    },
    fnRegisterFingerPrint() {
      // Android.registerFingerPrint()
    }
  }
}
</script>

