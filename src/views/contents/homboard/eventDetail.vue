<template>
  <div class="app-container">
    <header>
      <a href="#" class="back" @click="$router.back()"/><h1>이벤트</h1>
    </header>
    <div class="jisik_list mtop59 fixing">
      <div class="jisik_list_cell">
        <b>{{ homeBoard.boardSj }}</b><span>{{ getDateStr(homeBoard.registerDt) }}</span>
        <br><a v-if="homeBoard.attFileUrl !== null && homeBoard.attFileUrl !== ''" :href="homeBoard.attFileUrl" class="download"><span> {{ homeBoard.attFileNm }}</span></a>
      </div>
      <div class="fixing_answer" v-html="homeBoard.boardCn"/>
    </div>
  </div>
</template>

<script>
import { getHomeBoard } from '@/api/homeboard'
import { getDateStr } from '@/utils/kms'

export default {
  name: 'EventDetail',
  props: {
    boardId: {
      type: [String, Number],
      default: 0
    }
  },
  data() {
    return {
      homeBoard: null,
      dataLoading: false
    }
  },
  created() {
    this.getHomeBoard()
  },
  methods: {
    async getHomeBoard() {
      this.dataLoading = true
      const response = await getHomeBoard(this.boardId)
      console.log(response)
      this.homeBoard = response.resData
      setTimeout(() => {
        this.dataLoading = false
      }, 300)
    },
    getDateStr(value) {
      return getDateStr(value)
    }
  }
}
</script>
