<script setup>
import { RouterLink } from 'vue-router'
defineProps({ category: Object })
</script>

<template>
  <RouterLink :to="`/portfolio?category=${category.id}`" class="card block hover:border-primary">
    <h3 class="font-semibold">{{ category.name }}</h3>
    <p class="mt-1 text-sm text-slate-600">{{ category.description }}</p>
    <p class="mt-2 text-xs font-semibold text-primary">{{ category.appCount }} apps</p>
  </RouterLink>
</template>
