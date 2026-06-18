<script setup lang="ts">
import { RouterView } from 'vue-router'
import NavBar from '@/components/ui/NavBar.vue'
import ProductPanel from '@/components/ui/ProductPanel.vue'
</script>

<template>
  <NavBar />
  <RouterView />
  <ProductPanel />
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
