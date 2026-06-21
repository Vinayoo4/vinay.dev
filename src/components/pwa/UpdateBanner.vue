<script setup lang="ts">
import { useRegisterSW } from 'virtual:pwa-register/vue'

const { needRefresh, updateServiceWorker } = useRegisterSW()

const reload = () => {
  updateServiceWorker(true)
}
</script>

<template>
  <div v-if="needRefresh" class="fixed top-0 left-0 w-full bg-neutral-900 text-white p-3 shadow-lg z-[60] flex items-center justify-center gap-4 text-sm font-medium">
    <span>Update available</span>
    <button @click="reload" class="bg-white text-neutral-900 px-3 py-1 rounded-full hover:bg-neutral-200 transition-colors">Reload</button>
  </div>
</template>
