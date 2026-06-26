<script setup lang="ts">
import { onMounted, ref, computed } from 'vue'
import anime from 'animejs'
import { ArrowRight } from '@lucide/vue'
import EntryScene from '@/components/scene/EntryScene.vue'

const isReducedMotion = ref(false)
const isWebGLAvailable = ref(true)

// Check WebGL availability
const checkWebGL = () => {
  try {
    const canvas = document.createElement('canvas')
    return !!(window.WebGLRenderingContext && (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')))
  } catch (e) {
    return false
  }
}

const show3D = computed(() => !isReducedMotion.value && isWebGLAvailable.value)

onMounted(() => {
  isReducedMotion.value = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  isWebGLAvailable.value = checkWebGL()

  anime({
    targets: '.hero-text',
    translateY: [50, 0],
    opacity: [0, 1],
    duration: 1200,
    easing: 'easeOutExpo',
    delay: anime.stagger(200)
  })
})
</script>

<template>
  <div class="w-full">
    <!-- 3D Entry Scene / Hero -->
    <section class="relative w-full h-[80vh] min-h-[600px] bg-black overflow-hidden flex flex-col">
      <div v-if="show3D" class="absolute inset-0 z-0">
        <Suspense>
          <EntryScene />
        </Suspense>
      </div>

      <!-- Overlay text for 3D, or fallback flat hero -->
      <div class="relative z-10 flex-grow flex flex-col justify-center px-6 max-w-7xl mx-auto w-full pointer-events-none">
        <h1 class="hero-text text-5xl md:text-8xl lg:text-[10rem] leading-none tracking-tighter mb-8 max-w-5xl text-white">
          The system builds itself.
        </h1>
        <p class="hero-text text-lg md:text-2xl text-white/70 max-w-2xl font-light leading-relaxed">
          SALTEDHASH is a venture studio and brand umbrella. We build intelligent software systems and curate natural essentials, guided by the principle of elegant utility.
        </p>
      </div>

      <!-- Overlay gradient to blend with the rest of the page -->
      <div class="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-background to-transparent z-10 pointer-events-none"></div>
    </section>

    <div class="px-6 py-12 md:py-24 max-w-7xl mx-auto">

    <section class="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16">
      <router-link to="/studio" class="hero-text group relative overflow-hidden bg-background border border-foreground/10 p-8 md:p-12 hover:border-tech transition-colors duration-500 min-h-[400px] flex flex-col justify-between">
        <div class="absolute inset-0 bg-tech/5 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
        <div class="relative z-10">
          <div class="text-xs font-mono uppercase tracking-widest text-tech mb-4">01 — Services</div>
          <h2 class="text-4xl md:text-5xl mb-6">Tech & AI/ML</h2>
          <p class="text-foreground/70 max-w-md">Software automation, AI-driven solutions, and digital strategy to scale your operations efficiently.</p>
        </div>
        <div class="relative z-10 flex items-center gap-2 text-sm uppercase tracking-widest mt-12 font-medium">
          Enter Studio <ArrowRight class="w-4 h-4 group-hover:translate-x-2 transition-transform" />
        </div>
      </router-link>

      <router-link to="/triu" class="hero-text group relative overflow-hidden bg-background border border-foreground/10 p-8 md:p-12 hover:border-naturals transition-colors duration-500 min-h-[400px] flex flex-col justify-between md:mt-24">
        <div class="absolute inset-0 bg-naturals/5 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
        <div class="relative z-10">
          <div class="text-xs font-mono uppercase tracking-widest text-naturals mb-4">02 — Products</div>
          <h2 class="text-4xl md:text-5xl mb-6">TRIU Naturals</h2>
          <p class="text-foreground/70 max-w-md">Chemical-free care rooted in tradition. Pure neem, rose, and natural utility products for everyday rituals.</p>
        </div>
        <div class="relative z-10 flex items-center gap-2 text-sm uppercase tracking-widest mt-12 font-medium">
          Explore Catalog <ArrowRight class="w-4 h-4 group-hover:translate-x-2 transition-transform" />
        </div>
      </router-link>
    </section>

    <section class="mt-32 hero-text">
      <div class="bg-neutral-900 text-white w-full py-16 px-8 flex flex-col items-center justify-center text-center">
        <h3 class="text-3xl md:text-5xl mb-6 font-serif">A problem-first product lab.</h3>
        <router-link to="/studio" class="inline-flex items-center gap-2 text-sm uppercase tracking-widest font-medium hover:text-neutral-300 transition-colors">
          Work with us <ArrowRight class="w-4 h-4" />
        </router-link>
      </div>
    </section>
    </div>
  </div>
</template>
