import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './main.css'
import './assets/css/fonts.css'
import api from './plugins/axios'
import changeForm from './plugins/changeForm'
Vue.config.productionTip = false
Vue.prototype.$axios = api;
Vue.use(changeForm)
new Vue({
  router,
  store,
  render: function (h) { return h(App) }
}).$mount('#app')
