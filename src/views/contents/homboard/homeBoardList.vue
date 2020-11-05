<template>
  <div class="app-container">
    <header>
      <a href="#" class="back" @click="$router.back()"/><h1>지원정보</h1>
    </header>
    <div class="jiwon_list">
      <div class="total">
        총 {{ totCnt }}건<div class="filter"/>
      </div>
      <div v-for="homeBoard in homeBoardList" :key="homeBoard.boardId" class="jiwon_list_cell">
        <template v-if="homeBoard.boardType === 'SC'">
          <a :href="homeBoard.linkUrl" target="_blank">
            <span>{{ getBoardTypeStr(homeBoard.boardType) }}</span><b>{{ homeBoard.boardSj }}</b>
          </a>
        </template>
        <template v-else>
          <router-link :to="{ name: 'HomeBoardDetail', params: { boardId: homeBoard.boardId }}">
            <span>{{ getBoardTypeStr(homeBoard.boardType) }}</span><b>{{ homeBoard.boardSj }}</b>
          </router-link>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import { getHomeBoardSearchList } from '@/api/homeboard'
import { HOME_BOARD_TYPE, EVENT_TYPE, getBoardTypeStr } from '@/utils/kms'
import { html2Text } from '@/utils/index'

export default {
  name: 'HomeBoardList',
  data() {
    return {
      homeBoardList: null,
      totCnt: 0,
      homeBoardListQuery: {
        page: 1,
        size: 10,
        searchType: null,
        searchKeyword: null,
        eventType: null,
        boardTypeList: [HOME_BOARD_TYPE.SC.value, HOME_BOARD_TYPE.SB.value, HOME_BOARD_TYPE.SP.value, HOME_BOARD_TYPE.CP.value],
        sortType: 2 // 1 : regdate asc, 2 or null : regdate desc
      },
      boardTypeOptions: [{
        value: EVENT_TYPE.ALL.value,
        label: EVENT_TYPE.ALL.label
      }, {
        value: HOME_BOARD_TYPE.SC.value,
        label: HOME_BOARD_TYPE.SC.label
      }, {
        value: HOME_BOARD_TYPE.SB.value,
        label: HOME_BOARD_TYPE.SB.label
      }, {
        value: HOME_BOARD_TYPE.SP.value,
        label: HOME_BOARD_TYPE.SP.label
      }, {
        value: HOME_BOARD_TYPE.CP.value,
        label: HOME_BOARD_TYPE.CP.label
      }],
      boardTypeList: EVENT_TYPE.ALL.value,
      dataLoading: false
    }
  },
  created() {
    this.dataLoading = true
    this.getHomeBoardSearchList()
    setTimeout(() => {
      this.dataLoading = false
    }, 300)
  },
  methods: {
    async getHomeBoardSearchList() {
      const response = await getHomeBoardSearchList(this.homeBoardListQuery)
      console.log(response)
      this.homeBoardList = response.resData.homeBoardList
      this.totCnt = response.resData.totCnt
    },
    getBoardTypeStr(value) {
      return getBoardTypeStr(value)
    },
    html2Text(val) {
      return html2Text(val)
    },
    changeBoardType(value) {
      if (value === EVENT_TYPE.ALL.value) {
        this.homeBoardListQuery.boardTypeList = [HOME_BOARD_TYPE.SC.value, HOME_BOARD_TYPE.SB.value, HOME_BOARD_TYPE.SP.value, HOME_BOARD_TYPE.CP.value]
      } else {
        this.homeBoardListQuery.boardTypeList = []
        this.homeBoardListQuery.boardTypeList.push(value)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.jiwon_list_cell b { color:#495057;font-size:14px;font-weight:normal;display:inline-block;vertical-align:top;width:calc( 100% - 105px );overflow: hidden;text-overflow: ellipsis;white-space: nowrap; }
</style>

