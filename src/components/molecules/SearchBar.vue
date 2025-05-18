<template>
  <div class="bg-white dark:bg-gray-800 rounded-lg shadow">
    <div
      class="p-4 flex justify-between items-center cursor-pointer"
      @click="toggleExpand"
    >
      <h2 class="text-xl font-semibold text-gray-900 dark:text-white">
        Filter by
      </h2>
      <button
        type="button"
        class="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
        @click.stop="toggleExpand"
      >
        <ChevronUpIcon v-if="isExpanded" class="h-5 w-5" />
        <ChevronDownIcon v-else class="h-5 w-5" />
      </button>
    </div>

    <form v-if="isExpanded" @submit.prevent="handleSubmit" class="p-4 pt-0">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Title
          </label>
          <Input
            type="text"
            v-model="searchParams.title"
          />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Description
          </label>
          <Input
            type="text"
            v-model="searchParams.description"
          />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Completed
          </label>
          <select
            v-model="searchParams.completed"
            class="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white"
          >
            <option value="">All</option>
            <option value="true">Completed</option>
            <option value="false">Pending</option>
          </select>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Created From
          </label>
          <Input
            type="datetime-local"
            v-model="searchParams.created_from"
          />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Created To
          </label>
          <Input
            type="datetime-local"
            v-model="searchParams.created_to"
          />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Updated From
          </label>
          <Input
            type="datetime-local"
            v-model="searchParams.updated_from"
          />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Updated To
          </label>
          <Input
            type="datetime-local"
            v-model="searchParams.updated_to"
          />
        </div>
      </div>
      <div class="flex justify-end space-x-2">
        <Button
          type="button"
          variant="secondary"
          @click="handleReset"
          class="flex justify-center items-center"
        >
          <ArrowPathIcon class="h-5 w-5 mr-2" />
          Reset
        </Button>
        <Button
          type="submit"
          variant="primary"
          class="flex justify-center items-center"
          :disabled="isSearching"
        >
          <MagnifyingGlassIcon class="h-5 w-5 mr-2" />
          {{ isSearching ? 'Searching...' : 'Search' }}
        </Button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { MagnifyingGlassIcon, ArrowPathIcon, ChevronUpIcon, ChevronDownIcon } from '@heroicons/vue/24/outline'
import Input from '../atoms/Input.vue'
import Button from '../atoms/Button.vue'

const emit = defineEmits<{
  (e: 'search', params: Record<string, string>): void
  (e: 'searchStart'): void
  (e: 'searchEnd'): void
}>()

const isExpanded = ref(false)
const isSearching = ref(false)
const searchParams = reactive({
  title: '',
  description: '',
  completed: '',
  created_from: '',
  created_to: '',
  updated_from: '',
  updated_to: ''
})

const toggleExpand = () => {
  isExpanded.value = !isExpanded.value
}

const handleSubmit = async () => {
  const params = Object.fromEntries(
    Object.entries(searchParams).filter(([_, v]) => v !== '')
  )
  isSearching.value = true
  emit('searchStart')
  emit('search', params)
  await new Promise(resolve => setTimeout(resolve, 500))
  isSearching.value = false
  emit('searchEnd')
}

const handleReset = () => {
  Object.keys(searchParams).forEach(key => {
    searchParams[key as keyof typeof searchParams] = ''
  })
}
</script>