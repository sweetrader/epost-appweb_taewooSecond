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
        <!--
        <div class="map-aria">
          <img src="@/assets/image/space/temp/map.png">
        </div>
-->
        <div :id="elementId" class="map-aria" :style="{ width, height, marginBottom }">
          <!--daum kakao map-->
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

<!--<template>
  <div v-loading="dataLoading" class="has-head-container">
    <sticky :class-name="'sub-navbar'">
      <el-row type="flex" align="middle" justify="space-between">
        <p>{{ $t('title.spc.rent') }}</p>
      </el-row>
    </sticky>

    <div class="app-container">
      <div class="filter-container">
        <el-row class="filter-item">

          &lt;!&ndash; 사용분류 &ndash;&gt;
          <el-select v-model="listQuery.searchUseCl" clearable style="width: 100px" class="filter-item">
            <el-option v-for="item in useClOptions" :key="item.codeDtl" :label="item.dtlNm" :value="item.codeDtl"/>
          </el-select>
          &lt;!&ndash; 제휴사 명 &ndash;&gt;
          <el-input
            v-model="listQuery.addr"
            :placeholder="$t('placeholder.search')"
            style="width: 200px;"
            class="filter-item"
            @keyup.enter.native="getList"/>

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

      <template>
        <div :id="elementId" :style="{ width, height, marginBottom }">
          &lt;!&ndash; daum kakao map &ndash;&gt;
        </div>
      </template>

      <el-table :data="list" border style="max-width: 1400px !important;">
        <el-table-column :label="$t('spc.sj')" align="left" min-width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.useClNm }}</span> | <span class="edit_button" style="font-size: small" @click="goInfo(scope.row.rentRsrcId)">{{ scope.row.rentTypeNm + ' ' + scope.row.rent }}</span>
            <span v-if="scope.row.sj !== ''" style="font-size: smaller"><br>면적 {{ scope.row.area }}㎡</span>
            <span style="font-size: smaller"><br>{{ scope.row.dscrp }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('btn.spc.query')" align="center" min-width="50">
          <template slot-scope="scope">
            <el-button v-show="scope.row.mberId !== $store.getters.mberId" type="warning" size="mini" @click="handleMch(scope.row.rentRsrcId)">{{ $t('btn.spc.query') }}</el-button>
          </template>
        </el-table-column>
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
        :auth="listQuery.auth"
        :drawer-open-checker.sync="drawerInfo.rightDrawer"
        :close-drawer="handleDrawerClose"/>
    </el-drawer>
  </div>
</template>-->

<script>
import waves from '@/directive/waves'
import Map from '@/utils/map'
import { fetchCnsmrRentList, editRentDel } from '@/api/spcRent'
import { selectCodeList } from '@/api/com'
import { insertMch } from '@/api/spcMch'
import Header from '@/components/space/Header/Index'
import Tab from '@/components/space/Tab/Index'

export default {
  name: 'RentManagement',
  directives: { waves },
  components: { Header, Tab },
  utils: { Map },
  props: {
    width: {
      type: String,
      required: false,
      default: '100%'
    },
    height: {
      type: String,
      required: false,
      default: '100vh'
    },
    marginBottom: {
      type: String,
      required: false,
      default: '20px'
    }
  },
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
        useCl: '',
        addr: '서울 중구',
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
        rentRsrcId: '',
        rentState: ''
      },
      useClOptions: null,
      map: null,
      elementId: 'mapElement',
      markers: [],
      addrs: [],
      sj: [],
      coords: []
    }
  },
  watch: {
    markers: {
      handler() {
        if (typeof window === 'undefined') return // SSR
        this.initMap(this.markers)
      },
      immediate: true
    }
  },
  created() {
    this.getList()
  },
  methods: {
    async initMap() {
      if (!this.map) {
        const map = new Map()
        await map.mount(this.elementId)
        this.map = map
      } else {
        this.map.clearMarkers()
      }
    },
    async getList() {
      this.dataLoading = true
      this.markers = []
      this.sj = []
      const response = await fetchCnsmrRentList(this.listQuery)

      this.list = response.list
      this.totCnt = response.totCnt
      this.useClOptions = (await selectCodeList('USE_CL')).list

      setTimeout(() => {
        this.dataLoading = false
        const testMap = this.map
        for (const i in this.list) {
          const address = this.list[i].addr + ' ' + this.list[i].addrDtl
          const markerPosition = testMap.getLatLng(address)
          this.markers.push(markerPosition)
          const content = '<div class="wrap">' +
            '    <div class="info">' +
            '        <div class="title">' + this.list[i].sj + '</div>' +
            '        <div class="body">' +
            '            <div class="img">' +
            '                <img src="https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/box_movie.png" width="73" height="70">' +
            '           </div>' +
            '            <div class="desc">' +
            '                <div class="ellipsis">' + address + '</div>' +
            '                <div class="jibun ellipsis">(우) 63309 (지번) 영평동 2181</div>' +
            '                <div><a href="https://www.kakaocorp.com/main" target="_blank" class="link">홈페이지</a></div>' +
            '            </div>' +
            '        </div>' +
            '    </div>' +
            '</div>'
          this.sj.push(content)
        }
        setTimeout(() => {
          testMap.addMarkers(
            this.markers.map(
              (marker) => {
                const { name, type, location: { lat, lng }} = marker
                return {
                  lat,
                  lng,
                  clusterKey: type,
                  title: name,
                  iwContents: this.sj,
                  onClick: () => {
                    this.$emit('click-marker', marker)
                  }
                }
              }
            )
          )
          if (this.markers.length > 0) {
            this.map.setCenter(this.markers[0].location)
          }
        }, 300)
      }, 300)
    },
    goInfo(id) {
      this.$router.push({ name: 'RentInfo', params: { rentRsrcId: id }})
    },
    handleMch(id) {
      this.confirmLoading = true
      this.$confirm(this.$t('message.rent.addMch'), {
        confirmButtonText: this.$t('btn.confirm'),
        cancelButtonText: this.$t('btn.cancel'),
        type: 'warning'
      }).then(() => {
        this.rent.rentRsrcId = id
        this.rent.rentState = '02'
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
.wrap {position: absolute;left: 0;bottom: 40px;width: 244px;height: 112px;margin-left: -122px;text-align: left;overflow: hidden;font-size: 10px;font-family: 'Malgun Gothic', dotum, '돋움', sans-serif;line-height: 1.5;}
.wrap * {padding: 0;margin: 0;}
.wrap .info {width: 226px;height: 100px;border-radius: 5px;border-bottom: 2px solid #ccc;border-right: 1px solid #ccc;overflow: hidden;background: #fff;}
.wrap .info:nth-child(1) {border: 0;box-shadow: 0px 1px 2px #888;}
.info .title {padding: 5px 0 0 10px;height: 30px;background: #eee;border-bottom: 1px solid #ddd;font-size: 15px;font-weight: bold;}
.info .close {position: absolute;top: 10px;right: 10px;color: #888;width: 17px;height: 17px;background: url('https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/overlay_close.png');}
.info .close:hover {cursor: pointer;}
.info .body {position: relative;overflow: hidden;}
.info .desc {position: relative;margin: 13px 0 0 65px;height: 55px;}
.desc .ellipsis {overflow: hidden;text-overflow: ellipsis;white-space: nowrap;}
.desc .jibun {font-size: 11px;color: #888;margin-top: -2px;}
.info .img {position: absolute;top: 9px;left: 5px;width: 53px;height: 51px;border: 1px solid #ddd;color: #888;overflow: hidden;}
.info:after {content: '';position: absolute;margin-left: -12px;left: 50%;bottom: 0;width: 22px;height: 12px;background: url('https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/vertex_white.png')}
.info .link {color: #5085BB;}
.bottom-aria {z-index: 1;}
</style>
