<template>
  <div id="post_list">
    <Header title="게시글 보기"/>
    <Tab/>
    <template v-if="isRegisteredFavorJob">
      <section class="register-alert">
        <img src="@/assets/image/space/icons/man.png">
        <p class="notice">
          공간공유 게시글 보기는<br><span>관심업무를 등록</span>하여야 이용이 가능합니다.
        </p>
        <div class="register-button">관심업무 등록</div>
      </section>
    </template>
    <template v-else-if="isMapView">
      <section class="search-region-section">
        <dl>
          <dt class="address-wraper">서울 특별시 중구</dt>
          <dt class="select-wraper">
            <select>
              <option selected>업무시설</option>
            </select>
          </dt>
          <dt class="filter-wraper"/>
        </dl>
        <div class="map-aria">
          <img src="@/assets/image/space/temp/map.png">
        </div>
        <div class="bottom-aria">
          이 지역 공유 가능 공간
          <span>
            325
          </span>
        </div>
      </section>
    </template>
    <template v-else>

      <section class="search-post-section">
        <p class="guide-txt">찾으시는 공간의 정보를 선택해 주세요.</p>
        <div class="inner-section">
          <dt class="choose-region">지역선택</dt>
          <select>
            <option selected>업무시설 선택</option>
          </select>
          <dl>
            <dt :class="tabOn[0] ? 'each-button on border-radius-left' :'each-button border-radius-left'">
              <img v-if="tabOn[0]" src="@/assets/image/space/icons/path-red.png">전체
            </dt>
            <dt :class="tabOn[1] ? 'each-button on' :'each-button border-left-none'">
              <img v-if="tabOn[1]" src="@/assets/image/space/icons/path-red.png">월세</dt>
            <dt :class="tabOn[2] ? 'each-button on border-radius-right' :'each-button border-radius-right'">
              <img v-if="tabOn[2]" src="@/assets/image/space/icons/path-red.png">전세
            </dt>
          </dl>

        </div>
        <div class="search-button">
          조회하기
        </div>
      </section>
      <section class="post-list-section">
        <div class="title">최근 등록된 게시글</div>
        <dl>
          <dt v-for="post in postList" :key="post.index" class="eachPost">
            <div class="left-aria">
              <img :src="post.img">
            </div>
            <div class="right-aria">
              <dl class="right-top">
                <dt class="facility-ctgr">{{ post.ctgr }}</dt>
                <dt class="facility-size">{{ post.size }}m2</dt>
              </dl>
              <div class="right-title">
                <p>{{ post.title }}</p>
              </div>
              <div class="right-middle">
                <p>
                  <span>분리공간{{ post.seperationAmount }}개</span>
                  <span>{{ post.floor }}층</span>
                  <span>관리비 {{ post.maintenanceFee }}만원</span>
                </p>
              </div>
              <div class="right-bottom">{{ post.explain }}</div>
            </div>
          </dt>
        </dl>
      </section>
    </template>
  </div>
</template>

<!--

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
          &lt;!&ndash; 제목검색 &ndash;&gt;
          <el-input
            v-model="listQuery.searchKeyword"
            :placeholder="$t('placeholder.titleSearch')"
            style="width: 200px;"
            class="filter-item"
            @keyup.enter.native="getList"/>

          &lt;!&ndash; 사용분류 &ndash;&gt;
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

        &lt;!&ndash;<el-table-column v-if="listQuery.auth === 'supler'" :label="$t('orgManagement.action')" align="center" width="120" class-name="small-padding fixed-width">
          <template slot-scope="scope">
            <el-button type="warning" size="mini" @click="handleDelete(scope.row.rentRsrcId)">{{ $t('btn.delete') }}</el-button>
          </template>
        </el-table-column>&ndash;&gt;
      </el-table>
      <pagination v-show="totCnt>0" :total="totCnt" :page.sync="listQuery.page" :limit.sync="listQuery.size" @pagination="getList"/>
    </div>

    &lt;!&ndash; 우측 사이드 바 수정 폼 &ndash;&gt;
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
-->

<script>
import waves from '@/directive/waves'
import { fetchSuplerRentList, editRentDel } from '@/api/spcRent'
import { selectCodeList } from '@/api/com'
import Header from '@/components/space/Header/Index'
import Tab from '@/components/space/Tab/Index'

export default {
  name: 'RentManagement',
  directives: { waves },
  components: { Header, Tab },
  data() {
    return {
      isRegisteredFavorJob: false,
      isMapView: true,
      tabOn: [false, false, true],
      postList: [
        {
          img: require('@/assets/image/space/temp/space1.png'),
          ctgr: '사무실',
          size: 84,
          title: '전세 1억 7,000',
          seperationAmount: 3,
          floor: '5/11',
          maintenanceFee: 35,
          explain: '명동역 5번 출구에서 도보3분 걸립니다. 오셔서번...'
        },
        {
          img: require('@/assets/image/space/temp/space1.png'),
          ctgr: '유해물보관창고',
          size: 860,
          title: '월세 1,000/70',
          seperationAmount: 3,
          floor: '5/11',
          maintenanceFee: 35,
          explain: '명동역 5번 출구에서 도보3분 걸립니다. 오셔서번...'
        }
      ],
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
