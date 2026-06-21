<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'

const deferredPrompt = ref<any>(null)
const showPrompt = ref(false)

const handleBeforeInstallPrompt = (e: Event) => {
  e.preventDefault()
  deferredPrompt.value = e
  showPrompt.value = true
}

onMounted(() => {
  window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
})

onBeforeUnmount(() => {
  window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
})

const install = async () => {
  if (!deferredPrompt.value) return
  deferredPrompt.value.prompt()
  const { outcome } = await deferredPrompt.value.userChoice
  if (outcome === 'accepted') {
    showPrompt.value = false
  }
  deferredPrompt.value = null
}

const dismiss = () => {
  showPrompt.value = false
}
</script>

<template>
  <div v-if="showPrompt" class="fixed bottom-0 left-0 w-full bg-neutral-900 text-white p-4 shadow-lg z-50 flex items-center justify-between sm:justify-center sm:gap-6 border-t border-neutral-800">
    <div class="text-sm font-medium">Install SALTEDHASH app</div>
    <div class="flex items-center gap-3">
      <button @click="install" class="bg-white text-neutral-900 px-4 py-1.5 rounded-full text-sm font-medium hover:bg-neutral-200 transition-colors">Install</button>
      <button @click="dismiss" aria-label="Dismiss" class="text-neutral-400 hover:text-white p-1">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
      </button>
    </div>
  </div>
</template>
