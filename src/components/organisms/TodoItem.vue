<template>
  <div class="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
    <div v-if="isEditing" class="space-y-3">
      <!-- Form edit -->
      <div>
        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Title
        </label>
        <Input
          type="text"
          v-model="editTitle"
        />
      </div>
      <div>
        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Description
        </label>
        <TextArea
          :rows="4"
          v-model="editDescription"
        />
      </div>
      <div class="flex justify-end space-x-2">
        <Button
          variant="secondary"
          @click="cancelEdit"
          class="flex justify-center items-center"
        >
          <XMarkIcon class="h-5 w-5 mr-1" />
          Cancel
        </Button>
        <Button
          variant="primary"
          @click="saveEdit"
          class="flex justify-center items-center"
        >
          <CheckIcon class="h-5 w-5 mr-1" />
          Save
        </Button>
      </div>
    </div>
    <div v-else class="flex justify-between items-start">
      <!-- View mode -->
      <div>
        <div class="flex items-center gap-2">
          <h3 class="text-lg font-medium text-gray-900 dark:text-white">
            {{ todo.title }}
          </h3>
        </div>
        <p class="text-gray-600 dark:text-gray-400">
          {{ todo.description }}
        </p>
        <div class="mt-2 flex items-center">
          <button
            v-if="todo.completed"
            @click="updateStatus(false)"
            class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 cursor-pointer hover:bg-green-200 dark:hover:bg-green-800"
          >
            Completed
          </button>
          <button
            v-else
            @click="updateStatus(true)"
            class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200 cursor-pointer hover:bg-yellow-200 dark:hover:bg-yellow-800"
          >
            Pending
          </button>
          <span class="ml-2 text-xs text-gray-500 dark:text-gray-400">
            Created: {{ formatDate(todo.created_at) }}
          </span>
          <span class="ml-2 text-xs text-gray-500 dark:text-gray-400">
            Updated: {{ formatDate(todo.updated_at) }}
          </span>
        </div>
      </div>
      <div class="flex space-x-2">
        <Button variant="secondary" @click="startEdit">
          <PencilIcon class="h-5 w-5" />
        </Button>
        <Button
          variant="danger"
          @click="deleteTodo"
        >
          <TrashIcon class="h-5 w-5" />
        </Button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'
import { PencilIcon, TrashIcon, XMarkIcon, CheckIcon } from '@heroicons/vue/24/outline'
import Button from '../atoms/Button.vue'
import Input from '../atoms/Input.vue'
import TextArea from '../atoms/TextArea.vue'
import type { Todo } from '../../types/todo'

const props = defineProps<{
  todo: Todo
}>()

const emit = defineEmits<{
  (e: 'update', id: number, title: string, description: string, completed?: boolean): void
  (e: 'delete', id: number): void
}>()

const isEditing = ref(false)
const editTitle = ref('')
const editDescription = ref('')

onMounted(() => {
  editTitle.value = props.todo.title || ''
  editDescription.value = props.todo.description || ''
})

watch(() => props.todo, (newTodo) => {
  if (newTodo) {
    editTitle.value = newTodo.title || ''
    editDescription.value = newTodo.description || ''
  }
}, { deep: true, immediate: true })

const startEdit = () => {
  editTitle.value = props.todo.title || ''
  editDescription.value = props.todo.description || ''
  isEditing.value = true
}

const cancelEdit = () => {
  isEditing.value = false
}

const saveEdit = () => {
  emit('update', props.todo.id as number, editTitle.value, editDescription.value)
  isEditing.value = false
}

const updateStatus = (completed: boolean) => {
  emit('update', props.todo.id as number, props.todo.title, props.todo.description, completed)
}

const deleteTodo = () => {
  emit('delete', props.todo.id as number)
}

const formatDate = (dateString?: string) => {
  if (!dateString) return 'N/A'
  return new Date(dateString).toLocaleString()
}
</script>