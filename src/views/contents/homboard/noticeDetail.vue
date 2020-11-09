<template>
  <div class="app-container">
    <header>
      <a href="#" class="back" @click="$router.back()"/><h1>공지사항</h1>
    </header>
    <div class="jisik_list mtop59 fixing">
      <div class="jisik_list_cell">
        <b>{{ notice.sj }} </b><span>{{ getDateStr(notice.registDt) }}</span>
        <br><a v-for="file in fileList" :key="file.ordr" :href="file.fileStreCours" target="_blank" class="download"><span>{{ file.streFilenm + file.fileExtsn }}</span></a>
      </div>
      <div class="fixing_answer" v-html="notice.cn"/>
    </div>
  </div>
</template>

<script>
import { selectNotice, selectNoticeFileList } from '@/api/admCommunity'
import { getDateStr } from '@/utils/kms'

export default {
  name: 'NoticeDetail',
  props: {
    id: {
      type: [Number, String],
      default: 0
    }
  },
  data() {
    return {
      notice: null,
      fileList: null,
      dataLoading: false
    }
  },
  created() {
    console.log(this.id)
    this.selectNotice()
  },
  methods: {
    async selectNotice() {
      this.dataLoading = true
      const response = await selectNotice(this.id)
      this.notice = response
      const params = {
        fileId: response.fileId
      }
      this.fileList = (await selectNoticeFileList(params)).list
      // console.log(response)
      // console.log(this.fileList)
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

<style lang="scss" scoped>
a.download { height:40px;width:100%;background:white;border:1px solid #adb5bd;border-radius:3px;text-align:center;line-height:40px;font-size:12px;font-weight:normal;color:#495057;display:block;margin-bottom: 10px }
a.download:last-child { height:40px;width:100%;background:white;border:1px solid #adb5bd;border-radius:3px;text-align:center;line-height:40px;font-size:12px;font-weight:normal;color:#495057;display:block;margin-bottom: -10px }
</style>
