<template>
  <div class="app-container">
    <header>
      <a href="#" class="back" @click="$router.back()"/><h1>이벤트</h1>
    </header>
    <div class="bn"><!--<div class="x"/>--></div>
    <div class="jisik_list">
      <template>
        <div v-for="homeBoard in homeBoardList" :key="homeBoard.boardId" class="jisik_list_cell">
          <router-link :to="{ name: 'EventDetail', params: { boardId: homeBoard.boardId }}">
            <span>{{ homeBoard.boardSj }}</span>
            <b>{{ getDateStr(homeBoard.eventStDt) }} ~ {{ getDateStr(homeBoard.eventEdDt) }}</b>
            <div :class="{ 'ing': getEventStatus(homeBoard.eventStDt, getDateStr(homeBoard.eventEdDt)), 'done': !getEventStatus(homeBoard.eventStDt, getDateStr(homeBoard.eventEdDt)) }"/>
          </router-link>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import { getHomeBoardSearchList } from '@/api/homeboard'
import { HOME_BOARD_TYPE, EVENT_TYPE, getDateStr } from '@/utils/kms'

export default {
  name: 'EventList',
  data() {
    return {
      homeBoardList: null,
      totCnt: 0,
      homeBoardListQuery: {
        page: 1,
        size: 10,
        searchType: null,
        searchKeyword: null,
        eventType: EVENT_TYPE.ING.value,
        boardTypeList: [HOME_BOARD_TYPE.EV.value],
        sortType: 2 // 1 : regdate asc, 2 or null : regdate desc
      },
      eventTypeOptions: [{
        value: EVENT_TYPE.ALL.value,
        label: EVENT_TYPE.ALL.label
      }, {
        value: EVENT_TYPE.ING.value,
        label: EVENT_TYPE.ING.label
      }, {
        value: EVENT_TYPE.END.value,
        label: EVENT_TYPE.END.label
      }],
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
    getDateStr(value) {
      return getDateStr(value)
    },
    getEventStatus(eventStDt, eventEdDt) {
      const dateNow = new Date()
      dateNow.setHours(0, 0, 0, 0)
      const dateEd = new Date(eventEdDt)
      dateEd.setHours(0, 0, 0, 0)
      if (dateEd < dateNow) {
        return false // end
      } else {
        return true // ing
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.jisik_list_cell span { color:#495057;font-weight:normal;font-size:14px;display:block;width:calc( 100% - 80px );height:auto;/*margin-top:5px;*/margin-bottom:0px;white-space:nowrap;text-overflow:ellipsis;overflow:hidden; }
.jisik_list_cell b { font-size:12px;font-weight:normal;color:#ADB5BD;display:block;/*margin-top:-10px;*/ }
.ing { position:absolute;width:37px;height:37px;background:url('~@/assets/image/ing.png') no-repeat;background-size:100% 100%;bottom:20px;right:15px; }
.done { position:absolute;width:37px;height:37px;background:url('~@/assets/image/done.png') no-repeat;background-size:100% 100%;bottom:20px;right:15px; }
</style>
