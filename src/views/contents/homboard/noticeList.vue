<template>
  <div class="app-container">
    <header>
      <a href="#" class="back"/><h1>공지사항</h1>
    </header>
    <div class="jisik_list mtop59">
      <div v-for="notice in list" :key="notice.noticeId" class="jisik_list_cell">
        <router-link :to="{ name: 'NoticeDetail', params: { id: notice.noticeId }}">
          <b>{{ notice.sj }} </b><span>{{ notice.registDe }}</span>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { selectNoticeList } from '@/api/admCommunity'

export default {
  name: 'NoticeList',
  data() {
    return {
      listQuery: {
        searchKeyword: '',
        searchType: '',
        page: 1,
        size: 10
      },
      totCnt: 0,
      list: null,
      dataLoading: false
    }
  },
  created() {
    this.selectNoticeList()
  },
  methods: {
    async selectNoticeList() {
      this.dataLoading = true
      const response = await selectNoticeList(this.listQuery)
      this.list = response.list
      this.totCnt = response.totCnt
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
