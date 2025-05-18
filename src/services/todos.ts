import api from './api'

export interface Todo {
  id?: number
  title: string
  description: string
  completed?: boolean
  created_at?: string
  updated_at?: string
}

export interface SearchParams {
  title?: string
  description?: string
  completed?: boolean
  created_from?: string
  created_to?: string
  updated_from?: string
  updated_to?: string
}

export const todosService = {
  async getAll() {
    const response = await api.get('/todos')
    return response.data
  },
  async create(todo: Omit<Todo, 'id'>) {
    const response = await api.post('/todos', todo)
    return response.data
  },
  async update(id: number, todo: Partial<Todo>) {
    const response = await api.put(`/todos/${id}`, todo)
    return response.data
  },
  async delete(id: number) {
    const response = await api.delete(`/todos/${id}`)
    return response.data
  },
  async search(params: SearchParams) {
    const response = await api.get('/todos/search', { params })
    return response.data
  }
}