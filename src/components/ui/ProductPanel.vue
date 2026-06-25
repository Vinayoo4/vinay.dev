<script setup lang="ts">
import { useProductsStore } from '@/stores/products'
import { X } from 'lucide-vue-next'
import { watch } from 'vue'
import { useRouter } from 'vue-router'

const store = useProductsStore()
const router = useRouter()

const handleInquire = () => {
  store.closeProductPanel()
  router.push({
    path: '/contact',
    query: { interest: store.selectedProduct?.name }
  })
}

// Prevent body scroll when panel is open
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
    <!-- Backdrop -->
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

    <!-- Slide-in Panel -->
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

        <div class="sticky bottom-0 p-6 bg-[#FAFAFA] border-t border-neutral-200">
          <button
            @click="handleInquire"
            class="w-full bg-neutral-900 text-white font-medium py-4 px-8 hover:bg-neutral-800 transition-colors uppercase tracking-wider text-sm flex items-center justify-center gap-2"
          >
            Inquire About This
          </button>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>
