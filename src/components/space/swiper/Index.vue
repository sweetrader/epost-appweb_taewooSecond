<template>
  <div id="slide-component">
    <swiper ref="mySwiper">
      <swiperSlide v-for="slide in slideList" :key="slide.index"><img :src="slide"></swiperSlide>
    </swiper>
  </div>
</template>

<script>
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'

export default {
  components: {
    swiper,
    swiperSlide
  },
  props: {
    getList: {
      type: Array,
      default: null
    }
  },
  data() {
    return {
      slideList: [],
      currentSlide: 0
    }
  },
  computed: {
    swiper() {
      return this.$refs.mySwiper.swiper
    }
  },
  created() {
    this.slideList = this.getList
  },
  mounted() {

  },
  methods: {

  }
}
</script>
