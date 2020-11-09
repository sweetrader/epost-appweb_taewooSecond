<template>
  <div id="resister-post">
    <Header title="게시글 등록"/>
    <Tab/>
    <section class="section">
      <div class="title"><p>기본정보</p><p class="button">공간정보 불러오기</p></div>
      <div class="contents-wraper">
        <dl class="inner-content">
          <div class="input-wraper"><input v-model="rent.spcRsrcNm" type="text" placeholder="공간명 입력"></div>
          <div class="input-wraper two-wraper">
            <input v-model="rent.addr" type="text" placeholder="기본 주소">
            <div class="search">찾기</div>
          </div>
          <div class="input-wraper"><input v-model="rent.addrDtl" type="text" placeholder="상세 주소"></div>
        </dl>
        <dl class="inner-content">
          <dt class="input-wraper">
            <select v-model="rent.useCl">
              <option :value="null" disabled>업무시설 선택</option>
              <option v-for="item in useClOptions" :key="item.codeDtl">{{ item.dtlNm }}</option>
            </select>
          </dt>
          <dt class="wraper-two-div">
            <div class="input-wraper"><input v-model="rent.area" type="text" placeholder="전용면적"></div><p class="each-text-of-two">㎡ 또는</p>
            <div class="input-wraper"><input v-model="rent.areaPyeong" type="text" placeholder="전용면적"></div><p class="each-text-of-two">평</p>
          </dt>
          <dt class="input-wraper">
            <select v-model="rent.sepratSpcCnt">
              <option :value="null" disabled>분리공간 개수 선택</option>
              <option v-for="item in sepratSpcOptions" :key="item.codeDtl">{{ item.dtlNm }}</option>
            </select>
          </dt>
        </dl>
        <dl class="inner-content">
          <dt class="wraper-two-div">
            <div class="input-wraper"><input v-model="rent.crrspndFloor" type="text" placeholder="해당층"></div><p class="each-text-of-two">층/</p>
            <div class="input-wraper"><input v-model="rent.allFloor" type="text" placeholder="전체층"></div><p class="each-text-of-two">층</p>
          </dt>
          <dt class="input-wraper">
            <select v-model="rent.drc">
              <option :value="null" disabled>방향 선택</option>
              <option v-for="item in drcOptions" :key="item.codeDtl">{{ item.dtlNm }}</option>
            </select>
          </dt>
          <dt class="wraper-two-div">
            <div class="input-wraper"><input v-model="rent.parkingPosblCnt" type="text" placeholder="주차가능대수"></div><p class="each-text-of-two">대/</p>
            <div class="input-wraper"><input v-model="rent.parkingAllCnt" type="text" placeholder="주차수"></div><p class="each-text-of-two">대</p>
          </dt>
        </dl>
        <dl class="inner-content">
          <DatePicker v-model="rent.comptConfmDe" input-class="mx-input" type="date" placeholder="준공인가일" format="YYYY-MM-DD"/>
          <dt class="input-wraper">
            <select v-model="rent.bildPrpos">
              <option :value="null" disabled>건축물 용도 선택</option>
              <option v-for="item in bildPrposOptions" :key="item.codeDtl">{{ item.dtlNm }}</option>
            </select>
          </dt>
          <dt class="textarea-wraper"><textarea v-model="rent.note" type="text" placeholder="비공개 비고 입력(선택)"/></dt>
          <p class="check-available-party">- 공급자만 확인 가능합니다.</p>
        </dl>

      </div>

    </section>
    <section class="section">
      <div class="title"><p>추가정보(선택)</p></div>
      <div class="contents-wraper">
        <dl class="inner-content">
          <dt class="input-wraper">
            <select v-model="rent.elevtCnt">
              <option :value="null" disabled>엘리베이터 대수 선택</option>
              <option v-for="item in elevtCntOptions" :key="item.codeDtl">{{ item.dtlNm }}</option>
            </select>
          </dt>
          <dt class="input-wraper">
            <select v-model="rent.heatType">
              <option :value="null" disabled>난방종류 선택</option>
              <option v-for="item in heatTypeOptions" :key="item.codeDtl">{{ item.dtlNm }}</option>
            </select>
          </dt>
        </dl>
        <div class="inner-content">
          <div class="two-checkbox-wraper">
            <dl>
              <p>상하차 여부</p>
              <div class="checkbox-inner">
                <div :class="rent.hhlwYn === 'Y' ? 'on' : ''" @click="rent.hhlwYn = 'Y'">가능</div>
                <div :class="rent.hhlwYn === 'N' ? 'on' : ''" @click="rent.hhlwYn = 'N'">불가능</div>
              </div>
            </dl>
            <dl>
              <p>택배 바로 접수</p>
              <div class="checkbox-inner">
                <div :class="rent.dlvryYn === 'Y' ? 'on' : ''" @click="rent.dlvryYn = 'Y'">가능</div>
                <div :class="rent.dlvryYn === 'N' ? 'on' : ''" @click="rent.dlvryYn = 'N'">불가능</div>
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
          <dt class="input-wraper"><input v-model="rent.sj" type="text" placeholder="게시글 제목 입력(예: 명동역3번출구1분거리/신축)"></dt>
          <dt class="two-button-wrap">
            <div :class="rent.rentType === '1' ? 'each-button on border-radius-left' :'each-button right'" @click="rent.rentType = '1'">
              <img v-if="rent.rentType === '1'" src="@/assets/image/space/icons/path-red.png">월세
            </div>
            <div :class="rent.rentType === '2' ? 'each-button on border-radius-right' :'each-button left'" @click="rent.rentType = '2'">
              <img v-if="rent.rentType === '2'" src="@/assets/image/space/icons/path-red.png">전세
            </div>
          </dt>
          <dt class="wraper-two-div">
            <div class="input-wraper"><input v-model="rent.dpst" type="text" placeholder="보증금 입력"></div><p class="each-text-of-two">원/</p>
            <div class="input-wraper"><input v-model="rent.mtyRent" type="text" placeholder="월세 입력"></div><p class="each-text-of-two">원</p>
          </dt>
          <dt class="wraper-two-div"> <div class="input-wraper"><input v-model="rent.manageAmt" type="text" placeholder="관리비 입력"></div><p class="each-text-of-two">원</p></dt>
        </dl>
        <dl class="inner-content">
          <dt class="content-title"><p>임대기간</p></dt>
          <dt class="wraper-two-div">
            <DatePicker v-model="rent.rentBgnDe" input-class="mx-input" type="date" placeholder="임대기간 입력" format="YYYY-MM-DD"/>
            <p class="each-text-of-two">~</p>
            <DatePicker v-model="rent.rentEndDe" input-class="mx-input" type="date" placeholder="임대기간 입력" format="YYYY-MM-DD"/>

          </dt>
          <dt class="wraper-two-div">
            <div class="define-width">
              <DatePicker v-model="rent.mvPosblBgnDe" input-class="mx-input" type="date" placeholder="임대기간 입력" format="YYYY-MM-DD"/>
            </div>
            <p class="each-text-of-two">이후</p>
            <div :class="rent.immediatelyYn ? 'checkbox on' : 'checkbox'" @click="rent.immediatelyYn = !rent.immediatelyYn"><p>즉시 입주 가능</p></div>
          </dt>
        </dl>
        <dl class="inner-content">
          <dt class="content-title"><p>사진등록(선택)</p></dt>
          <dt class="input-wraper upload-picture">
            <div>
              <input ref="file" type="file" multiple="multiple" accept="image/gif, image/jpeg, image/png, image/jpg" @change="fileSelect()">
              <img src="@/assets/image/space/icons/image.png" alt="">
              <p>사진첨부<span> {{ upload.file.length }}</span></p>
            </div>
          </dt>
          <ul class="notice">
            <li>사진 최소 5장 최대 15장 까지 등록할 수 있습니다.</li>
            <li>직접 찍은 실제 사진의 원본을 등록해야 합니다.</li>
            <li>워터마크, 날짜, 전화번호 등이 포함된 사진이나 관련 없는 사진을 등록할 경우 글 게시가 종료될 수 있습니다.</li>
          </ul>
          <!--<dt class="photo-list-area">
            <div v-for="photo in photoList" :key="photo.index" class="each-photo"><p>{{ photo.name }}</p>
              <div><img src="@/assets/image/space/icons/x.png"></div>
            </div>
          </dt>-->
          <dl class="inner-content"><dt class="textarea-wraper"><textarea v-model="rent.dscrp" type="text" placeholder="상세설명 입력(선택)"/></dt>
          </dl>

        </dl>
      </div>
    </section>
    <section class="section">
      <div class="title"><p>공급자정보</p></div>
      <div class="contents-wraper">
        <dl class="inner-content">
          <dt class="input-wraper">
            <input v-model="rent.suplerNm" type="text" placeholder="이름">
          </dt>
          <dt class="input-wraper">
            <input v-model="rent.suplerTelno" type="text" placeholder="연락처">
          </dt>
        </dl>
      </div>
    </section>
    <BottomButton one-button="등록" :is-valid="true" @click="rent"/>
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
import { selectCodeList } from '@/api/com'
import { insertRent } from '@/api/spcRent'
import { fileUpload } from '@/api/fileupload'

export default {
  components: {
    Header, Tab, BottomButton, DatePicker
  },
  data() {
    return {
      modalOn: false,
      upload: {
        file: []
      },
      rent: {
        rentRsrcId: '',
        spcRsrcId: '',
        mberId: '',
        fileId: '',
        spcRsrcNm: '',
        addr: '',
        addrDtl: '',
        useCl: null,
        useClNm: '',
        area: 0,
        areaPyeong: 0,
        sepratSpcCnt: null,
        allFloor: 0,
        crrspndFloor: 0,
        drc: null,
        parkingAllCnt: 0,
        parkingPosblCnt: 0,
        comptConfmDe: '',
        bildPrpos: null,
        note: '',
        elevtCnt: null,
        heatType: null,
        hhlwYn: 'N',
        dlvryYn: 'N',
        sj: '',
        rentType: '1',
        rentTypeNm: '',
        dpst: 0,
        mtyRent: 0,
        manageAmt: 0,
        rentBgnDe: '',
        rentEndDe: '',
        mvPosblBgnDe: '',
        immediatelyYn: false,
        dscrp: '',
        suplerNm: '',
        suplerTelno: '',
        rentState: '',
        fileStreCours: [],
        originalFileName: [],
        fileSize: []
      },
      useClOptions: [],
      sepratSpcOptions: [],
      drcOptions: [],
      bildPrposOptions: [],
      elevtCntOptions: [],
      heatTypeOptions: []
    }
  },
  created() {
    this.editCheck()
  },
  methods: {
    async editCheck() {
      this.useClOptions = (await selectCodeList('USE_CL')).list
      this.sepratSpcOptions = (await selectCodeList('SEPRAT_SPC')).list
      this.drcOptions = (await selectCodeList('DRC_CD')).list
      this.bildPrposOptions = (await selectCodeList('BILD_PRPOS')).list
      this.elevtCntOptions = (await selectCodeList('ELEVT_CNT')).list
      this.heatTypeOptions = (await selectCodeList('HEAT_TYPE')).list
    },
    fileSelect() {
      if (this.$refs.file.files.length < 5) {
        alert('사진은 최소 5장 이상 등록하여야 합니다.')
        return
      }
      if (this.$refs.file.files.length > 15) {
        alert('사진은 최소 15장 미만으로 등록하여야 합니다.')
        return
      }
      this.upload.file = []
      for (let i = 0; i < this.$refs.file.files.length; i++) {
        this.upload.file.push(this.$refs.file.files[i])
      }
    },
    handleAdd() {
      const formData = new FormData()
      if (this.upload.file.length < 5) {
        alert('사진은 최소 5장 이상 등록하여야 합니다.')
        return
      }
      if (this.upload.file.length > 15) {
        alert('사진은 최소 15장 미만으로 등록하여야 합니다.')
        return
      }
      for (let i = 0; i < this.upload.file.length; i++) {
        formData.append('img', this.upload.file[i])
      }
      fileUpload(formData).then(response => {
        for (let i = 0; i < response.result.length; i++) {
          this.rent.fileStreCours.push(response.result[i].fileUrl)
          this.rent.originalFileName.push(response.result[i].originalFileName)
          this.rent.fileSize.push(response.result[i].fileSize)
        }
        insertRent(this.rent).then(response => {
          this.$router.push({ name: 'RentList' })
        }).catch(() => {

        })
      }).catch(() => {

      })
    }
  }
}
</script>
