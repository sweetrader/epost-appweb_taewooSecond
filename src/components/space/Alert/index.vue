<template>
  <div v-show="show" id="popup-view" class="popup-view">
    <div class="darkback"/>
    <div class="popup">
      <div class="box">  <div class="contents" v-html="option.content"/></div>
      <div v-if="option.leftBtn !== '' && option.leftBtn !== null && option.leftBtn !== undefined" class="btn--twin btn">
        <div class="btn--twin--left" @click="onClickLeftBtn"> <p>{{ option.leftBtn }}</p></div>
        <div class="btn--twin--right" @click="onClickRightBtn"><p>{{ option.rightBtn }}</p></div>
      </div>
      <div v-else class="btn--single btn" @click="confirm"><p>확인</p></div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Alert',
  data() {
    return {
      show: false,
      option: {}
    }
  },
  watch: {
    show: function(value) {
    //   if (value) {
    //     document.getElementsByClassName('popup-view')[0].classList.add('not_scroll')
    //   } else {
    //     document.getElementsByClassName('popup-view')[0].classList.remove('not_scroll')
    //   }
    }
  },
  methods: {
    confirm() {
      this.option.callback()
    },
    onClickLeftBtn() {
      this.option.leftcallback()
    },
    onClickRightBtn() {
      this.option.rightcallback()
    }
  }
}
</script>

<style type="text/css" lang="scss" scoped>
* {
  margin:0;
  padding:0;
  color: #495057;
  font-size: 0.38rem;
  display: inline-block;
  vertical-align: middle;
}
#popup-view{ z-index: 99; position: absolute; width: 100%; height:100%; top:0; left: 0; line-height: normal;}
.btn--twin--left { color:#A5A5A5; }
.btn--twin--left > p { color:#A5A5A5; }
.btn--twin--right > p { color:#EC5A4A; }
.darkback { position: fixed; width: 100vh; height:100vh; top:0; right:0; background-color: black; opacity: 0.3; }
.popup{ position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); width: 8.7rem; min-height: 4.625rem; background-color: #fff; text-align: center; }
.contents {
  position: relative;
  top: 50%;
  transform: translateY(-50%);
}
.box {
position: relative;  height:3.48rem;
}
.btn { position: absolute; font-size: 0.44rem; bottom: 0; height:1.4rem; width: 100%; border-top: 1px solid #E5E5E5; }
.btn--single { left: 0; line-height: 1.4rem; }
.btn--single > p { color: #EC5A4A; }
.btn--twin { display: flex; }
.btn--twin div {flex:1; }
.btn--twin p { margin: auto 0; line-height: 1.4rem; }

// .not_scroll{
//     position: fixed!important;
//     overflow: hidden;
//     width: 100vw;
//     height: 100vh;
//     left: 0;
//     top:  2.72rem;
// }

</style>
