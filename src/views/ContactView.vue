<script setup lang="ts">
import OrderForm from '@/components/ui/OrderForm.vue'
import { onMounted, ref, nextTick } from 'vue'
import anime from 'animejs'

const titleRef = ref()
const textRef = ref()
const formContainerRef = ref()

onMounted(async () => {
  await nextTick()
  const targets = [titleRef.value, textRef.value, formContainerRef.value].filter(Boolean)
  if (targets.length === 0) return
  anime({
    targets,
    translateY: [20, 0],
    opacity: [0, 1],
    duration: 800,
    delay: anime.stagger(150),
    easing: 'easeOutCubic'
  })
})
</script>

<template>
  <div class="min-h-screen bg-[#FAFAFA] pt-32 pb-24 flex flex-col justify-center">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 text-center">
      <h1 ref="titleRef" class="font-serif text-5xl md:text-7xl font-medium text-neutral-900 mb-6 opacity-0">Get in Touch.</h1>
      <p ref="textRef" class="text-xl text-neutral-600 max-w-2xl mx-auto opacity-0 font-light">Inquire about our venture studio services or TRIU Naturals using the form below.</p>
    </div>
    <div ref="formContainerRef" class="opacity-0">
      <OrderForm />
    </div>
  </div>
</template>
