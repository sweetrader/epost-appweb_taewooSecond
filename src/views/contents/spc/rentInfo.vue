<template>
  <div v-loading="dataLoading" class="has-head-container">
    <sticky :class-name="'sub-navbar'">
      <el-row type="flex" align="middle" justify="space-between">
        <p>{{ $t('title.spc.rent') }}</p>

        <el-button
          v-show="rent.mberId !== $store.getters.mberId"
          v-waves
          type="info"
          class="filter-item"
          icon="el-icon-edit"
          @click="handleMch">
          {{ $t('btn.spc.query') }}
        </el-button>

      </el-row>
    </sticky>

    <div class="app-container">
      <el-form ref="ruleForm" :rules="rules" :model="rent" label-position="left" label-width="100px">

        <div style="color: red; font-weight: bold; margin-top: 10px; margin-bottom: 10px">기본정보</div>

        <!-- 제목 -->
        <el-form-item :label="$t('spc.sj')" prop="sj">
          <span>{{ rent.sj }}</span>
        </el-form-item>

        <!-- 주소 -->
        <el-form-item :label="$t('spc.addr')" prop="addr">
          <span>{{ rent.addr + ' ' + rent.addrDtl }}</span>
        </el-form-item>

        <!-- 사용분류 -->
        <el-form-item :label="$t('spc.useCl')" prop="useCl">
          <span>{{ rent.useClNm }}</span>
        </el-form-item>

        <!-- 면적 -->
        <el-form-item :label="$t('spc.area')" prop="area">
          <span>{{ rent.area }} ㎡</span>
        </el-form-item>

        <div style="color: red; font-weight: bold; margin-top: 10px; margin-bottom: 10px">추가정보</div>

        <!-- 주차대수 -->
        <el-form-item :label="$t('spc.parking')" prop="parkingPosblCnt">
          <span>{{ rent.parkingPosblCnt }} / {{ rent.parkingAllCnt }} 대</span>
        </el-form-item>

        <!-- 엘리베이터 -->
        <el-form-item :label="$t('spc.elevt')" prop="elevtCnt">
          <span>{{ rent.elevtCnt }} 대</span>
        </el-form-item>

        <div style="color: red; font-weight: bold; margin-top: 10px; margin-bottom: 10px">임대정보</div>

        <!-- 임대유형 -->
        <el-form-item :label="$t('spc.rentType')" prop="rentType">
          <span>{{ rent.rentTypeNm }}</span>
        </el-form-item>

        <!-- 보증금 -->
        <el-form-item :label="$t('spc.dpst')" prop="dpst">
          <span>{{ rent.dpst | comma }}원</span>
        </el-form-item>

        <!-- 월세 -->
        <el-form-item :label="$t('spc.mtyRent')" prop="mtyRent">
          <span>{{ rent.mtyRent | comma }}원</span>
        </el-form-item>

        <!-- 임대기간 -->
        <el-form-item :label="$t('spc.rentDe')" prop="rentBgnDe">
          <span>{{ rent.rentBgnDe }} ~ {{ rent.rentEndDe }}</span>
        </el-form-item>

      </el-form>
    </div>

    <!-- 버튼 영역 -->
    <div class="drawer-footer">
      <el-button
        v-show="rent.mberId !== $store.getters.mberId"
        v-waves
        :loading="confirmLoading"
        size="medium"
        type="primary"
        class="button_style"
        @click="handleMch">
        {{ $t('btn.spc.query') }}
      </el-button>
    </div>

  </div>
</template>

<script>
import waves from '@/directive/waves'
import Sticky from '@/components/Sticky'
import { fetchRentDetail } from '@/api/spcRent'
import { insertMch } from '@/api/spcMch'

export default {
  name: 'RentMng',
  directives: { waves },
  components: { Sticky },
  filters: {
    comma(val) {
      return String(val).replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    }
  },
  props: {
    // edit Seq Info
    rentRsrcId: {
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
      rent: {
        rentRsrcId: '',
        mberId: '',
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
        rentState: '02',
        cnsmrId: this.$store.getters.mberId
      },
      rules: {
        sj: [{ required: true, message: this.$t('message.valid_required'), trigger: 'blur' }]
      }
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
    // 처음 호출 시 수정 데이터 체크
    // this.dataLoading = true
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
      this.rent.js = ''
      this.rent.dscrp = ''
      this.rent.addr = ''
      this.rent.addrDtl = ''
      this.rent.rentBgnDe = ''
    },
    // edit 체크
    async editCheck() {
      if (this.rentRsrcId !== '') {
        const response = await fetchRentDetail(this.rentRsrcId)
        this.preFncDiv = response.baseFncDiv
        this.rent = response
      }
      setTimeout(() => {
        this.dataLoading = false
      }, 300)
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
            this.rent.rentRsrcId = this.rentRsrcId
            insertMch(this.rent).then(response => {
              this.confirmLoading = false
              this.$message.success(this.$t('message.success'))
              this.$router.push({ name: 'RentListCnsmr' })
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
  .el-date-editor.el-input{
    width: 150px;
  }
  .el-checkbox:last-of-type{
    margin-left: 20px;
  }
  .el-input--suffix .el-input__inner{
    padding-right: 10px;
  }
</style>
