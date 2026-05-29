<script setup>
import { ref } from 'vue'
import { useRouter, RouterLink } from 'vue-router'
import Button from '../components/Button.vue'
import { useAuth } from '../composables/useAuth'

const auth = useAuth()
const router = useRouter()
const name = ref('')
const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const accepted = ref(false)
const error = ref('')

async function submit() {
  error.value = ''
  if (password.value !== confirmPassword.value) return (error.value = 'Passwords do not match')
  if (!accepted.value) return (error.value = 'Please accept terms')
  try {
    await auth.register(email.value, password.value, name.value)
    router.push('/dashboard')
  } catch (err) {
    error.value = err.message
  }
}
</script>

<template>
  <section class="container-max py-10">
    <div class="mx-auto max-w-md card">
      <h1 class="text-2xl font-bold">Create Account</h1>
      <form class="mt-4 grid gap-3" @submit.prevent="submit">
        <input v-model="name" placeholder="Name (optional)" class="rounded-lg border border-slate-300 px-3 py-2" />
        <input v-model="email" required type="email" placeholder="Email" class="rounded-lg border border-slate-300 px-3 py-2" />
        <input v-model="password" required minlength="8" type="password" placeholder="Password" class="rounded-lg border border-slate-300 px-3 py-2" />
        <input v-model="confirmPassword" required type="password" placeholder="Confirm Password" class="rounded-lg border border-slate-300 px-3 py-2" />
        <label class="text-sm"><input v-model="accepted" type="checkbox" class="mr-1" />I agree to Terms of Service + Privacy Policy</label>
        <Button type="submit">Create Account</Button>
      </form>
      <p v-if="error" class="mt-2 text-sm text-red-600">{{ error }}</p>
      <p class="mt-3 text-sm">Already have an account? <RouterLink to="/login" class="text-primary">Sign In</RouterLink></p>
    </div>
  </section>
</template>
