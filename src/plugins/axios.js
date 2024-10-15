import axios from 'axios';

const api = axios.create({
  baseURL: ' https://dev.moydomonline.ru/api/',
  headers: {
    'Content-Type': 'application/json'
  }
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (!config.url.includes('/login')) {
      if (token) {
        config.headers.Authorization = `Token ${token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);


export default api;
