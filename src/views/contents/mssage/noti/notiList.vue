<template>
  <div class="app-container">
    <header>
      <a href="#" class="back"/><h1>알림 조회</h1>
    </header>
    <div class="login_log_search">
      <div class="search_set">
        <div class="newi"/> <!-- 이거 뉴 표시-->
        <input type="text" placeholder="내용검색" style="width: 340px;">

      </div>
    </div>
    <div class="login_log_list">
      <div v-for="temp in list.slice(0,10)" :key="temp.mssageSj" class="alarm_log_list_cell">

        <b>{{ temp.mssageSj }}</b>
        <span>{{ temp.mssageCn }}</span>
        <div class="dd">{{ temp.readDt }}</div>
      </div>

      <a href="#" class="next_btn2 itsok">다음</a>
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
    this.getList()
  },
  methods: {
    async getList() {
      this.dataLoading = true
      const response = await selectNotiList(this.listQuery)
      this.list = response.resData.list

      this.totCnt = response.resData.count
      console.log(this.list)
      console.log(this.list[0].mssageSj)
      setTimeout(() => {
        alert('조회실패')
      }, 300)
    }
  }
}
</script>
