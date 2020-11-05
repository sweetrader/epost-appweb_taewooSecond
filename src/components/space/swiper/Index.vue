<template>
  <div id="slide-component">
    <div class="inner-slide">
      <img v-for="slide in slideList" :key="slide.index" :src="slide" :style="slideSize">
    </div>
  </div>
</template>

<script>
import "@/assets/slick/slick-theme.scss"; // eslint-disable-line
import "@/assets/slick/slick.scss"; // eslint-disable-line
import slick from "@/assets/slick/slick.min.js"; // eslint-disable-line

export default {
  components: {
  },
  props: {
    slideSize: {
      type: String,
      default: ''
    },
    getList: {
      type: Array,
      default: null
    },
    dotsClass: {
      type: String,
      default: 'slick-dots'
    }
  },
  data() {
    return {
      slideList: [],
      currentSlide: 0
    }
  },
  created() {
    this.slideList = this.getList
    this.$nextTick(() => {
      window.$(`.inner-slide`).slick({
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        swipeToSlide: true,
        arrows: false,
        dots: false,
        dotsClass: false
      })
    })
  },
  mounted() {

  },
  methods: {

  }
}
</script>
