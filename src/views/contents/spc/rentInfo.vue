<template>
  <div id="post-detail">
    <div class="document-container">
      <Header title="게시글 상세" :on-menu="true"/>
      <div class="document-image">
        <Swiper :get-list="imgList"/>
      </div>
      <div class="document-icon-title-subtitle">
        <div class="icon-box">
          <p class="document-icon">{{ document.icon }}</p>
        </div>
        <div class="document-title">{{ document.title }}</div>
        <div class="document-subtitle">{{ document.subtitle }}</div>
      </div>
      <div class="room-sub-info">
        <div class="room-area-info">
          <div class="room-area-icon">
            <img src="@/assets/image/space/icons/areaImage.png">
          </div>
          <p class="room-area-text">전용면적</p>
          <div class="room-area">{{ roomAreaTextSection.roomArea }}</div>
        </div>
        <div class="room-space-info">
          <div class="room-space-icon">
            <img src="@/assets/image/space/icons/spaceImage.png">
          </div>
          <p class="room-space-text">공간</p>
          <div class="room-space">{{ roomSpaceTextSection.roomSpace }}</div>
        </div>
        <div class="room-floors-info">
          <div class="room-floors-icon">
            <img src="@/assets/image/space/icons/floorsImage.png">
          </div>
          <p class="room-floors-text">층수</p>
          <div class="room-fllors">{{ roomFloorsTextSection.roomFloors }}</div>
        </div>
        <div class="room-cost-info">
          <div class="room-cost-icon">
            <img src="@/assets/image/space/icons/costImage.png">
          </div>
          <p class="room-cost-text">관리비</p>
          <div class="room-cost">{{ roomCostTextSection.roomCost }}</div>
        </div>
      </div>
      <div class="map-chat-call">
        <div class="map">
          <img src="@/assets/image/space/icons/mapImage.png">지도</div>
        <div class="chat">
          <img src="@/assets/image/space/icons/chatImage.png">채팅</div>
        <div class="call">
          <img src="@/assets/image/space/icons/callImage.png">전화</div>
      </div>
      <div class="room-detail-info-day">
        <ul>
          <div class="room-detail-info">공간정보 상세</div>
        </ul>
        <div class="room-detail-day">{{ roomDetailInfoDay.roomDetailDay }}
        </div>
        <div class="room-detail-arrow" @click="isOpenTabShow1 = !isOpenTabShow1">
          <img :src="isOpenTabShow1 ? require('@/assets/image/space/icons/uparrow.png') : require('@/assets/image/space/icons/dwonarrow.png')"></div>
      </div>
      <div v-if="isOpenTabShow1" class="room-detail-info-content">
        <ul>
          <div class="room-detail-title"> <p> {{ roomDetailInfoContent.roomDetailTitle }} </p>
            <p> {{ roomDetailUsageSouthward.roomDetailUsage }} </p>
            <p> {{ roomDetailDirectionOne.roomDetailDirection }} </p>
            <p> {{ roomDetailElevatorCount.roomDetailElevator }} </p>
            <p> {{ roomDetailUpDownOk.roomDetailUpOk }} </p>
            <p> {{ roomDetailHeatingWhether.roomDetailHeating }} </p>
            <p> {{ roomDetailDeliveryOk.roomDetailDelivery }} </p>
            <p> {{ roomDetailMoveinDay.roomDetailMovein }} </p>
            <p> {{ roomDetailBuildeUsage.roomDetailBuilde }} </p>
            <p> {{ roomDetailBuildeDate.roomDetailBuildeDay }} </p>
            <p> {{ roomDetailMoreInfo.roomDetailInfo }} </p>
          </div>
        </ul>

        <ul>
          <div class="room-detail-content"> <p> {{ roomDetailInfoContent.roomDetailContent }} </p>
            <p> {{ roomDetailUsageSouthward.roomDetailSouthward }} </p>
            <p> {{ roomDetailDirectionOne.roomDetailOne }} </p>
            <p> {{ roomDetailElevatorCount.roomDetailCount }} </p>
            <p> {{ roomDetailUpDownOk.roomDetailOk }} </p>
            <p> {{ roomDetailHeatingWhether.roomDetailWhether }} </p>
            <p> {{ roomDetailDeliveryOk.roomDetailOk }} </p>
            <p> {{ roomDetailMoveinDay.roomDetailNow }} </p>
            <p> {{ roomDetailBuildeUsage.roomDetailContainer }} </p>
            <p> {{ roomDetailBuildeDate.roomDetailDate }} </p>
            <p> {{ roomDetailMoreInfo.roomDetailContentInfo }} </p>
          </div>
        </ul>
      </div>
      <div class="producer-info">
        <ul>
          <div class="producer-title">공급자 정보</div>
        </ul>
        <div class="producer-arrow" @click="isOpenTabShow2 = !isOpenTabShow2">
          <img :src="isOpenTabShow2 ? require('@/assets/image/space/icons/uparrow.png') : require('@/assets/image/space/icons/dwonarrow.png')"></div>
      </div>
      <div v-if="isOpenTabShow2" class="producer-title-content">
        <ul>
          <div class="producer-title"><p> {{ producerTitleContent.producerTitle }}</p>
            <p>{{ producerPhoneNumber.producerPhone }}</p>
          </div>
        </ul>
        <ul>
          <div class="producer-content"><p>{{ producerTitleContent.producerContent }}</p>
            <p>{{ producerPhoneNumber.producerNumber }}</p></div>
        </ul>
      </div>
    </div>
    <BottomButton :one-button="'관심등록'" :is-valid="true"/>
  </div>
</template>

<!--

<template>
  <div v-loading="dataLoading" class="has-head-container">
    <sticky :class-name="'sub-navbar'">
      <el-row type="flex" align="middle" justify="space-between">
        <p>{{ $t('title.spc.rent') }}</p>

        <el-button
          v-show="rent.mberId !== $store.getters.mberId"
          v-waves
          type="info"
          class="filter-item"
          icon="el-icon-edit"
          @click="handleMch">
          {{ $t('btn.spc.query') }}
        </el-button>

      </el-row>
    </sticky>

    <div class="app-container">
      <el-form ref="ruleForm" :rules="rules" :model="rent" label-position="left" label-width="100px">

        <div style="color: red; font-weight: bold; margin-top: 10px; margin-bottom: 10px">기본정보</div>

        &lt;!&ndash; 제목 &ndash;&gt;
        <el-form-item :label="$t('spc.sj')" prop="sj">
          <span>{{ rent.sj }}</span>
        </el-form-item>

        &lt;!&ndash; 주소 &ndash;&gt;
        <el-form-item :label="$t('spc.addr')" prop="addr">
          <span>{{ rent.addr + ' ' + rent.addrDtl }}</span>
        </el-form-item>

        &lt;!&ndash; 사용분류 &ndash;&gt;
        <el-form-item :label="$t('spc.useCl')" prop="useCl">
          <span>{{ rent.useClNm }}</span>
        </el-form-item>

        &lt;!&ndash; 면적 &ndash;&gt;
        <el-form-item :label="$t('spc.area')" prop="area">
          <span>{{ rent.area }} ㎡</span>
        </el-form-item>

        <div style="color: red; font-weight: bold; margin-top: 10px; margin-bottom: 10px">추가정보</div>

        &lt;!&ndash; 주차대수 &ndash;&gt;
        <el-form-item :label="$t('spc.parking')" prop="parkingPosblCnt">
          <span>{{ rent.parkingPosblCnt }} / {{ rent.parkingAllCnt }} 대</span>
        </el-form-item>

        &lt;!&ndash; 엘리베이터 &ndash;&gt;
        <el-form-item :label="$t('spc.elevt')" prop="elevtCnt">
          <span>{{ rent.elevtCnt }} 대</span>
        </el-form-item>

        <div style="color: red; font-weight: bold; margin-top: 10px; margin-bottom: 10px">임대정보</div>

        &lt;!&ndash; 임대유형 &ndash;&gt;
        <el-form-item :label="$t('spc.rentType')" prop="rentType">
          <span>{{ rent.rentTypeNm }}</span>
        </el-form-item>

        &lt;!&ndash; 보증금 &ndash;&gt;
        <el-form-item :label="$t('spc.dpst')" prop="dpst">
          <span>{{ rent.dpst | comma }}원</span>
        </el-form-item>

        &lt;!&ndash; 월세 &ndash;&gt;
        <el-form-item :label="$t('spc.mtyRent')" prop="mtyRent">
          <span>{{ rent.mtyRent | comma }}원</span>
        </el-form-item>

        &lt;!&ndash; 임대기간 &ndash;&gt;
        <el-form-item :label="$t('spc.rentDe')" prop="rentBgnDe">
          <span>{{ rent.rentBgnDe }} ~ {{ rent.rentEndDe }}</span>
        </el-form-item>

      </el-form>
    </div>

    &lt;!&ndash; 버튼 영역 &ndash;&gt;
    <div class="drawer-footer">
      <el-button
        v-show="rent.mberId !== $store.getters.mberId"
        v-waves
        :loading="confirmLoading"
        size="medium"
        type="primary"
        class="button_style"
        @click="handleMch">
        {{ $t('btn.spc.query') }}
      </el-button>
    </div>

  </div>
</template>
-->

<script>
import waves from '@/directive/waves'
import { fetchRentDetail } from '@/api/spcRent'
import { insertMch } from '@/api/spcMch'
import Header from '@/components/space/Header/Index'
import BottomButton from '@/components/space/BottomButton/Index'
import Swiper from '@/components/space/swiper/Index'

export default {
  name: 'RentMng',
  directives: { waves },
  components: { Header, BottomButton, Swiper },
  filters: {
    comma(val) {
      return String(val).replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    }
  },
  props: {
    // edit Seq Info
    rentRsrcId: {
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
      imgList: [
        require('@/assets/image/space/icons/warehouse.png'), require('@/assets/image/space/icons/warehouse.png'), require('@/assets/image/space/icons/warehouse.png')
      ],
      isOpenTabShow1: true,
      isOpenTabShow2: true,
      document: {
        icon: '사무실',
        title: '월세 1,000/100만원',
        subtitle: '명동역 5번 출구에서 도보3분 걸립니다.'
      },
      roomAreaTextSection: {
        roomArea: '100m2'
      },
      roomSpaceTextSection: {
        roomSpace: '3개'
      },
      roomFloorsTextSection: {
        roomFloors: '15/30층'
      },
      roomCostTextSection: {
        roomCost: '35만'
      },
      roomDetailInfoDay: {
        roomDetailDay: '2020-09-16 1:00 등록'
      },
      roomDetailInfoContent: {
        roomDetailTitle: '소재지',
        roomDetailContent: '서울특별시 중구 소공로 70'
      },
      roomDetailUsageSouthward: {
        roomDetailUsage: '용도',
        roomDetailSouthward: '남향'
      },
      roomDetailDirectionOne: {
        roomDetailDirection: '방향',
        roomDetailOne: '1대/100대'
      },
      roomDetailElevatorCount: {
        roomDetailElevator: '엘리베이터',
        roomDetailCount: '1대'
      },
      roomDetailHeatingWhether: {
        roomDetailHeating: '난방종류',
        roomDetailWhether: '개별난방'
      },
      roomDetailUpDownOk: {
        roomDetailUpOk: '상하차여부',
        roomDetailOk: '가능'
      },
      roomDetailDeliveryOk: {
        roomDetailDelivery: '택배바로접수',
        roomDetailOk: '가능'
      },
      roomDetailMoveinDay: {
        roomDetailMovein: '입주가능일',
        roomDetailNow: '즉시'
      },
      roomDetailBuildeUsage: {
        roomDetailBuilde: '건축물용도',
        roomDetailContainer: '창고시설'
      },
      roomDetailBuildeDate: {
        roomDetailBuildeDay: '준공인가일',
        roomDetailDate: '2020.01.01'
      },
      roomDetailMoreInfo: {
        roomDetailInfo: '상세설명',
        roomDetailContentInfo: '서울중앙우체국 5층 사무실입니다. 안락하며 구내 식당이 있습니다.'
      },
      producerTitleContent: {
        producerTitle: '이름',
        producerContent: '김첨지'
      },
      producerPhoneNumber: {
        producerPhone: '연락처',
        producerNumber: '010-2365-2365'
      },
      dataLoading: false,
      confirmLoading: false,
      preFncDiv: '',
      orgList: null,
      rent: {
        rentRsrcId: '',
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
        immediatelyYn: '',
        rentState: '02',
        cnsmrId: this.$store.getters.mberId
      },
      rules: {
        sj: [{ required: true, message: this.$t('message.valid_required'), trigger: 'blur' }]
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
      setTimeout(() => {
        this.dataLoading = false
      }, 300)
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
            this.rent.rentRsrcId = this.rentRsrcId
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
<!--

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
  .el-input&#45;&#45;suffix .el-input__inner{
    padding-right: 10px;
  }
</style>
-->
