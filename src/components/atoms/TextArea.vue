<template>
  <div>
    <textarea
      :rows="rows"
      :value="modelValue"
      @input="updateValue($event)"
      :class="[
        'block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-indigo-500',
        error ? 'border-red-500' : 'border-gray-300 dark:border-gray-600',
        'dark:bg-gray-700 dark:text-white resize-none',
        className
      ]"
      v-bind="$attrs"
    ></textarea>
    <p v-if="error" class="mt-1 text-sm text-red-600">{{ error }}</p>
  </div>
</template>

<script setup lang="ts">
interface Props {
  modelValue?: string
  rows?: number
  error?: string
  className?: string
}

const { modelValue, rows, error, className } = withDefaults(defineProps<Props>(), {
  modelValue: '',
  rows: 3,
  error: '',
  className: ''
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()

const updateValue = (event: Event) => {
  const target = event.target as HTMLTextAreaElement
  emit('update:modelValue', target.value)
}
</script>