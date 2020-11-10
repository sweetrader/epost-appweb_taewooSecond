<template>
  <div class="app-container">
    <header>
      <a href="#" class="back"/><h1>알림 조회</h1>
    </header>
    <div class="login_log_search">
      <div class="search_set" style="width: 100%;" @click="search()">
        <input v-model="listQuery.searchKeyword" type="text" placeholder="내용검색">
      </div>
    </div>

    <div class="login_log_list">
      <div v-for="(temp) in list" :key="temp.notiRcveNo" class="alarm_log_list_cell">
        <div v-if=" temp.readYn === 'N'" class="newi"/> <!-- 이거 뉴 표시-->
        <b>{{ temp.mssageSj }}</b>
        <span>{{ temp.mssageCn }}</span>
        <div class="dd">{{ temp.readDt }}</div>
      </div>

      <a href="#" class="next_btn2 itsok" @click="viewMore()">다음</a>
    </div>

  </div>
</template>
<script>
import waves from '@/directive/waves'
import { selectNotiList } from '@/api/mssage'

export default {
  name: 'NotiList',
  directives: { waves },
  data() {
    return {
      list: [],
      totCnt: 0,
      listQuery: {
        searchKeyword: '',
        searchType: '',
        page: 1,
        size: 10
      },
      mssageMngNoti: {
        notiNo: '',
        mssageSj: '',
        mssageCn: '',
        reqDt: '',
        reqUserId: this.$store.getters.mberId
      }
    }
  },
  created() {
    this.$nextTick(function() {
      this.getList(this.listQuery)
    })
  },
  methods: {
    async getList(data) {
      this.dataLoading = true
      const response = await selectNotiList(data)
      this.list = response.resData.list

      this.totCnt = response.resData.count
      console.log(this.list)
      console.log(this.list[0].mssageSj)
      setTimeout(() => {

      }, 300)
    },
    viewMore() {
      this.listQuery.size += 10
      console.log(this.listQuery.size)
      this.getList(this.listQuery)
    },
    search() {
      this.getList(this.listQuery)
    }
  }
}
</script>
