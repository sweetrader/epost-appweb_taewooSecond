import Alert from './index.vue'
/*
import Vue from 'vue'
*/

Alert.install = function(Vue) {
  Vue.component(Alert.name, Alert)
  var Extend = Vue.extend(Alert)
  var instance = new Extend()
  document.body.appendChild(instance.$mount().$el)

  Vue.prototype.Alert = function(option) {
    instance.show = true
    instance.option = option
    instance.option.callback = () => {
      instance.show = false
      if (option.success) {
        option.success()
      }
    }
    instance.option.leftcallback = () => {
      instance.show = false
      if (option.leftsuccess) {
        option.leftsuccess()
      }
    }
    instance.option.rightcallback = () => {
      instance.show = false
      if (option.rightsuccess) {
        option.rightsuccess()
      }
    }
  }
}

export default Alert
