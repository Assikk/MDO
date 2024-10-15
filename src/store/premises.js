import axios from '@/plugins/axios'
const state = {
    premises: []
};

const mutations = {
    SET_PREMISES(state, payload) {
        state.premises = payload
    }
};

const actions = {
    async get_premises({commit}) {
        try {
            commit('SET_PREMISES', [])
            let res = await axios.get('geo/v2.0/user-premises/')
            commit('SET_PREMISES', res.data.results)
        } catch (error) {
            console.log(error);
        }
    }
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
