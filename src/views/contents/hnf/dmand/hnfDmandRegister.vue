<template>
  <div id="resister-post">
    <Header title="게시글 등록"/>
    <Tab :confirm-type="confirmType" @toRegister="toRegister"/>
    <!-- 05택배배송_01등록_03 / 05택배배송_06수정-->
    <template v-if="!isRegisteredFavorJob">
      <section class="register-alert">
        <img src="@/assets/image/icons/man.png">
        <p class="notice">
          공간공유 게시글 보기는<br><span>관심업무를 등록</span>하여야 이용이 가능합니다.
        </p>
        <div class="register-button">관심업무 등록</div>
      </section>
    </template>

    <!-- 05택배배송_01등록 , 05택배배송_06수정 -->
    <template v-else>
      <!-- 업무조건 -->
      <section class="section">
        <div class="title"><p>업무조건</p></div>
        <div class="contents-wraper">
          <!-- 기본정보 -->
          <dl class="inner-content">
            <div class="content-sub-title"><p>기본정보</p><div class="guide" @click="modalOn = true">게시글 제목</div></div>
            <div :class="readOnly ? 'input-wraper readonly' : 'input-wraper'"><input v-model="hnfDmandInfo.sj" type="text" placeholder="게시글 제목 (예: 단기3일/중구/배송원모집)" :readonly="readOnly"></div>
            <DatePicker v-model="hnfDmandInfo.jobBeginDe" input-class="mx-input" type="date" value-type="format" format="YYYY-MM-DD" placeholder="업무일 선택" :disabled="readOnly"/>
            <dt class="wraper-two-div">
              <div :class="readOnly ? 'input-wraper readonly' : 'input-wraper'"><input v-model="hnfDmandInfo.thingVolm" type="text" placeholder="최대예상물량" :readonly="readOnly"></div><p class="each-text-of-two">개</p>
              <div :class="readOnly ? 'input-wraper readonly' : 'input-wraper'"><input v-model="hnfDmandInfo.thingUntpc" type="text" placeholder="개당단가" :readonly="readOnly"></div><p class="each-text-of-two">원</p>
            </dt>

          </dl>
          <!-- 수령장소 -->
          <dl class="inner-content">
            <h3 class="content-sub-title">수령장소</h3>
            <div :class="readOnly ? 'input-wraper readonly' : 'input-wraper'"><input v-model="hnfDmandInfo.jobSiteNm" type="text" placeholder="장소명 입력" :readonly="readOnly"></div>
            <div :class="readOnly ? 'input-wraper two-wraper readonly' : 'input-wraper two-wraper'">
              <input id="jobSiteAddr" v-model="hnfDmandInfo.jobSiteAddr" type="text" placeholder="기본 주소" :readonly="readOnly">
              <input type="button" class="search" value="찾기" @click="postcode">
            </div>
            <div :class="readOnly ? 'input-wraper readonly' : 'input-wraper'"><input id="jobSiteAddrDtl" v-model="hnfDmandInfo.jobSiteAddrDtl" type="text" placeholder="상세 주소" :readonly="readOnly"></div>
            <div :class="readOnly ? 'input-wraper readonly' : 'input-wraper'"><input v-model="hnfDmandInfo.contactTel" type="text" placeholder="휴대폰 번호" :readonly="readOnly"></div>
          </dl>

          <el-input id="jobSiteZip" v-model="hnfDmandInfo.jobSiteZip" type="hidden"/>
          <el-input id="cidoCd" v-model="hnfDmandInfo.cidoCd" type="hidden"/>
          <el-input id="cigunguCd" v-model="hnfDmandInfo.cigunguCd" type="hidden"/>

          <!-- 추가내용(선택) -->
          <dl class="inner-content">
            <h3 class="content-sub-title">추가내용(선택)</h3>
            <dt class="textarea-wraper"><textarea v-model="hnfDmandInfo.cn" type="text" placeholder="상세내용 입력"/></dt>
            <dt class="input-wraper file-button">
              <div><input id="fileUpload" ref="file" type="file" multiple="multiple" @change="fileSelect()"></div>
            </dt>
          </dl>
        </div>
      </section>
      <!-- 모집조건 -->
      <section class="section">
        <div class="title"><p>모집조건</p></div>
        <div class="contents-wraper">
          <dl class="inner-content">
            <Toggle/>
            <dt class="wraper-two-div-02">
              <DatePicker v-model="hnfDmandInfo.aplyClosDe" input-class="mx-input define-width" type="date" placeholder="신청 마감날짜" format="YYYY-MM-DD"/>
              <div class="input-wraper"><el-time-select
                v-model="calaplyClosTime"
                :picker-options="{start: '00:00', step: '01:00', end: '24:00'}"/>
              </div>
            </dt>
            <p class="reject-notice">계약거절은 계약완료 시간으로부터</p>
            <dt class="wraper-two-div-02">
              <el-time-select
                v-model="calDcsnClosHh"
                :picker-options="{start: '00:00', step: '00:30', end: '24:00'}"/>
              <p>분 이내</p>
            </dt>
          </dl>
        </div>
      </section>
      <SelectBox :open="open" :header="header" @select="onClickOptionBtn"/>
      <BottomButton one-button="등록" :is-valid="true" @handleAdd="handleAdd"/>
      <section v-if="modalOn" class="modal">
        <img class="xButton" src="@/assets/image/icons/x.png" @click="modalOn = false">
        <img class="explainImg" src="@/assets/image/icons/no-image.png">
        <p>
          게시글 제목은 구체적이고<br>명확한 내용으로 간단하게 작성해주세요.
        </p>
        <dl>
          <div>예시)</div>
          <ul>
            <li>단기3일/중구/배송원모집</li>
            <li>서울중앙우체국/5시간/소포분류</li>
            <li>삼성동/주간/택배수집/당일지급</li>
            <li>동대문구/택배수집/주5일/1달</li>
          </ul>
        </dl>
      </section>
    </template>
  </div>
</template>

<script>
import Header from '@/components/Header/Index'
import Tab from '@/components/Tab/Index'
import BottomButton from '@/components/BottomButton/Index'
import SelectBox from '@/components/SelectBox/Index'
import DatePicker from 'vue2-datepicker'
import Toggle from '@/components/Toggle/Index'
import 'vue2-datepicker/index.css'
import waves from '@/directive/waves'
// , selectCodeDtlOne
import { insertHnfDmandRegister, selectMobileNum, hnfFileUpload, isEmpty } from '@/api/hnfDmand'
import { selectCodeList } from '@/api/com'
import { fileUpload } from '@/api/fileupload'

export default {
  name: 'HnfDmandRegisterManagement',
  directives: { waves },
  components: {
    Header, Tab, BottomButton, DatePicker, SelectBox, Toggle
  },
  data() {
    return {
      readOnly: false,
      modalOn: false,
      isRegisteredFavorJob: true,

      // 여기부터
      listLoading: false,
      confirmLoading: false,
      confirmType: 'register',
      hnfDmandInfo: {
        st: 'OK',
        hnfDmandId: '',
        sj: '',
        jobTypeCd: '0001',
        suplyType: '0001',
        jobSiteZip: '',
        jobBeginDe: '',
        jobBeginTime: '',
        jobEndDe: '',
        jobEndTime: '',
        jobSiteNm: '',
        jobSiteAddr: '',
        jobSiteAddrDtl: '',
        contactTel: '',
        aplyClosDe: '',
        aplyClosTime: '',
        aplyMaxNum: '',
        thingVolm: '',
        thingUntpc: '',
        pyMHr: '',
        dcsnClosHh: '',
        dcsnClosMi: '',
        atchFileId: null,
        cn: '',
        registerId: this.$store.getters.mberId,
        updtId: this.$store.getters.mberId
      },
      upload: {
        file: []
      },
      sendUpload: {
        fileStreCours: [],
        orignlFileNm: [],
        fileSize: []
      },
      rules: {
        sj: [{ required: true, message: this.$t('message.valid_required'), trigger: 'blur' }],
        jobBeginDe: [{ required: true, message: this.$t('message.valid_required'), trigger: 'blur' }],
        caljobBeginTime: [{ required: true, message: this.$t('message.valid_required'), trigger: 'blur' }],
        caljobEndTime: [{ required: true, message: this.$t('message.valid_required'), trigger: 'blur' }],
        aplyClosDe: [{ required: true, message: this.$t('message.valid_required'), trigger: 'blur' }],
        calDcsnClosHh: [{ required: true, message: this.$t('message.valid_required'), trigger: 'blur' }]
      },
      jobTypeStatus: [],
      suplyAllValue: '',
      suplyBuizValue: '',
      suplyNonBuizValue: '',
      caljobBeginTime: '',
      caljobEndTime: '',
      calaplyClosTime: '',
      calDcsnClosHh: '',
      validFlag: '',
      tempCidoCd: '',
      tempCigunguCd: '',
      changeFlag: false,
      codeRequest: {
        codeId: '',
        codeDtl: '',
        dtlNm: ''
      }
    }
  },
  created() {
    const recaptchaScript = document.createElement('script')
    recaptchaScript.setAttribute('src', 'https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js')
    document.head.appendChild(recaptchaScript)

    this.editCheck()
  },
  methods: {
    toRegister(arg1) {
      this.hnfDmandInfo.jobTypeCd = arg1 ? `000${arg1}` : '0001'
      console.log('register jobTypeCd:: ' + this.hnfDmandInfo.jobTypeCd)
    },
    onClickOptionBtn(option) {
      this.open.forEach(i => {
        this.open.push(false)
      })
      if (option !== '') {
        this.selectedFacility = option
      }
    },
    onClickOpenSelectBox() {
      const tempArr = [false, false, false]
      tempArr.splice(0, 1, true)
      this.open = tempArr
    },
    // 데이터 초기화
    resetData() {
      // eslint-disable-next-line no-sequences
      this.hnfDmandInfo.hnfDmandId = '',
      this.hnfDmandInfo.sj = '',
      this.hnfDmandInfo.jobTypeCd = '',
      this.hnfDmandInfo.suplyType = '0001',
      this.hnfDmandInfo.jobSiteZip = '',
      this.hnfDmandInfo.jobBeginDe = '',
      this.hnfDmandInfo.jobBeginTime = '',
      this.hnfDmandInfo.jobEndDe = '',
      this.hnfDmandInfo.jobEndTime = '',
      this.hnfDmandInfo.jobSiteNm = '',
      this.hnfDmandInfo.jobSiteAddr = '',
      this.hnfDmandInfo.jobSiteAddrDtl = '',
      this.hnfDmandInfo.contactTel = '',
      this.hnfDmandInfo.aplyClosDe = '',
      this.hnfDmandInfo.aplyClosTime = '',
      this.hnfDmandInfo.aplyMaxNum = '',
      this.hnfDmandInfo.thingVolm = '',
      this.hnfDmandInfo.thingUntpc = '',
      this.hnfDmandInfo.pyMHr = '',
      this.hnfDmandInfo.dcsnClosHh = '',
      this.hnfDmandInfo.dcsnClosMi = '',
      this.hnfDmandInfo.atchFileId = null,
      this.caljobBeginTime = '',
      this.caljobEndTime = '',
      this.calaplyClosTime = '',
      this.calDcsnClosHh = '',
      this.hnfDmandInfo.cn = '',
      this.hnfDmandInfo.cidoCd = '',
      this.hnfDmandInfo.cigunguCd = '',
      this.upload.file = null,
      this.sendUpload.fileStreCours = [],
      this.sendUpload.orignlFileNm = [],
      this.sendUpload.fileSize = [],
      this.changeFlag = false
      document.getElementById('jobSiteZip').value = ''
      document.getElementById('jobSiteAddr').value = ''

      this.hnfDmandInfo.registerId = this.$store.getters.mberId
      this.hnfDmandInfo.updtId = this.$store.getters.mberId
    },
    // edit 체크
    async editCheck() {
      this.hnfDmandInfo.contactTel = (await selectMobileNum(this.hnfDmandInfo.updtId)).stringValue

      // PF1001(택배배송:0001, 소포분류:0002, 택배픽업:0003)
      this.jobTypeStatus = (await selectCodeList('HNF_JOB_TYPE_CD')).list
      this.hnfDmandInfo.jobTypeCd = this.jobTypeStatus[0].codeDtl

      // PF1011(전체:0001, 사업자:0002, 비사업자:0003)
      this.suplyTypeStatus = (await selectCodeList('HNF_SUPLY_TYPE')).list

      this.suplyAllValue = this.suplyTypeStatus[0].codeDtl
      this.suplyBuizValue = this.suplyTypeStatus[1].codeDtl
      this.suplyNonBuizValue = this.suplyTypeStatus[2].codeDtl

      setTimeout(() => {
        this.listLoading = false
      }, 300)
    },
    fileSelect() {
      this.changeFlag = true
      this.upload.file = []
      for (let i = 0; i < this.$refs.file.files.length; i++) {
        this.upload.file.push(this.$refs.file.files[i])
      }
    },
    // 등록
    async handleAdd() {
      console.log('jobBeginDe1111::' + this.hnfDmandInfo.jobBeginDe)
      this.insertCalendarValue()
      console.log('insertAfter')
      // 임시 validation
      this.validFlag = this.handleValidation()
      if (!this.validFlag) {
        return
      }
      console.log('validAfter')
      // 라우터로 보내는 사업자 이름
      /*
      this.codeRequest.codeId = 'HNF_SUPLY_TYPE'
      this.codeRequest.codeDtl = this.hnfDmandInfo.suplyType
      console.log('this.codeRequest::' + JSON.stringify(this.codeRequest))
      const suplyTypeName = (await selectCodeDtlOne(this.codeRequest)).dtlNm
      */
      this.confirmLoading = true
      this.$confirm(this.$t('message.addConfirm'), {
        confirmButtonText: this.$t('btn.confirm'),
        cancelButtonText: this.$t('btn.cancel'),
        type: 'warning'
      }).then(() => {
        // 파일 업로드
        this.hnfUpload().then(response => {
          insertHnfDmandRegister(this.hnfDmandInfo).then(response => {
            this.confirmLoading = false
            this.$message.success(this.$t('message.success'))
            // this.$router.push({ name: 'hnfDmandAfterPopManagement', params: { sj: this.hnfDmandInfo.sj, jobBeginDe: this.hnfDmandInfo.jobBeginDe, thingVolm: this.hnfDmandInfo.thingVolm, thingUntpc: this.hnfDmandInfo.thingUntpc, pyMHr: this.hnfDmandInfo.pyMHr, suplyType: suplyTypeName }})
          }).catch(() => {
            this.confirmLoading = false
          })
        }).catch(() => {
          this.confirmLoading = false
        })
      }).catch(() => {
        this.confirmLoading = false
      })
    },
    async hnfUpload() {
      console.log('fileupload')
      if (this.changeFlag && this.upload.file[0] !== '') {
        const formData = new FormData()
        for (let i = 0; i < this.upload.file.length; i++) {
          formData.append('img', this.upload.file[i])
        }

        const uploadResponse = (await fileUpload(formData)).result
        for (let i = 0; i < uploadResponse.length; i++) {
          this.sendUpload.fileStreCours.push(uploadResponse[i].fileUrl)
          this.sendUpload.orignlFileNm.push(uploadResponse[i].originalFileName)
          this.sendUpload.fileSize.push(uploadResponse[i].fileSize)
        }

        const response = await hnfFileUpload(this.sendUpload)
        this.hnfDmandInfo.atchFileId = response.uploadId
        console.log('atchFileId::::' + this.hnfDmandInfo.atchFileId)
      }
    },
    insertCalendarValue() {
      /*
      if (this.caljobEndTime < this.caljobBeginTime) {
        this.hnfDmandInfo.jobEndDe = this.$moment(this.hnfDmandInfo.jobBeginDe).add(1, 'd').format('YYYYMMDD')
      } else {
        this.hnfDmandInfo.jobEndDe = this.hnfDmandInfo.jobBeginDe
      }
      this.hnfDmandInfo.jobBeginTime = ((this.caljobBeginTime).replace(':', '')).trim()
      this.hnfDmandInfo.jobEndTime = ((this.caljobEndTime).replace(':', '')).trim()
      */
      this.hnfDmandInfo.jobBeginDe = this.$moment(this.hnfDmandInfo.jobBeginDe).format('YYYYMMDD')
      this.hnfDmandInfo.jobEndDe = this.hnfDmandInfo.jobBeginDe
      this.hnfDmandInfo.aplyClosDe = this.$moment(this.hnfDmandInfo.aplyClosDe).format('YYYYMMDD')

      this.hnfDmandInfo.aplyClosTime = ((this.calaplyClosTime).replace(':', '')).trim()
      this.hnfDmandInfo.dcsnClosHh = this.calDcsnClosHh.substring(0, this.calDcsnClosHh.indexOf(':'))
      this.hnfDmandInfo.dcsnClosMi = this.calDcsnClosHh.substring(this.calDcsnClosHh.indexOf(':') + 1, this.calDcsnClosHh.length)

      // 주소 값 입력
      this.hnfDmandInfo.jobSiteZip = document.getElementById('jobSiteZip').value
      this.hnfDmandInfo.jobSiteAddr = document.getElementById('jobSiteAddr').value

      this.hnfDmandInfo.cidoCd = document.getElementById('cidoCd').value
      this.hnfDmandInfo.cigunguCd = document.getElementById('cigunguCd').value
    },
    handleValidation() {
      this.validFlag = true
      this.errors = []

      if (isEmpty(this.hnfDmandInfo.sj)) {
        alert('제목입력')
        this.validFlag = false
        return
      }

      if (isEmpty(this.hnfDmandInfo.jobBeginDe)) {
        alert('시작날짜선택')
        this.validFlag = false
        return
      }
      /*
      if (isEmpty(this.caljobBeginTime)) {
        alert('시작시간선택')
        this.validFlag = false
        return
      }
      if (isEmpty(this.caljobEndTime)) {
        alert('종료시간선택')
        this.validFlag = false
        return
      }
*/
      if (this.hnfDmandInfo.jobTypeCd === '0001' || this.hnfDmandInfo.jobTypeCd === '0003') {
        if (isEmpty(this.hnfDmandInfo.thingVolm)) {
          alert('최대예상 물량 선택')
          this.validFlag = false
          return
        }
      }
      if (this.hnfDmandInfo.jobTypeCd === '0002') {
        if (isEmpty(this.hnfDmandInfo.pyMHr)) {
          alert('개당 단가 선택')
          this.validFlag = false
          return
        }
      }

      if (isEmpty(this.hnfDmandInfo.aplyClosDe)) {
        alert('신청마감일자선택')
        this.validFlag = false
        return
      }

      if (isEmpty(this.calDcsnClosHh)) {
        alert('확정마감시간선택')
        this.validFlag = false
        return
      }
      /*
      if (!isEmpty(this.hnfDmandInfo.jobBeginDe) && (this.hnfDmandInfo.jobEndDe > this.hnfDmandInfo.aplyClosDe)) {
        alert('신청 마감일시가 업무종료일시보다 빠를수 없습니다.')
        this.validFlag = false
        return
      }
*/
      return this.validFlag
    },
    postcode() {
      // eslint-disable-next-line
      new daum.Postcode({
        oncomplete: function(data) {
          // 팝업에서 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분.

          // 각 주소의 노출 규칙에 따라 주소를 조합한다.
          // 내려오는 변수가 값이 없는 경우엔 공백('')값을 가지므로, 이를 참고하여 분기 한다.
          var addr = '' // 주소 변수

          // 사용자가 선택한 주소 타입에 따라 해당 주소 값을 가져온다.
          if (data.userSelectedType === 'R') { // 사용자가 도로명 주소를 선택했을 경우
            addr = data.roadAddress
          } else { // 사용자가 지번 주소를 선택했을 경우(J)
            addr = data.jibunAddress
          }

          // 우편번호와 주소 정보를 해당 필드에 넣는다.
          document.getElementById('jobSiteZip').value = data.zonecode
          document.getElementById('jobSiteAddr').value = addr

          document.getElementById('cidoCd').value = (data.sigunguCode).substring(0, 2)
          document.getElementById('cigunguCd').value = (data.sigunguCode).substring(2, (data.sigunguCode).length)

          // 커서를 상세주소 필드로 이동한다.
          document.getElementById('jobSiteAddrDtl').focus()
        }
      }).open()
    }
  }
}
</script>
