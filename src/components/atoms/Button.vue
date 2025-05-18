<template>
  <button
    :class="[
      'px-4 py-2 rounded-md font-medium transition-colors',
      variantClasses[variant],
      className
    ]"
    v-bind="$attrs"
  >
    <slot></slot>
  </button>
</template>

<script setup lang="ts">
interface Props {
  variant?: 'primary' | 'secondary' | 'danger'
  className?: string
}

const { variant = 'primary', className = '' } = defineProps<Props>()

const variantClasses = {
  primary: 'bg-sky-600 text-white hover:bg-indigo-700',
  secondary: 'bg-gray-200 text-gray-800 hover:bg-gray-300 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600',
  danger: 'bg-red-500 text-white hover:bg-red-700'
}
</script>