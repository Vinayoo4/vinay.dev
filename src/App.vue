<script setup lang="ts">
import { ref, onMounted, onUnmounted, provide } from 'vue'
import { RouterView } from 'vue-router'
import NavBar from '@/components/ui/NavBar.vue'
import ProductPanel from '@/components/ui/ProductPanel.vue'
import InstallPrompt from '@/components/pwa/InstallPrompt.vue'
import UpdateBanner from '@/components/pwa/UpdateBanner.vue'
import { useProductsStore } from '@/stores/products'

const isOnline = ref(navigator.onLine)
const store = useProductsStore()

const updateOnlineStatus = () => { isOnline.value = navigator.onLine }

onMounted(() => {
  window.addEventListener('online', updateOnlineStatus)
  window.addEventListener('offline', updateOnlineStatus)
  // Initialize product data globally once
  store.fetchProducts()
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
  <RouterView v-slot="{ Component, route }">
    <Transition name="page" mode="out-in">
      <component :is="Component" :key="route.path" />
    </Transition>
  </RouterView>
  <ProductPanel />
  <InstallPrompt />
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400&family=Inter:wght@300;400;500;600&display=swap');

.page-enter-active,
.page-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}
.page-enter-from {
  opacity: 0;
  transform: translateY(10px);
}
.page-leave-to {
  opacity: 0;
  transform: translateY(-6px);
}
</style>