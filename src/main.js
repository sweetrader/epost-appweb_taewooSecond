import Cookies from 'js-cookie'

import 'normalize.css/normalize.css' // a modern alternative to CSS resets

import Element from 'element-ui'
import './styles/element-variables.scss'

import '@/styles/index.scss' // global css

import i18n from './lang' // internationalization
import './icons' // icon
import './permission' // permission control

import './utils/filters/global-function' // global Function
import * as filters from './utils/filters/global-filter' // global Filter

import '@babel/polyfill' // IE 지원

import Alert from './components/space/Alert/index' // 알림팝업 컴포넌트
import jQuery from 'jquery' // eslint-disable-line // npm i jquery
window.$ = jQuery // eslint-disable-line

Vue.use(Element, {
  size: Cookies.get('size') || 'mini', // set element-ui default size
  i18n: (key, value) => i18n.t(key, value)
})

// register global utility filters
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})
import Vue from 'vue' // 뷰
import '@/styles/index.scss' // 전역 SCSS
import App from './App.vue' // 기본 틀
import router from './router' // 라우터
import store from './store' // Vuex 스토어
import HanaLoading from './components/hanaLoading/index.js'

Vue.config.productionTip = false
Vue.use(HanaLoading)
Vue.use(Alert)

new Vue({
  el: '#app',
  router,
  store,
  i18n,
  render: h => h(App)
})

