<template>
  <div v-loading="dataLoading" class="has-head-container">
    <sticky :class-name="'sub-navbar'">
      <el-row type="flex" align="middle" justify="space-between">
        <p>{{ cntr.rentStateNm }}</p>
      </el-row>
    </sticky>

    <div class="app-container">
      <el-form ref="ruleForm" :rules="rules" :model="cntr" label-position="left" label-width="90px">

        <div style="color: red; font-weight: bold; margin-top: 10px; margin-bottom: 10px">기본정보</div>

        <!-- 제목 -->
        <el-form-item :label="$t('spc.sj')" prop="sj">
          <span>{{ cntr.sj }}</span>
        </el-form-item>

        <!-- 주소 -->
        <el-form-item :label="$t('spc.addr')" prop="addr">
          <span>{{ cntr.addr + ' ' + cntr.addrDtl }}</span>
        </el-form-item>

        <!-- 사용분류 -->
        <el-form-item :label="$t('spc.useCl')" prop="useCl">
          <span>{{ cntr.useClNm }}</span>
        </el-form-item>

        <!-- 면적 -->
        <el-form-item :label="$t('spc.area')" prop="area">
          <span>{{ cntr.area }} ㎡</span>
        </el-form-item>

        <div style="color: red; font-weight: bold; margin-top: 10px; margin-bottom: 10px">추가정보</div>

        <!-- 주차대수 -->
        <el-form-item :label="$t('spc.parking')" prop="parkingPosblCnt">
          <span>{{ cntr.parkingPosblCnt }} / {{ cntr.parkingAllCnt }} 대</span>
        </el-form-item>

        <!-- 엘리베이터 -->
        <el-form-item :label="$t('spc.elevt')" prop="elevtCnt">
          <span>{{ cntr.elevtCnt }} 대</span>
        </el-form-item>

        <div style="color: red; font-weight: bold; margin-top: 10px; margin-bottom: 10px">임대정보</div>

        <!-- 임대유형 -->
        <el-form-item :label="$t('spc.rentType')" prop="rentType">
          <span>{{ cntr.rentTypeNm }}</span>
        </el-form-item>

        <!-- 보증금 -->
        <el-form-item :label="$t('spc.dpst')" prop="dpst">
          <span>{{ cntr.dpst | comma }} 원</span>
        </el-form-item>

        <!-- 월세 -->
        <el-form-item :label="$t('spc.mtyRent')" prop="mtyRent">
          <span>{{ cntr.mtyRent | comma }} 원</span>
        </el-form-item>

        <!-- 임대기간 -->
        <el-form-item :label="$t('spc.rentDe')" prop="rentBgnDe">
          <span>{{ cntr.rentBgnDe }} ~ {{ cntr.rentEndDe }}</span>
        </el-form-item>

        <div style="color: red; font-weight: bold; margin-top: 10px; margin-bottom: 10px">계약변경요청</div>

        <!-- 임대유형 -->
        <el-form-item :label="$t('spc.rentType')" prop="changeRentTypeNm">
          <span>{{ cntr.changeRentTypeNm }}</span>
        </el-form-item>

        <!-- 보증금 -->
        <el-form-item :label="$t('spc.dpst')" prop="changeDpst">
          <span>{{ cntr.changeDpst | comma }} 원</span>
        </el-form-item>

        <!-- 월세 -->
        <el-form-item :label="$t('spc.mtyRent')" prop="changeMtyRent">
          <span>{{ cntr.changeMtyRent | comma }} 원</span>
        </el-form-item>

        <!-- 임대기간 -->
        <el-form-item :label="$t('spc.rentDe')" prop="changeRentBgnDe">
          <el-date-picker v-model="cntr.changeRentBgnDe" value-format="yyyy-MM-dd" style="width: 45%"/>
          ~ <el-date-picker v-model="cntr.changeRentEndDe" value-format="yyyy-MM-dd" style="width: 45%"/>
        </el-form-item>

        <!-- 메시지 -->
        <el-form-item :label="$t('spc.mssage')" prop="mssage">
          <el-input v-model="cntr.changeMssage" type="textarea" maxlength="500" :rows="3"/>
        </el-form-item>

      </el-form>
    </div>

    <!-- 버튼 영역 -->
    <div class="drawer-footer">
      <!--파기(계약시작일전)-->
      <el-button
        v-if="this.$moment().format('YYYY-MM-DD') < cntr.rentBgnDe && (cntr.rentState === '10' || cntr.rentState === '13')"
        v-waves
        :loading="confirmLoading"
        size="medium"
        type="danger"
        class="button_style"
        style="width: 35%"
        @click="handleState('14')">
        {{ $t('btn.spc.cntrCancel') }}
      </el-button>
      <!--계약변경요청(계약시작일전)-->
      <el-button
        v-if="this.$moment().format('YYYY-MM-DD') < cntr.rentBgnDe && (cntr.rentState === '10' || cntr.rentState === '13')"
        v-waves
        :loading="confirmLoading"
        size="medium"
        type="primary"
        class="button_style"
        style="width: 55%"
        @click="handleState('11')">
        {{ $t('btn.spc.reqCntrChange') }}
      </el-button>
      <!--계약연장요청(계약종료한달전) -->
      <el-button
        v-if="(this.$moment().add(1, 'M').format('YYYY-MM-DD') > cntr.rentEndDe && this.$moment().format('YYYY-MM-DD') < cntr.rentEndDe) && (cntr.rentState === '10' || cntr.rentState === '12' || cntr.rentState === '13')"
        v-waves
        :loading="confirmLoading"
        size="medium"
        type="warning"
        class="button_style"
        @click="handleState('15')">
        {{ $t('btn.spc.reqCntrExtn') }}
      </el-button>
    </div>

  </div>
</template>

<script>
import waves from '@/directive/waves'
import { fetchCntrDetail, editCntrState } from '@/api/spcCntr'
import { selectCodeList } from '@/api/com'
import Sticky from '@/components/Sticky/index'

export default {
  name: 'CntrMng',
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
    cntrId: {
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
      cntr: {
        cntrId: '',
        cntrSn: '',
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
        cntrtNm: '',
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
      this.cntr.js = ''
      this.cntr.dscrp = ''
      this.cntr.addr = ''
      this.cntr.addrDtl = ''
    },
    async editCheck() {
      const response = await fetchCntrDetail(this.cntrId)
      this.preFncDiv = response.baseFncDiv
      this.cntr = response

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
        this.cntr.rentState = cd
        this.cntr.registerId = this.$store.getters.id
        editCntrState(this.cntr).then(response => {
          this.confirmLoading = false
          this.$message.success(this.$t('message.success'))
          this.$router.push({ name: 'CntrListCnsmr' })
        }).catch(() => {
          this.confirmLoading = false
        })
      }).catch(() => {
        this.confirmLoading = false
      })
    },
    goList() {
      this.$router.push({ name: 'CntrListCnsmr' })
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
  .el-input--suffix .el-input__inner{
    padding-right: 10px;
  }
</style>
