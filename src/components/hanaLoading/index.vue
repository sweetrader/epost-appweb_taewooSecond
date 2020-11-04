<template>
  <div v-show="init">
    <div class="loading_area">
      <img src="@/assets/image/loading_around.png" class="loading_around">
      <img src="@/assets/image/load_icon.png" class="load_icon">
      <span class="load_text white_space" align="center" v-html="loadingText"/>
    </div>
  </div>
</template>
<script>

function preventScroll(e) {
  e.preventDefault()
}

export default {
  name: 'HanaLoading',
  data() {
    return {
      init: false,
      onStatusClass: '',
      loadingText: ''
    }
  },
  watch: {
    init(newVal) {
      if (newVal) {
        window.addEventListener('touchmove', preventScroll, { passive: false })
      } else {
        this.loadingText = ''
        window.removeEventListener('touchmove', preventScroll, false)
      }
    }
  },
  methods: {

  }
}
</script>

<style rel="stylesheet/scss" lang="scss">

.loading_area {
  position: fixed;
  top: 0;
  left: 0;
  width: 10rem;
  height: 100vh;
  background-color: rgba(20, 20, 20, 0.4);

  .load_icon {
    position: fixed;
    top: 7.75rem;
    left: 4.64rem;
    width: 0.71rem;
    height: 1rem;
    z-index: 99999;
  }
  .loading_around {
    position: fixed;
    top: 6.87rem;
    left: 3.59rem;
    width: 2.81rem;
    height: 2.81rem;
    z-index: 99998;

    -webkit-animation: spin 1s infinite linear;
    -moz-animation: spin 1s infinite linear;
    animation: spin 1s infinite linear;
  }
  @-webkit-keyframes spin {
    0%  {-webkit-transform: rotate(0deg);}
    100% {-webkit-transform: rotate(360deg);}
  }
  @-moz-keyframes spin {
    0%  {-moz-transform: rotate(0deg);}
    100% {-moz-transform: rotate(360deg);}
  }
  @keyframes spin {
    0%  {transform: rotate(0deg);}
    100% {transform: rotate(360deg);}
  }

  .load_text {
    width: 100%;
    position: fixed;
    top: 10.46rem;
    font-size: 0.48rem;
    line-height: 0.6rem;
    color: #FFFFFF;
    z-index: 99997;
  }
}
</style>
