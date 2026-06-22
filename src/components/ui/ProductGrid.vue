<script setup lang="ts">
import { useProductsStore } from '@/stores/products'
import { onMounted } from 'vue'

const store = useProductsStore()

onMounted(() => {
  if (store.products.length === 0) {
    store.fetchProducts()
  }
})
</script>

<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
    <div v-if="store.loading" class="flex justify-center py-20">
      <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-neutral-900"></div>
    </div>

    <div v-else-if="store.error" class="text-center py-20 text-red-600">
      {{ store.error }}
    </div>

    <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      <div
        v-for="product in store.products"
        :key="product.$id"
        class="group flex flex-col bg-white border border-neutral-200 overflow-hidden cursor-pointer hover:border-neutral-400 transition-colors duration-300"
        @click="store.openProductPanel(product)"
      >
        <div class="aspect-w-4 aspect-h-3 bg-neutral-100 overflow-hidden relative">
          <img
            v-if="product.imageFileId"
            :src="store.getImageUrl(product.imageFileId)"
            :alt="product.name"
            class="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
          />
          <div v-else class="w-full h-full flex items-center justify-center text-neutral-400 font-serif text-xl bg-neutral-50">
            {{ product.category }}
          </div>
          <div class="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 text-xs font-medium tracking-widest uppercase border border-neutral-200">
            {{ product.category }}
          </div>
        </div>
        <div class="p-6 flex-grow flex flex-col justify-between">
          <div>
            <h3 class="font-serif text-xl font-medium text-neutral-900 mb-2">{{ product.name }}</h3>
            <p class="text-neutral-600 text-sm line-clamp-2">{{ product.description }}</p>
          </div>
          <div class="mt-4 flex items-center justify-between">
            <span v-if="product.price" class="font-medium text-neutral-900">₹{{ product.price.toFixed(2) }}</span>
            <span class="text-xs font-medium text-neutral-500 group-hover:text-neutral-900 transition-colors uppercase tracking-wider">Details &rarr;</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
