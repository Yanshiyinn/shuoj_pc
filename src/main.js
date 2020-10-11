import Vue from 'vue'
import ECharts from 'vue-echarts'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'

Vue.config.productionTip = false

Vue.component('v-chart',ECharts)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
