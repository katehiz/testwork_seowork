import Vue from 'vue'
Vue.config.productionTip = false

import HighchartsVue from "highcharts-vue";
Vue.use(HighchartsVue);

import App from './App.vue'
import './assets/styles/app.scss'

new Vue({
  render: h => h(App)
}).$mount('#app')
