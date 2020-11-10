<template>
  <div id="post-detail">
    <div class="document-container">
      <Header title="게시글 상세" :on-menu="true" :menu-close="menuClose" @click="goEdit(rentRsrcId)"/>
      <div @click="onCloseMenu()">
        <div class="document-image">
          <Swiper :get-list="imgList"/>
        </div>
        <div class="document-icon-title-subtitle">
          <div class="icon-box">
            <p class="document-icon">{{ rent.useClNm }}</p>
          </div>
          <div v-if="rent.rentType === '1'" class="document-title">{{ rent.rentTypeNm }} {{ rent.dpst | numberToKorean }}원</div>
          <div v-else class="document-title">{{ rent.rentTypeNm }} {{ rent.dpst | numberToKorean }} / {{ rent.mtyRent | numberToKorean }}원</div>
          <div class="document-subtitle">{{ rent.sj }}</div>
        </div>
        <div class="room-sub-info">
          <div class="room-area-info">
            <div class="room-area-icon">
              <img src="@/assets/image/space/icons/areaImage.png">
            </div>
            <p class="room-area-text">전용면적</p>
            <div class="room-area">{{ rent.area }}㎡</div>
          </div>
          <div class="room-space-info">
            <div class="room-space-icon">
              <img src="@/assets/image/space/icons/spaceImage.png">
            </div>
            <p class="room-space-text">공간</p>
            <div class="room-space">{{ rent.sepratSpcCntNm }}</div>
          </div>
          <div class="room-floors-info">
            <div class="room-floors-icon">
              <img src="@/assets/image/space/icons/floorsImage.png">
            </div>
            <p class="room-floors-text">층수</p>
            <div class="room-fllors">{{ rent.crrspndFloor + '/' + rent.allFloor }}층</div>
          </div>
          <div class="room-cost-info">
            <div class="room-cost-icon">
              <img src="@/assets/image/space/icons/costImage.png">
            </div>
            <p class="room-cost-text">관리비</p>
            <div class="room-cost">{{ rent.manageAmt | numberToKorean }}원</div>
          </div>
        </div>
        <div class="map-chat-call">
          <!--<div class="map">
            <img src="@/assets/image/space/icons/mapImage.png">지도</div>-->
          <div class="chat">
            <img src="@/assets/image/space/icons/chatImage.png">채팅</div>
          <div class="call">
            <img src="@/assets/image/space/icons/callImage.png">전화</div>
        </div>
        <div class="room-detail-info-day">
          <ul>
            <div class="room-detail-info">공간정보 상세</div>
          </ul>
          <div class="room-detail-day">{{ rent.registDt }} 등록
          </div>
          <div class="room-detail-arrow" @click="isOpenTabShow1 = !isOpenTabShow1">
            <img :src="isOpenTabShow1 ? require('@/assets/image/space/icons/uparrow.png') : require('@/assets/image/space/icons/dwonarrow.png')"></div>
        </div>
        <div v-if="isOpenTabShow1" class="room-detail-info-content">
          <ul>
            <div class="room-detail-title"> <p> 소재지 </p>
              <p> 용도 </p>
              <p> 방향 </p>
              <p> 엘리베이터 </p>
              <p> 상하차여부 </p>
              <p> 난방종류 </p>
              <p> 택배접수 </p>
              <p> 입주가능일 </p>
              <p> 건축물용도 </p>
              <p> 준공인가일 </p>
              <p> 상세설명 </p>
            </div>
          </ul>

          <ul>
            <div class="room-detail-content"> <p> {{ rent.addr }} </p>
              <p> {{ rent.useClNm }} </p>
              <p> {{ rent.drcNm }} </p>
              <p> {{ rent.elevtCntNm }} </p>
              <p v-if="rent.hhlwYn === 'Y'"> 가능 </p><p v-else> 불가 </p>
              <p> {{ rent.heatTypeNm }} </p>
              <p v-if="rent.dlvryYn === 'Y'"> 가능 </p><p v-else> 불가 </p>
              <p> {{ rent.mvPosblBgnDe }} </p>
              <p> {{ rent.bildPrposNm }} </p>
              <p> {{ rent.comptConfmDe }} </p>
              <p> {{ rent.dscrp }} </p>
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
            <div class="producer-title"><p>이름</p>
              <p>연락처</p>
            </div>
          </ul>
          <ul>
            <div class="producer-content"><p>{{ rent.suplerNm }}</p>
              <p>{{ rent.suplerTelno }}</p></div>
          </ul>
        </div>
      </div>
    </div>
    <BottomButton :one-button="'관심등록'" :is-valid="true"/>
  </div>
</template>

<script>
import { fetchRentDetail, fetchRentImgList } from '@/api/spcRent'
import { insertMch } from '@/api/spcMch'
import Header from '@/components/space/Header/Index'
import BottomButton from '@/components/space/BottomButton/Index'
import Swiper from '@/components/space/swiper/Index'
import { numberToKorean } from '@/utils/space'

export default {
  name: 'RentInfo',
  components: {
    Header, BottomButton, Swiper
  },
  filters: {
    numberToKorean(val) {
      return numberToKorean(val)
    }
  },
  props: {
    rentRsrcId: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      menuClose: false,
      isHeaderMenuClose: null,
      imgList: [],
      isOpenTabShow1: true,
      isOpenTabShow2: true,
      listQuery: {
        rentRsrcId: ''
      },
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
        sepratSpcCntNm: '',
        allFloor: '',
        crrspndFloor: '',
        bildPrpos: '',
        bildPrposNm: '',
        hhlwYn: '',
        drc: '',
        drcNm: '',
        manageAmt: '',
        comptConfmDe: '',
        dscrp: '',
        parkingAllCnt: '',
        parkingPosblCnt: '',
        elevtCnt: '',
        elevtCntNm: '',
        heatType: '',
        heatTypeNm: '',
        dlvryYn: '',
        rentType: '',
        rentTypeNm: '',
        dpst: '',
        mtyRent: '',
        rentBgnDe: '',
        rentEndDe: '',
        mvPosblBgnDe: '',
        immediatelyYn: '',
        suplerNm: '',
        suplerTelno: '',
        registDt: '',
        rentState: '02',
        cnsmrId: this.$store.getters.mberId
      }
    }
  },
  watch: {
  },
  created() {
    this.dataCheck()
  },
  methods: {
    async dataCheck() {
      if (this.rentRsrcId !== '') {
        const response = await fetchRentDetail(this.rentRsrcId)
        this.rent = response

        this.listQuery.rentRsrcId = this.rentRsrcId
        const responseList = (await fetchRentImgList(this.listQuery)).list
        for (let i = 0; i < responseList.length; i++) {
          this.imgList.push(responseList[i].fileUrl)
        }
      } else {
        this.$router.push({ name: 'RentListSupler' })
      }
    },
    onCloseMenu() {
      this.menuClose = true
    },
    goEdit(id) {
      this.$router.push({ name: 'RentManagement', params: { rentRsrcId: id }})
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
    }
  }
}
</script>
