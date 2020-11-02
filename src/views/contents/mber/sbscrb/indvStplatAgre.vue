<template>
  <div class="app-container">
    <header>
      <a href="#" class="back"/><h1>회원가입</h1>
    </header>
    <div class="wrap">
      <div class="cont_join">
        <div class="cont_join_cell">
          <div class="uncheck"/> 전체 동의
        </div>
        <div class="area">
          <div class="checks">
            <input id="agreemet_01" type="checkbox" name="agreemet">
            <label for="agreemet_01">[필수] 우정물류공유플랫폼 이용약관</label>
          </div><a href="#">보기</a><br>
          <div class="checks">
            <input id="agreemet_02" type="checkbox" name="agreemet">
            <label for="agreemet_02">[필수] 개인정보 수집 및 이용</label>
          </div><a href="#">보기</a><br>
          <div class="checks">
            <input id="agreemet_03" type="checkbox" name="agreemet">
            <label for="agreemet_03">[필수] 개인정보의 제 3자 제공동의</label>
          </div><a href="#">보기</a><br>
        </div>
        <div class="area_2nd">
          <div class="checks">
            <input id="agreemet_04" type="checkbox" name="agreemet">
            <label for="agreemet_04">[선택] 마케팅/홍보에 개인정보 이용동의</label>
          </div><a href="#">보기</a><br>
          <span>동의 거부시 상품 할인 및 이벤트 정보 안내 서비스가<br>제한될 수 있습니다.</span>
        </div>
      </div>
      <a href="#" class="next_btn">다음</a>
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
    }
  },
  created() {
    console.log('불러요')
  },
  methods: {

  }
}
</script>

