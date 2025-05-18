<template>
  <div class="min-h-screen bg-gray-100 dark:bg-gray-900">
    <Header @logout="handleLogout" />
    <div class="container mx-auto px-4 py-8">
      <div class="max-w-3xl mx-auto">
        <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-8">
          My Todos
        </h1>
        <div class="mb-8">
          <TodoForm @submit="handleAddTodo" />
        </div>
        <div class="mb-6">
          <SearchBar 
            @search="handleSearch" 
            @searchStart="handleSearchStart" 
            @searchEnd="handleSearchEnd" 
          />
        </div>
        <div v-if="loading && !displayedTodos.length" class="space-y-4">
          <div
            v-for="n in 5"
            :key="n"
            class="p-4 bg-white dark:bg-gray-800 rounded-lg shadow animate-pulse"
          >
            <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2"></div>
            <div class="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
          </div>
        </div>
        <TodoList
          v-else
          :todos="displayedTodos"
          @update="handleUpdateTodo"
          @delete="handleDeleteTodo"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useToast } from 'vue-toastification'
import { useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useTodosStore } from '../stores/todos'
import { useAuthStore } from '../stores/auth'
import Header from '../components/molecules/Header.vue'
import SearchBar from '../components/molecules/SearchBar.vue'
import TodoForm from '../components/organisms/TodoForm.vue'
import TodoList from '../components/organisms/TodoList.vue'

const todosStore = useTodosStore()
const authStore = useAuthStore()
const router = useRouter()
const toast = useToast()

const { todos, loading, error, searchResults } = storeToRefs(todosStore)
const isSearching = ref(false)

onMounted(() => {
  const token = authStore.token
  if (token) {
    todosStore.fetchTodos()
  }
})

if (error.value) {
  toast.error(error.value)
}

const handleSearchStart = () => {
  loading.value = true;
}

const handleSearchEnd = () => {
  loading.value = false;
}

const handleSearch = async (params: Record<string, string>) => {
  try {
    if (params && Object.keys(params).length > 0) {
      isSearching.value = true
      await todosStore.searchTodos(params)
    } else {
      isSearching.value = false
      await todosStore.fetchTodos()
    }
  } catch (error: any) {
    toast.error(`Search failed: ${error.message || 'Unknown error'}`)
    isSearching.value = false
  }
}

const handleAddTodo = async (title: string, description: string) => {
  try {
    loading.value = true
    await todosStore.createTodo({ title, description })
    toast.success('Todo successfully added')
    await todosStore.fetchTodos()
    return Promise.resolve()
  } catch (error) {
    toast.error('Failed to add todo')
    return Promise.reject(error)
  } finally {
    loading.value = false
  }
}

const handleUpdateTodo = async (
  id: number,
  title: string,
  description: string,
  completed?: boolean
) => {
  try {
    if (completed !== undefined) {
      const todo = todos.value.find(t => t.id === id)
      if (todo) {
        todo.completed = completed
      }
      const searchTodo = searchResults.value.find(t => t.id === id)
      if (searchTodo) {
        searchTodo.completed = completed
      }
      toast.success(`Todo marked as ${completed ? 'completed' : 'pending'}`)
    } else {
      const todo = todos.value.find(t => t.id === id)
      if (todo) {
        todo.title = title
        todo.description = description
        todo.updated_at = new Date().toISOString()
      }
      const searchTodo = searchResults.value.find(t => t.id === id)
      if (searchTodo) {
        searchTodo.title = title
        searchTodo.description = description
        searchTodo.updated_at = new Date().toISOString()
      }
      toast.success('Todo updated successfully')
    }

    await todosStore.updateTodo(id, { title, description, completed })
  } catch (error) {
    toast.error('Failed to update todo')
    await todosStore.fetchTodos()
  }
}

const handleDeleteTodo = (id: number) => {
  todos.value = todos.value.filter(todo => todo.id !== id)
  searchResults.value = searchResults.value.filter(todo => todo.id !== id)
  todosStore.deleteTodo(id)
  toast.success('Todo deleted successfully')
}

const handleLogout = () => {
  authStore.logout()
  router.push('/login')
  toast.success('Logged out successfully')
}

const displayedTodos = computed(() => {
  if (loading.value) return []
  const todosToDisplay = isSearching.value ? searchResults.value : todos.value

  return [...todosToDisplay].sort((a, b) => {
    const dateA = a.created_at ? new Date(a.created_at).getTime() : 0
    const dateB = b.created_at ? new Date(b.created_at).getTime() : 0
    return dateB - dateA
  })
})
</script>