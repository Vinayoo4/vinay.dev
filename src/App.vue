<script setup lang="ts">
import { ref, onMounted, onUnmounted, provide } from 'vue'
import { RouterView } from 'vue-router'
import NavBar from '@/components/ui/NavBar.vue'
import ProductPanel from '@/components/ui/ProductPanel.vue'
import InstallPrompt from '@/components/pwa/InstallPrompt.vue'
import UpdateBanner from '@/components/pwa/UpdateBanner.vue'

const isOnline = ref(navigator.onLine)

const updateOnlineStatus = () => {
  isOnline.value = navigator.onLine
}

onMounted(() => {
  window.addEventListener('online', updateOnlineStatus)
  window.addEventListener('offline', updateOnlineStatus)
})

onUnmounted(() => {
  window.removeEventListener('online', updateOnlineStatus)
  window.removeEventListener('offline', updateOnlineStatus)
})

provide('isOnline', isOnline)
</script>

<template>
  <UpdateBanner />
  <NavBar :is-online="isOnline" />
  <RouterView />
  <ProductPanel />
  <InstallPrompt />
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600;700&family=Inter:wght@400;500;600&display=swap');

html {
  font-family: 'Inter', sans-serif;
  background-color: #FAFAFA;
  color: #111827;
}

h1, h2, h3, h4, h5, h6, .font-serif {
  font-family: 'Cormorant Garamond', serif;
}

/* Base styles to prevent scrollbar jump when panel opens */
body {
  width: 100vw;
  overflow-x: hidden;
}
</style>
