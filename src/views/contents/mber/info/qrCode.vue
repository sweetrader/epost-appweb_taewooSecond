<template>

  <div class="app-container">
    <header>
      <a href="#" class="back" @click="historyBack()"/>
      <h1>내 QR코드</h1>
    </header>
    <div class="easy_login_area qr_bg">
      <div> <vue-qrcode :value="piCd" :scale="8"/>
      </div>
      <a href="#" class="qr_ok" @click="historyBack()"> 취소 </a>
    </div>
  </div>

</template>
<script>
import VueQrcode from 'vue-qrcode'
import waves from '@/directive/waves'

export default {
  name: 'QrCode',
  directives: { waves },
  components: { VueQrcode },
  props: {
    piCd: {
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
