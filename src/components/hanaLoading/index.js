import Vue from 'vue'
import HanaLoading from './index.vue'

HanaLoading.install = function(Vue) {
  Vue.component(HanaLoading.name, HanaLoading)
  const Extend = Vue.extend(HanaLoading)
  const instance = new Extend()
  document.body.appendChild(instance.$mount().$el)

  Vue.prototype.$hanaLoadingOn = (loadingText) => {
    instance.init = true
    instance.loadingText = loadingText
  }
  Vue.prototype.$hanaLoadingOff = () => {
    instance.init = false
  }
}

Vue.use(HanaLoading)

export default HanaLoading
