<template>
  <div>
    <div v-loading="listLoading" class="drawer-container">
      <el-form ref="ruleForm" :rules="rules" :model="dmand" label-position="left" label-width="80px">

        <div style="font-size: x-small; margin-top: 20px; margin-bottom: 10px">{{ dmand.registDt }}</div>

        <div style="font-weight: bold; margin-bottom: 20px">
          <span style="color: blue; ">[ {{ dmand.useClNm }} ]</span>
          <span style="color: red; ">{{ dmand.sj }}</span>
        </div>

        <!-- 주소 -->
        <el-form-item :label="$t('spc.addr')" prop="addr">
          {{ dmand.addr }}
        </el-form-item>

        <!-- 사용분류 -->
        <el-form-item :label="$t('spc.useCl')" prop="useCl">
          {{ dmand.useClNm }}
        </el-form-item>

        <!-- 면적 -->
        <el-form-item :label="$t('spc.area')" prop="area">
          {{ dmand.area }} ㎡
        </el-form-item>

        <!-- 내용 -->
        <el-form-item :label="$t('spc.dscrp')" prop="dscrp">
          {{ dmand.dscrp }}
        </el-form-item>

        <!-- 주차대수 -->
        <el-form-item :label="$t('spc.parking')" prop="parkingYn">
          <span v-if="dmand.parkingYn === 'Y'">필요</span>
          <span v-else>불필요</span>
        </el-form-item>

        <!-- 택배 -->
        <el-form-item :label="$t('spc.dlvry')" prop="dlvryYn">
          <span v-if="dmand.dlvryYn === 'Y'">필요</span>
          <span v-else>불필요</span>
        </el-form-item>

        <!-- 임대유형 -->
        <el-form-item :label="$t('spc.rentType')" prop="rentType">
          {{ dmand.rentTypeNm }}
        </el-form-item>

        <!-- 보증금 -->
        <el-form-item :label="$t('spc.dpst')" prop="dpst">
          {{ dmand.dpstMin | comma }} ~ {{ dmand.dpstMax | comma }} 원
        </el-form-item>

        <!-- 월세 -->
        <el-form-item :label="$t('spc.mtyRent')" prop="mtyRent">
          {{ dmand.mtyRentMin | comma }} ~ {{ dmand.mtyRentMax | comma }} 원
        </el-form-item>

        <!-- 임대기간 -->
        <el-form-item :label="$t('spc.rentDe')" prop="rentBgnDe">
          <span>{{ dmand.rentBgnDe }} ~ {{ dmand.rentEndDe }}</span>
        </el-form-item>

      </el-form>
    </div>

    <!-- 버튼 영역 -->
    <div class="drawer-footer">
      <el-button
        v-waves
        :loading="confirmLoading"
        size="medium"
        type="primary"
        class="button_style"
        @click="handleCreate">
        {{ $t('btn.spc.offerRent') }}
      </el-button>
    </div>

    <!-- 우측 사이드 바 수정 폼 -->
    <el-drawer
      :title="drawerInfo.title"
      :visible.sync="drawerInfo.rightDrawer"
      direction="rtl"
      size="100%">
      <dmand-rent-form
        :dmand-cndtn-id="drawerInfo.dmandCndtnId"
        :cnsmr-id="drawerInfo.cnsmrId"
        :drawer-open-checker.sync="drawerInfo.rightDrawer"
        :close-drawer="handleDrawerClose"/>
    </el-drawer>

  </div>
</template>

<script>
import waves from '@/directive/waves'
import { fetchDmandDetail, insertMchOffer } from '@/api/spcDmand'
import tinymce from '@/components/Tinymce/index.vue'
import dmandRentForm from './dmandRentForm'

export default {
  name: 'RentMng',
  directives: { waves },
  // eslint-disable-next-line vue/no-unused-components
  components: { tinymce, dmandRentForm },
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
    dmandCndtnId: {
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
      listLoading: false,
      confirmLoading: false,
      preFncDiv: '',
      valid: true,
      dmand: {
        dmandCndtnId: '',
        mberId: '',
        sj: '',
        addr: '',
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
        parkingYn: 'N',
        heatType: '',
        dlvryYn: 'N',
        rentType: '',
        rentTypeNm: '',
        dpstMin: 0,
        dpstMax: 0,
        mtyRentMin: 0,
        mtyRentMax: 0,
        rentBgnDe: '',
        rentEndDe: '',
        mvPosblBgnDe: '',
        immediatelyYn: '',
        rentState: '',
        registDt: ''
      },
      rules: {
        sj: [{ required: true, message: this.$t('message.valid_required'), trigger: 'blur' }],
        addr: [{ required: true, message: this.$t('message.valid_required'), trigger: 'blur' }]
      },
      rentRsrcId: '',
      drawerInfo: {
        title: '',
        rightDrawer: false,
        dmandCndtnId: '',
        cnsmrId: ''
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
      this.dmand.js = ''
      this.dmand.dscrp = ''
      this.dmand.addr = ''
      this.dmand.rentBgnDe = ''
      this.dmand.registerId = ''
      this.valid = true
    },
    // edit 체크
    async editCheck() {
      const response = await fetchDmandDetail(this.dmandCndtnId)
      this.preFncDiv = response.baseFncDiv
      this.dmand = response

      setTimeout(() => {
        this.listLoading = false
      }, 300)
    },
    handleOffer() {
      this.$refs['ruleForm'].validate((valid) => {
        if (valid) {
          this.confirmLoading = true
          this.$confirm(this.$t('message.rent.rentOffer'), {
            confirmButtonText: this.$t('btn.confirm'),
            cancelButtonText: this.$t('btn.cancel'),
            type: 'warning'
          }).then(() => {
            this.dmand.rentRsrcId = this.rentRsrcId
            this.dmand.registerId = this.$store.getters.id
            insertMchOffer(this.dmand).then(response => {
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
    // 숫자만 입력 함수
    handleNumber(event) {
      if (event.keyCode === 190) {
        event.preventDefault()
      }
    },
    handleCreate() {
      this.drawerInfo.dmandCndtnId = this.dmand.dmandCndtnId
      this.drawerInfo.cnsmrId = this.dmand.mberId
      this.drawerInfo.title = this.$t('route.spc.rentList')
      this.drawerInfo.rightDrawer = true
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
  .el-date-editor.el-input{
    width: 150px;
  }
  .el-checkbox:last-of-type{
    margin-left: 20px;
  }
</style>
