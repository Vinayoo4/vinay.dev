<script setup lang="ts">
import OrderForm from '@/components/ui/OrderForm.vue'
import { onMounted, ref } from 'vue'
import anime from 'animejs'

const titleRef = ref()
const textRef = ref()
const formContainerRef = ref()

onMounted(() => {
  anime({
    targets: [titleRef.value, textRef.value, formContainerRef.value],
    translateY: [20, 0],
    opacity: [0, 1],
    duration: 800,
    delay: anime.stagger(150),
    easing: 'easeOutCubic'
  })
})
</script>

<template>
  <div class="min-h-screen bg-[#FAFAFA] pt-24 pb-12">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 text-center">
      <h1 ref="titleRef" class="font-serif text-4xl md:text-5xl font-medium text-neutral-900 mb-4 opacity-0">Get in Touch</h1>
      <p ref="textRef" class="text-neutral-600 max-w-2xl mx-auto opacity-0">Inquire about our products or services using the form below.</p>
    </div>
    <div ref="formContainerRef" class="opacity-0">
      <OrderForm />
    </div>
  </div>
</template>
