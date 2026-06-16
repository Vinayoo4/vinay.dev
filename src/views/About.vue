<script setup lang="ts">
import { onMounted } from 'vue'
import anime from 'animejs'

onMounted(() => {
  anime({
    targets: '.about-element',
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
    <div class="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-32">
      <div>
        <div class="about-element text-xs font-mono uppercase tracking-widest text-foreground/50 mb-8">The Studio</div>
        <h1 class="about-element text-5xl md:text-6xl mb-8">Structure &<br/>Substance.</h1>
        <p class="about-element text-lg text-foreground/70 font-light leading-relaxed mb-6">
          SALTEDHASH operates as an umbrella brand, synthesizing logic with nature. We believe the same principles that govern a robust software architecture can be applied to creating sustainable natural products.
        </p>
        <p class="about-element text-lg text-foreground/70 font-light leading-relaxed">
          It is about stripping away the unnecessary, leaving only what is functional, beautiful, and enduring.
        </p>
      </div>

      <div class="border border-foreground/10 p-8 md:p-12">
        <div class="about-element text-xs font-mono uppercase tracking-widest text-foreground/50 mb-12">The Founder</div>
        <h3 class="about-element text-3xl mb-6">Vinay</h3>
        <p class="about-element text-foreground/70 mb-8 leading-relaxed">
          Blending BTech AI/ML logic with deep roots in Indian natural e-commerce. The vision is to build a system where technology scales tradition, and tradition grounds technology.
        </p>
        <div class="about-element text-xs font-mono uppercase tracking-widest text-foreground/40">Architect / Curator</div>
      </div>
    </div>
  </div>
</template>
