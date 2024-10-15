import axios from '@/plugins/axios'
import { convertedSearch } from '@/plugins/convertedSearch';
const state = {
    appeals: []
};

const mutations = {
    SET_APPEALS(state, payload) {
        state.appeals = payload
    }
};

const actions = {
    async get_appeals({commit}, search) {
        try {
            commit('SET_APPEALS', [])
            let res = await axios.get(`appeals/v1.0/appeals/?${convertedSearch(search)}`)
            commit('SET_APPEALS', res.data.results)
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
