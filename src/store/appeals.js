import axios from '@/plugins/axios'
import { convertedSearch } from '@/plugins/convertedSearch';
import dayjs from 'dayjs';
const state = {
    appeals: [],
    totalPages: null,
    total: null
};

const mutations = {
    SET_APPEALS(state, payload) {
        state.appeals = payload
        state.appeals.forEach(item => {
            item.created_at = dayjs(item.created_at).format('DD.MM.YYYY')
            if(item.due_date) {
                item.due_date = dayjs(item.due_date).format('DD.MM.YYYY hh:mm')
            }
        })
    },
    SET_TOTALPAGES(state, payload) {
        state.totalPages = payload
    },
    SET_TOTAL(state, payload) {
        state.total = payload
    }
};

const actions = {
    async get_appeals({commit}, search) {
        try {
            commit('SET_APPEALS', [])
            commit('SET_TOTALPAGES', null)
            commit('SET_TOTAL', null)
            let res = await axios.get(`appeals/v1.0/appeals/?${convertedSearch(search)}`)
            commit('SET_APPEALS', res.data.results)
            commit('SET_TOTALPAGES', res.data.pages)
            commit('SET_TOTAL', res.data.count)
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
