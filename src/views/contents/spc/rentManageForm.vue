<template>
  <div id="resister-post">
    <Header title="게시글 등록"/>
    <Tab/>
    <section class="section">
      <div class="title"><p>기본정보</p><p class="button">공간정보 불러오기</p></div>
      <div class="contents-wraper">
        <dl class="inner-content">
          <div class="input-wraper"><input v-model="spaceNm" type="text" placeholder="공간명 입력"></div>
          <div class="input-wraper two-wraper">
            <input v-model="basicAddr" type="text" placeholder="기본 주소">
            <div class="search">찾기</div>
          </div>
          <div class="input-wraper"><input v-model="specificAddr" type="text" placeholder="상세 주소"></div>
        </dl>
        <dl class="inner-content">
          <dt class="input-wraper">
            <select v-model="selectedSpaceType">
              <option selected>업무시설 선택</option>
            </select>
          </dt>
          <dt class="wraper-two-div">
            <div class="input-wraper"><input v-model="privateCapacity_01" type="text" placeholder="전용면적"></div><p class="each-text-of-two">m2 또는</p>
            <div class="input-wraper"><input v-model="privateCapacity_02" type="text" placeholder="전용면적"></div><p class="each-text-of-two">평</p>
          </dt>
          <dt class="input-wraper">
            <select v-model="selectedSpaceEachAmount">
              <option selected>분리공간 개수 선택</option>
            </select>
          </dt>

        </dl>
        <dl class="inner-content">
          <dt class="wraper-two-div">
            <div class="input-wraper"><input v-model="selecteFloor" type="text" placeholder="해당층"></div><p class="each-text-of-two">층/</p>
            <div class="input-wraper"><input v-model="entireFloor" type="text" placeholder="전체층"></div><p class="each-text-of-two">층</p>
          </dt>
          <dt class="input-wraper">
            <select v-model="selectDirection">
              <option selected>방향 선택</option>
            </select>
          </dt>
          <dt class="wraper-two-div">
            <div class="input-wraper"><input v-model="capabilityParking" type="text" placeholder="주차가능대수"></div><p class="each-text-of-two">대/</p>
            <div class="input-wraper"><input v-model="parkAmount" type="text" placeholder="주차수"></div><p class="each-text-of-two">대</p>
          </dt>
        </dl>
        <dl class="inner-content">
          <DatePicker v-model="permitDate" input-class="mx-input" type="date" placeholder="준공인가일" format="YY.MM.DD"/>
          <dt class="input-wraper">
            <select v-model="usageConstructure">
              <option selected>건축물 용도 선택</option>
            </select>
          </dt>
          <dt class="textarea-wraper"><textarea v-model="remark01" type="text" placeholder="비공개 비고 입력(선택)"/></dt>
          <p class="check-available-party">- 공급자만 확인 가능합니다.</p>
        </dl>

      </div>

    </section>
    <section class="section">
      <div class="title"><p>추가정보(선택)</p></div>
      <div class="contents-wraper">
        <dl class="inner-content">
          <dt class="input-wraper">
            <select v-model="elevatorAmount">
              <option selected>엘리베이터 대수 선택</option>
            </select>
          </dt>
          <dt class="input-wraper">
            <select v-model="heaterAmount">
              <option selected>난방종류 선택</option>
            </select>
          </dt>
        </dl>
        <div class="inner-content">
          <div class="two-checkbox-wraper">
            <dl>
              <p>상하차 여부</p>
              <div class="checkbox-inner">
                <div :class=" updown ? 'on' : ''" @click="updown = true">가능</div>
                <div :class=" !updown ? 'on' : ''" @click="updown = false">불가능</div>
              </div>
            </dl>
            <dl>
              <p>택배 바로 접수</p>
              <div class="checkbox-inner">
                <div :class=" shipRegisterOk ? 'on' : ''" @click="shipRegisterOk = true">가능</div>
                <div :class=" !shipRegisterOk ? 'on' : ''" @click="shipRegisterOk = false">불가능</div>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </section>
    <section class="section">
      <div class="title"><p>임대정보</p></div>
      <div class="contents-wraper">
        <dl class="inner-content">
          <dt class="content-title"><p>임대기본정보</p><p class="guide">게시글 제목</p></dt>
          <dt class="input-wraper"><input v-model="postNm" type="text" placeholder="게시글 제목 입력(예: 명동역3번출구1분거리/신축)"></dt>
          <dt class="two-button-wrap">
            <div :class="isMonthlyRent ? 'each-button on border-radius-left' :'each-button right'" @click="isMonthlyRent = true">
              <img v-if="isMonthlyRent" src="@/assets/image/space/icons/path-red.png">월세
            </div>
            <div :class="!isMonthlyRent ? 'each-button on border-radius-right' :'each-button left'" @click="isMonthlyRent = false">
              <img v-if="!isMonthlyRent" src="@/assets/image/space/icons/path-red.png">전세
            </div>
          </dt>
          <dt class="wraper-two-div">
            <div class="input-wraper"><input v-model="deposit" type="text" placeholder="보증금 입력"></div><p class="each-text-of-two">원/</p>
            <div class="input-wraper"><input v-model="rentalFee" type="text" placeholder="월세 입력"></div><p class="each-text-of-two">원</p>
          </dt>
          <dt class="wraper-two-div"> <div class="input-wraper"><input v-model="maintanaceFee" type="text" placeholder="관리비 입력"></div><p class="each-text-of-two">원</p></dt>
        </dl>
        <dl class="inner-content">
          <dt class="content-title"><p>임대기간</p></dt>
          <dt class="wraper-two-div">
            <DatePicker v-model="rentalPeriodStart" input-class="mx-input" type="date" placeholder="임대기간 입력" format="YY.MM.DD"/>
            <p class="each-text-of-two">~</p>
            <DatePicker v-model="rentalPeriodEnd" input-class="mx-input" type="date" placeholder="임대기간 입력" format="YY.MM.DD"/>

          </dt>
          <dt class="wraper-two-div">
            <div class="define-width">
              <DatePicker v-model="rentalAvailableDate" input-class="mx-input" type="date" placeholder="임대기간 입력" format="YY.MM.DD"/>
            </div>
            <p class="each-text-of-two">이후</p>
            <div :class="availableDirectlyMove ? 'checkbox on' : 'checkbox'" @click="availableDirectlyMove = !availableDirectlyMove"><p>즉시 입주 가능</p></div>
          </dt>
        </dl>
        <dl class="inner-content">
          <dt class="content-title"><p>사진등록(선택)</p></dt>
          <dt class="input-wraper upload-picture">
            <div>
              <img src="@/assets/image/space/icons/image.png" alt="">
              <p>사진첨부<span> {{ photoList.length }}</span></p>
            </div>
          </dt>
          <ul class="notice">
            <li>사진 최소 5장 최대 15장 까지 등록할 수 있습니다.</li>
            <li>직접 찍은 실제 사진의 원본을 등록해야 합니다.</li>
            <li>워터마크, 날짜, 전화번호 등이 포함된 사진이나 관련 없는 사진을 등록할 경우 글 게시가 종료될 수 있습니다.</li>
          </ul>
          <dt class="photo-list-area">
            <div v-for="photo in photoList" :key="photo.index" class="each-photo"><p>{{ photo.name }}</p>
              <div><img src="@/assets/image/space/icons/x.png"></div>
            </div>
          </dt>
          <dl class="inner-content"><dt class="textarea-wraper"><textarea v-model="explain" type="text" placeholder="상세설명 입력(선택)"/></dt>
          </dl>

        </dl>
      </div>
    </section>
    <section class="section">
      <div class="title"><p>공급자정보</p></div>
      <div class="contents-wraper">
        <dl class="inner-content">
          <dt class="input-wraper">
            <p>서울중앙우체국 담당자</p>
          </dt>
          <dt class="input-wraper">
            <p>02-1234-5678</p>
          </dt>
        </dl>
      </div>
    </section>
    <BottomButton one-button="등록" :is-valid="false"/>
    <section v-if="modalOn" class="modal">
      <img class="xButton" src="@/assets/image/space/icons/x.png">
      <img class="explainImg" src="@/assets/image/space/icons/no-image.png">
      <p>
        게시글 제목은 구체적인 내용으로<br>간단하게 작성해주시면 좀 더 빠르게<br>매칭이 이루어집니다.
      </p>
      <dl>
        <div>예시)</div>
        <ul>
          <li>신논현역1분거리/내부수리완료</li>
          <li>강남역세권/주차장보유/고층뷰</li>
          <li>명동역/관리비X/회의실·카페공유O</li>
          <li>삼성역/빌딩형사무실/구내식당有</li>
        </ul>
      </dl>
    </section>
  </div>
</template>

<script>
import Header from '@/components/space/Header/Index'
import Tab from '@/components/space/Tab/Index'
import BottomButton from '@/components/space/BottomButton/Index'
import DatePicker from 'vue2-datepicker'
import 'vue2-datepicker/index.css'

export default {
  components: {
    Header, Tab, BottomButton, DatePicker
  },
  data() {
    return {
      modalOn: false,
      shipRegisterOk: true,
      updown: true,
      isMonthlyRent: true,
      availableDirectlyMove: false,
      photoList: [
        { name: '명동사무실1.jpg' },
        { name: '명동사무실2.jpg' },
        { name: '명동사무실3.jpg' }
      ],

      // v-model
      spaceNm: '',
      basicAddr: '',
      specificAddr: '',
      selectedSpaceType: '업무시설 선택',
      selectedSpaceEachAmount: '분리공간 개수 선택',
      privateCapacity_01: '',
      privateCapacity_02: '',
      selecteFloor: '',
      entireFloor: '',
      selectDirection: '방향 선택',
      capabilityParking: '',
      parkAmount: '',
      permitDate: '',
      usageConstructure: '건축물 용도 선택',
      remark01: '',
      elevatorAmount: '엘리베이터 대수 선택',
      heaterAmount: '난방종류 선택',
      postNm: '',
      deposit: '',
      rentalFee: '',
      maintanaceFee: '',
      rentalPeriodStart: '',
      rentalPeriodEnd: '',
      rentalAvailableDate: '',
      explain: ''

    }
  },
  created() {

  }
}
</script>
