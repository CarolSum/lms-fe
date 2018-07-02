import axios from 'axios';

const api = axios.create({
  timeout: 5000,
  baseURL: '/'
});

export default api;