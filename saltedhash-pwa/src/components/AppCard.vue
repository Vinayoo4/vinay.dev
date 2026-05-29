<script setup>
import { RouterLink } from 'vue-router'
import CategoryBadge from './CategoryBadge.vue'
import StatusBadge from './StatusBadge.vue'

defineProps({ app: Object })
</script>

<template>
  <article class="card flex h-full flex-col gap-3">
    <h3 class="text-lg font-semibold">{{ app.name }}</h3>
    <p class="text-sm text-slate-600">{{ app.tagline }}</p>
    <div class="flex gap-2"><CategoryBadge :category="app.category" /><StatusBadge :status="app.statusBadge" /></div>
    <RouterLink :to="`/app/${app.id}`" class="mt-auto text-sm font-semibold text-primary">View Details →</RouterLink>
  </article>
</template>
