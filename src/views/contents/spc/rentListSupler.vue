<template>
  <div id="enrollment-list">
    <div class="all-content-box">
      <Header title="등록내역" :is-back-dark="true" :on-register="true" @click="goCreate"/>
      <div class="topcontainer">
        <div class="text-box">{{ topContainer.textBox }}</div>
        <div class="select-text-container">
          <dt class="select-wraper" @click="optionOpen = true">
            <p class="place-holder">{{ selectNm }}</p>
          </dt>
        </div>
        <div class="reset-button">
          <img src="@/assets/image/space/icons/filter.png">
        </div>
      </div>

      <dl>
        <dt v-for="post in postList" :key="post.index" class="eachPost">
          <div class="areaname">{{ post.sj }}</div>
          <div class="left-content-container" @click="goInfo(post.rentRsrcId)">
            <div class="left-aria">
              <img :src="post.fileUrl">
            </div>
            <div class="right-aria">
              <dl class="right-top">
                <dt class="facility-ctgr">{{ post.useClNm }}</dt>
                <dt class="facility-size">{{ post.area }} ㎡</dt>
              </dl>
              <div class="right-title">
                <p v-if="post.rentType === '1'">{{ post.rentTypeNm }} {{ post.dpst | numberToKorean }}원</p>
                <p v-else>{{ post.rentTypeNm }} {{ post.dpst | numberToKorean }} / {{ post.mtyRent | numberToKorean }}원</p>
              </div>
              <div class="right-middle">
                <p>
                  <span>분리공간{{ post.sepratSpcCnt }}개</span>
                  <span>{{ post.crrspndFloor + '/' + post.allFloor }}층</span>
                  <span>관리비 {{ post.manageAmt | numberToKorean }}원</span>
                </p>
              </div>
              <div class="right-bottom">{{ post.dscrp }}</div>
            </div>
          </div>
        </dt>
      </dl>
    </div>
    <SelectBox :open="optionOpen" :header="listHeader" :option-list="optionList" @select="onClickOptionItem"/>
    <div class="more-button">
      더보기
    </div>
  </div>
</template>

<script>
import Header from '@/components/space/Header/Index'
import SelectBox from '@/components/space/SelectBox/Index'
import { fetchSuplerRentList } from '@/api/spcRent'
import { selectCodeList } from '@/api/com'
import { numberToKorean } from '@/utils/space'

export default {
  name: 'RentListSupler',
  components: {
    Header, SelectBox
  },
  filters: {
    numberToKorean(val) {
      return numberToKorean(val)
    }
  },
  data() {
    return {
      selectNm: '업무시설',
      optionOpen: false,
      listHeader: '업무시설',
      optionList: ['전체', '현장실사요청', '임대조건 조정요청', '임대조건 조정완료', '계약서작성', '계약대기', '계약서변경요청', '계약파기', '임대조건 조정요청', '임대조건 조정완료', '계약서작성', '계약대기', '계약서변경요청', '계약파기'],
      topContainer: {
        textBox: ''
      },
      listQuery: {
        searchKeyword: '',
        useCl: '',
        addr: '',
        page: 1,
        size: 10
      },
      postList: [],
      useClOptions: []
    }
  },
  created() {
    this.dataCheck()
  },
  methods: {
    async dataCheck() {
      this.useClOptions = (await selectCodeList('USE_CL')).list
      const response = await fetchSuplerRentList(this.listQuery)
      this.postList = response.list
      this.topContainer.textBox = '총 ' + response.totCnt + '건'
    },
    onClickOptionItem(option) {
      this.optionOpen = false
      this.selectNm = option
    },
    goCreate() {
      this.$router.push({ name: 'RentManagement' })
    },
    goInfo(id) {
      this.$router.push({ name: 'RentInfo', params: { rentRsrcId: id }})
    }
  }
}
</script>
<style>
dl .eachPost .left-content-container .left-aria img{
  height: 2.1rem
}
</style>
