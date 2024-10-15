
const state = {
    alert: {
        type: null,
        isActive: false,
        msg: null
    }
  };
  
  const mutations = {
    LOADING_ALERT(state) {
        state.alert = {
            isActive: true,
            type: '',
            msg: 'Идет загрузка, подождите...'
        }
    },
    SUCCESS_ALERT(state, payload) {
        state.alert = {
            isActive : true,
            type: 'success',
            msg: payload
        }
    },
    ERROR_ALERT(state, payload) {
        state.alert = {
            isActive: true,
            type: 'error',
            msg: payload
        }
    },
    CLEAR_ALERT(state) {
        state.alert = {
            isActive: false,
            type: '',
            msg: ''
        }
    }
  };
  
  const actions = {
    success_alert({commit}, payload) {
        commit('SUCCESS_ALERT', payload)
        setTimeout(() => {
          commit('CLEAR_ALERT')
        }, 2000)
    },
    error_alert({commit}, payload) {
        commit('ERROR_ALERT', payload)
        setTimeout(() => {
          commit('CLEAR_ALERT')
        }, 2000)
    },
  };
  
  const getters = {
  };
  
  export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
  };
  