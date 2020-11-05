import '@babel/polyfill' // IE 지원
import Vue from 'vue' // 뷰
import '@/styles/index.scss' // 전역 SCSS
import App from './App.vue' // 기본 틀
import router from './router' // 라우터
import store from './store' // Vuex 스토어
import HanaLoading from './components/hanaLoading/index.js'
import Alert from './components/space/Alert/index' // 알림팝업 컴포넌트
import jQuery from 'jquery' // eslint-disable-line // npm i jquery
window.$ = jQuery // eslint-disable-line

Vue.config.productionTip = false
Vue.use(HanaLoading)
Vue.use(Alert)

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
