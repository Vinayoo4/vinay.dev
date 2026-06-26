<script setup lang="ts">
import { onMounted } from 'vue'
import anime from 'animejs'
import { ArrowLeft } from '@lucide/vue'

onMounted(() => {
  anime({
    targets: '.not-found-text',
    translateY: [20, 0],
    opacity: [0, 1],
    duration: 800,
    easing: 'easeOutExpo',
    delay: anime.stagger(150)
  })
})
</script>

<template>
  <div class="min-h-screen bg-neutral-900 text-white flex flex-col items-center justify-center px-6">
    <div class="text-center max-w-md">
      <div class="not-found-text text-xs font-mono uppercase tracking-widest text-neutral-500 mb-8">SALTEDHASH</div>
      <h1 class="not-found-text font-serif text-8xl md:text-9xl mb-6 font-bold tracking-tighter text-neutral-100">404</h1>
      <p class="not-found-text text-xl md:text-2xl mb-12 text-neutral-400 font-light">This path is empty.</p>
      <router-link to="/" class="not-found-text inline-flex items-center gap-3 bg-white text-black px-6 py-3 text-sm uppercase tracking-widest font-medium hover:bg-neutral-200 transition-colors">
        <ArrowLeft class="w-4 h-4" /> Return Home
      </router-link>
    </div>
  </div>
</template>
