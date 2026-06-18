<script setup lang="ts">
import { ref, onMounted } from 'vue'
import anime from 'animejs'
import { databases, DATABASE_ID, LEADS_COLLECTION_ID } from '@/lib/appwrite'
import { ID } from 'appwrite'

const form = ref({
  name: '',
  email: '',
  interest: 'Tech',
  message: ''
})

const isSubmitting = ref(false)
const isSuccess = ref(false)
const errorMsg = ref('')

const submitForm = async () => {
  isSubmitting.value = true
  errorMsg.value = ''
  
  try {
    await databases.createDocument(
      DATABASE_ID,
      LEADS_COLLECTION_ID,
      ID.unique(),
      {
        name: form.value.name,
        email: form.value.email,
        interest: form.value.interest,
        message: form.value.message
      }
    )
    isSuccess.value = true
    form.value = { name: '', email: '', interest: 'Tech', message: '' }
  } catch (error: any) {
    errorMsg.value = error.message || 'An error occurred. Please try again later.'
  } finally {
    isSubmitting.value = false
  }
}

onMounted(() => {
  anime({
    targets: '.contact-element',
    translateY: [30, 0],
    opacity: [0, 1],
    duration: 1000,
    easing: 'easeOutExpo',
    delay: anime.stagger(150)
  })
})
</script>

<template>
  <div class="px-6 py-12 md:py-24 max-w-3xl mx-auto min-h-[70vh]">
    <div class="contact-element text-xs font-mono uppercase tracking-widest text-foreground/50 mb-8">Connect</div>
    <h1 class="contact-element text-5xl md:text-6xl mb-12">Initiate protocol.</h1>

    <div v-if="isSuccess" class="contact-element p-8 border border-naturals text-naturals bg-naturals/5">
      <h3 class="text-xl mb-2">Message received.</h3>
      <p class="text-sm">We will review your inquiry and respond shortly.</p>
      <button @click="isSuccess = false" class="mt-6 text-xs uppercase tracking-widest border-b border-naturals pb-1">Send another</button>
    </div>

    <form v-else @submit.prevent="submitForm" class="contact-element space-y-8">
      <div v-if="errorMsg" class="p-4 border border-red-900/30 text-red-800 bg-red-50 text-sm">
        {{ errorMsg }}
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <label class="block text-xs font-mono uppercase tracking-widest mb-3">Name</label>
          <input 
            v-model="form.name" 
            required 
            type="text" 
            class="w-full bg-transparent border-b border-foreground/20 py-3 focus:outline-none focus:border-foreground transition-colors"
          />
        </div>
        <div>
          <label class="block text-xs font-mono uppercase tracking-widest mb-3">Email</label>
          <input 
            v-model="form.email" 
            required 
            type="email" 
            class="w-full bg-transparent border-b border-foreground/20 py-3 focus:outline-none focus:border-foreground transition-colors"
          />
        </div>
      </div>

      <div>
        <label class="block text-xs font-mono uppercase tracking-widest mb-3">Area of Interest</label>
        <select 
          v-model="form.interest" 
          class="w-full bg-transparent border-b border-foreground/20 py-3 focus:outline-none focus:border-foreground transition-colors appearance-none"
        >
          <option value="Tech">Tech & AI/ML Services</option>
          <option value="Naturals">TRIU Natural Products</option>
          <option value="Other">Other / General</option>
        </select>
      </div>

      <div>
        <label class="block text-xs font-mono uppercase tracking-widest mb-3">Message</label>
        <textarea 
          v-model="form.message" 
          required 
          rows="4" 
          class="w-full bg-transparent border-b border-foreground/20 py-3 focus:outline-none focus:border-foreground transition-colors resize-none"
        ></textarea>
      </div>

      <button 
        type="submit" 
        :disabled="isSubmitting"
        class="bg-foreground text-background px-8 py-4 text-sm uppercase tracking-widest hover:bg-foreground/90 transition-colors disabled:opacity-50 w-full md:w-auto"
      >
        {{ isSubmitting ? 'Transmitting...' : 'Submit Inquiry' }}
      </button>
    </form>
  </div>
</template>
