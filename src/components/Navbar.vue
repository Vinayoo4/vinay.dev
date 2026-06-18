<script setup lang="ts">
import { ref } from 'vue'
import { Menu, X } from 'lucide-vue-next'
const isOpen = ref(false)
</script>

<template>
  <nav class="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-foreground/5">
    <div class="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
      <router-link to="/" class="font-serif text-xl tracking-tight font-bold z-50 relative">SALTEDHASH</router-link>
      
      <div class="hidden md:flex gap-8 text-sm uppercase tracking-widest font-medium">
        <router-link to="/studio" class="hover:text-tech transition-colors">Tech</router-link>
        <router-link to="/triu" class="hover:text-naturals transition-colors">Naturals</router-link>
        <router-link to="/about" class="hover:text-foreground/70 transition-colors">About</router-link>
        <router-link to="/contact" class="hover:text-foreground/70 transition-colors">Contact</router-link>
      </div>

      <button @click="isOpen = !isOpen" aria-label="Toggle navigation menu" class="md:hidden z-50 relative">
        <Menu v-if="!isOpen" class="w-6 h-6" />
        <X v-else class="w-6 h-6" />
      </button>

      <div v-if="isOpen" class="fixed inset-0 bg-background flex flex-col items-center justify-center gap-8 text-2xl font-serif z-40">
        <router-link @click="isOpen = false" to="/studio">Tech</router-link>
        <router-link @click="isOpen = false" to="/triu">Naturals</router-link>
        <router-link @click="isOpen = false" to="/about">About</router-link>
        <router-link @click="isOpen = false" to="/contact">Contact</router-link>
      </div>
    </div>
  </nav>
</template>
