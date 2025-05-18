<template>
  <div
    class="min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center px-4 sm:px-6 lg:px-8"
  >
    <div
      class="max-w-md w-full space-y-8 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md"
    >
      <div>
        <h2
          class="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-white"
        >
          Create a new account
        </h2>
      </div>
      <Form v-slot="{isSubmitting}" @submit="onSubmit" :validation-schema="schema">
        <div class="rounded-md shadow-sm space-y-px mb-4">
          <div class="mb-4">
            <label
              for="email"
              class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >Username / Email address</label
            >
            <Field name="email" v-slot="{ field, errors }">
              <Input
                id="email"
                type="email"
                v-bind="field"
                placeholder="Email address"
                :error="errors[0]"
                required
              />
            </Field>
          </div>
          <div class="mb-4">
            <label
              for="password"
              class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >Password</label
            >
            <Field name="password" v-slot="{ field, errors }">
              <Input
                id="password"
                type="password"
                v-bind="field"
                placeholder="Password"
                :error="errors[0]"
                :showPasswordToggle="true"
                required
              />
            </Field>
          </div>
          <div class="mb-4">
            <label
              for="confirmPassword"
              class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >Confirm Password</label
            >
            <Field name="confirmPassword" v-slot="{ field, errors }">
              <Input
                id="confirmPassword"
                type="password"
                v-bind="field"
                placeholder="Confirm password"
                :error="errors[0]"
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
            {{ isSubmitting ? "Registering..." : "Register"}}
          </Button>
        </div>
      </Form>
      <div class="text-center mt-4">
        <p class="text-sm text-gray-600 dark:text-gray-400">
          <router-link
            to="/login"
            class="font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400"
          >
          Already have an account? Sign in
          </router-link>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
import { useToast } from "vue-toastification";
import { Form, Field } from "vee-validate";
import * as yup from "yup";
import { useAuthStore } from "../../stores/auth";
import Input from "../../components/atoms/Input.vue";
import Button from "../../components/atoms/Button.vue";

const router = useRouter();
const toast = useToast();
const authStore = useAuthStore();

const schema = yup.object().shape({
  email: yup
    .string()
    .required("Email is required")
    .email("Invalid email format"),
  password: yup
    .string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters"),
  confirmPassword: yup
    .string()
    .required("Confirm password is required")
    .oneOf([yup.ref("password")], "Passwords must match"),
});

const onSubmit = async (values: { email: string; password: string }) => {
  try {
    await authStore.register(values.email, values.password);
    toast.success("Registration successful! Please log in.");
    router.push("/login");
  } catch (error: unknown) {
    if (error instanceof Error) {
      toast.error(`Registration failed: ${error?.response?.data?.error}`);
    } else {
      toast.error("Registration failed: An unexpected error occurred");
    }
  }
};
</script>
