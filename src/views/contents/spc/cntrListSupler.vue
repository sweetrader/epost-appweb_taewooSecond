<template>
  <div v-loading="dataLoading" class="has-head-container">
    <sticky :class-name="'sub-navbar'">
      <el-row type="flex" align="middle" justify="space-between">
        <p>{{ $t('title.spc.cntr') }}</p>
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

          <!-- 진행상태 -->
          <el-select v-model="listQuery.rentState" clearable style="width: 100px" class="filter-item">
            <el-option v-for="item in rentStateOptions" :key="item.codeDtl" :label="item.dtlNm" :value="item.codeDtl"/>
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
            <span>{{ scope.row.useClNm }}</span> | <span class="edit_button" style="font-size: medium" @click="goInfo(scope.row.cntrId)">{{ scope.row.rentTypeNm + ' ' + scope.row.rent }}</span>
            <span style="font-size: smaller"><br>면적 {{ scope.row.area }}㎡</span>
            <span style="font-size: smaller"><br>{{ scope.row.dscrp }}</span>
          </template>
        </el-table-column>

        <el-table-column align="center" width="70" class-name="small-padding fixed-width">
          <template slot-scope="scope">
            <span style="font-weight: bold">{{ scope.row.rentStateNm }}</span>
          </template>
        </el-table-column>
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
import { fetchSuplerCntrList } from '@/api/spcCntr'
import { selectCodeList } from '@/api/com'

export default {
  name: 'CntrManagement',
  directives: { waves },
  components: { Sticky, Pagination },
  data() {
    return {
      dataLoading: false,
      listQuery: {
        searchKeyword: '',
        useCl: '',
        rentState: '',
        suplerId: '',
        cnsmrId: '',
        page: 1,
        size: 10
      },
      totCnt: 0,
      list: null,
      drawerInfo: {
        title: '',
        rightDrawer: false,
        confirmType: 'add',
        editCntrCd: ''
      },
      cntr: {
        rsrcCntrId: ''
      },
      useClOptions: null,
      rentStateOptions: null
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
      const response = await fetchSuplerCntrList(this.listQuery)

      this.list = response.list
      this.totCnt = response.totCnt

      this.useClOptions = (await selectCodeList('USE_CL')).list
      this.rentStateOptions = (await selectCodeList('RENT_STATE')).list
      setTimeout(() => {
        this.dataLoading = false
      }, 300)
    },
    goInfo(id) {
      this.$router.push({ name: 'CntrInfoSupler', params: { cntrId: id }})
    },
    handleDrawerClose() {
      this.drawerInfo.rightDrawer = false
      this.getList()
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
.el-drawer__body{
  overflow-y: scroll
}
</style>
