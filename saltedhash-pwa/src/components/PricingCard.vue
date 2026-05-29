<script setup>
defineProps({ pricing: Object })
</script>

<template>
  <div class="card">
    <h3 class="text-lg font-semibold">Pricing</h3>
    <p class="mt-2 text-sm">Early Bird: <span class="font-semibold text-primary">{{ pricing?.earlyBird }}</span></p>
    <p class="text-sm">Regular: <span class="font-semibold">{{ pricing?.regular }}</span></p>
    <p class="text-xs text-slate-500">Beta spots: {{ pricing?.betaSpots }}</p>
  </div>
</template>
