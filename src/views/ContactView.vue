<script setup lang="ts">
import OrderForm from '@/components/ui/OrderForm.vue'
import { onMounted, ref, nextTick } from 'vue'
import anime from 'animejs'
import { MessageCircle, Mail, Instagram, Linkedin, ExternalLink } from 'lucide-vue-next'

const titleRef = ref()
const textRef = ref()
const formContainerRef = ref()

const whatsappNumber = import.meta.env.VITE_WHATSAPP_NUMBER || '917355534385'
const contactEmail = import.meta.env.VITE_CONTACT_EMAIL || 'hello@saltedhash.in'
const instagramUrl = import.meta.env.VITE_INSTAGRAM_URL || 'https://instagram.com/saltedhash'
const linkedinUrl = import.meta.env.VITE_LINKEDIN_URL || 'https://linkedin.com/company/saltedhash'

const platforms = [
  {
    icon: MessageCircle,
    label: 'WhatsApp',
    sub: 'Chat directly with us',
    color: '#25D366',
    url: `https://wa.me/${whatsappNumber}`
  },
  {
    icon: Mail,
    label: 'Email Us',
    sub: contactEmail,
    color: '#233CB5',
    url: `mailto:${contactEmail}`
  },
  {
    icon: Instagram,
    label: 'Instagram',
    sub: '@saltedhash',
    color: '#E1306C',
    url: instagramUrl
  },
  {
    icon: Linkedin,
    label: 'LinkedIn',
    sub: 'SALTEDHASH Studio',
    color: '#0077B5',
    url: linkedinUrl
  }
]

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

    <div id="contact-platforms" class="max-w-4xl mx-auto mt-24 px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-10">
        <h2 class="font-serif text-3xl md:text-4xl font-medium text-neutral-900 mb-3">Or reach us directly</h2>
        <p class="text-neutral-500">Choose your preferred platform</p>
      </div>
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
        <a
          v-for="platform in platforms"
          :key="platform.label"
          :href="platform.url"
          target="_blank"
          rel="noopener noreferrer"
          class="group flex flex-col items-center justify-center gap-3 p-8 border border-neutral-200 bg-white hover:scale-105 transition-all duration-300 text-center"
          :style="{ '--hover-color': platform.color }"
        >
          <component :is="platform.icon" class="w-8 h-8 text-neutral-400 group-hover:text-[var(--hover-color)] transition-colors" />
          <div>
            <div class="text-sm font-medium text-neutral-900 group-hover:text-[var(--hover-color)] transition-colors">{{ platform.label }}</div>
            <div class="text-xs text-neutral-500 mt-1">{{ platform.sub }}</div>
          </div>
          <ExternalLink class="w-3 h-3 text-neutral-300 group-hover:text-[var(--hover-color)] transition-colors" />
        </a>
      </div>
    </div>
  </div>
</template>
