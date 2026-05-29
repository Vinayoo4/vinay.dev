<script setup>
defineProps({ category: String })
</script>

<template>
  <span class="rounded-full bg-indigo-100 px-2 py-1 text-xs font-medium text-indigo-700">{{ category }}</span>
</template>
