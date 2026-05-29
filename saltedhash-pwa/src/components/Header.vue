<script setup>
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import Button from './Button.vue'
import MobileMenu from './MobileMenu.vue'

const mobileOpen = ref(false)
const links = [
  { label: 'About', to: '/about' },
  { label: 'Portfolio', to: '/portfolio' },
  { label: 'Opal Gallery', to: '/opal' },
  { label: 'Waitlist', to: '/waitlist' },
  { label: 'Contact', to: '/contact' },
]
</script>

<template>
  <header class="sticky top-0 z-40 border-b border-slate-200 bg-white/90 backdrop-blur">
    <div class="container-max flex h-16 items-center justify-between">
      <RouterLink to="/" class="font-bold text-primary">SALTed HASH</RouterLink>
      <nav class="hidden items-center gap-6 md:flex">
        <RouterLink v-for="link in links" :key="link.to" :to="link.to" class="text-sm text-slate-700 hover:text-primary">{{ link.label }}</RouterLink>
      </nav>
      <div class="flex items-center gap-2">
        <RouterLink to="/waitlist"><Button>Join Beta</Button></RouterLink>
        <button class="md:hidden" @click="mobileOpen = !mobileOpen">☰</button>
      </div>
    </div>
    <MobileMenu :open="mobileOpen" :links="links" @close="mobileOpen = false" />
  </header>
</template>
