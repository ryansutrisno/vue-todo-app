import api from './api'

export interface Todo {
  id?: number
  title: string
  description: string
  completed?: boolean
  created_at?: string
  updated_at?: string
}

export interface TodoCreateData {
  title: string
  description: string
}

export interface TodoUpdateData {
  title?: string
  description?: string
  completed?: boolean
}

export async function getTodos(): Promise<Todo[]> {
  const response = await api.get('/todos')
  return response.data
}

export async function searchTodos(params: Record<string, any>): Promise<Todo[]> {
  const response = await api.get('/todos/search', { params })
  return response.data
}

export async function createTodo(data: TodoCreateData): Promise<Todo> {
  const response = await api.post('/todos', data)
  return response.data
}

export async function updateTodo(id: number, data: TodoUpdateData): Promise<Todo> {
  const response = await api.put(`/todos/${id}`, data)
  return response.data
}

export async function deleteTodo(id: number): Promise<void> {
  await api.delete(`/todos/${id}`)
}