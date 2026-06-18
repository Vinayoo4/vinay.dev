<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useLeads } from '@/composables/useLeads'

const route = useRoute()
const { submitLead, loading, error, success } = useLeads()

const formData = ref({
  name: '',
  phone: '',
  email: '',
  productInterest: '',
  message: ''
})

onMounted(() => {
  if (route.query.interest) {
    formData.value.productInterest = route.query.interest as string
  }
})

const handleSubmit = async () => {
  await submitLead(formData.value)
  if (success.value) {
    formData.value = {
      name: '',
      phone: '',
      email: '',
      productInterest: '',
      message: ''
    }
  }
}
</script>

<template>
  <div class="max-w-2xl mx-auto bg-white border border-neutral-200 p-8 sm:p-12">
    <div v-if="success" class="text-center py-12">
      <h3 class="font-serif text-2xl font-medium text-neutral-900 mb-4">Inquiry Received</h3>
      <p class="text-neutral-600 mb-8">Thank you for your interest. We will be in touch shortly.</p>
      <button
        @click="success = false"
        class="bg-neutral-900 text-white font-medium py-3 px-8 hover:bg-neutral-800 transition-colors uppercase tracking-wider text-sm"
      >
        Send Another
      </button>
    </div>

    <form v-else @submit.prevent="handleSubmit" class="space-y-6">
      <div v-if="error" class="p-4 bg-red-50 border border-red-200 text-red-600 text-sm">
        {{ error }}
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label for="name" class="block text-sm font-medium text-neutral-900 mb-2">Name *</label>
          <input
            type="text"
            id="name"
            v-model="formData.name"
            required
            autocomplete="name"
            class="w-full px-4 py-3 bg-neutral-50 border border-neutral-200 focus:border-neutral-900 focus:ring-0 transition-colors"
          />
        </div>
        <div>
          <label for="phone" class="block text-sm font-medium text-neutral-900 mb-2">Phone *</label>
          <input
            type="tel"
            id="phone"
            v-model="formData.phone"
            required
            autocomplete="tel"
            class="w-full px-4 py-3 bg-neutral-50 border border-neutral-200 focus:border-neutral-900 focus:ring-0 transition-colors"
          />
        </div>
      </div>

      <div>
        <label for="email" class="block text-sm font-medium text-neutral-900 mb-2">Email</label>
        <input
          type="email"
          id="email"
          v-model="formData.email"
          autocomplete="email"
          class="w-full px-4 py-3 bg-neutral-50 border border-neutral-200 focus:border-neutral-900 focus:ring-0 transition-colors"
        />
      </div>

      <div>
        <label for="interest" class="block text-sm font-medium text-neutral-900 mb-2">Product/Service Interest</label>
        <input
          type="text"
          id="interest"
          v-model="formData.productInterest"
          class="w-full px-4 py-3 bg-neutral-50 border border-neutral-200 focus:border-neutral-900 focus:ring-0 transition-colors"
        />
      </div>

      <div>
        <label for="message" class="block text-sm font-medium text-neutral-900 mb-2">Message</label>
        <textarea
          id="message"
          v-model="formData.message"
          rows="4"
          autocomplete="off"
          class="w-full px-4 py-3 bg-neutral-50 border border-neutral-200 focus:border-neutral-900 focus:ring-0 transition-colors resize-none"
        ></textarea>
      </div>

      <button
        type="submit"
        :disabled="loading"
        class="w-full bg-neutral-900 text-white font-medium py-4 px-8 hover:bg-neutral-800 transition-colors uppercase tracking-wider text-sm disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <span v-if="loading">Submitting...</span>
        <span v-else>Submit Inquiry</span>
      </button>
    </form>
  </div>
</template>
