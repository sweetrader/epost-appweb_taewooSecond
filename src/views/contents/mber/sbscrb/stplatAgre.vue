<template>
  <div class="app-container">
    <header>
      <a href="#" class="back" @click="historyBack()"/><h1>개인 회원가입</h1>
    </header>
    <div class="wrap">
      <div class="cont_join">
        <div class="cont_join_cell">
          <div :class="{ 'uncheck' : !totalAgreCheakYn, 'uncheck_on' : totalAgreCheakYn }" @click="checkOnOff('totalAgreCheakYn')"/> 전체 동의
        </div>
        <div class="area">
          <div class="checks">
            <input id="agreemet_01" v-model="subAgreCheakYn[0]" type="checkbox" name="agreemet" @click="checkOnOff('subAgreCheakYn_0')">
            <label for="agreemet_01">[필수] 우정물류공유플랫폼 이용약관</label>
          </div><a href="#">보기</a><br>
          <div class="checks">
            <input id="agreemet_02" v-model="subAgreCheakYn[1]" type="checkbox" name="agreemet" @click="checkOnOff('subAgreCheakYn_1')">
            <label for="agreemet_02">[필수] 개인정보 수집 및 이용</label>
          </div><a href="#">보기</a><br>
          <div class="checks">
            <input id="agreemet_03" v-model="subAgreCheakYn[2]" type="checkbox" name="agreemet" @click="checkOnOff('subAgreCheakYn_2')">
            <label for="agreemet_03">[필수] 개인정보의 제 3자 제공동의</label>
          </div><a href="#">보기</a><br>
        </div>
        <div class="area_2nd">
          <div class="checks">
            <input id="agreemet_04" v-model="subAgreCheakYn[3]" type="checkbox" name="agreemet" @click="checkOnOff('subAgreCheakYn_3')">
            <label for="agreemet_04">[선택] 마케팅/홍보에 개인정보 이용동의</label>
          </div><a href="#">보기</a><br>
          <span>동의 거부시 상품 할인 및 이벤트 정보 안내 서비스가<br>제한될 수 있습니다.</span>
        </div>
      </div>
      <a href="#" :class="{ 'next_btn' : !nextBtnActive, 'next_btn itsok' : nextBtnActive }" @click="moveCertiNice()">다음</a>
    </div>
  </div>
</template>
<script>
import waves from '@/directive/waves'

export default {
  name: 'IndvStplatAgre',
  directives: { waves },
  data() {
    return {
      totalAgreCheakYn: false,
      nextBtnActive: false,
      subAgreCheakYn: [false, false, false, false],
      subAgreCheakYn_4: ''
    }
  },
  created() {
  },
  methods: {
    historyBack() {
      this.$router.go(-1)
    },
    nextBtnActiveCheak() {
      if (this.subAgreCheakYn[0] === true && this.subAgreCheakYn[1] === true && this.subAgreCheakYn[2] === true) {
        this.nextBtnActive = true
      } else {
        this.nextBtnActive = false
      }
      return this.nextBtnActive
    },
    checkOnOff(target) {
      switch (target) {
        case 'totalAgreCheakYn':
          this.totalAgreCheakYn ? this.totalAgreCheakYn = false : this.totalAgreCheakYn = true
          if (this.totalAgreCheakYn === true) {
            this.subAgreCheakYn = new Array(4).fill(true)
            this.nextBtnActive = true
          } else if (this.totalAgreCheakYn === false) {
            this.subAgreCheakYn = new Array(4).fill(false)
            this.nextBtnActive = false
          }
          break
        case 'subAgreCheakYn_0':
          this.subAgreCheakYn[0] ? this.subAgreCheakYn[0] = false : this.subAgreCheakYn[0] = true
          console.log(this.nextBtnActiveCheak())
          if (this.totalAgreCheakYn === true && this.subAgreCheakYn[0] === false) {
            this.totalAgreCheakYn = false
          } else if (this.subAgreCheakYn.every(e => e)) {
            this.totalAgreCheakYn = true
          } else if (this.nextBtnActiveCheak() === true) {
            this.nextBtnActive = true
          }
          break
        case 'subAgreCheakYn_1':
          this.subAgreCheakYn[1] ? this.subAgreCheakYn[1] = false : this.subAgreCheakYn[1] = true
          if (this.totalAgreCheakYn === true && this.subAgreCheakYn[1] === false) {
            this.totalAgreCheakYn = false
          } else if (this.subAgreCheakYn.every(e => e)) {
            this.totalAgreCheakYn = true
          } else if (this.nextBtnActiveCheak() === true) {
            this.nextBtnActive = true
          }
          break
        case 'subAgreCheakYn_2':
          this.subAgreCheakYn[2] ? this.subAgreCheakYn[2] = false : this.subAgreCheakYn[2] = true
          if (this.totalAgreCheakYn === true && this.subAgreCheakYn[2] === false) {
            this.totalAgreCheakYn = false
          } else if (this.subAgreCheakYn.every(e => e)) {
            this.totalAgreCheakYn = true
          } else if (this.nextBtnActiveCheak() === true) {
            this.nextBtnActive = true
          }
          break
        case 'subAgreCheakYn_3':
          this.subAgreCheakYn[3] ? this.subAgreCheakYn[3] = false : this.subAgreCheakYn[3] = true
          if (this.totalAgreCheakYn === true && this.subAgreCheakYn[3] === false) {
            this.totalAgreCheakYn = false
          } else if (this.subAgreCheakYn.every(e => e)) {
            this.totalAgreCheakYn = true
          } else if (this.nextBtnActiveCheak() === true) {
            this.nextBtnActive = true
          }
          break
      }
    },
    moveCertiNice() {
      if (!this.nextBtnActive) {
        alert('동의서에 확인 해주셈')
      // this.$message.error('동의서에 확인하지 않으면 가입이 진행 되지 않습니다.')
      } else {
        if (this.subAgreCheakYn[3] === true) {
          this.subAgreCheakYn_4 = 'Y'
        } else {
          this.subAgreCheakYn_4 = 'N'
        }
        // 상위 겍체로 값 올려주는 함수(부모쪽 함수로 변수를 전달해 주는 중요하 함수 기능이다.)
        this.$emit('certiNice', this.subAgreCheakYn_4)
        // this.$router.push({ name: 'indvSbscrbNice', params: { subAgreCheakYn_4: this.subAgreCheakYn[3] }})
      }
    }
  }
}
</script>

