<script setup lang="ts">
import { useProductsStore } from '@/stores/products'
import { X, MessageCircle, Mail, ShoppingBag, Store, FileText } from 'lucide-vue-next'
import { watch, computed } from 'vue'
import { useRouter } from 'vue-router'

const store = useProductsStore()
const router = useRouter()

const whatsappNumber = import.meta.env.VITE_WHATSAPP_NUMBER || '917355534385'
const contactEmail = import.meta.env.VITE_CONTACT_EMAIL || 'hello@saltedhash.in'

const whatsappUrl = computed(() => {
  const name = store.selectedProduct?.name || ''
  return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent('Hi I am interested in ' + name)}`
})

const emailUrl = computed(() => {
  const name = store.selectedProduct?.name || ''
  return `mailto:${contactEmail}?subject=${encodeURIComponent('Inquiry: ' + name)}`
})

const handleFormInquire = () => {
  store.closeProductPanel()
  router.push({
    path: '/contact',
    query: { interest: store.selectedProduct?.name }
  })
}

watch(() => store.isPanelOpen, (isOpen) => {
  if (isOpen) {
    document.body.style.overflow = 'hidden'
  } else {
    document.body.style.overflow = ''
  }
})
</script>

<template>
  <Teleport to="body">
    <Transition
      enter-active-class="transition-opacity duration-300 ease-in-out"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition-opacity duration-300 ease-in-out"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="store.isPanelOpen"
        class="fixed inset-0 bg-neutral-900/60 backdrop-blur-sm z-[60]"
        @click="store.closeProductPanel"
      ></div>
    </Transition>

    <Transition
      enter-active-class="transition-transform duration-500 ease-out"
      enter-from-class="translate-x-full"
      enter-to-class="translate-x-0"
      leave-active-class="transition-transform duration-300 ease-in"
      leave-from-class="translate-x-0"
      leave-to-class="translate-x-full"
    >
      <div
        v-if="store.isPanelOpen && store.selectedProduct"
        class="fixed inset-y-0 right-0 w-full max-w-md bg-[#FAFAFA] shadow-2xl z-[70] border-l border-neutral-200 overflow-y-auto flex flex-col"
        role="dialog"
        aria-modal="true"
        :aria-labelledby="'panel-title-' + store.selectedProduct.$id"
      >
        <div class="sticky top-0 z-10 flex items-center justify-between px-6 py-4 bg-[#FAFAFA]/90 backdrop-blur-md border-b border-neutral-200">
          <span class="text-xs font-medium tracking-widest uppercase text-neutral-500">{{ store.selectedProduct.category }}</span>
          <button
            @click="store.closeProductPanel"
            class="p-2 text-neutral-400 hover:text-neutral-900 focus:outline-none transition-colors"
          >
            <X class="w-6 h-6" />
          </button>
        </div>

        <div class="flex-grow p-6 flex flex-col gap-8">
          <div v-if="store.selectedProduct.imageFileId" class="w-full aspect-square bg-neutral-100 border border-neutral-200 overflow-hidden">
             <img
              :src="store.getImageUrl(store.selectedProduct.imageFileId)"
              :alt="store.selectedProduct.name"
              class="w-full h-full object-cover"
            />
          </div>

          <div>
            <h2 :id="'panel-title-' + store.selectedProduct.$id" class="font-serif text-3xl font-medium text-neutral-900 mb-4 leading-tight">{{ store.selectedProduct.name }}</h2>
            <p v-if="store.selectedProduct.price" class="text-xl font-medium text-neutral-900 mb-6">
              ₹{{ store.selectedProduct.price.toFixed(2) }}
            </p>
            <div class="prose prose-neutral prose-sm max-w-none text-neutral-600">
              <p>{{ store.selectedProduct.description }}</p>
            </div>
          </div>
        </div>

        <div class="sticky bottom-0 p-6 bg-[#FAFAFA] border-t border-neutral-200 flex flex-col gap-3">
          <div class="text-[10px] font-mono uppercase tracking-[0.2em] text-neutral-400 mb-1">Buy or Inquire</div>

          <a
            :href="whatsappUrl"
            target="_blank"
            rel="noopener noreferrer"
            class="w-full bg-[#25D366] text-white font-medium py-3.5 px-8 hover:opacity-90 transition-all duration-200 uppercase tracking-wider text-sm flex items-center justify-center gap-2"
          >
            <MessageCircle class="w-4 h-4" />
            WhatsApp Order
          </a>

          <a
            :href="emailUrl"
            target="_blank"
            rel="noopener noreferrer"
            class="w-full bg-tech text-white font-medium py-3.5 px-8 hover:opacity-90 transition-all duration-200 uppercase tracking-wider text-sm flex items-center justify-center gap-2"
          >
            <Mail class="w-4 h-4" />
            Email Inquiry
          </a>

          <a
            v-if="store.selectedProduct.flipkartUrl"
            :href="store.selectedProduct.flipkartUrl"
            target="_blank"
            rel="noopener noreferrer"
            class="w-full border border-[#2874F0] text-[#2874F0] font-medium py-3 px-8 hover:bg-[#2874F0]/5 transition-all duration-200 uppercase tracking-wider text-sm flex items-center justify-center gap-2"
          >
            <ShoppingBag class="w-4 h-4" />
            View on Flipkart
          </a>

          <a
            v-if="store.selectedProduct.meeshoUrl"
            :href="store.selectedProduct.meeshoUrl"
            target="_blank"
            rel="noopener noreferrer"
            class="w-full border border-[#E91E63] text-[#E91E63] font-medium py-3 px-8 hover:bg-[#E91E63]/5 transition-all duration-200 uppercase tracking-wider text-sm flex items-center justify-center gap-2"
          >
            <Store class="w-4 h-4" />
            View on Meesho
          </a>

          <button
            @click="handleFormInquire"
            class="w-full border border-neutral-300 text-neutral-600 font-medium py-3 px-8 hover:bg-neutral-100 transition-colors uppercase tracking-wider text-sm flex items-center justify-center gap-2"
          >
            <FileText class="w-4 h-4" />
            Inquire via Form
          </button>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>
