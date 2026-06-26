<script setup lang="ts">
import { Menu, X } from '@lucide/vue'
import { ref, inject } from 'vue'

defineProps<{
  isOnline?: boolean
}>()

const isOnlineProvided = inject('isOnline', ref(true))

const isMobileMenuOpen = ref(false)

const toggleMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}
</script>

<template>
  <nav class="fixed top-0 left-0 w-full z-50 bg-neutral-50/80 backdrop-blur-md border-b border-neutral-200">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between h-16">
        <div class="flex items-center gap-4">
          <RouterLink to="/" class="flex-shrink-0 flex items-center gap-2" @click="isMobileMenuOpen = false">
            <span class="font-serif text-2xl font-bold tracking-tight text-neutral-900">SALTEDHASH</span>
          </RouterLink>
          <div class="flex items-center gap-2">
            <span :class="['w-2.5 h-2.5 rounded-full', (isOnline ?? isOnlineProvided) ? 'bg-green-500' : 'bg-red-500']" :title="(isOnline ?? isOnlineProvided) ? 'Online' : 'Offline'"></span>
          </div>
        </div>
        <div class="hidden md:ml-6 md:flex md:items-center md:space-x-8">
          <RouterLink to="/" class="text-sm font-medium text-neutral-600 hover:text-neutral-900 transition-colors">Home</RouterLink>
          <RouterLink to="/studio" class="text-sm font-medium text-neutral-600 hover:text-neutral-900 transition-colors">Studio</RouterLink>
          <RouterLink to="/triu" class="text-sm font-medium text-neutral-600 hover:text-neutral-900 transition-colors">TRIU</RouterLink>
          <RouterLink to="/about" class="text-sm font-medium text-neutral-600 hover:text-neutral-900 transition-colors">About</RouterLink>
          <RouterLink to="/contact" class="text-sm font-medium text-neutral-600 hover:text-neutral-900 transition-colors">Contact</RouterLink>
        </div>
        <div class="flex items-center md:hidden">
          <button @click="toggleMenu" aria-label="Toggle navigation menu" class="text-neutral-600 hover:text-neutral-900 focus:outline-none">
            <Menu v-if="!isMobileMenuOpen" class="w-6 h-6" />
            <X v-else class="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>

    <!-- Mobile menu -->
    <div v-if="isMobileMenuOpen" class="md:hidden bg-neutral-50 border-b border-neutral-200 absolute w-full left-0 top-16 shadow-lg">
      <div class="px-2 pt-2 pb-3 space-y-1">
        <RouterLink to="/" class="block px-3 py-2 text-base font-medium text-neutral-700 hover:text-neutral-900 hover:bg-neutral-100" @click="isMobileMenuOpen = false">Home</RouterLink>
        <RouterLink to="/studio" class="block px-3 py-2 text-base font-medium text-neutral-700 hover:text-neutral-900 hover:bg-neutral-100" @click="isMobileMenuOpen = false">Studio</RouterLink>
        <RouterLink to="/triu" class="block px-3 py-2 text-base font-medium text-neutral-700 hover:text-neutral-900 hover:bg-neutral-100" @click="isMobileMenuOpen = false">TRIU</RouterLink>
        <RouterLink to="/about" class="block px-3 py-2 text-base font-medium text-neutral-700 hover:text-neutral-900 hover:bg-neutral-100" @click="isMobileMenuOpen = false">About</RouterLink>
        <RouterLink to="/contact" class="block px-3 py-2 text-base font-medium text-neutral-700 hover:text-neutral-900 hover:bg-neutral-100" @click="isMobileMenuOpen = false">Contact</RouterLink>
      </div>
    </div>
  </nav>
</template>
