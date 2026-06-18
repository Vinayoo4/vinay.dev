<script setup lang="ts">
import ProductGrid from '@/components/ui/ProductGrid.vue'
import { onMounted, ref, nextTick } from 'vue'
import anime from 'animejs'

const titleRef = ref()
const textRef = ref()

onMounted(async () => {
  await nextTick()
  const targets = [titleRef.value, textRef.value].filter(Boolean)
  if (targets.length === 0) return
  anime({
    targets,
    translateY: [20, 0],
    opacity: [0, 1],
    duration: 800,
    delay: anime.stagger(200),
    easing: 'easeOutCubic'
  })
})
</script>

<template>
  <div class="min-h-screen bg-[#FAFAFA] pt-24 pb-12">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 text-center">
      <h1 ref="titleRef" class="font-serif text-4xl md:text-5xl font-medium text-neutral-900 mb-4 opacity-0">Complete Catalog</h1>
      <p ref="textRef" class="text-neutral-600 max-w-2xl mx-auto opacity-0">Browse through the entirety of the SALTEDHASH portfolio.</p>
    </div>
    <ProductGrid />
  </div>
</template>
