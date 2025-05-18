<template>
  <div>
    <div class="relative">
      <input
        :type="inputType"
        :value="modelValue"
        @input="updateValue($event)"
        :class="[
          'block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-indigo-500',
          error ? 'border-red-500' : 'border-gray-300 dark:border-gray-600',
          showPasswordToggle ? 'pr-10' : '',
          'dark:bg-gray-700 dark:text-white',
          className
        ]"
        v-bind="$attrs"
      />
      <button
        v-if="showPasswordToggle && type === 'password'"
        type="button"
        class="absolute top-0 bottom-0 right-0 px-3 flex items-center justify-center text-gray-500 dark:text-gray-400 cursor-pointer"
        @click="togglePasswordVisibility"
      >
        <EyeIcon v-if="showPassword" class="h-5 w-5" />
        <EyeSlashIcon v-else class="h-5 w-5" />
      </button>
    </div>
    <p v-if="error" class="mt-1 text-sm text-red-600">{{ error }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { EyeIcon, EyeSlashIcon } from '@heroicons/vue/24/outline';

interface Props {
  modelValue?: string
  type?: string
  error?: string
  showPasswordToggle?: boolean
  className?: string
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: '',
  type: 'text',
  error: '',
  showPasswordToggle: false,
  className: ''
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()

const showPassword = ref(false)

const togglePasswordVisibility = () => {
  showPassword.value = !showPassword.value
}

const updateValue = (event: Event) => {
  const target = event.target as HTMLInputElement
  emit('update:modelValue', target.value)
}

const inputType = computed(() => {
  return props.showPasswordToggle && props.type === 'password'
    ? (showPassword.value ? 'text' : 'password')
    : props.type
})
</script>