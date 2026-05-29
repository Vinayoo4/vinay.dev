<script setup>
import { computed, onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import AppCard from '../components/AppCard.vue'
import SearchBar from '../components/SearchBar.vue'
import FilterBar from '../components/FilterBar.vue'
import { useAppsStore } from '../stores/appsStore'
import { useMeta } from '../utils/useMeta'

useMeta('Portfolio — SALTed HASH', 'Explore 28+ vertical SaaS products across 6 categories.')

const route = useRoute()
const appsStore = useAppsStore()
const search = ref('')
const selectedCategory = ref(route.query.category?.toString() || 'all')
const sortBy = ref('name')
const page = ref(1)
const perPage = 12

onMounted(async () => {
  await appsStore.load()
})

const filtered = computed(() => {
  return appsStore.apps
    .filter((app) => selectedCategory.value === 'all' || app.category === selectedCategory.value)
    .filter((app) => {
      const term = search.value.toLowerCase()
      return app.name.toLowerCase().includes(term) || app.description.toLowerCase().includes(term)
    })
    .sort((a, b) => {
      if (sortBy.value === 'category') return a.category.localeCompare(b.category)
      if (sortBy.value === 'launchDate') return a.launchDate.localeCompare(b.launchDate)
      return a.name.localeCompare(b.name)
    })
})

const paginated = computed(() => filtered.value.slice((page.value - 1) * perPage, page.value * perPage))
const totalPages = computed(() => Math.max(1, Math.ceil(filtered.value.length / perPage)))
</script>

<template>
  <section class="container-max py-10">
    <h1 class="text-3xl font-bold">Portfolio</h1>
    <p class="mt-2 text-slate-600">All 28+ apps, filters, search, and sorting.</p>

    <div class="mt-6 grid gap-3">
      <SearchBar v-model="search" />
      <FilterBar :categories="appsStore.categories" :selected-category="selectedCategory" :sort-by="sortBy" @update:selected-category="selectedCategory = $event" @update:sort-by="sortBy = $event" />
    </div>

    <div class="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      <AppCard v-for="app in paginated" :key="app.id" :app="app" />
    </div>

    <div class="mt-6 flex items-center justify-between">
      <button class="rounded border px-3 py-1" :disabled="page <= 1" @click="page -= 1">Prev</button>
      <span class="text-sm">Page {{ page }} / {{ totalPages }}</span>
      <button class="rounded border px-3 py-1" :disabled="page >= totalPages" @click="page += 1">Next</button>
    </div>
  </section>
</template>
