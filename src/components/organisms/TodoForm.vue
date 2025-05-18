<template>
  <Form
  v-slot="{ isSubmitting }"
  @submit="onSubmit"
  :validation-schema="schema"
  >
    <div class="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
      <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-4">
        Add New Todo
      </h2>
      <div class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Title
          </label>
          <Field name="title" v-slot="{ field, errorMessage }">
            <Input
              type="text"
              placeholder="Enter title"
              v-bind="field"
              :error="errorMessage"
            />
          </Field>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Description
          </label>
          <Field name="description" v-slot="{ field, errorMessage }">
            <TextArea
              :rows="4"
              placeholder="Enter description"
              v-bind="field"
              :error="errorMessage"
            />
          </Field>
        </div>
        <div class="flex justify-end">
          <Button
            type="submit"
            variant="primary"
            class="flex justify-center items-center"
            :disabled="isSubmitting"
          >
            <PlusIcon class="h-5 w-5 mr-2" />
            {{ isSubmitting ? "Adding..." : "Add Todo" }}
          </Button>
        </div>
      </div>
    </div>
  </Form>
</template>

<script setup lang="ts">
import { Form, Field } from 'vee-validate'
import * as yup from 'yup'
import { PlusIcon } from '@heroicons/vue/24/outline'
import Input from '../atoms/Input.vue'
import Button from '../atoms/Button.vue'
import TextArea from '../atoms/TextArea.vue'

const emit = defineEmits<{
  (e: 'submit', title: string, description: string): void
}>()

const schema = yup.object().shape({
  title: yup.string()
    .required('Title is required'),
  description: yup.string()
    .required('Description is required')
})

const onSubmit = async (values: any, { resetForm }: any) => {
  try {
    emit('submit', values.title, values.description)
    resetForm()
    return true
  } catch (error) {
    return false
  }
}
</script>