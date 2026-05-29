<script setup>
import { computed, onMounted } from 'vue'
import { RouterLink } from 'vue-router'
import AppCard from '../components/AppCard.vue'
import CategoryCard from '../components/CategoryCard.vue'
import Button from '../components/Button.vue'
import { useAppsStore } from '../stores/appsStore'
import { useWaitlistStore } from '../stores/waitlistStore'
import { useMeta } from '../utils/useMeta'

useMeta('SALTed HASH — Product Studio Building 28+ Vertical SaaS', 'From accounting automation to dentist clinic management to creator tools — we build category-defining SaaS for niches nobody else serves.')

const appsStore = useAppsStore()
const waitlistStore = useWaitlistStore()
const featuredIds = ['accounting-precision', 'dentistpro360', 'vibe-resume', 'twittable-snippets', 'microstartup-society']
const featured = computed(() => appsStore.apps.filter((app) => featuredIds.includes(app.id)))

onMounted(async () => {
  await appsStore.load()
  await waitlistStore.load()
})
</script>

<template>
  <section class="container-max py-12">
    <h1 class="text-3xl font-bold md:text-5xl">Product Studio Building 28+ Vertical SaaS for Underserved Markets</h1>
    <p class="mt-4 max-w-3xl text-slate-600">From accounting automation to dentist clinic management to creator tools — we build category-defining SaaS for niches nobody else serves.</p>
    <div class="mt-6 flex flex-wrap gap-3">
      <RouterLink to="/portfolio"><Button>Explore Portfolio</Button></RouterLink>
      <RouterLink to="/opal"><Button variant="secondary">Try Opal Mini-Apps</Button></RouterLink>
      <RouterLink to="/waitlist"><Button variant="outline">Join Beta Waitlist</Button></RouterLink>
      <RouterLink to="/partner"><Button variant="outline">Partner With Us</Button></RouterLink>
    </div>
  </section>

  <section class="container-max py-6">
    <h2 class="mb-4 text-2xl font-semibold">Featured Apps</h2>
    <div class="grid gap-4 md:grid-cols-2 xl:grid-cols-3"><AppCard v-for="app in featured" :key="app.id" :app="app" /></div>
  </section>

  <section class="container-max py-6">
    <h2 class="mb-4 text-2xl font-semibold">Categories</h2>
    <div class="grid gap-4 md:grid-cols-2 xl:grid-cols-3"><CategoryCard v-for="category in appsStore.categories" :key="category.id" :category="category" /></div>
  </section>

  <section class="container-max py-6">
    <div class="card flex flex-col justify-between gap-3 md:flex-row md:items-center">
      <div>
        <h3 class="text-xl font-semibold">12+ working mini-apps on Google Opal — try them now (free)</h3>
      </div>
      <RouterLink to="/opal"><Button>Open Opal Gallery</Button></RouterLink>
    </div>
  </section>

  <section class="container-max py-6">
    <div class="card">
      <h3 class="text-xl font-semibold">Beta Waitlist</h3>
      <p class="mt-2 text-sm text-slate-600">{{ waitlistStore.count || 50 }}+ businesses already on waitlist</p>
      <RouterLink to="/waitlist" class="mt-4 inline-block"><Button>Join Waitlist</Button></RouterLink>
    </div>
  </section>
</template>
