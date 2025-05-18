<template>
  <div v-if="todos.length === 0" class="bg-white dark:bg-gray-800 p-4 rounded-lg shadow text-center text-gray-500 dark:text-gray-400">
    No todos found
  </div>
  <div v-else class="space-y-4">
    <TodoItem
      v-for="todo in todos"
      :key="todo.id"
      :todo="todo"
      @update="handleUpdate"
      @delete="handleDelete"
    />
  </div>
</template>

<script setup lang="ts">
import TodoItem from './TodoItem.vue'
import type { Todo } from '../../types/todo'

const props = defineProps<{
  todos: Todo[]
}>()

const emit = defineEmits<{
  (e: 'update', id: number, title: string, description: string, completed?: boolean): void
  (e: 'delete', id: number): void
}>()

const handleUpdate = (id: number, title: string, description: string, completed?: boolean) => {
  emit('update', id, title, description, completed)
}

const handleDelete = (id: number) => {
  emit('delete', id)
}
</script>