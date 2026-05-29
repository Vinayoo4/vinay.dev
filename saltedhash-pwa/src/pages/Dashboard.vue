<script setup>
import { computed, onMounted, ref } from 'vue'
import Button from '../components/Button.vue'
import { useAuth } from '../composables/useAuth'
import { useAppsStore } from '../stores/appsStore'
import { useWaitlistStore } from '../stores/waitlistStore'

const auth = useAuth()
const appsStore = useAppsStore()
const waitlistStore = useWaitlistStore()
const theme = ref('light')

onMounted(async () => {
  await Promise.all([auth.initAuth(), appsStore.load(), waitlistStore.load()])
})

const myApps = computed(() => {
  const access = auth.user.value?.appAccess || {}
  return Object.entries(access)
    .filter(([, details]) => details.hasAccess)
    .map(([appId, details]) => ({ app: appsStore.apps.find((a) => a.id === appId), details }))
})

const myWaitlist = computed(() => waitlistStore.entries.filter((entry) => entry.email === auth.user.value?.email))

function removeWaitlist(id) {
  waitlistStore.remove(id)
}
</script>

<template>
  <section class="container-max py-10">
    <h1 class="text-3xl font-bold">My Dashboard</h1>

    <div class="mt-6 grid gap-4 lg:grid-cols-2">
      <div class="card">
        <h2 class="text-lg font-semibold">Profile</h2>
        <p class="mt-2 text-sm">Name: {{ auth.user?.name || 'User' }}</p>
        <p class="text-sm">Email: {{ auth.user?.email }}</p>
        <Button class="mt-3" variant="outline">Edit profile</Button>
      </div>

      <div class="card">
        <h2 class="text-lg font-semibold">Settings</h2>
        <p class="mt-2 text-sm">Notification preferences and account controls.</p>
        <label class="mt-2 block text-sm">Theme
          <select v-model="theme" class="mt-1 w-full rounded border px-2 py-1"><option>light</option><option>dark</option></select>
        </label>
        <Button class="mt-3" variant="outline" @click="auth.logout">Logout</Button>
      </div>
    </div>

    <div class="card mt-6">
      <h2 class="text-lg font-semibold">My Apps</h2>
      <div v-if="myApps.length" class="mt-3 grid gap-3">
        <div v-for="item in myApps" :key="item.app?.id" class="rounded border p-3">
          <p class="font-semibold">{{ item.app?.name }}</p>
          <p class="text-sm">Plan: {{ item.details.plan }}</p>
          <div class="mt-2 flex gap-2">
            <Button @click="auth.launchApp(item.app)">Launch App</Button>
            <Button variant="outline">Manage</Button>
          </div>
        </div>
      </div>
      <p v-else class="mt-2 text-sm text-slate-600">No app subscriptions yet.</p>
    </div>

    <div class="card mt-6">
      <h2 class="text-lg font-semibold">Waitlist</h2>
      <div v-if="myWaitlist.length" class="mt-3 grid gap-2">
        <div v-for="entry in myWaitlist" :key="entry.id" class="flex items-center justify-between rounded border p-2">
          <span class="text-sm">{{ entry.app }} · Coming Q3 2026</span>
          <button class="text-sm text-red-600" @click="removeWaitlist(entry.id)">Remove</button>
        </div>
      </div>
      <p v-else class="mt-2 text-sm text-slate-600">No waitlist entries found.</p>
    </div>
  </section>
</template>
