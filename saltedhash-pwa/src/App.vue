<script setup>
import { onMounted } from 'vue'
import { useRoute } from 'vue-router'
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'
import { useSiteConfigStore } from './stores/siteConfigStore'
import { useAuth } from './composables/useAuth'

const route = useRoute()
const siteConfigStore = useSiteConfigStore()
const auth = useAuth()

onMounted(async () => {
  await siteConfigStore.load()
  await auth.initAuth()
})
</script>

<template>
  <Header />
  <main class="min-h-[calc(100vh-200px)]"><RouterView /></main>
  <Footer v-if="route.path !== '/dashboard'" />
</template>
