import axios from 'axios';

const api = axios.create({
  baseURL: ' https://dev.moydomonline.ru/api/',
  headers: {
    'Content-Type': 'application/json'
  }
});




export default api;
