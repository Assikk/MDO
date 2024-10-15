import Vue from 'vue'
import Vuex from 'vuex'
import alert from './alert'
import auth from './auth'
import premises from './premises'
import appeals from './appeals'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  getters: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    alert, auth, premises, appeals
  }
})
