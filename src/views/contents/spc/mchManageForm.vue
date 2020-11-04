<template>
  <div>
    <div v-loading="listLoading" class="drawer-container">
      <el-form ref="ruleForm" :rules="rules" :model="mch" label-position="left" label-width="100px">

        <el-form-item prop="rentType">
          <span style="color: red">임대정보</span>
        </el-form-item>

        <!-- 주소 -->
        <el-form-item :label="$t('spc.addr')" prop="addr">
          <span>{{ mch.addr }}</span>
        </el-form-item>

        <!-- 사용분류 -->
        <el-form-item :label="$t('spc.useCl')" prop="useCl">
          <span>{{ mch.useCl }}</span>
        </el-form-item>

        <!-- 임대유형 -->
        <el-form-item :label="$t('spc.rentType')" prop="rentType">
          <span>{{ mch.rentType }}</span>
        </el-form-item>

        <!-- 기간 -->
        <el-form-item :label="$t('spc.rentBgnDe')" prop="rentBgnDe">
          <span>{{ mch.rentBgnDe }} ~ {{ mch.rentBgnDe }}</span>
        </el-form-item>

        <el-form-item v-show="mch.rentState === '04' || mch.rentState === '06'">
          <span style="color: red">임대조건변경요청</span>
        </el-form-item>

        <!-- 사용분류 -->
        <el-form-item v-show="mch.rentState === '04' || mch.rentState === '06'" :label="$t('spc.useCl')" prop="useCl">
          <el-radio v-for="item in useClOptions" :key="item.codeDtl" v-model="mch.changeUseCl" :label="item.codeDtl">{{ item.dtlNm }}</el-radio>
        </el-form-item>

        <!-- 임대유형 -->
        <el-form-item v-show="mch.rentState === '04' || mch.rentState === '06'" :label="$t('spc.rentType')" prop="rentType">
          <el-radio v-for="item in rentTypeOptions" :key="item.codeDtl" v-model="mch.changeRentType" :label="item.codeDtl">{{ item.dtlNm }}</el-radio>
        </el-form-item>

        <!-- 임대시작일 -->
        <el-form-item v-show="mch.rentState === '04' || mch.rentState === '06'" :label="$t('spc.rentBgnDe')" prop="rentBgnDe">
          <el-date-picker v-model="mch.changeRentBgnDe" value-format="yyyy-MM-dd"/>
        </el-form-item>

        <!-- 메시지 -->
        <el-form-item v-show="mch.rentState === '04' || mch.rentState === '06'" :label="$t('spc.mssage')" prop="mssage">
          <el-input v-model="mch.changeMssage" type="textarea" maxlength="500" :rows="2"/>
        </el-form-item>

      </el-form>
    </div>

    <!-- 버튼 영역 -->
    <div class="drawer-footer">
      <!--현장실사요청확인-->
      <el-button
        v-if="auth === 'supler' && mch.rentState === '03'"
        v-waves
        :loading="confirmLoading"
        size="medium"
        type="warning"
        class="button_style"
        @click="handleState('04')">
        {{ $t('btn.spc.comptSite') }}
      </el-button>
      <!--임대조건변경완료-->
      <el-button
        v-if="auth === 'supler' && mch.rentState === '05'"
        v-waves
        :loading="confirmLoading"
        size="medium"
        type="warning"
        class="button_style"
        style="width: 45%"
        @click="handleState('06')">
        {{ $t('btn.spc.comptRent') }}
      </el-button>
      <!--임대조건변경불가-->
      <el-button
        v-if="auth === 'supler' && mch.rentState === '05'"
        v-waves
        :loading="confirmLoading"
        size="medium"
        type="danger"
        class="button_style"
        style="width: 45%"
        @click="handleState('07')">
        {{ $t('btn.spc.cancelRent') }}
      </el-button>
      <!--계약서작성-->
      <el-button
        v-if="auth === 'supler' && mch.rentState === '08'"
        v-waves
        :loading="confirmLoading"
        size="medium"
        type="primary"
        class="button_style"
        @click="handleState('09')">
        {{ $t('btn.spc.addCntr') }}
      </el-button>
      <!--현장실사요청-->
      <el-button
        v-if="auth === 'cnsmr' && (mch.rentState === '01' || mch.rentState === '02')"
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
        v-if="auth === 'cnsmr' && (mch.rentState === '04' || mch.rentState === '06')"
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
        v-if="auth === 'cnsmr' && (mch.rentState === '04' || mch.rentState === '06')"
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
        v-if="auth === 'cnsmr' && mch.rentState === '07'"
        v-waves
        :loading="confirmLoading"
        size="medium"
        type="danger"
        class="button_style"
        @click="handleState('08')">
        {{ $t('btn.spc.reqCntr') }}
      </el-button>
    </div>
  </div>
</template>

<script>
import waves from '@/directive/waves'
import { fetchMchDetail, editMch, fetchCodeList, editMchState } from '@/api/spcMch'
import tinymce from '@/components/Tinymce/index.vue'

export default {
  name: 'MchMng',
  directives: { waves },
  // eslint-disable-next-line vue/no-unused-components
  components: { tinymce },
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
      listLoading: false,
      confirmLoading: false,
      preFncDiv: '',
      orgList: null,
      mch: {
        rsrcMchId: '',
        suplerId: '',
        cnsmrId: '',
        addr: '',
        addrDtl: '',
        useCl: '',
        rentType: '',
        rentBgnDe: '',
        rentState: '',
        registerId: '',
        updtId: this.$store.getters.id,
        changeRentState: '',
        changeUseCl: '',
        changeRentType: '',
        changeRentBgnDe: '',
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
      useClOptions: null,
      rentTypeOptions: null,
      auth: ''
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
    // 공급자, 수요자 권한 (임시)
    if (this.$store.getters.id === 'admin') {
      this.auth = 'supler'
    }
    if (this.$store.getters.id === 'test') {
      this.auth = 'cnsmr'
    }
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
      this.mch.updtId = this.$store.getters.id
    },
    // edit 체크
    async editCheck() {
      // org 리스트 초기화
      // eslint-disable-next-line no-unused-vars
      const param = {
        st: this.confirmType === 'edit' ? '' : 'OK',
        pageIdx: 1,
        pageSize: 9999
      }
      // const orgData = await fetchSearchOrgList(param)

      // this.orgList = orgData.list

      if (this.confirmType === 'edit') {
        // 전달받은 아이디 값으로 조회
        // edit이면 데이터 상세 조회

        const response = await fetchMchDetail(this.rsrcMchId)

        this.preFncDiv = response.baseFncDiv

        this.mch = response
        this.mch.updtId = this.$store.getters.id
      }

      if (this.confirmType === 'add') {
        // 운영사 계정의 경우 운영사 고정
        if (this.$store.getters.roles[0].authority === 'ORG') {
        // 계정에 어느 운영사인지 세팅이 된다면 추가
          this.mchtInfo.orgCd = this.$store.getters.roleInfo
        }
      }

      this.rentTypeOptions = (await fetchCodeList('RENT_TYPE')).list
      this.useClOptions = (await fetchCodeList('USE_CL')).list

      setTimeout(() => {
        this.listLoading = false
      }, 300)
    },
    // 등록 / 수정 버튼
    handleEdit() {
      this.$refs['ruleForm'].validate((valid) => {
        if (valid) {
          this.confirmLoading = true
          this.$confirm(this.$t('message.editConfirm'), {
            confirmButtonText: this.$t('btn.confirm'),
            cancelButtonText: this.$t('btn.cancel'),
            type: 'warning'
          }).then(() => {
            editMch(this.mch).then(response => {
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
          this.closeDrawer()
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
