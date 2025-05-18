import { defineStore } from 'pinia'
import { authService } from '../services/auth'
import { useRouter } from 'vue-router'
import { useToast } from 'vue-toastification'
const toast = useToast()

interface AuthState {
  token: string | null
  isLoading: boolean
  error: string | null
}

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({
    token: localStorage.getItem('token') || null,
    isLoading: false,
    error: null
  }),
  getters: {
    isAuthenticated: (state) => !!state.token
  },
  actions: {
    async login(email: string, password: string) {
      this.isLoading = true
      this.error = null
      try {
        const response = await authService.login({ user_name: email, user_password: password })
        this.token = response.token
        localStorage.setItem('token', response.token)
        return true
      } catch (error: any) {
        toast.error(error.response?.data?.message || 'Login failed')
        return false
      } finally {
        this.isLoading = false
      }
    },
    async register(email: string, password: string) {
      this.isLoading = true
      this.error = null
      try {
        await authService.register({ user_name: email, user_password: password })
        return true
      } catch (error: any) {
        toast.error(error.response?.data?.message || 'Registration failed')
        return false
      } finally {
        this.isLoading = false
      }
    },
    logout() {
      authService.logout()
      localStorage.removeItem('token')
      toast.success('Logged out successfully')
      this.token = null
      const router = useRouter()
      router.push('/login')
    }
  }
})