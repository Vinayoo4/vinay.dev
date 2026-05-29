<script setup>
import { computed, onMounted, ref } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import CategoryBadge from '../components/CategoryBadge.vue'
import StatusBadge from '../components/StatusBadge.vue'
import PricingCard from '../components/PricingCard.vue'
import WaitlistModal from '../components/WaitlistModal.vue'
import AppCard from '../components/AppCard.vue'
import { useAppsStore } from '../stores/appsStore'

const route = useRoute()
const appsStore = useAppsStore()
const openWaitlist = ref(false)

onMounted(async () => {
  await appsStore.load()
})

const app = computed(() => appsStore.apps.find((item) => item.id === route.params.id))
const related = computed(() => appsStore.apps.filter((item) => item.category === app.value?.category && item.id !== app.value?.id).slice(0, 3))
</script>

<template>
  <section v-if="app" class="container-max py-10">
    <h1 class="text-3xl font-bold">{{ app.name }}</h1>
    <p class="mt-2 text-slate-600">{{ app.tagline }}</p>
    <div class="mt-3 flex gap-2"><CategoryBadge :category="app.category" /><StatusBadge :status="app.statusBadge" /></div>

    <div class="mt-6 grid gap-4 lg:grid-cols-3">
      <div class="card lg:col-span-2">
        <p><strong>The problem:</strong> {{ app.problem }}</p>
        <p class="mt-3"><strong>The solution:</strong> {{ app.solution }}</p>
        <ul class="mt-3 list-disc pl-5 text-sm text-slate-700"><li v-for="feature in app.features" :key="feature">{{ feature }}</li></ul>
        <p class="mt-3 text-sm"><strong>Perfect for:</strong> {{ app.targetAudience }}</p>
        <p class="mt-3 text-sm"><strong>Launch timeline:</strong> Beta: {{ app.launchDate }}, Public: Q4 2026</p>
      </div>
      <PricingCard :pricing="app.pricing" />
    </div>

    <div class="mt-5 flex gap-2">
      <button class="rounded-lg bg-primary px-4 py-2 text-white" @click="openWaitlist = true">Join Beta Waitlist</button>
      <RouterLink to="/portfolio" class="rounded-lg border px-4 py-2">Back to Portfolio</RouterLink>
    </div>

    <h2 class="mt-10 mb-4 text-xl font-semibold">Related Apps</h2>
    <div class="grid gap-4 md:grid-cols-3"><AppCard v-for="item in related" :key="item.id" :app="item" /></div>

    <WaitlistModal :open="openWaitlist" :apps="appsStore.apps" :selected-app="app.id" @close="openWaitlist = false" />
  </section>
</template>
