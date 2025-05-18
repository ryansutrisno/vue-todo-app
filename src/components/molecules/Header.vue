<template>
  <header class="bg-white dark:bg-gray-800 shadow">
    <div class="container mx-auto px-4 py-4 flex justify-between items-center">
      <h1 class="text-xl font-bold text-gray-900 dark:text-white">
        <router-link to="/">Todo App</router-link>
      </h1>
      <div class="flex items-center space-x-4">
        <button
          @click="toggleTheme"
          class="p-2 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
          aria-label="Toggle dark mode"
        >
          <SunIcon v-if="isDark" class="h-6 w-6 text-yellow-400" />
          <MoonIcon v-else class="h-6 w-6 text-gray-700" />
        </button>
        <Button
          variant="secondary"
          @click="handleLogout"
          class="flex justify-center items-center"
        >
          <ArrowRightStartOnRectangleIcon class="h-5 w-5 mr-2" />
          Logout
        </Button>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useThemeStore } from '../../stores/theme'
import Button from '../atoms/Button.vue'
import {
    MoonIcon,
    SunIcon,
    ArrowRightStartOnRectangleIcon,
} from "@heroicons/vue/24/solid";

const themeStore = useThemeStore()
const { isDark } = storeToRefs(themeStore)

const emit = defineEmits<{
  (e: 'logout'): void
}>()

const toggleTheme = () => {
  themeStore.toggleTheme()
}

const handleLogout = () => {
  emit('logout')
}
</script>