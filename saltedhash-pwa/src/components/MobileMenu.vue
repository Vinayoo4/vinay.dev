<script setup>
import { RouterLink } from 'vue-router'
const props = defineProps({ open: Boolean, links: Array })
const emit = defineEmits(['close'])
</script>

<template>
  <div v-if="open" class="border-t border-slate-200 bg-white p-4 md:hidden">
    <div class="flex flex-col gap-3">
      <RouterLink v-for="link in links" :key="link.to" :to="link.to" class="text-sm" @click="emit('close')">{{ link.label }}</RouterLink>
    </div>
  </div>
</template>
