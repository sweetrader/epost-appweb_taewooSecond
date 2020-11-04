<template>
  <div>
    <div v-loading="listLoading" class="drawer-container">
      <el-form ref="ruleForm" :rules="rules" :model="dmand" label-position="left" label-width="80px">

        <div style="color: red; font-weight: bold; margin-top: 10px; margin-bottom: 10px">기본정보</div>

        <!-- 제목 -->
        <el-form-item :label="$t('spc.sj')" prop="sj">
          <el-input v-model="dmand.sj" maxlength="50"/>
        </el-form-item>

        <!-- 주소 -->
        <el-form-item :label="$t('spc.addr')" prop="addr">
          <el-input v-model="dmand.addr" maxlength="50"/>
        </el-form-item>

        <!-- 사용분류 -->
        <el-form-item :label="$t('spc.useCl')" prop="useCl">
          <el-radio v-for="item in useClOptions" :key="item.codeDtl" v-model="dmand.useCl" :label="item.codeDtl">{{ item.dtlNm }}</el-radio>
        </el-form-item>

        <!-- 면적 -->
        <el-form-item :label="$t('spc.area')" prop="area">
          <el-input v-model="dmand.area" maxlength="40" style="width: 40%"/> ㎡
        </el-form-item>

        <!-- 내용 -->
        <el-form-item :label="$t('spc.dscrp')" prop="dscrp">
          <el-input v-model="dmand.dscrp" type="textarea" maxlength="500" :rows="3"/>
        </el-form-item>

        <div style="color: red; font-weight: bold; margin-top: 10px; margin-bottom: 10px">추가정보</div>

        <!-- 주차대수 -->
        <el-form-item :label="$t('spc.parking')" prop="parkingYn">
          <el-radio-group v-model="dmand.parkingYn">
            <el-radio label="Y">{{ $t('spc.need') }}</el-radio>
            <el-radio label="N">{{ $t('spc.needless') }}</el-radio>
          </el-radio-group>
        </el-form-item>

        <!-- 엘리베이터 -->
        <el-form-item :label="$t('spc.dlvry')" prop="dlvryYn">
          <el-radio-group v-model="dmand.dlvryYn">
            <el-radio label="Y">{{ $t('spc.need') }}</el-radio>
            <el-radio label="N">{{ $t('spc.needless') }}</el-radio>
          </el-radio-group>
        </el-form-item>

        <div style="color: red; font-weight: bold; margin-top: 10px; margin-bottom: 10px">임대정보</div>

        <!-- 임대유형 -->
        <el-form-item :label="$t('spc.rentType')" prop="rentType">
          <el-radio v-for="item in rentTypeOptions" :key="item.codeDtl" v-model="dmand.rentType" :label="item.codeDtl">{{ item.dtlNm }}</el-radio>
        </el-form-item>

        <!-- 보증금 -->
        <el-form-item :label="$t('spc.dpst')" prop="dpst">
          <el-input v-model="dmand.dpstMin" maxlength="40" style="width: 35%"/> ~ <el-input v-model="dmand.dpstMax" maxlength="40" style="width: 35%"/> 원
        </el-form-item>

        <!-- 월세 -->
        <el-form-item :label="$t('spc.mtyRent')" prop="mtyRent">
          <el-input v-model="dmand.mtyRentMin" maxlength="40" style="width: 35%"/> ~ <el-input v-model="dmand.mtyRentMax" maxlength="40" style="width: 35%"/> 원
        </el-form-item>

        <!-- 임대기간 -->
        <el-form-item :label="$t('spc.rentDe')" prop="rentBgnDe">
          <el-date-picker v-model="dmand.rentBgnDe" value-format="yyyy-MM-dd" style="width: 45%"/> ~ <el-date-picker v-model="dmand.rentEndDe" value-format="yyyy-MM-dd" style="width: 45%"/>
        </el-form-item>

      </el-form>
    </div>

    <!-- 버튼 영역 -->
    <div class="drawer-footer">
      <el-button
        v-if="dmandCndtnId === ''"
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
import { insertDmand, fetchDmandDetail, editDmand, insertMchOffer } from '@/api/spcDmand'
import { selectCodeList } from '@/api/com'
import tinymce from '@/components/Tinymce/index.vue'

export default {
  name: 'RentMng',
  directives: { waves },
  // eslint-disable-next-line vue/no-unused-components
  components: { tinymce },
  props: {
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
        rentState: ''
      },
      rules: {
        sj: [{ required: true, message: this.$t('message.valid_required'), trigger: 'blur' }],
        addr: [{ required: true, message: this.$t('message.valid_required'), trigger: 'blur' }]
      },
      rentRsrcId: '',
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
      this.valid = true
    },
    // edit 체크
    async editCheck() {
      if (this.dmandCndtnId !== '') {
        const response = await fetchDmandDetail(this.dmandCndtnId)
        this.preFncDiv = response.baseFncDiv
        this.dmand = response
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
            insertDmand(this.dmand).then(response => {
              this.confirmLoading = false
              this.$message.success(this.$t('message.success'))
              this.$router.push({ name: 'DmandListCnsmr' })
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
            editDmand(this.dmand).then(response => {
              this.confirmLoading = false
              this.$message.success(this.$t('message.success'))
              this.$router.push({ name: 'DmandListCnsmr' })
            }).catch(() => {
              this.confirmLoading = false
            })
          }).catch(() => {
            this.confirmLoading = false
          })
        }
      })
    },
    handleOffer() {
      this.$refs['ruleForm'].validate((valid) => {
        if (valid) {
          this.confirmLoading = true
          this.$confirm(this.$t('message.editConfirm'), {
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
