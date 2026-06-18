<script setup lang="ts">
import { ref, onMounted } from 'vue'
import EntryScene from '@/components/scene/EntryScene.vue'
import ProductGrid from '@/components/ui/ProductGrid.vue'
import { useProductsStore } from '@/stores/products'
import anime from 'animejs'

const store = useProductsStore()
const show3D = ref(true)
const titleRef = ref()
const textRef = ref()

onMounted(() => {
  store.fetchProducts()

  // Graceful degradation for reduced motion or lack of WebGL
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  // Simple WebGL check
  const canvas = document.createElement('canvas')
  const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl')

  if (prefersReducedMotion || !gl) {
    show3D.value = false
  }

  // Animate text if in 2D fallback mode
  if (!show3D.value && titleRef.value) {
    anime({
      targets: [titleRef.value, textRef.value],
      translateY: [20, 0],
      opacity: [0, 1],
      duration: 800,
      delay: anime.stagger(200),
      easing: 'easeOutCubic'
    })
  }
})
</script>

<template>
  <main class="w-full h-screen overflow-hidden relative">
    <template v-if="show3D">
      <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 pointer-events-none text-center">
        <h1 class="font-serif text-5xl md:text-7xl text-white font-bold tracking-tight opacity-50 mix-blend-overlay">SALTEDHASH</h1>
      </div>
      <EntryScene />
    </template>
    <template v-else>
      <div class="h-full overflow-y-auto bg-[#FAFAFA] pt-24 pb-12">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 text-center">
          <h1 ref="titleRef" class="font-serif text-4xl md:text-5xl font-medium text-neutral-900 mb-4 opacity-0">Discover the Ecosystem</h1>
          <p ref="textRef" class="text-neutral-600 max-w-2xl mx-auto opacity-0">Explore our diverse range of products and services across various domains.</p>
        </div>
        <ProductGrid />
      </div>
    </template>
  </main>
</template>
