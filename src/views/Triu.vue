<script setup lang="ts">
import { onMounted } from 'vue'
import anime from 'animejs'

const products = [
  { name: 'Neem Powder', desc: 'Antibacterial purification for skin and soil.', tag: 'Purify' },
  { name: 'Rose Petal Powder', desc: 'Cooling essence for rituals and natural skincare.', tag: 'Soothe' },
  { name: 'Cow Dung Cakes', desc: 'Traditional utility for authentic cultural practices.', tag: 'Heritage' }
]

onMounted(() => {
  anime({
    targets: '.triu-element',
    translateY: [30, 0],
    opacity: [0, 1],
    duration: 1000,
    easing: 'easeOutExpo',
    delay: anime.stagger(150)
  })
})
</script>

<template>
  <div class="px-6 py-12 md:py-24 max-w-7xl mx-auto">
    <div class="max-w-3xl mb-24">
      <div class="triu-element text-xs font-mono uppercase tracking-widest text-naturals mb-8">TRIU Naturals</div>
      <h1 class="triu-element text-5xl md:text-7xl mb-8">Rooted in<br/>tradition.</h1>
      <p class="triu-element text-lg md:text-xl text-foreground/70 font-light leading-relaxed">
        Chemical-free care returning to the essentials. We curate natural products that respect both heritage and biological utility.
      </p>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
      <div 
        v-for="(product, index) in products" 
        :key="index"
        class="triu-element group border border-foreground/10 p-8 md:p-12 hover:border-naturals transition-colors duration-500 bg-background"
      >
        <div class="text-xs font-mono uppercase tracking-widest text-naturals mb-12">{{ product.tag }}</div>
        <h3 class="text-3xl mb-4">{{ product.name }}</h3>
        <p class="text-foreground/70">{{ product.desc }}</p>
      </div>
    </div>
  </div>
</template>
