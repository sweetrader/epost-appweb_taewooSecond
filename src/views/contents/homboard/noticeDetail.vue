<template>
  <div class="app-container">
    <header>
      <a href="#" class="back" @click="$router.back()"/><h1>공지사항</h1>
    </header>
    <div class="jisik_list mtop59 fixing">
      <div class="jisik_list_cell">
        <b>코로나19 위기극복 및 실종아동 찾기 </b><span>2020-10-07</span>
        <br><a href="#" class="download"><span>캠페인.pdf</span></a>
      </div>
      <div class="fixing_answer">
        공지사항 내용공지사항 내용공지사항 내용공지사항 내용공지사항 내용공지사항 내용공지사항 내용공지사항 내용공지사항 내용공지사항 내용공지사항 내용공지사항 내용<br>
        <img src="img.png" alt="">
      </div>
    </div>
  </div>
</template>

<script>
import { selectNotice } from '@/api/admCommunity'

export default {
  name: 'NoticeDetail',
  props: {
    id: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      notice: null,
      dataLoading: false
    }
  },
  created() {
    this.selectNotice()
  },
  methods: {
    async selectNotice() {
      this.dataLoading = true
      const response = await selectNotice(this.id)
      this.notice = response
      console.log(response)
      setTimeout(() => {
        this.dataLoading = false
      }, 300)
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
