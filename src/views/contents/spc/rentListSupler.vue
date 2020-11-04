<template>
  <div v-loading="dataLoading" class="has-head-container">
    <sticky :class-name="'sub-navbar'">
      <el-row type="flex" align="middle" justify="space-between">
        <p>{{ $t('title.spc.rent') }}</p>

        <el-button
          v-waves
          class="filter-item"
          type="info"
          icon="el-icon-edit"
          @click="goCreate()">
          {{ $t('btn.add') }}
        </el-button>
      </el-row>
    </sticky>

    <div class="app-container">
      <div class="filter-container">
        <el-row class="filter-item">
          <!-- 제목검색 -->
          <el-input
            v-model="listQuery.searchKeyword"
            :placeholder="$t('placeholder.titleSearch')"
            style="width: 200px;"
            class="filter-item"
            @keyup.enter.native="getList"/>

          <!-- 사용분류 -->
          <el-select v-model="listQuery.useCl" clearable style="width: 100px" class="filter-item">
            <el-option v-for="item in useClOptions" :key="item.codeDtl" :label="item.dtlNm" :value="item.codeDtl"/>
          </el-select>

          <el-button
            v-waves
            class="filter-item"
            type="info"
            plain
            icon="el-icon-search"
            @click="getList()">
            {{ $t('btn.search') }}
          </el-button>
        </el-row>
      </div>

      <el-table :data="list" border style="max-width: 1400px !important;">
        <el-table-column :label="$t('spc.sj')" align="left" min-width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.useClNm }}</span> | <span class="edit_button" style="font-size: large" @click="goEdit(scope.row.rentRsrcId)">{{ scope.row.rentTypeNm + ' ' + scope.row.rent }}</span>
            <span v-if="scope.row.sj !== ''" style="font-size: smaller"><br>{{ scope.row.sj }}</span>
            <span style="font-size: smaller"><br>{{ scope.row.addr }} {{ scope.row.addrDtl }}  | 면적 {{ scope.row.area }}㎡</span>
          </template>
        </el-table-column>

        <!--<el-table-column v-if="listQuery.auth === 'supler'" :label="$t('orgManagement.action')" align="center" width="120" class-name="small-padding fixed-width">
          <template slot-scope="scope">
            <el-button type="warning" size="mini" @click="handleDelete(scope.row.rentRsrcId)">{{ $t('btn.delete') }}</el-button>
          </template>
        </el-table-column>-->
      </el-table>
      <pagination v-show="totCnt>0" :total="totCnt" :page.sync="listQuery.page" :limit.sync="listQuery.size" @pagination="getList"/>
    </div>

    <!-- 우측 사이드 바 수정 폼 -->
    <el-drawer
      :title="drawerInfo.title"
      :visible.sync="drawerInfo.rightDrawer"
      direction="rtl"
      size="40%">
      <manage-form
        :confirm-type="drawerInfo.confirmType"
        :rent-rsrc-id="drawerInfo.rentRsrcId"
        :drawer-open-checker.sync="drawerInfo.rightDrawer"
        :close-drawer="handleDrawerClose"/>
    </el-drawer>
  </div>
</template>

<script>
import waves from '@/directive/waves'
import Pagination from '@/components/Pagination'
import Sticky from '@/components/Sticky'
import manageForm from './rentManageForm'
import { fetchSuplerRentList, editRentDel } from '@/api/spcRent'
import { selectCodeList } from '@/api/com'

export default {
  name: 'SpaceManagement',
  directives: { waves },
  components: { Sticky, Pagination, manageForm },
  data() {
    return {
      dataLoading: false,
      listQuery: {
        searchKeyword: '',
        addr: '',
        useCl: '',
        page: 1,
        size: 10
      },
      totCnt: 0,
      list: null,
      drawerInfo: {
        title: '',
        rightDrawer: false,
        confirmType: 'add',
        rentRsrcId: ''
      },
      rent: {
        rentRsrcId: ''
      },
      useClOptions: null
    }
  },
  watch: {

  },
  created() {
    this.getList()
  },
  methods: {
    async getList() {
      this.dataLoading = true

      const response = await fetchSuplerRentList(this.listQuery)
      this.list = response.list
      this.totCnt = response.totCnt

      this.useClOptions = (await selectCodeList('USE_CL')).list

      setTimeout(() => {
        this.dataLoading = false
      }, 300)
    },
    goCreate() {
      this.$router.push({ name: 'RentManagement' })
    },
    goEdit(id) {
      this.$router.push({ name: 'RentManagement', params: { rentRsrcId: id }})
    },
    handleCreate() {
      this.drawerInfo.confirmType = 'add'
      this.drawerInfo.rentRsrcId = ''
      this.drawerInfo.title = this.$t('title.spc.rentInsert')
      this.drawerInfo.rightDrawer = true
    },
    handleEdit(row) {
      this.drawerInfo.confirmType = 'edit'
      this.drawerInfo.rentRsrcId = row
      this.drawerInfo.title = this.$t('title.spc.rentEdit')
      this.drawerInfo.rightDrawer = true
    },
    handleDelete(id) {
      this.confirmLoading = true
      this.rent.rentRsrcId = id
      this.$confirm(this.$t('message.deleteConfirm'), {
        confirmButtonText: this.$t('btn.confirm'),
        cancelButtonText: this.$t('btn.cancel'),
        type: 'warning'
      }).then(() => {
        editRentDel(this.rent).then(response => {
          this.confirmLoading = false
          this.$message.success(this.$t('message.success'))
          this.getList()
        }).catch(() => {
          this.confirmLoading = false
        })
      }).catch(() => {
        this.confirmLoading = false
      })
    },
    handleDrawerClose() {
      this.drawerInfo.rightDrawer = false
      this.getList()
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">

</style>
