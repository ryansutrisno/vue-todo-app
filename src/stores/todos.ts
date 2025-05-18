import { defineStore } from 'pinia'
import { ref } from 'vue'
import { 
  getTodos, 
  createTodo as createTodoApi, 
  updateTodo as updateTodoApi, 
  deleteTodo as deleteTodoApi,
  searchTodos as searchTodosApi
} from '../services/todos'
import type { Todo, TodoCreateData, TodoUpdateData } from '../services/todos'

export const useTodosStore = defineStore('todos', () => {
  // State
  const todos = ref<Todo[]>([])
  const searchResults = ref<Todo[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)
  
  // Actions
  async function fetchTodos() {
    loading.value = true
    error.value = null
    
    try {
      const response = await getTodos()
      todos.value = response
      return response
    } catch (err) {
      error.value = 'Failed to fetch todos'
      console.error('Error fetching todos:', err)
    } finally {
      loading.value = false
    }
  }
  
  async function searchTodos(params: Record<string, string>) {
    loading.value = true
    error.value = null
    
    try {
      const response = await searchTodosApi(params)
      searchResults.value = response
      return response
    } catch (err) {
      error.value = 'Failed to search todos'
      console.error('Error searching todos:', err)
    } finally {
      loading.value = false
    }
  }
  
  async function createTodo(data: TodoCreateData) {
    loading.value = true
    error.value = null
    
    try {
      const response = await createTodoApi(data)
      todos.value = [response, ...todos.value]
      return true
    } catch (err) {
      error.value = 'Failed to create todo'
      console.error('Error creating todo:', err)
      return false
    } finally {
      loading.value = false
    }
  }
  
  async function updateTodo(id: number, data: TodoUpdateData) {
    loading.value = true
    error.value = null
    
    try {
      const response = await updateTodoApi(id, data)
      
      const updateInArray = (arr: Todo[]) => {
        const index = arr.findIndex(todo => todo.id === id)
        if (index !== -1) {
          arr[index] = { ...arr[index], ...response }
        }
      }
      
      updateInArray(todos.value)
      updateInArray(searchResults.value)
      
      return true
    } catch (err) {
      error.value = 'Failed to update todo'
      console.error('Error updating todo:', err)
      return false
    } finally {
      loading.value = false
    }
  }
  
  async function deleteTodo(id: number) {
    error.value = null
    
    try {
      await deleteTodoApi(id)
      return true
    } catch (err) {
      error.value = 'Failed to delete todo'
      console.error('Error deleting todo:', err)
      await fetchTodos()
      return false
    }
  }
  
  return {
    todos,
    searchResults,
    loading,
    error,
    fetchTodos,
    searchTodos,
    createTodo,
    updateTodo,
    deleteTodo
  }
})