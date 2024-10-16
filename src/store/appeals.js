import axios from '@/plugins/axios'
import { convertedSearch } from '@/plugins/convertedSearch';
import dayjs from 'dayjs';
const state = {
    appeals: [],
    appeal: {},
    totalPages: null,
    total: null,
    showAddModal: false,
    showEditModal: false
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
    SET_APPEAL(state, payload) {
        state.appeal = payload
    },
    SET_TOTALPAGES(state, payload) {
        state.totalPages = payload
    },
    SET_TOTAL(state, payload) {
        state.total = payload
    },
    SHOW_ADDMODAL(state, payload) {
        state.showAddModal = payload
    },
    SHOW_EDITMODAL(state, payload) {
        state.showEditModal = payload
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
    },
    async get_appeal({commit}, id) {
        try {
            commit('SET_APPEAL', {})
            let res = await axios.get(`appeals/v1.0/appeals/${id}/`)
            commit('SET_APPEAL', res.data)
        } catch (error) {
            console.log(error);
        }
    },
    async create_appeal({}, form) {
        try {
            form.due_date = dayjs(form.due_date).toISOString()
           await axios.post('appeals/v1.0/appeals/', form) 
        } catch (error) {
            console.log(error);
            throw error
        }
    },
    async edit_appeal({}, {id,form}) {
        try {
            form.due_date = dayjs(form.due_date).toISOString()
           await axios.patch(`appeals/v1.0/appeals/${id}/`, form) 
        } catch (error) {
            console.log(error);
            throw error
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
