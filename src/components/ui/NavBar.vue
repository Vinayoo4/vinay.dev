<script setup lang="ts">
import { Menu, X } from 'lucide-vue-next'
import { ref } from 'vue'

const isMobileMenuOpen = ref(false)

const toggleMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}
</script>

<template>
  <nav class="fixed top-0 left-0 w-full z-50 bg-neutral-50/80 backdrop-blur-md border-b border-neutral-200">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between h-16">
        <div class="flex items-center">
          <RouterLink to="/" class="flex-shrink-0 flex items-center gap-2" @click="isMobileMenuOpen = false">
            <span class="font-serif text-2xl font-bold tracking-tight text-neutral-900">SALTEDHASH</span>
          </RouterLink>
        </div>
        <div class="hidden sm:ml-6 sm:flex sm:items-center sm:space-x-8">
          <RouterLink to="/" class="text-sm font-medium text-neutral-600 hover:text-neutral-900 transition-colors">Home</RouterLink>
          <RouterLink to="/products" class="text-sm font-medium text-neutral-600 hover:text-neutral-900 transition-colors">Catalog</RouterLink>
          <RouterLink to="/contact" class="text-sm font-medium text-neutral-600 hover:text-neutral-900 transition-colors">Contact</RouterLink>
        </div>
        <div class="flex items-center sm:hidden">
          <button @click="toggleMenu" aria-label="Toggle navigation menu" class="text-neutral-600 hover:text-neutral-900 focus:outline-none">
            <Menu v-if="!isMobileMenuOpen" class="w-6 h-6" />
            <X v-else class="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>

    <!-- Mobile menu -->
    <div v-if="isMobileMenuOpen" class="sm:hidden bg-neutral-50 border-b border-neutral-200 absolute w-full left-0 top-16 shadow-lg">
      <div class="px-2 pt-2 pb-3 space-y-1">
        <RouterLink to="/" class="block px-3 py-2 text-base font-medium text-neutral-700 hover:text-neutral-900 hover:bg-neutral-100" @click="isMobileMenuOpen = false">Home</RouterLink>
        <RouterLink to="/products" class="block px-3 py-2 text-base font-medium text-neutral-700 hover:text-neutral-900 hover:bg-neutral-100" @click="isMobileMenuOpen = false">Catalog</RouterLink>
        <RouterLink to="/contact" class="block px-3 py-2 text-base font-medium text-neutral-700 hover:text-neutral-900 hover:bg-neutral-100" @click="isMobileMenuOpen = false">Contact</RouterLink>
      </div>
    </div>
  </nav>
</template>
