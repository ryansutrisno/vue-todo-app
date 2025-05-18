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