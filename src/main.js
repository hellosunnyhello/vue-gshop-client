import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import {Button} from 'mint-ui'

import HeaderTop from './components/HeaderTop/HeaderTop.vue'
Vue.component('HeaderTop',HeaderTop)
Vue.component(Button.name,Button)
import './mock/mockServer'
new Vue({
  el: '#app',
  render: h=>h(App),
  router,
  store
})
