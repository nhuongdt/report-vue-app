// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import { BootstrapVue, BootstrapVueIcons } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import Pivot from 'vue-flexmonster'
import 'flexmonster/flexmonster.css'
import Vue from 'vue'
import App from './App'
import router from './router'
import Axios from 'axios'
Axios.defaults.baseURL = process.env.API_ENDPOINT

Vue.use(BootstrapVue)
Vue.use(BootstrapVueIcons)
Vue.use(Pivot)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
