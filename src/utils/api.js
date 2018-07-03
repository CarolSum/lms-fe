import axios from 'axios'

const api = axios.create({
  timeout: 5000,
  baseURL: '/api',
  withCredentials: true
})

export default api
