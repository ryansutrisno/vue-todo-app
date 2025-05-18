<template>
  <div class="min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
      <div>
        <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-white">
          Sign in
        </h2>
      </div>
      <Form v-slot="{ isSubmitting }" @submit="onSubmit" :validation-schema="schema">
        <div class="rounded-md shadow-sm -space-y-px mb-8">
          <div class="mb-4">
            <label for="email" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Username / Email address</label>
            <Field
              id="email"
              name="email"
              type="email"
              placeholder="Email address"
              :validateOnInput="true"
              v-slot="{ field, errorMessage }"
            >
              <Input
                v-bind="field"
                :error="errorMessage"
                required
              />
            </Field>
          </div>
          <div class="mb-4">
            <label for="password" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Password</label>
            <Field
              id="password"
              name="password"
              type="password"
              placeholder="Password"
              :validateOnInput="true"
              v-slot="{ field, errorMessage }"
            >
              <Input
                v-bind="field"
                type="password"
                :error="errorMessage"
                :showPasswordToggle="true"
                required
              />
            </Field>
          </div>
        </div>
        <div>
          <Button
            type="submit"
            variant="primary"
            class="w-full flex justify-center"
            :disabled="isSubmitting"
          >
            {{ isSubmitting ? 'Signing in...' : 'Sign in' }}
          </Button>
        </div>
      </Form>
      <div class="text-center mt-4">
        <p class="text-sm text-gray-600 dark:text-gray-400">
          <router-link to="/register" class="font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400">
            Don't have an account? Sign up
          </router-link>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useToast } from 'vue-toastification'
import { Form, Field } from 'vee-validate'
import * as yup from 'yup'
import { useAuthStore } from '../../stores/auth'
import Input from '../../components/atoms/Input.vue'
import Button from '../../components/atoms/Button.vue'

const router = useRouter()
const toast = useToast()
const authStore = useAuthStore()

const schema = {
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup.string().required('Password is required')
}

const onSubmit = async (values: {email: string, password: string}) => {
  try {
    await authStore.login(values?.email, values?.password)
    toast.success('Login successful')
    router.push('/')
  } catch (error) {
    toast.error(`Login failed.`)
  }
}
</script>