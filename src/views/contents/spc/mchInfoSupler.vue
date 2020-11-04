<template>
  <div v-loading="dataLoading" class="has-head-container">
    <sticky :class-name="'sub-navbar'">
      <el-row type="flex" align="middle" justify="space-between">
        <p>{{ mch.rentStateNm }}</p>
      </el-row>
    </sticky>

    <div class="app-container">
      <el-form ref="ruleForm" :rules="rules" :model="mch" label-position="left" label-width="90px">

        <div style="color: red; font-weight: bold; margin-top: 10px; margin-bottom: 10px">기본정보</div>

        <!-- 제목 -->
        <el-form-item :label="$t('spc.sj')" prop="sj">
          <span>{{ mch.sj }}</span>
        </el-form-item>

        <!-- 주소 -->
        <el-form-item :label="$t('spc.addr')" prop="addr">
          <span>{{ mch.addr + ' ' + mch.addrDtl }}</span>
        </el-form-item>

        <!-- 사용분류 -->
        <el-form-item :label="$t('spc.useCl')" prop="useCl">
          <span>{{ mch.useClNm }}</span>
        </el-form-item>

        <!-- 면적 -->
        <el-form-item :label="$t('spc.area')" prop="area">
          <span>{{ mch.area }} ㎡</span>
        </el-form-item>

        <div style="color: red; font-weight: bold; margin-top: 10px; margin-bottom: 10px">추가정보</div>

        <!-- 주차대수 -->
        <el-form-item :label="$t('spc.parking')" prop="parkingPosblCnt">
          <span>{{ mch.parkingPosblCnt }} / {{ mch.parkingAllCnt }} 대</span>
        </el-form-item>

        <!-- 엘리베이터 -->
        <el-form-item :label="$t('spc.elevt')" prop="elevtCnt">
          <span>{{ mch.elevtCnt }} 대</span>
        </el-form-item>

        <div style="color: red; font-weight: bold; margin-top: 10px; margin-bottom: 10px">임대정보</div>

        <!-- 임대유형 -->
        <el-form-item :label="$t('spc.rentType')" prop="rentType">
          <span>{{ mch.rentTypeNm }}</span>
        </el-form-item>

        <!-- 보증금 -->
        <el-form-item :label="$t('spc.dpst')" prop="dpst">
          <span>{{ mch.dpst | comma }} 원</span>
        </el-form-item>

        <!-- 월세 -->
        <el-form-item :label="$t('spc.mtyRent')" prop="mtyRent">
          <span>{{ mch.mtyRent | comma }} 원</span>
        </el-form-item>

        <!-- 임대기간 -->
        <el-form-item :label="$t('spc.rentDe')" prop="rentBgnDe">
          <span>{{ mch.rentBgnDe }} ~ {{ mch.rentEndDe }}</span>
        </el-form-item>

        <div style="color: red; font-weight: bold; margin-top: 10px; margin-bottom: 10px">임대조건 조정요청</div>

        <!-- 임대유형 -->
        <el-form-item :label="$t('spc.rentType')" prop="rentType">
          <span>{{ mch.changeRentTypeNm }}</span>
        </el-form-item>

        <!-- 보증금 -->
        <el-form-item :label="$t('spc.dpst')" prop="dpst">
          <span>{{ mch.changeDpst | comma }} 원</span>
        </el-form-item>

        <!-- 월세 -->
        <el-form-item :label="$t('spc.mtyRent')" prop="mtyRent">
          <span>{{ mch.changeMtyRent | comma }} 원</span>
        </el-form-item>

        <!-- 임대기간 -->
        <el-form-item :label="$t('spc.rentDe')" prop="rentBgnDe">
          <span>{{ mch.changeRentBgnDe }} ~ {{ mch.changeRentEndDe }}</span>
        </el-form-item>

        <!-- 메시지 -->
        <el-form-item v-show="mch.rentState === '04' || mch.rentState === '06'" :label="$t('spc.mssage')" prop="mssage">
          <el-input v-model="mch.changeMssage" type="textarea" maxlength="500" :rows="2" readonly/>
        </el-form-item>

        <div style="color: red; font-weight: bold; margin-top: 10px; margin-bottom: 10px">계약서 작성</div>

        <!-- 계약서 선택 -->
        <el-form-item :label="$t('spc.cntrFirm')" prop="cntrFirm">
          <el-radio-group v-model="mch.contractId">
            <el-radio label="111">계약서 사무실 임대 1</el-radio>
            <el-radio label="222">계약서 창고 임대 1</el-radio>
            <el-radio label="333">계약서 창고 임대 2</el-radio>
          </el-radio-group>
        </el-form-item>

        <!-- 메시지 -->
        <el-form-item :label="$t('spc.mssage')" prop="mssage">
          <el-input v-model="mch.changeMssage" type="textarea" maxlength="500" :rows="3"/>
        </el-form-item>

      </el-form>
    </div>

    <!-- 버튼 영역 -->
    <div class="drawer-footer">
      <!--거절-->
      <el-button
        v-if="mch.rentState === '03'"
        v-waves
        :loading="confirmLoading"
        size="medium"
        type="danger"
        class="button_style"
        style="width: 45%"
        @click="goList()">
        {{ $t('btn.spc.reject') }}
      </el-button>
      <!--현장실사요청확인-->
      <el-button
        v-if="mch.rentState === '03'"
        v-waves
        :loading="confirmLoading"
        size="medium"
        type="warning"
        class="button_style"
        style="width: 45%"
        @click="handleState('04')">
        {{ $t('btn.spc.comptSite') }}
      </el-button>
      <!--임대조건변경불가-->
      <el-button
        v-if="mch.rentState === '05'"
        v-waves
        :loading="confirmLoading"
        size="medium"
        type="danger"
        class="button_style"
        style="width: 45%"
        @click="handleState('07')">
        {{ $t('btn.spc.cancelRent') }}
      </el-button>
      <!--임대조건변경완료-->
      <el-button
        v-if="mch.rentState === '05'"
        v-waves
        :loading="confirmLoading"
        size="medium"
        type="warning"
        class="button_style"
        style="width: 45%"
        @click="handleState('06')">
        {{ $t('btn.spc.comptRent') }}
      </el-button>
      <!--계약서작성-->
      <el-button
        v-if="mch.rentState === '08'"
        v-waves
        :loading="confirmLoading"
        size="medium"
        type="primary"
        class="button_style"
        @click="handleState('09')">
        {{ $t('btn.spc.addCntr') }}
      </el-button>
    </div>

  </div>
</template>

<script>
import waves from '@/directive/waves'
import { fetchMchDetail, editMchState } from '@/api/spcMch'
import { selectCodeList } from '@/api/com'
import Sticky from '@/components/Sticky/index'

export default {
  name: 'MchMng',
  directives: { waves },
  components: { Sticky },
  filters: {
    comma(val) {
      return String(val).replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    }
  },
  props: {
    // 유형(등록: add, 수정: edit)
    confirmType: {
      type: String,
      default: 'add'
    },
    // edit Seq Info
    rsrcMchId: {
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
      mch: {
        rsrcMchId: '',
        suplerId: '',
        cnsmrId: '',
        fileId: '',
        sj: '',
        addr: '',
        addrDtl: '',
        useCl: '',
        useClNm: '',
        area: '',
        areaPyeong: '',
        sepratSpcCnt: '',
        allFloor: '',
        crrspndFloor: '',
        drc: '',
        manageAmt: '',
        comptConfmDe: '',
        dscrp: '',
        parkingAllCnt: '',
        parkingPosblCnt: '',
        elevtCnt: '',
        heatType: '',
        dlvryYn: '',
        rentType: '',
        rentTypeNm: '',
        dpst: '',
        mtyRent: '',
        rentBgnDe: '',
        rentEndDe: '',
        mvPosblBgnDe: '',
        immediatelyYn: '',
        rentState: '',
        rentStateNm: '',
        changeRentState: '',
        changeRentType: '',
        changeRentTypeNm: '',
        changeDpst: '',
        changeMtyRent: '',
        changeRentBgnDe: '',
        changeRentEndDe: '',
        changeMssage: '',
        contractId: ''
      },
      ruleForm: {
        orgCd: '',
        mchtNm: '',
        baseFncDiv: ''
      },
      rules: {
        title: [{ required: true, message: this.$t('message.valid_required'), trigger: 'blur' }],
        content: [{ required: true, message: this.$t('message.valid_required'), trigger: 'blur' }]
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
      this.mch.js = ''
      this.mch.dscrp = ''
      this.mch.addr = ''
      this.mch.addrDtl = ''
    },
    async editCheck() {
      const response = await fetchMchDetail(this.rsrcMchId)
      this.preFncDiv = response.baseFncDiv
      this.mch = response

      this.rentTypeOptions = (await selectCodeList('RENT_TYPE')).list
      this.useClOptions = (await selectCodeList('USE_CL')).list

      setTimeout(() => {
        this.listLoading = false
      }, 300)
    },
    handleState(cd) {
      this.confirmLoading = true
      this.$confirm(this.$t('message.editConfirm'), {
        confirmButtonText: this.$t('btn.confirm'),
        cancelButtonText: this.$t('btn.cancel'),
        type: 'warning'
      }).then(() => {
        this.mch.rentState = cd
        this.mch.registerId = this.$store.getters.id
        editMchState(this.mch).then(response => {
          this.confirmLoading = false
          this.$message.success(this.$t('message.success'))
          this.$router.push({ name: 'MchListSupler' })
        }).catch(() => {
          this.confirmLoading = false
        })
      }).catch(() => {
        this.confirmLoading = false
      })
    },
    goList() {
      this.$router.push({ name: 'MchListSupler' })
    },
    // 숫자만 입력 함수
    handleNumber(event) {
      if (event.keyCode === 190) {
        event.preventDefault()
      }
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
</style>
