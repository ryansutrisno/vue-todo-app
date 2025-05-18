import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '../stores/auth'

// Route components
import TodosPage from '../pages/TodosPage.vue'
import LoginPage from '../pages/Auth/LoginPage.vue'
import RegisterPage from '../pages/Auth/RegisterPage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.VITE_BASE_URL),
  routes: [
    {
      path: '/',
      name: 'todos',
      component: TodosPage,
      meta: { requiresAuth: true }
    },
    {
      path: '/login',
      name: 'login',
      component: LoginPage,
      meta: { guest: true }
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterPage,
      meta: { guest: true }
    },
    // Redirect any unmatched routes to home
    {
      path: '/:pathMatch(.*)*',
      redirect: '/'
    }
  ]
})

// Navigation guards
router.beforeEach((to, _from, next) => {
  const authStore = useAuthStore()
  const isAuthenticated = authStore.isAuthenticated
  
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!isAuthenticated) {
      next({ name: 'login' })
    } else {
      next()
    }
  } 

  else if (to.matched.some(record => record.meta.guest)) {
    if (isAuthenticated) {
      next({ name: 'todos' })
    } else {
      next()
    }
  } 

  else {
    next()
  }
})

export default router