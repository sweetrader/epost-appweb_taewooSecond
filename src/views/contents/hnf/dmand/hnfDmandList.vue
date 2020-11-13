<template>
  <div id="post-list">
    <Header title="게시글 등록"/>
    <Tab :confirm-type="confirmType" @toList="toList"/>
    <div class="notice-section" :style="{ backgroundImage: 'url(\'' + noticeImg + '\')' }">
      <p>{{ notice }}</p>
    </div>
    <FilterBar :select-place-holder="selectHeader" :option-list="selectOptionList" :header="selectHeader"/>
    <section class="list-section">
      <div v-for="item in list" :key="item.hnfDmandId" class="each-list-item">
        <dl class="left">
          <dt class="top">{{ item.sj }}</dt>
          <dt class="bottom">
            <p>{{ item.jobBeginDe }}</p>
            <p>{{ item.jobSiteAddr }}</p>
          </dt>
        </dl>
        <dl class="right">
          <dt class="top">최대예상</dt>
          <dt>{{ item.thingVolm }}개</dt>
        </dl>
      </div>
    </section>
    <pagination v-show="totCnt>0" :total="totCnt" :page.sync="hnfDmandInfo.page" :limit.sync="hnfDmandInfo.size" @pagination="getList"/>
  </div>
</template>

<script>
import Header from '@/components/Header/Index'
import Tab from '@/components/Tab/Index'
import FilterBar from '@/components/FilterBar/Index'
import waves from '@/directive/waves'
import Pagination from '@/components/Pagination'
// import { selectCodeList } from '@/api/com'
import { selectHnfDmandList } from '@/api/hnfDmand'

export default {
  name: 'HnfDmandManagement',
  directives: { waves },
  components: { Header, Tab, FilterBar, Pagination },
  data() {
    return {
      notice: '택배를 고객님께 전달하는 업무입니다.',
      noticeImg: require('@/assets/image/icons/postman.png'),
      selectOptionList: ['업무임박순', '물량높은순', '마감임박순'],
      selectHeader: '정렬',
      // 다름
      dataLoading: false,
      confirmType: 'list',
      hnfDmandInfo: {
        hnfDmandId: '',
        jobTypeCd: '',
        pyMHr: '',
        searchKeyword: '',
        page: 1,
        size: 10
      },
      test: this.$store.state.parentJobTypeCd,
      totCnt: 0,
      list: null
    }
  },
  created() {
    this.getList()
  },
  methods: {
    toList(arg1) {
      this.hnfDmandInfo.jobTypeCd = arg1 ? `000${arg1}` : '0001'
      this.getList()
    },
    getList: async function() {
      this.dataLoading = true
      const response = await selectHnfDmandList(this.hnfDmandInfo)
      this.list = response.list
      this.totCnt = response.totCnt

      setTimeout(() => {
        this.dataLoading = false
      }, 300)
    },
    handleExcel() {
      this.$router.push({ path: '/mcht/excel' })
    },
    handleEdit(row) {
      console.log('handle Main page hnfDmandRecqId:::' + row)
      this.$router.push({ name: 'hnfDmandDtlManagement', params: { hnfDmandId: row }})
    }
  }
}
</script>
