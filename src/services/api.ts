import axios from 'axios'

const apiUrl = import.meta.env.VITE_API_URL
console.log('API Base URL:', apiUrl)

const api = axios.create({
  baseURL: apiUrl,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  },
  timeout: 15000
})

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
      
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

api.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('token')
      window.location.href = '/login'
    }
    
    if (error.response && error.response.status === 403) {
      localStorage.removeItem('token')
      window.location.href = '/login'
      
      return Promise.reject()
    }
    
    return Promise.reject(error)
  }
)

export default api