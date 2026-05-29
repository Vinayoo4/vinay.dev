<script setup>
defineProps({ status: String })
</script>

<template>
  <span class="rounded-full bg-emerald-100 px-2 py-1 text-xs font-medium text-emerald-700">{{ status }}</span>
</template>
