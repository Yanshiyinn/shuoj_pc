import Vue from 'vue'
import VueCodemirror from 'vue-codemirror'
import ECharts from 'vue-echarts'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'
import Vtip from 'vtip'
import 'vtip/lib/index.min.css'

Vue.config.productionTip = false

Vue.component('v-chart',ECharts)
Vue.use(VueCodemirror,{})
Vue.use(Vtip.directive)

Vue.prototype.$tip = Vtip.tip

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
