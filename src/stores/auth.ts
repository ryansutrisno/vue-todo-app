import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { login as loginApi, register as registerApi } from '../services/auth'

export const useAuthStore = defineStore('auth', () => {
  // State
  const token = ref(localStorage.getItem('token') || '')
  
  // Getters
  const isAuthenticated = computed(() => !!token.value)
  
  // Actions
  async function login(email: string, password: string) {
    try {
      const response = await loginApi(email, password)
      token.value = response.token
      
      // Store in localStorage
      localStorage.setItem('token', response.token)
      
      return response
    } catch (error) {
      console.error('Login error:', error)
      throw error
    }
  }
  
  async function register(email: string, password: string) {
    try {
      const response = await registerApi( email, password)
      return response
    } catch (error) {
      console.error('Register error:', error)
      throw error
    }
  }
  
  function logout() {
    token.value = ''
    localStorage.removeItem('token')
  }
  
  return {
    token,
    isAuthenticated,
    login,
    register,
    logout
  }
})