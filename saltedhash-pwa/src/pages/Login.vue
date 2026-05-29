<script setup>
import { ref } from 'vue'
import { useRouter, useRoute, RouterLink } from 'vue-router'
import Button from '../components/Button.vue'
import { useAuth } from '../composables/useAuth'

const auth = useAuth()
const router = useRouter()
const route = useRoute()
const email = ref('')
const password = ref('')
const remember = ref(true)
const error = ref('')

async function submit() {
  error.value = ''
  try {
    await auth.login(email.value, password.value, { remember: remember.value })
    router.push(route.query.redirect?.toString() || '/dashboard')
  } catch (err) {
    error.value = err.message
  }
}
</script>

<template>
  <section class="container-max py-10">
    <div class="mx-auto max-w-md card">
      <h1 class="text-2xl font-bold">Welcome Back</h1>
      <form class="mt-4 grid gap-3" @submit.prevent="submit">
        <input v-model="email" required type="email" placeholder="Email" class="rounded-lg border border-slate-300 px-3 py-2" />
        <input v-model="password" required type="password" placeholder="Password" class="rounded-lg border border-slate-300 px-3 py-2" />
        <label class="text-sm"><input v-model="remember" type="checkbox" class="mr-1" />Remember me</label>
        <RouterLink to="/forgot-password" class="text-sm text-primary">Forgot password?</RouterLink>
        <Button type="submit">Sign In</Button>
        <button disabled class="rounded-lg border px-3 py-2 text-sm">Continue with Google (soon)</button>
      </form>
      <p v-if="error" class="mt-2 text-sm text-red-600">{{ error }}</p>
      <p class="mt-3 text-sm">Don't have an account? <RouterLink to="/register" class="text-primary">Sign Up</RouterLink></p>
    </div>
  </section>
</template>
