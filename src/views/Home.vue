<script setup lang="ts">
import { onMounted, ref } from 'vue'
import anime from 'animejs'
import { ArrowRight } from 'lucide-vue-next'
import EntryScene from '@/components/scene/EntryScene.vue'

const showScene = ref(false)

onMounted(() => {
  anime({
    targets: '.hero-text',
    translateY: [50, 0],
    opacity: [0, 1],
    duration: 1200,
    easing: 'easeOutExpo',
    delay: anime.stagger(200)
  })
  setTimeout(() => { showScene.value = true }, 400)
})
</script>

<template>
  <main class="pt-16">
    <!-- Hero -->
    <section class="min-h-[90vh] flex flex-col justify-center px-6 md:px-12 max-w-7xl mx-auto py-24">
      <div class="hero-text opacity-0 text-xs font-mono uppercase tracking-[0.3em] text-tech mb-6 flex items-center gap-3">
        <span class="inline-block w-8 h-px bg-tech"></span>
        Venture Studio · Problem-First
      </div>
      <h1 class="hero-text opacity-0 text-[clamp(3rem,9vw,8rem)] leading-[0.9] tracking-tighter font-serif mb-8 max-w-5xl">
        The system<br/>builds itself.
      </h1>
      <p class="hero-text opacity-0 text-lg md:text-2xl text-neutral-500 max-w-2xl font-light leading-relaxed mb-12">
        SALTEDHASH is a venture studio and brand umbrella. We build intelligent software systems and curate natural essentials — guided by elegant utility.
      </p>
      <div class="hero-text opacity-0 flex flex-wrap gap-4">
        <router-link to="/studio" class="group flex items-center gap-2 bg-neutral-900 text-white px-7 py-3.5 text-sm uppercase tracking-widest font-medium hover:bg-tech transition-all duration-300">
          Enter Studio <ArrowRight class="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </router-link>
        <router-link to="/triu" class="group flex items-center gap-2 border border-neutral-200 px-7 py-3.5 text-sm uppercase tracking-widest font-medium hover:border-naturals hover:text-naturals transition-all duration-300">
          TRIU Naturals <ArrowRight class="w-4 h-4" />
        </router-link>
      </div>
    </section>

    <!-- 3D Scene -->
    <section class="relative h-[65vh] overflow-hidden bg-black">
      <Transition name="page">
        <EntryScene v-if="showScene" class="w-full h-full" />
      </Transition>
      <div class="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/30 text-xs font-mono uppercase tracking-widest pointer-events-none">
        Move mouse to explore · Click a product to view
      </div>
    </section>

    <!-- Ventures -->
    <section class="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10 px-6 py-24 max-w-7xl mx-auto">
      <router-link to="/studio" class="hero-text group relative overflow-hidden bg-background border border-neutral-200 p-10 md:p-14 hover:border-tech transition-colors duration-500 min-h-[380px] flex flex-col justify-between">
        <div class="absolute inset-0 bg-tech/5 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
        <div class="relative z-10">
          <div class="text-xs font-mono uppercase tracking-widest text-tech mb-4">01 — Services</div>
          <h2 class="font-serif text-4xl md:text-5xl mb-6">Tech & AI/ML</h2>
          <p class="text-neutral-500 max-w-md leading-relaxed">Software automation, AI-driven solutions, and digital strategy to scale your operations efficiently.</p>
        </div>
        <div class="relative z-10 flex items-center gap-2 text-sm uppercase tracking-widest mt-12 font-medium text-tech opacity-0 group-hover:opacity-100 transition-opacity">
          Enter Studio <ArrowRight class="w-4 h-4 group-hover:translate-x-2 transition-transform" />
        </div>
      </router-link>

      <router-link to="/triu" class="hero-text group relative overflow-hidden bg-background border border-neutral-200 p-10 md:p-14 hover:border-naturals transition-colors duration-500 min-h-[380px] flex flex-col justify-between">
        <div class="absolute inset-0 bg-naturals/5 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
        <div class="relative z-10">
          <div class="text-xs font-mono uppercase tracking-widest text-naturals mb-4">02 — Products</div>
          <h2 class="font-serif text-4xl md:text-5xl mb-6">TRIU Naturals</h2>
          <p class="text-neutral-500 max-w-md leading-relaxed">Chemical-free care rooted in tradition. Pure neem, rose, and natural utility products for everyday rituals.</p>
        </div>
        <div class="relative z-10 flex items-center gap-2 text-sm uppercase tracking-widest mt-12 font-medium text-naturals opacity-0 group-hover:opacity-100 transition-opacity">
          Explore Catalog <ArrowRight class="w-4 h-4 group-hover:translate-x-2 transition-transform" />
        </div>
      </router-link>

      <router-link to="/studio" class="hero-text group relative overflow-hidden bg-background border border-neutral-200 p-10 md:p-14 hover:border-marketing transition-colors duration-500 min-h-[380px] flex flex-col justify-between">
        <div class="absolute inset-0 bg-marketing/5 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
        <div class="relative z-10">
          <div class="text-xs font-mono uppercase tracking-widest text-marketing mb-4">03 — Marketing</div>
          <h2 class="font-serif text-4xl md:text-5xl mb-6">Shri Nandi Marketing</h2>
          <p class="text-neutral-500 max-w-md leading-relaxed">Data-driven growth, digital presence, and brand strategy for businesses ready to scale. Powered by field-tested marketing operations.</p>
        </div>
        <div class="relative z-10 flex items-center gap-2 text-sm uppercase tracking-widest mt-12 font-medium text-marketing opacity-0 group-hover:opacity-100 transition-opacity">
          View Services <ArrowRight class="w-4 h-4 group-hover:translate-x-2 transition-transform" />
        </div>
      </router-link>
    </section>

    <!-- CTA Band -->
    <section class="bg-neutral-900 text-white py-20 px-6 text-center">
      <h3 class="font-serif text-4xl md:text-6xl mb-6">A problem-first product lab.</h3>
      <router-link to="/contact" class="inline-flex items-center gap-2 text-sm uppercase tracking-widest font-medium hover:text-neutral-300 transition-colors">
        Work with us <ArrowRight class="w-4 h-4" />
      </router-link>
    </section>
  </main>
</template>
