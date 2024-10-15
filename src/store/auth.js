import axios from '@/plugins/axios'
import router from '@/router'
const state = {
};

const mutations = {
};

const actions = {
    async login({}, form) {
        try {
            const response = await axios.post('auth/login/', form)
            localStorage.setItem('token', response.data.key)
            router.push('/')
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
