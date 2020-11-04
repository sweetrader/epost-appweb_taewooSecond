<template>
  <div v-loading="dataLoading" class="has-head-container">
    <sticky :class-name="'sub-navbar'">
      <el-row type="flex" align="middle" justify="space-between">
        <p>{{ $t('title.spc.rent') }}</p>

        <!--<el-button
          v-waves
          type="info"
          class="filter-item"
          icon="el-icon-edit"
          @click="handleDelete">
          {{ $t('btn.list') }}
        </el-button>-->

        <!-- 공간자원목록 -->
        <el-select v-show="rentRsrcId === ''" v-model="spcRsrcId" clearable style="width: 65%;" class="filter-item" @change="selectedSpace()">
          <el-option v-for="item in spaceOptions" :key="item.spcRsrcId" :label="item.sj + '(' + item.addr + '-' + item.useClNm + ')'" :value="item.spcRsrcId"/>
        </el-select>

      </el-row>
    </sticky>

    <div class="app-container">
      <el-form ref="ruleForm" :rules="rules" :model="rent" label-position="left" label-width="80px">

        <div style="color: red; font-weight: bold; margin-top: 10px; margin-bottom: 10px">기본정보</div>

        <!-- 제목 -->
        <el-form-item :label="$t('spc.sj')" prop="sj">
          <el-input v-model="rent.sj" maxlength="50"/>
        </el-form-item>

        <!-- 주소 -->
        <el-form-item :label="$t('spc.addr')" prop="addr">
          <el-input v-model="rent.addr" maxlength="50"/>
        </el-form-item>

        <!-- 주소상세 -->
        <el-form-item :label="$t('spc.addrDtl')" prop="addrDtl">
          <el-input v-model="rent.addrDtl" maxlength="50"/>
        </el-form-item>

        <!-- 사용분류 -->
        <el-form-item :label="$t('spc.useCl')" prop="useCl">
          <el-radio v-for="item in useClOptions" :key="item.codeDtl" v-model="rent.useCl" :label="item.codeDtl">{{ item.dtlNm }}</el-radio>
        </el-form-item>

        <!-- 면적 -->
        <el-form-item :label="$t('spc.area')" prop="area">
          <el-input v-model="rent.area" maxlength="40" style="width: 40%"/> ㎡
        </el-form-item>

        <!-- 내용 -->
        <el-form-item :label="$t('spc.dscrp')" prop="dscrp">
          <el-input v-model="rent.dscrp" type="textarea" maxlength="500" :rows="3"/>
        </el-form-item>

        <div style="color: red; font-weight: bold; margin-top: 10px; margin-bottom: 10px">추가정보</div>

        <!-- 주차대수 -->
        <el-form-item :label="$t('spc.parking')" prop="parkingPosblCnt">
          <el-input v-model="rent.parkingPosblCnt" maxlength="40" style="width: 40%"/> / <el-input v-model="rent.parkingAllCnt" maxlength="40" style="width: 40%"/>
        </el-form-item>

        <!-- 엘리베이터 -->
        <el-form-item :label="$t('spc.elevt')" prop="elevtCnt">
          <el-input v-model="rent.elevtCnt" maxlength="40" style="width: 40%"/> 대
        </el-form-item>

        <div style="color: red; font-weight: bold; margin-top: 10px; margin-bottom: 10px">임대정보</div>

        <!-- 임대유형 -->
        <el-form-item :label="$t('spc.rentType')" prop="rentType">
          <el-radio v-for="item in rentTypeOptions" :key="item.codeDtl" v-model="rent.rentType" :label="item.codeDtl">{{ item.dtlNm }}</el-radio>
        </el-form-item>

        <!-- 보증금 -->
        <el-form-item :label="$t('spc.dpst')" prop="dpst">
          <el-input v-model="rent.dpst" maxlength="40" style="width: 40%"/> 원
        </el-form-item>

        <!-- 월세 -->
        <el-form-item :label="$t('spc.mtyRent')" prop="mtyRent">
          <el-input v-model="rent.mtyRent" maxlength="40" style="width: 40%"/> 원
        </el-form-item>

        <!-- 임대기간 -->
        <el-form-item :label="$t('spc.rentDe')" prop="rentBgnDe">
          <el-date-picker v-model="rent.rentBgnDe" value-format="yyyy-MM-dd" style="width: 45%"/> ~ <el-date-picker v-model="rent.rentEndDe" value-format="yyyy-MM-dd" style="width: 45%"/>
        </el-form-item>

      </el-form>
    </div>

    <!-- 버튼 영역 -->
    <div class="drawer-footer">
      <el-button
        v-if="rentRsrcId === ''"
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
import { insertRent, fetchRentDetail, editRent, fetchSpaceOptions } from '@/api/spcRent'
import { fetchSpaceDetail } from '@/api/spcSpace'
import { selectCodeList } from '@/api/com'
import { insertMch } from '@/api/spcMch'
import tinymce from '@/components/Tinymce/index.vue'

export default {
  name: 'RentMng',
  directives: { waves },
  // eslint-disable-next-line vue/no-unused-components
  components: { Sticky, tinymce },
  props: {
    // edit Seq Info
    rentRsrcId: {
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
      rent: {
        rentRsrcId: '',
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
        rentState: ''
      },
      rules: {
        sj: [{ required: true, message: this.$t('message.valid_required'), trigger: 'blur' }]
      },
      spcRsrcId: '',
      rentTypeOptions: null,
      useClOptions: null,
      spaceOptions: null
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

      this.spaceOptions = (await fetchSpaceOptions({ mberId: this.$store.getters.id })).list
      this.rentTypeOptions = (await selectCodeList('RENT_TYPE')).list
      this.useClOptions = (await selectCodeList('USE_CL')).list

      setTimeout(() => {
        this.dataLoading = false
      }, 300)
    },
    selectedSpace(event) {
      fetchSpaceDetail(this.spcRsrcId).then(response => {
        this.confirmLoading = false
        this.rent = response
      }).catch(() => {
        this.confirmLoading = false
      })
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
            insertRent(this.rent).then(response => {
              this.confirmLoading = false
              this.$message.success(this.$t('message.success'))
              this.$router.push({ name: 'RentList' })
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
            editRent(this.rent).then(response => {
              this.confirmLoading = false
              this.$message.success(this.$t('message.success'))
              this.$router.push({ name: 'RentListSupler' })
            }).catch(() => {
              this.confirmLoading = false
            })
          }).catch(() => {
            this.confirmLoading = false
          })
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
