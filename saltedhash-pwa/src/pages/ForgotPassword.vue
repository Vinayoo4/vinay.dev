<script setup>
import { ref } from 'vue'
import Button from '../components/Button.vue'

const email = ref('')
const sent = ref(false)
</script>

<template>
  <section class="container-max py-10">
    <div class="mx-auto max-w-md card">
      <h1 class="text-2xl font-bold">Reset Password</h1>
      <form class="mt-4 grid gap-3" @submit.prevent="sent = true">
        <input v-model="email" required type="email" placeholder="Email" class="rounded-lg border border-slate-300 px-3 py-2" />
        <Button type="submit">Send Reset Link</Button>
      </form>
      <p v-if="sent" class="mt-2 text-sm text-primary">Check your email for reset link.</p>
    </div>
  </section>
</template>
