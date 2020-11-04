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
          <span v-if="mch.rentState !== '04' && mch.rentState !== '06'">{{ mch.changeRentTypeNm }}</span>
          <el-radio v-for="item in rentTypeOptions" v-else :key="item.codeDtl" v-model="mch.changeRentType" :label="item.codeDtl">{{ item.dtlNm }}</el-radio>
        </el-form-item>

        <!-- 보증금 -->
        <el-form-item :label="$t('spc.dpst')" prop="dpst">
          <span v-if="mch.rentState !== '04' && mch.rentState !== '06'">{{ mch.changeDpst | comma }} 원</span>
          <el-input v-else v-model="mch.changeDpst"> 원</el-input>
        </el-form-item>

        <!-- 월세 -->
        <el-form-item :label="$t('spc.mtyRent')" prop="mtyRent">
          <span v-if="mch.rentState !== '04' && mch.rentState !== '06'">{{ mch.changeMtyRent | comma }} 원</span>
          <el-input v-else v-model="mch.changeMtyRent"> 원</el-input>
        </el-form-item>

        <!-- 임대기간 -->
        <el-form-item :label="$t('spc.rentDe')" prop="rentBgnDe">
          <span v-if="mch.rentState !== '04' && mch.rentState !== '06'">{{ mch.changeRentBgnDe }} ~ {{ mch.changeRentEndDe }}</span>
          <span v-else><el-date-picker v-model="mch.changeRentBgnDe" value-format="yyyy-MM-dd" style="width: 45%"/> ~ <el-date-picker v-model="mch.changeRentEndDe" value-format="yyyy-MM-dd" style="width: 45%"/></span>
        </el-form-item>

        <!-- 계약서 -->
        <el-form-item v-show="mch.rentState === '09'" :label="$t('spc.cntrFirm')" prop="contractId">
          <span>{{ mch.contractId }}</span>
        </el-form-item>

        <!-- 메시지 -->
        <el-form-item v-show="mch.rentState === '04' || mch.rentState === '06' || mch.rentState === '09'" :label="$t('spc.mssage')" prop="mssage">
          <span v-if="mch.rentState === '09'">{{ mch.changeMssage }}</span>
          <el-input v-else v-model="mch.changeMssage" type="textarea" maxlength="500" :rows="2"/>
        </el-form-item>

      </el-form>
    </div>

    <!-- 버튼 영역 -->
    <div class="drawer-footer">
      <!--현장실사요청-->
      <el-button
        v-if="mch.rentState === '01'"
        v-waves
        :loading="confirmLoading"
        size="medium"
        type="success"
        class="button_style"
        @click="handleState('03')">
        {{ $t('btn.spc.reqSite') }}
      </el-button>
      <!--임대조건변경요청-->
      <el-button
        v-if="mch.rentState === '04' || mch.rentState === '06'"
        v-waves
        :loading="confirmLoading"
        size="medium"
        type="warning"
        class="button_style"
        style="width: 45%"
        @click="handleState('05')">
        {{ $t('btn.spc.reqRent') }}
      </el-button>
      <!--계약서작성요청-->
      <el-button
        v-if="mch.rentState === '04' || mch.rentState === '06'"
        v-waves
        :loading="confirmLoading"
        size="medium"
        type="danger"
        class="button_style"
        style="width: 45%"
        @click="handleState('08')">
        {{ $t('btn.spc.reqCntr') }}
      </el-button>
      <!--계약서작성요청-->
      <el-button
        v-if="mch.rentState === '07'"
        v-waves
        :loading="confirmLoading"
        size="medium"
        type="danger"
        class="button_style"
        @click="handleState('08')">
        {{ $t('btn.spc.reqCntr') }}
      </el-button>
      <!--계약완료-->
      <el-button
        v-if="mch.rentState === '09'"
        v-waves
        :loading="confirmLoading"
        size="medium"
        type="danger"
        class="button_style"
        @click="handleState('10')">
        {{ $t('btn.spc.comptCntr') }}
      </el-button>
    </div>

    <!-- 우측 사이드 바 수정 폼 -->
    <el-drawer
      :title="drawerInfo.title"
      :visible.sync="drawerInfo.rightDrawer"
      direction="rtl"
      size="75%">
      <manage-form
        :drawer-open-checker.sync="drawerInfo.rightDrawer"
        :close-drawer="handleDrawerClose"/>
    </el-drawer>

  </div>
</template>

<script>
import waves from '@/directive/waves'
import Sticky from '@/components/Sticky'
import { fetchMchDetail, editMchState } from '@/api/spcMch'
import { selectCodeList } from '@/api/com'

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
        rsrcMchSn: '',
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
        changeDpst: '',
        changeMtyRent: '',
        changeRentBgnDe: '',
        changeRentEndDe: '',
        changeMssage: ''
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
      drawerInfo: {
        title: '',
        rightDrawer: false
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
      this.mch.registerId = ''
    },
    async editCheck() {
      const response = await fetchMchDetail(this.rsrcMchId)
      this.preFncDiv = response.baseFncDiv
      this.mch = response

      this.rentTypeOptions = (await selectCodeList('RENT_TYPE')).list
      this.useClOptions = (await selectCodeList('USE_CL')).list

      setTimeout(() => {
        this.dataLoading = false
      }, 300)
    },
    handleEdit() {
      this.drawerInfo.title = this.$t('title.spc.dmandEdit')
      this.drawerInfo.rightDrawer = true
    },
    handleState(cd) {
      this.confirmLoading = true
      this.$confirm(this.$t('message.editConfirm'), {
        confirmButtonText: this.$t('btn.confirm'),
        cancelButtonText: this.$t('btn.cancel'),
        type: 'warning'
      }).then(() => {
        this.mch.rentState = cd
        editMchState(this.mch).then(response => {
          this.confirmLoading = false
          this.$message.success(this.$t('message.success'))
          this.$router.push({ name: 'MchListCnsmr' })
        }).catch(() => {
          this.confirmLoading = false
        })
      }).catch(() => {
        this.confirmLoading = false
      })
    },
    // 숫자만 입력 함수
    handleNumber(event) {
      if (event.keyCode === 190) {
        event.preventDefault()
      }
    },
    handleDrawerClose() {
      this.drawerInfo.rightDrawer = false
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
    padding-right: 6px;
  }
</style>
