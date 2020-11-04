<template>
  <div>
    <div v-loading="listLoading" class="drawer-container">
      <!-- 공간자원목록 -->
      <el-radio-group v-model="dmand.rentRsrcId">
        <el-radio v-for="item in spaceOptions" :key="item.rentRsrcId" style="margin: 10px" :label="item.rentRsrcId">
          {{ item.sj }} <el-button type="warning" size="mini" @click="goEdit(item.rentRsrcId)">{{ $t('btn.search') }}</el-button>
        </el-radio>
      </el-radio-group>
    </div>

    <!-- 버튼 영역 -->
    <div class="drawer-footer">
      <el-button
        v-waves
        :loading="confirmLoading"
        size="medium"
        type="primary"
        class="button_style"
        @click="handleAdd">
        {{ $t('btn.confirm') }}
      </el-button>
    </div>
  </div>
</template>

<script>
import waves from '@/directive/waves'
import { fetchRentOptions } from '@/api/spcDmand'
import tinymce from '@/components/Tinymce/index.vue'
import { insertMch } from '@/api/spcMch'

export default {
  name: 'MchtMng',
  directives: { waves },
  // eslint-disable-next-line vue/no-unused-components
  components: { tinymce },
  props: {
    dmandCndtnId: {
      type: String,
      default: ''
    },
    cnsmrId: {
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
      dmand: {
        rentRsrcId: '',
        dmandCndtnId: '',
        cnsmrId: '',
        rentState: '01'
      },
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
    },
    async editCheck() {
      this.spaceOptions = (await fetchRentOptions(this.$store.getters.mberId)).list
      setTimeout(() => {
        this.listLoading = false
      }, 300)
    },
    handleAdd() {
      this.confirmLoading = true
      this.$confirm(this.$t('message.rent.addMch'), {
        confirmButtonText: this.$t('btn.confirm'),
        cancelButtonText: this.$t('btn.cancel'),
        type: 'warning'
      }).then(() => {
        this.dmand.dmandCndtnId = this.dmandCndtnId
        this.dmand.cnsmrId = this.cnsmrId
        insertMch(this.dmand).then(response => {
          this.confirmLoading = false
          this.$message.success(this.$t('message.success'))
          this.$router.push({ name: 'DmandListSupler' })
        }).catch(() => {
          this.confirmLoading = false
        })
      }).catch(() => {
        this.confirmLoading = false
      })
    },
    goEdit(id) {
      this.$router.push({ name: 'RentManagement', params: { rentRsrcId: id }})
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
