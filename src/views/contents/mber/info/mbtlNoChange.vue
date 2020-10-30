<template>
  <div class="app-container">
    <header>
      <a href="#" class="back" @click="historyBack()"/><h1>핸드폰 번호 변경</h1>
    </header>
    <div class="wrap">
      <div class="phone_change">
        핸드폰 번호<br><span>{{ mbtlNo }}</span><br><a href="#">핸드폰 번호 변경</a>
      </div>
    </div>
  </div>
</template>
<script>
import waves from '@/directive/waves'
// import { selectMberInfo } from '@/api/mberInfo'

export default {
  name: 'MbtlNoChange',
  directives: { waves },
  props: {
    mbtlNo: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
    }
  },
  created() {

  },
  methods: {
    historyBack() {
      this.$router.go(-1)
    }
  }
}
</script>
