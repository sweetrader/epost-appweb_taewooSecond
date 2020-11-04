<template>
  <div v-loading="dataLoading" class="has-head-container">
    <sticky :class-name="'sub-navbar'">
      <el-row type="flex" align="middle" justify="space-between">
        <p>{{ $t('title.spc.space') }}</p>

        <el-button
          v-waves
          type="info"
          class="filter-item"
          style="width: 25%; margin-left: 60px"
          icon="el-icon-edit"
          @click="handleDelete">
          {{ $t('btn.delete') }}
        </el-button>
        <el-button
          v-waves
          type="primary"
          class="filter-item"
          style="width: 25%; margin-left: 0px"
          icon="el-icon-edit"
          @click="goEdit">
          {{ $t('btn.edit') }}
        </el-button>

      </el-row>
    </sticky>

    <div class="app-container">

      <el-form ref="ruleForm" :rules="rules" :model="space" label-position="left" label-width="100px">

        <div style="color: red; font-weight: bold; margin-top: 10px; margin-bottom: 10px">기본정보</div>

        <!-- 제목 -->
        <el-form-item :label="$t('spc.sj')" prop="sj">
          <span>{{ space.sj }}</span>
        </el-form-item>

        <!-- 주소 -->
        <el-form-item :label="$t('spc.addr')" prop="addr">
          <span>{{ space.addr + ' ' + space.addrDtl }}</span>
        </el-form-item>

        <!-- 사용분류 -->
        <el-form-item :label="$t('spc.useCl')" prop="useCl">
          <span>{{ space.useClNm }}</span>
        </el-form-item>

        <!-- 면적 -->
        <el-form-item :label="$t('spc.area')" prop="area">
          <span>{{ space.area }} ㎡</span>
        </el-form-item>

        <div style="color: red; font-weight: bold; margin-top: 10px; margin-bottom: 10px">추가정보</div>

        <!-- 주차대수 -->
        <el-form-item :label="$t('spc.parking')" prop="parkingPosblCnt">
          <span>{{ space.parkingPosblCnt }} / {{ space.parkingAllCnt }} 대</span>
        </el-form-item>

        <!-- 엘리베이터 -->
        <el-form-item :label="$t('spc.elevt')" prop="elevtCnt">
          <span>{{ space.elevtCnt }} 대</span>
        </el-form-item>

        <div style="color: red; font-weight: bold; margin-top: 10px; margin-bottom: 10px">임대정보</div>

        <!-- 임대유형 -->
        <el-form-item :label="$t('spc.rentType')" prop="rentType">
          <span>{{ space.rentTypeNm }}</span>
        </el-form-item>

        <!-- 보증금 -->
        <el-form-item :label="$t('spc.dpst')" prop="dpst">
          <span>{{ space.dpst | comma }}원</span>
        </el-form-item>

        <!-- 월세 -->
        <el-form-item :label="$t('spc.mtyRent')" prop="mtyRent">
          <span>{{ space.mtyRent | comma }}원</span>
        </el-form-item>

        <!-- 임대기간 -->
        <el-form-item :label="$t('spc.rentDe')" prop="rentBgnDe">
          <span>{{ space.rentBgnDe }} ~ {{ space.rentEndDe }}</span>
        </el-form-item>

      </el-form>
    </div>

    <!-- 버튼 영역 -->
    <div class="drawer-footer">
      <el-button
        v-waves
        :loading="confirmLoading"
        size="medium"
        type="success"
        class="button_style"
        @click="handleAddRent">
        {{ $t('btn.spc.addRent') }}
      </el-button>
    </div>

  </div>
</template>

<script>
import waves from '@/directive/waves'
import Sticky from '@/components/Sticky'
import { editSpaceDel, fetchSpaceDetail, insertSpaceRent } from '@/api/spcSpace'

export default {
  name: 'SpaceInfo',
  directives: { waves },
  components: { Sticky },
  filters: {
    comma(val) {
      return String(val).replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    }
  },
  props: {
    // Seq Info
    spcRsrcId: {
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
      space: {
        spcRsrcId: '',
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
        immediatelyYn: ''
      },
      rules: {},
      param: this.$route.params.spcRsrcId,
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
      this.space.js = ''
      this.space.dscrp = ''
      this.space.addr = ''
      this.space.addrDtl = ''
      this.space.registerId = ''
      this.space.updtId = ''
    },
    // edit 체크
    async editCheck() {
      const response = await fetchSpaceDetail(this.spcRsrcId)
      this.preFncDiv = response.baseFncDiv
      this.space = response
      setTimeout(() => {
        this.dataLoading = false
      }, 300)
    },
    goEdit() {
      this.$router.push({ name: 'SpaceManagement', params: { spcRsrcId: this.spcRsrcId }})
    },
    handleDelete() {
      this.confirmLoading = true
      this.space.spcRsrcId = this.spcRsrcId
      this.$confirm(this.$t('message.deleteConfirm'), {
        confirmButtonText: this.$t('btn.confirm'),
        cancelButtonText: this.$t('btn.cancel'),
        type: 'warning'
      }).then(() => {
        editSpaceDel(this.space).then(response => {
          this.confirmLoading = false
          this.$message.success(this.$t('message.success'))
          this.$router.push({ name: 'SpaceList' })
        }).catch(() => {
          this.confirmLoading = false
        })
      }).catch(() => {
        this.confirmLoading = false
      })
    },
    handleAddRent() {
      this.confirmLoading = true
      this.space.spcRsrcId = this.spcRsrcId
      this.$confirm(this.$t('message.addConfirm'), {
        confirmButtonText: this.$t('btn.confirm'),
        cancelButtonText: this.$t('btn.cancel'),
        type: 'warning'
      }).then(() => {
        insertSpaceRent(this.space).then(response => {
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
