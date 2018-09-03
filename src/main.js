import Vue from 'vue'
import {Button} from 'mint-ui'
import moment from 'moment'

import App from './App.vue'
import router from './router'
import store from './store'
import HeaderTop from './components/HeaderTop/HeaderTop.vue'
import './mock/mockServer'

Vue.component('HeaderTop',HeaderTop)
Vue.component(Button.name,Button)

Vue.filter('dateFormat',function (value,format) {
  return moment(value).format(format || 'YYYY-MM-DD HH:mm:ss')
})
new Vue({
  el: '#app',
  render: h=>h(App),
  router,
  store
})
