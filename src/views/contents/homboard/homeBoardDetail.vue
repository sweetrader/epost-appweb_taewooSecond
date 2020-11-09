<template>
  <div v-loading="dataLoading" class="app-container">
    <header>
      <a href="#" class="back" @click="$router.back()"/><h1>지원정보</h1>
    </header>
    <div class="jisik_list mtop59 fixing">
      <div class="jisik_list_cell">
        <span class="bluing">{{ getBoardTypeStr(homeBoard.boardType) }}</span>
        <b>{{ homeBoard.boardSj }}</b>
        <br><a v-for="homeBoardAtchDtl in homeBoard.homeBoardAtchDtlList" :key="homeBoardAtchDtl.ordr" :href="homeBoardAtchDtl.fileStreCours" class="download"><span> {{ homeBoardAtchDtl.orignlFileNm }}</span></a>
      </div>
      <div class="fixing_answer" v-html="homeBoard.boardCn"/>
    </div>
  </div>
</template>

<script>
import { getHomeBoard } from '@/api/homeboard'
import { getBoardTypeStr } from '@/utils/kms'

export default {
  name: 'HomeBoardDetail',
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
    getBoardTypeStr(value) {
      return getBoardTypeStr(value)
    }
  }
}
</script>
