import axios from '@/plugins/axios'
import { convertedSearch } from '@/plugins/convertedSearch';
const state = {
    apartments: [],
};

const mutations = {
    SET_APARTMENTS(state, payload) {
        state.apartments = payload
    },
};

const actions = {
    async get_apartments({commit}, search) {
        try {
            commit('SET_APARTMENTS', [])
            let res = await axios.get(`geo/v1.0/apartments/?${convertedSearch(search)}`)
            commit('SET_APARTMENTS', res.data.results)
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
