<script setup>
import { computed, onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import Button from '../components/Button.vue'
import { useAppsStore } from '../stores/appsStore'
import { useWaitlistStore } from '../stores/waitlistStore'
import { useMeta } from '../utils/useMeta'

useMeta('Beta Waitlist — SALTed HASH', 'Join beta waitlist for upcoming SALTed HASH apps.')

const route = useRoute()
const appsStore = useAppsStore()
const waitlistStore = useWaitlistStore()
const email = ref('')
const name = ref('')
const app = ref(route.query.app?.toString() || '')
const categories = ref([])
const message = ref('')
const categoryOptions = ['vertical-saas', 'creator-identity', 'dev-tools', 'community', 'education-wellness', 'commerce']

onMounted(async () => {
  await Promise.all([appsStore.load(), waitlistStore.load()])
})

const countLabel = computed(() => `${Math.max(waitlistStore.count, 50)}+ businesses already on waitlist`)

function submit() {
  const result = waitlistStore.submit({ email: email.value, name: name.value, app: app.value, categories: categories.value })
  message.value = result.message
  if (result.ok) {
    email.value = ''
    name.value = ''
  }
}
</script>

<template>
  <section class="container-max py-10">
    <h1 class="text-3xl font-bold">Join Beta Waitlist</h1>
    <p class="mt-2 text-slate-600">Get early access + 50% lifetime discount when we launch.</p>

    <form class="card mt-6 grid gap-3" @submit.prevent="submit">
      <input v-model="email" required type="email" placeholder="Email" class="rounded-lg border border-slate-300 px-3 py-2" />
      <input v-model="name" type="text" placeholder="Name (optional)" class="rounded-lg border border-slate-300 px-3 py-2" />
      <select v-model="app" class="rounded-lg border border-slate-300 px-3 py-2">
        <option value="">Select app</option>
        <option v-for="item in appsStore.apps" :key="item.id" :value="item.id">{{ item.name }}</option>
      </select>
      <div>
        <p class="mb-1 text-sm font-medium">I'm interested in:</p>
        <label v-for="cat in categoryOptions" :key="cat" class="mr-3 text-sm"><input v-model="categories" type="checkbox" :value="cat" class="mr-1" />{{ cat }}</label>
      </div>
      <Button type="submit">Join Waitlist</Button>
      <p v-if="message" class="text-sm text-primary">{{ message }}</p>
      <p class="text-sm text-slate-500">{{ countLabel }}</p>
    </form>
  </section>
</template>
