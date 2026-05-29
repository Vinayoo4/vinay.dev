<script setup>
import { computed, onMounted, ref } from 'vue'
import OpalAppCard from '../components/OpalAppCard.vue'
import { useAppsStore } from '../stores/appsStore'
import { useOpalStore } from '../stores/opalStore'
import { useMeta } from '../utils/useMeta'

useMeta('Opal Gallery — SALTed HASH', '12+ AI mini-apps built with Google Opal.')

const appsStore = useAppsStore()
const opalStore = useOpalStore()
const category = ref('all')

onMounted(async () => {
  await Promise.all([appsStore.load(), opalStore.load()])
})

const filtered = computed(() => opalStore.opalApps.filter((app) => category.value === 'all' || app.category === category.value))
</script>

<template>
  <section class="container-max py-10">
    <h1 class="text-3xl font-bold">12+ AI Mini-Apps on Google Opal</h1>
    <p class="mt-2 text-slate-600">Built in minutes using Google Opal — try them now (free, no signup).</p>

    <select v-model="category" class="mt-4 rounded-lg border border-slate-300 px-3 py-2">
      <option value="all">All categories</option>
      <option v-for="c in appsStore.categories" :key="c.id" :value="c.id">{{ c.name }}</option>
    </select>

    <div class="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3"><OpalAppCard v-for="app in filtered" :key="app.id" :app="app" /></div>

    <div class="card mt-8">
      <h2 class="text-lg font-semibold">What is Opal?</h2>
      <p class="mt-2 text-sm text-slate-600">Google Opal helps you prototype AI mini-apps quickly with minimal setup. We use it to validate real problems before launching full PWAs. Read more in the <a href="https://opal.withgoogle.com" target="_blank" rel="noreferrer" class="text-primary">Opal docs</a>.</p>
    </div>
  </section>
</template>
