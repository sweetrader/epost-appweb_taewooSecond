import '@babel/polyfill' // IE 지원
import Vue from 'vue' // 뷰
import '@/styles/index.scss' // 전역 SCSS
import App from './App.vue' // 기본 틀
import router from './router' // 라우터
import store from './store' // Vuex 스토어
import HanaLoading from './components/hanaLoading/index.js'

Vue.config.productionTip = false
Vue.use(HanaLoading)

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
