<script setup lang="ts">
import { onMounted, ref } from 'vue'
import anime from 'animejs'
import { Plus, Minus } from '@lucide/vue'

const services = [
  { id: 1, title: 'AI & Machine Learning', desc: 'Custom intelligence models and automation workflows tailored to your specific business logic.' },
  { id: 2, title: 'Web Architecture', desc: 'Scalable, performant, and secure full-stack applications built on modern infrastructure.' },
  { id: 3, title: 'Shri Nandi Marketing', desc: 'Data-driven growth strategies and digital presence optimization for forward-thinking brands.' }
]

const activeService = ref<number | null>(null)

const toggleService = (id: number) => {
  activeService.value = activeService.value === id ? null : id
}

onMounted(() => {
  anime({
    targets: '.studio-element',
    translateY: [30, 0],
    opacity: [0, 1],
    duration: 1000,
    easing: 'easeOutExpo',
    delay: anime.stagger(150)
  })
})
</script>

<template>
  <div class="px-6 py-12 md:py-32 max-w-7xl mx-auto min-h-screen">
    <div class="max-w-4xl mb-32">
      <div class="studio-element text-xs font-mono uppercase tracking-widest text-tech mb-8">Studio & Agency</div>
      <h1 class="studio-element text-5xl md:text-8xl mb-8 font-serif">Engineering<br/>the future.</h1>
      <p class="studio-element text-xl md:text-2xl text-foreground/70 font-light leading-relaxed max-w-2xl">
        We specialize in building robust software solutions and deploying intelligent systems. Our approach is logic-first, delivering precision without the fluff.
      </p>
    </div>

    <div class="border-t border-foreground/10">
      <div 
        v-for="service in services" 
        :key="service.id"
        class="studio-element border-b border-foreground/10 py-8 cursor-pointer group"
        @click="toggleService(service.id)"
      >
        <div class="flex justify-between items-center">
          <h3 class="text-2xl md:text-4xl group-hover:text-tech transition-colors" :class="{'text-tech': activeService === service.id}">
            {{ service.title }}
          </h3>
          <button class="text-foreground/50 group-hover:text-tech transition-colors">
            <Minus v-if="activeService === service.id" class="w-6 h-6" />
            <Plus v-else class="w-6 h-6" />
          </button>
        </div>
        <transition name="accordion">
          <div v-show="activeService === service.id" class="pt-6">
            <p class="text-foreground/70 max-w-2xl text-lg">{{ service.desc }}</p>
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>

<style scoped>
.accordion-enter-active,
.accordion-leave-active {
  transition: all 0.3s ease;
  overflow: hidden;
}
.accordion-enter-from,
.accordion-leave-to {
  opacity: 0;
  max-height: 0;
}
.accordion-enter-to,
.accordion-leave-from {
  opacity: 1;
  max-height: 200px;
}
</style>
