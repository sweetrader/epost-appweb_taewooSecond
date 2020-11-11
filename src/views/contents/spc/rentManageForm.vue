<template>
  <div id="resister-post">
    <Header v-if="rentRsrcId === ''" title="게시글 등록"/>
    <Header v-else title="게시글 수정"/>
    <Tab/>
    <section class="section">
      <div class="title"><p>기본정보</p><p v-if="false" class="button">공간정보 불러오기</p></div>
      <div class="contents-wraper">
        <dl class="inner-content">
          <dt class="content-title"><p>공간위치</p></dt>
          <div v-if="true" :class="!readOnly ? 'input-wraper readonly' : 'input-wraper'"><input v-model="rent.spcRsrcNm" type="text" placeholder="공간명 입력" :readonly="!readOnly"></div>
          <div :class="!readOnly ? 'input-wraper two-wraper readonly' : 'input-wraper two-wraper'">
            <input v-model="rent.addr" type="text" placeholder="기본 주소" :readonly="!readOnly">
            <div class="search">찾기</div>
          </div>
          <div :class="!readOnly ? 'input-wraper readonly' : 'input-wraper'"><input v-model="rent.addrDtl" type="text" placeholder="상세주소" :readonly="!readOnly"></div>
        </dl>
        <dl class="inner-content">
          <dt class="content-title"><p>업무시설/면적</p></dt>
          <dt :class="!readOnly ? 'input-wraper readonly' : 'input-wraper'" @click="onClickOpenSelectBox">
            <select v-model="rent.useCl" :disabled="!readOnly">
              <option selected>업무시설 선택</option>
              <option v-for="item in useClOptions" :key="item.codeDtl" :value="item.codeDtl">{{ item.dtlNm }}</option>
            </select>
          </dt>
          <dt class="wraper-two-div">
            <div :class="!readOnly ? 'input-wraper readonly' : 'input-wraper'"><input v-model="rent.area" type="text" placeholder="전용면적" :readonly="!readOnly"></div><p class="each-text-of-two">m2 또는</p>
            <div :class="!readOnly ? 'input-wraper readonly' : 'input-wraper'"><input v-model="rent.areaPyeong" type="text" placeholder="전용면적" :readonly="!readOnly"></div><p class="each-text-of-two">평</p>
          </dt>
          <dt :class="!readOnly ? 'input-wraper readonly' : 'input-wraper'" @click="selectedSpaceEachAmount">
            <select v-model="rent.sepratSpcCnt" :disabled="!readOnly">
              <option :value="null" disabled>분리공간 개수 선택</option>
              <option v-for="item in sepratSpcOptions" :key="item.codeDtl" :value="item.codeDtl">{{ item.dtlNm }}</option>
            </select>
          </dt>
        </dl>
        <dl class="inner-content">
          <dt class="content-title"><p>해당층/주차</p></dt>
          <dt class="wraper-two-div">
            <div :class="!readOnly ? 'input-wraper readonly' : 'input-wraper'"><input v-model="rent.crrspndFloor" type="text" placeholder="해당층" :readonly="!readOnly"></div><p class="each-text-of-two">층/</p>
            <div :class="!readOnly ? 'input-wraper readonly' : 'input-wraper'"><input v-model="rent.allFloor" type="text" placeholder="전체층" :readonly="!readOnly"></div><p class="each-text-of-two">층</p>
          </dt>
          <dt :class="!readOnly ? 'input-wraper readonly' : 'input-wraper'">
            <select v-model="rent.drc" :disabled="!readOnly">
              <option :value="null" disabled>방향 선택</option>
              <option v-for="item in drcOptions" :key="item.codeDtl" :value="item.codeDtl">{{ item.dtlNm }}</option>
            </select>
          </dt>
          <dt class="wraper-two-div">
            <div :class="!readOnly ? 'input-wraper readonly' : 'input-wraper'"><input v-model="rent.parkingPosblCnt" type="text" placeholder="주차가능대수" :readonly="!readOnly"></div><p class="each-text-of-two">대/</p>
            <div :class="!readOnly ? 'input-wraper readonly' : 'input-wraper'"><input v-model="rent.parkingAllCnt" type="text" placeholder="주차수" :readonly="!readOnly"></div><p class="each-text-of-two">대</p>
          </dt>
        </dl>
        <dl class="inner-content">
          <dt class="content-title"><p>준공인가일/용도</p></dt>
          <DatePicker v-model="rent.comptConfmDe" input-class="mx-input" type="date" value-type="format" placeholder="준공인가일" format="YYYY-MM-DD" :disabled="!readOnly"/>
          <dt :class="!readOnly ? 'input-wraper readonly' : 'input-wraper'">
            <select v-model="rent.bildPrpos" :disabled="readOnly">
              <option :value="null" disabled>건축물 용도 선택</option>
              <option v-for="item in bildPrposOptions" :key="item.codeDtl" :value="item.codeDtl">{{ item.dtlNm }}</option>
            </select>
          </dt>
          <dt :class="!readOnly ? 'textarea-wraper readonly' : 'textarea-wraper'"><textarea v-model="rent.note" type="text" placeholder="비공개 비고 입력(선택)" :readonly="readOnly"/></dt>
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
              <option v-for="item in elevtCntOptions" :key="item.codeDtl" :value="item.codeDtl">{{ item.dtlNm }}</option>
            </select>
          </dt>
          <dt class="input-wraper">
            <select v-model="rent.heatType">
              <option :value="null" disabled>난방종류 선택</option>
              <option v-for="item in heatTypeOptions" :key="item.codeDtl" :value="item.codeDtl">{{ item.dtlNm }}</option>
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
          <dt class="content-title"><p>임대기본정보</p><p class="guide" @click="modalOn ? modalOn=false : modalOn=true">게시글 제목</p></dt>
          <dt class="input-wraper"><input v-model="rent.sj" type="text" placeholder="게시글 제목 입력(예: 명동역3번출구1분거리/신축)"></dt>
          <dt class="two-button-wrap">
            <div :class="rent.rentType === '2' ? 'each-button on border-radius-left' :'each-button right'" @click="rent.rentType = '2'">
              <img v-if="rent.rentType === '2'" src="@/assets/image/space/icons/path-red.png">월세
            </div>
            <div :class="rent.rentType === '1' ? 'each-button on border-radius-right' :'each-button left'" @click="rent.rentType = '1'">
              <img v-if="rent.rentType === '1'" src="@/assets/image/space/icons/path-red.png">전세
            </div>
          </dt>
          <dt class="wraper-two-div">
            <div class="input-wraper"><input v-model="rent.dpst" type="text" placeholder="보증금 입력" @keyup="inputComma"></div><p class="each-text-of-two">원/</p>
            <div class="input-wraper"><input v-model="rent.mtyRent" type="text" placeholder="월세 입력" @keyup="inputComma"></div><p class="each-text-of-two">원</p>
          </dt>
          <dt class="wraper-two-div"> <div class="input-wraper"><input v-model="rent.manageAmt" type="text" placeholder="관리비 입력" @keyup="inputComma"></div><p class="each-text-of-two">원</p></dt>
        </dl>
        <dl class="inner-content">
          <dt class="content-title"><p>임대기간</p></dt>
          <dt class="wraper-two-div">
            <DatePicker v-model="rent.rentBgnDe" input-class="mx-input" value-type="format" type="date" placeholder="임대기간 입력" format="YYYY-MM-DD"/>
            <p class="each-text-of-two">~</p>
            <DatePicker v-model="rent.rentEndDe" input-class="mx-input" value-type="format" type="date" placeholder="임대기간 입력" format="YYYY-MM-DD"/>

          </dt>
          <dt class="wraper-two-div">
            <div class="define-width">
              <DatePicker v-model="rent.mvPosblBgnDe" input-class="mx-input" value-type="format" type="date" placeholder="임대기간 입력" format="YYYY-MM-DD"/>
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
              <p>사진첨부
                <span v-if="photoList.length > 0"> {{ photoList.length }} </span>
                <span v-else> {{ upload.file.length }} </span>
              </p>
            </div>
          </dt>
          <ul class="notice">
            <li>게시글이 무통보 삭제될 수 있습니다.</li>
          </ul>
          <dt v-if="photoList.length > 0" class="photo-list-area">
            <div v-for="(item, index) in photoList" :key="index" class="each-photo"><p>{{ item }}</p>
              <!--<div><img src="@/assets/image/space/icons/x.png"></div>-->
            </div>
          </dt>
          <dt class="inner-content"/>
          <dt class="content-title"><p>상세설명(선택)</p></dt>
          <dt class="textarea-wraper">
            <textarea v-model="rent.dscrp" type="text" placeholder="서울중앙우체국 5층 사무실입니다. 안락하며 구내식당이 있습니다."/>
          </dt>
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
    <BottomButton v-if="rentRsrcId === ''" one-button="등록" :is-valid="true" @click="handleAdd"/>
    <BottomButton v-else one-button="수정" :is-valid="true" @click="handleEdit"/>
    <section v-if="modalOn" class="modal">
      <img class="xButton" src="@/assets/image/space/icons/x.png" @click="modalOn=false">
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
    <SelectBox :open="optionOpen" :header="listHeader" :option-list="useClOptions" @select="onClickOptionItem"/>
  </div>
</template>

<script>
import Header from '@/components/space/Header/Index'
import Tab from '@/components/space/Tab/Index'
import BottomButton from '@/components/space/BottomButton/Index'
import SelectBox from '@/components/space/SelectBox/Index'
import DatePicker from 'vue2-datepicker'
import 'vue2-datepicker/index.css'
import { selectCodeList } from '@/api/com'
import { insertRent, editRent, fetchRentDetail, fetchRentImgList } from '@/api/spcRent'
import { insertMch } from '@/api/spcMch'
import { fileUpload } from '@/api/fileupload'
import { addComma, getAmount } from '@/utils/space'

export default {
  name: 'RentManageForm',
  components: {
    Header, Tab, BottomButton, DatePicker, SelectBox
  },
  props: {
    rentRsrcId: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      readOnly: false,
      modalOn: false,
      listHeader: '',
      optionOpen: false,
      uploadYn: false,
      upload: {
        file: []
      },
      listQuery: {
        rentRsrcId: ''
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
      photoList: [],
      useClOptions: [],
      sepratSpcOptions: [],
      drcOptions: [],
      bildPrposOptions: [],
      elevtCntOptions: [],
      heatTypeOptions: []
    }
  },
  created() {
    this.dataCheck()
  },
  methods: {
    async dataCheck() {
      this.useClOptions = (await selectCodeList('USE_CL')).list
      this.sepratSpcOptions = (await selectCodeList('SEPRAT_SPC_CNT')).list
      this.drcOptions = (await selectCodeList('DRC')).list
      this.bildPrposOptions = (await selectCodeList('BILD_PRPOS')).list
      this.elevtCntOptions = (await selectCodeList('ELEVT_CNT')).list
      this.heatTypeOptions = (await selectCodeList('HEAT_TYPE')).list

      if (this.rentRsrcId !== '') {
        const response = await fetchRentDetail(this.rentRsrcId)
        this.preFncDiv = response.baseFncDiv
        this.rent = response
        this.rent.dpst = addComma(this.rent.dpst)
        this.rent.mtyRent = addComma(this.rent.mtyRent)
        this.rent.manageAmt = addComma(this.rent.manageAmt)
        this.rent.fileStreCours = []
        this.rent.originalFileName = []
        this.rent.fileSize = []

        this.listQuery.rentRsrcId = this.rentRsrcId
        const responseList = (await fetchRentImgList(this.listQuery)).list
        for (let i = 0; i < responseList.length; i++) {
          this.photoList.push(responseList[i].fileNm)
        }
      }
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
      this.uploadYn = true
    },
    handleAdd() {
      this.Alert({
        content: '등록 하시겠습니까?',
        leftBtn: '취소',
        rightBtn: '확인',
        leftsuccess: () => {},
        rightsuccess: () => {
          if (this.uploadYn) {
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
              if (this.rent.immediatelyYn === true) {
                this.rent.immediatelyYn = 'Y'
              } else {
                this.rent.immediatelyYn = 'N'
              }
              this.rent.dpst = this.rent.dpst.replaceAll(',', '')
              this.rent.mtyRent = this.rent.mtyRent.replaceAll(',', '')
              this.rent.manageAmt = this.rent.manageAmt.replaceAll(',', '')
              insertRent(this.rent).then(response => {
                this.Alert({
                  content: '등록 하였습니다.',
                  success: () => {
                    this.$router.push({ name: 'RentListSupler' })
                  }
                })
              }).catch(() => {
                this.Alert({
                  content: '등록을 실패하였습니다.',
                  success: () => {}
                })
              })
            }).catch(() => {
              this.Alert({
                content: '파일업로드를 실패하였습니다.',
                success: () => {}
              })
            })
          } else {
            if (this.rent.immediatelyYn === true) {
              this.rent.immediatelyYn = 'Y'
            } else {
              this.rent.immediatelyYn = 'N'
            }
            this.rent.dpst = this.rent.dpst.replaceAll(',', '')
            this.rent.mtyRent = this.rent.mtyRent.replaceAll(',', '')
            this.rent.manageAmt = this.rent.manageAmt.replaceAll(',', '')
            insertRent(this.rent).then(response => {
              this.Alert({
                content: '등록 하였습니다.',
                success: () => {
                  this.$router.push({ name: 'RentListSupler' })
                }
              })
            }).catch(() => {
              this.Alert({
                content: '등록을 실패하였습니다.',
                success: () => {}
              })
            })
          }
        }
      })
    },
    handleEdit() {
      this.Alert({
        content: '수정 하시겠습니까?',
        leftBtn: '취소',
        rightBtn: '확인',
        leftsuccess: () => {},
        rightsuccess: () => {
          if (this.uploadYn) {
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
              if (this.rent.immediatelyYn === true) {
                this.rent.immediatelyYn = 'Y'
              } else {
                this.rent.immediatelyYn = 'N'
              }
              this.rent.dpst = this.rent.dpst.replaceAll(',', '')
              this.rent.mtyRent = this.rent.mtyRent.replaceAll(',', '')
              this.rent.manageAmt = this.rent.manageAmt.replaceAll(',', '')
              editRent(this.rent).then(response => {
                this.Alert({
                  content: '수정 하였습니다.',
                  success: () => {
                    this.$router.push({ name: 'RentListSupler' })
                  }
                })
              }).catch(() => {
                this.Alert({
                  content: '수정을 실패하였습니다.',
                  success: () => {}
                })
              })
            }).catch((e) => {
              console.log(e)
              this.Alert({
                content: '파일업로드를 실패하였습니다.',
                success: () => {}
              })
            })
          } else {
            if (this.rent.immediatelyYn === true) {
              this.rent.immediatelyYn = 'Y'
            } else {
              this.rent.immediatelyYn = 'N'
            }
            this.rent.dpst = this.rent.dpst.replaceAll(',', '')
            this.rent.mtyRent = this.rent.mtyRent.replaceAll(',', '')
            this.rent.manageAmt = this.rent.manageAmt.replaceAll(',', '')
            editRent(this.rent).then(response => {
              this.Alert({
                content: '수정 하였습니다.',
                success: () => {
                  this.$router.push({ name: 'RentListSupler' })
                }
              })
            }).catch(() => {
              this.Alert({
                content: '수정을 실패하였습니다.',
                success: () => {}
              })
            })
          }
        }
      })
    },
    handleMch() {
      this.$refs['ruleForm'].validate((valid) => {
        if (valid) {
          this.confirmLoading = true
          this.$confirm(this.$t('message.rent.addMch'), {
            confirmButtonText: this.$t('btn.confirm'),
            cancelButtonText: this.$t('btn.cancel'),
            type: 'warning'
          }).then(() => {
            this.rent.rentState = '02'
            this.rent.registerId = this.$store.getters.id
            insertMch(this.rent).then(response => {
              this.confirmLoading = false
              this.$message.success(this.$t('message.success'))
              this.closeDrawer()
            }).catch(() => {
              this.confirmLoading = false
            })
          }).catch(() => {
            this.confirmLoading = false
          })
        }
      })
    },
    inputComma(e) {
      const val = e.target.value
      e.target.value = getAmount(val)
    },
    onClickOptionBtn(option) {
      this.open.forEach(i => {
        this.open.push(false)
      })
      if (option !== '') {
        this.selectedFacility = option
      }
    },
    onClickOpenSelectBox(nm) {
      /*
      const tempArr = [false, false, false]
      tempArr.splice(0, 1, true)
      this.open = tempArr
      */
      this.optionOpen = true
      this.selectNm = nm
    },
    onClickOptionItem(option) {
      this.optionOpen = false
      this.selectNm = option
    }
  }
}
</script>

