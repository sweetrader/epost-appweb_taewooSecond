<template>
  <div v-loading="dataLoading" class="has-head-container">
    <sticky :class-name="'sub-navbar'">
      <el-row type="flex" align="middle" justify="space-between">
        <p>{{ $t('title.spc.space') }}</p>
      </el-row>
    </sticky>

    <div class="app-container">

      <el-form ref="ruleForm" :rules="rules" :model="space" label-position="left" label-width="80px">

        <div style="color: red; font-weight: bold; margin-top: 10px; margin-bottom: 10px">기본정보</div>

        <!-- 제목 -->
        <el-form-item :label="$t('spc.sj')" prop="sj">
          <el-input v-model="space.sj" maxlength="50"/>
        </el-form-item>

        <div class="app-container">
          <div class="filter-container">
            <el-row class="filter-item">
              <input id="sample6_postcode" type="text" placeholder="우편번호">
              <input type="button" value="우편번호 찾기" @click="sample6_execDaumPostcode"><br>
              <input id="sample6_address" type="text" placeholder="주소"><br>
              <input id="sample6_detailAddress" type="text" placeholder="상세주소">
              <input id="sample6_extraAddress" type="text" placeholder="참고항목">
            </el-row>
          </div>
        </div>

        <!-- 주소 -->
        <el-form-item :label="$t('spc.addr')" prop="addr">
          <el-input v-model="space.addr" maxlength="50"/>
        </el-form-item>

        <!-- 주소상세 -->
        <el-form-item :label="$t('spc.addrDtl')" prop="addrDtl">
          <el-input v-model="space.addrDtl" maxlength="50"/>
        </el-form-item>

        <!-- 사용분류 -->
        <el-form-item :label="$t('spc.useCl')" prop="useCl">
          <el-radio v-for="item in useClOptions" :key="item.codeDtl" v-model="space.useCl" :label="item.codeDtl">{{ item.dtlNm }}</el-radio>
        </el-form-item>

        <!-- 면적 -->
        <el-form-item :label="$t('spc.area')" prop="area">
          <el-input v-model="space.area" maxlength="40" style="width: 40%"/> ㎡
        </el-form-item>

        <!-- 내용 -->
        <el-form-item :label="$t('spc.dscrp')" prop="dscrp">
          <el-input v-model="space.dscrp" type="textarea" maxlength="500" :rows="3"/>
        </el-form-item>

        <div style="color: red; font-weight: bold; margin-top: 10px; margin-bottom: 10px">추가정보</div>

        <!-- 주차대수 -->
        <el-form-item :label="$t('spc.parking')" prop="parkingPosblCnt">
          <el-input v-model="space.parkingPosblCnt" maxlength="40" style="width: 40%"/> / <el-input v-model="space.parkingAllCnt" maxlength="40" style="width: 40%"/>
        </el-form-item>

        <!-- 엘리베이터 -->
        <el-form-item :label="$t('spc.elevt')" prop="elevtCnt">
          <el-input v-model="space.elevtCnt" maxlength="40" style="width: 40%"/> 대
        </el-form-item>

        <div style="color: red; font-weight: bold; margin-top: 10px; margin-bottom: 10px">임대정보</div>

        <!-- 임대유형 -->
        <el-form-item :label="$t('spc.rentType')" prop="rentType">
          <el-radio v-for="item in rentTypeOptions" :key="item.codeDtl" v-model="space.rentType" :label="item.codeDtl">{{ item.dtlNm }}</el-radio>
        </el-form-item>

        <!-- 보증금 -->
        <el-form-item :label="$t('spc.dpst')" prop="dpst">
          <el-input v-model="space.dpst" maxlength="40" style="width: 40%" @keyup.native="getAmount($event.target.value)"/> 원
        </el-form-item>

        <!-- 월세 -->
        <el-form-item :label="$t('spc.mtyRent')" prop="mtyRent">
          <el-input v-model="space.mtyRent" maxlength="40" style="width: 40%"/> 원
        </el-form-item>

        <!-- 임대기간 -->
        <el-form-item :label="$t('spc.rentDe')" prop="rentBgnDe">
          <el-date-picker v-model="space.rentBgnDe" value-format="yyyy-MM-dd" style="width: 45%"/> ~ <el-date-picker v-model="space.rentEndDe" value-format="yyyy-MM-dd" style="width: 45%"/>
        </el-form-item>

        <el-row class="filter-item">
          <input ref="file" type="file" multiple="multiple" accept="image/gif, image/jpeg, image/png, image/jpg" @change="fileSelect()">
          <el-button
            v-waves
            class="filter-item"
            type="info"
            icon="el-icon-edit"
            @click="fileUpload()">
            {{ $t('btn.fileupload') }}
          </el-button>
        </el-row>

      </el-form>
    </div>

    <!-- 버튼 영역 -->
    <div class="drawer-footer">
      <el-button
        v-if="spcRsrcId === ''"
        v-waves
        :loading="confirmLoading"
        size="medium"
        type="primary"
        class="button_style"
        @click="handleAdd">
        {{ $t('btn.add') }}
      </el-button>
      <el-button
        v-else
        v-waves
        :loading="confirmLoading"
        size="medium"
        type="info"
        class="button_style"
        @click="handleEdit">
        {{ $t('btn.edit') }}
      </el-button>
    </div>

  </div>
</template>

<script>
import waves from '@/directive/waves'
import Sticky from '@/components/Sticky'
import { insertSpace, fetchSpaceDetail, editSpace } from '@/api/spcSpace'
import { selectCodeList } from '@/api/com'
import tinymce from '@/components/Tinymce/index.vue'
import { fileUpload } from '@/api/fileupload'

export default {
  name: 'SpaceMng',
  directives: { waves },
  // eslint-disable-next-line vue/no-unused-components
  components: { Sticky, tinymce },
  props: {
    // edit Seq Info
    spcRsrcId: {
      type: String,
      default: ''
    },
    // 공급자, 수요자 구분
    auth: {
      type: String,
      default: ''
    },
    // Drawer 열렸을 때 체크하는 값
    drawerOpenChecker: {
      type: Boolean,
      default: false
    },
    // Drawer 닫기 함수
    closeDrawer: {
      type: Function,
      default: null
    }
  },
  data() {
    return {
      dataLoading: false,
      confirmLoading: false,
      preFncDiv: '',
      orgList: null,
      upload: {
        file: []
      },
      space: {
        spcRsrcId: '',
        mberId: '',
        fileId: '',
        sj: '',
        addr: '',
        addrDtl: '',
        useCl: '',
        useClNm: '',
        area: 0,
        areaPyeong: 0,
        sepratSpcCnt: 0,
        allFloor: 0,
        crrspndFloor: 0,
        drc: '',
        manageAmt: 0,
        comptConfmDe: '',
        dscrp: '',
        parkingAllCnt: 0,
        parkingPosblCnt: 0,
        elevtCnt: 0,
        heatType: '',
        dlvryYn: '',
        rentType: '',
        rentTypeNm: '',
        dpst: 0,
        mtyRent: 0,
        rentBgnDe: '',
        rentEndDe: '',
        mvPosblBgnDe: '',
        immediatelyYn: '',
        fileStreCours: []
      },
      rules: {
        sj: [{ required: true, message: this.$t('message.valid_required'), trigger: 'blur' }],
        addr: [{ required: true, message: this.$t('message.valid_required'), trigger: 'blur' }]
      },
      useClOptions: null,
      rentTypeOptions: null
    }
  },
  watch: {
    drawerOpenChecker(val) {
      // 2번째 호출 시 데이터 초기화
      if (val) {
        this.$nextTick(() => {
          this.resetData()
          this.editCheck()
          this.$refs['ruleForm'].resetFields()
        })
      }
    }
  },
  created() {
    const recaptchaScript = document.createElement('script')
    recaptchaScript.setAttribute('src', 'https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js')
    document.head.appendChild(recaptchaScript)
    // 처음 호출 시 수정 데이터 체크
    // this.listLoading = true
    this.editCheck()
  },
  mounted() {

  },
  methods: {
    handleCancel() {
      this.closeDrawer()
    },
    // 데이터 초기화
    resetData() {
      this.preFncDiv = ''
      this.space.js = ''
      this.space.dscrp = ''
      this.space.addr = ''
      this.space.addrDtl = ''
      this.space.registerId = ''
      this.space.updtId = ''
    },
    // edit 체크
    async editCheck() {
      if (this.spcRsrcId !== '') {
        const response = await fetchSpaceDetail(this.spcRsrcId)

        this.preFncDiv = response.baseFncDiv

        this.space = response
      }

      this.rentTypeOptions = (await selectCodeList('RENT_TYPE')).list
      this.useClOptions = (await selectCodeList('USE_CL')).list

      setTimeout(() => {
        this.dataLoading = false
      }, 300)
    },
    // 등록 / 수정 버튼
    handleAdd() {
      this.$refs['ruleForm'].validate((valid) => {
        if (valid) {
          this.confirmLoading = true
          this.$confirm(this.$t('message.addConfirm'), {
            confirmButtonText: this.$t('btn.confirm'),
            cancelButtonText: this.$t('btn.cancel'),
            type: 'warning'
          }).then(() => {
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
              this.space.fileStreCours = response.result
              insertSpace(this.space).then(response => {
                this.confirmLoading = false
                this.$message.success(this.$t('message.success'))
                this.$router.push({ name: 'SpaceList' })
              }).catch(() => {
                this.confirmLoading = false
              })
            }).catch(() => {
              this.confirmLoading = false
            })
          }).catch(() => {
            this.confirmLoading = false
          })
        }
      })
    },
    handleEdit() {
      this.$refs['ruleForm'].validate((valid) => {
        if (valid) {
          this.confirmLoading = true
          this.$confirm(this.$t('message.editConfirm'), {
            confirmButtonText: this.$t('btn.confirm'),
            cancelButtonText: this.$t('btn.cancel'),
            type: 'warning'
          }).then(() => {
            editSpace(this.space).then(response => {
              this.confirmLoading = false
              this.$message.success(this.$t('message.success'))
              this.$router.push({ name: 'SpaceList' })
            }).catch(() => {
              this.confirmLoading = false
            })
          }).catch(() => {
            this.confirmLoading = false
          })
        }
      })
    },
    // 숫자만 입력 함수
    handleNumber(event) {
      if (event.keyCode === 190) {
        event.preventDefault()
      }
    },
    sample6_execDaumPostcode() {
      // eslint-disable-next-line no-undef
      new daum.Postcode({
        oncomplete: function(data) {
          var addr = '' // 주소 변수
          var extraAddr = '' // 참고항목 변수
          if (data.userSelectedType === 'R') { // 사용자가 도로명 주소를 선택했을 경우
            addr = data.roadAddress
          } else { // 사용자가 지번 주소를 선택했을 경우(J)
            addr = data.jibunAddress
          }

          if (data.userSelectedType === 'R') {
            if (data.bname !== '' && /[동|로|가]$/g.test(data.bname)) {
              extraAddr += data.bname
            }
            if (data.buildingName !== '' && data.apartment === 'Y') {
              extraAddr += (extraAddr !== '' ? ', ' + data.buildingName : data.buildingName)
            }
            if (extraAddr !== '') {
              extraAddr = ' (' + extraAddr + ')'
            }
            document.getElementById('sample6_extraAddress').value = extraAddr
          } else {
            document.getElementById('sample6_extraAddress').value = ''
          }

          document.getElementById('sample6_postcode').value = data.zonecode
          document.getElementById('sample6_address').value = addr
          document.getElementById('sample6_detailAddress').focus()
        }
      }).open()
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
      for (let i = 0; i < this.$refs.file.files.length; i++) {
        this.upload.file.push(this.$refs.file.files[i])
      }
    },
    getAmount(val) {
      var s = String('' + val.replace(/,/g, ''))
      var result = ''
      var num = 0
      for (var i = s.length - 1; i >= 0; i--) {
        result = s[i] + result
        if (num % 3 === 2 && i !== 0) {
          result = ',' + result
        }
        num++
      }
      // this. = result
      // this.$refs.input.value = result
      console.log('======11======' + result)
      // this.$emit('input', result)
      // this.$refs.input.value = result
      // console.log('=====22======='+this.space.dpst)
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
  .drawer-container {
    padding: 0 10px 0 10px;
  }
  .drawer-footer {
    .button_style {
      margin-top: 30px;
      width: 100%;
    }
  }
  .pit_card_list {
    margin-top: 60px;
    margin-bottom: 30px;
  }
  .el-tag {
    margin-right: 10px;
  }
  .button-new-tag {
    margin-right: 10px;
    height: 32px;
    line-height: 30px;
    padding-top: 0;
    padding-bottom: 0;
  }
  .input-new-tag {
    width: 120px;
    margin-right: 10px;
    vertical-align: bottom;
  }
  input[type="number"]::-webkit-outer-spin-button,
  input[type="number"]::-webkit-inner-spin-button {
    -webkit-appearance: none;
  }
  .el-input--suffix .el-input__inner{
    padding-right: 10px;
  }
</style>
