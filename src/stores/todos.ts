import { defineStore } from 'pinia'
import { todosService } from '../services/todos'
import type { Todo, SearchParams } from '../services/todos'
import { useToast } from 'vue-toastification'
const toast = useToast()

interface TodosState {
  todos: Todo[]
  isLoading: boolean
  error: string | null
}

export const useTodosStore = defineStore('todos', {
  state: (): TodosState => ({
    todos: [],
    isLoading: false,
    error: null
  }),
  actions: {
    async fetchTodos() {
      this.isLoading = true
      this.error = null
      try {
        const response = await todosService.getAll()
        this.todos = response.data
      } catch (error: any) {
        this.error = error.response?.data?.message || 'Failed to fetch todos'
      } finally {
        this.isLoading = false
      }
    },
    async createTodo(todo: Omit<Todo, 'id'>) {
      this.isLoading = true
      this.error = null
      try {
        const response = await todosService.create(todo)
        this.todos.push(response.data)
        return true
      } catch (error: any) {
        this.error = error.response?.data?.message || 'Failed to create todo'
        return false
      } finally {
        this.isLoading = false
      }
    },
    async updateTodo(id: number, todo: Partial<Todo>) {
      this.isLoading = true
      this.error = null
      try {
        const response = await todosService.update(id, todo)
        const index = this.todos.findIndex((t: Todo) => t.id === id)
        if (index !== -1) {
          this.todos[index] = { ...this.todos[index], ...response.data }
        }
        return true
      } catch (error: any) {
        toast.error(error.response?.data?.message || 'Failed to update todo')
        return false
      } finally {
        this.isLoading = false
      }
    },
    async deleteTodo(id: number) {
      this.isLoading = true
      this.error = null
      try {
        await todosService.delete(id)
        this.todos = this.todos.filter((todo: Todo) => todo.id !== id)
        return true
      } catch (error: any) {
        toast.error(error.response?.data?.message || 'Failed to delete todo')
        return false
      } finally {
        this.isLoading = false
      }
    },
    async searchTodos(params: SearchParams) {
      this.isLoading = true
      this.error = null
      try {
        const response = await todosService.search(params)
        this.todos = response.data
      } catch (error: any) {
        toast.error(error.response?.data?.message || 'Failed to search todos')
      } finally {
        this.isLoading = false
      }
    }
  }
})