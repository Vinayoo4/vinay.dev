<script setup>
defineProps({ app: Object })
</script>

<template>
  <article class="card flex h-full flex-col gap-3">
    <h3 class="text-lg font-semibold">{{ app.name }}</h3>
    <p class="text-sm text-slate-600">{{ app.tagline }}</p>
    <span class="text-xs font-medium text-secondary">Built in {{ app.builtIn }}</span>
    <a :href="app.opalUrl" target="_blank" rel="noreferrer" class="mt-auto text-sm font-semibold text-primary">Try Now →</a>
  </article>
</template>
