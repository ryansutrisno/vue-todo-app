import api from './api'

interface LoginData {
  user_name: string
  user_password: string
}

interface RegisterData {
  user_name: string
  user_password: string
}

export const authService = {
  async login(data: LoginData) {
    const response = await api.post('/users/login', data)
    return response.data
  },
  async register(data: RegisterData) {
    const response = await api.post('/users/register', data)
    return response.data
  },
  logout() {
    localStorage.removeItem('token')
  }
}