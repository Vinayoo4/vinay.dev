<script setup lang="ts">
import { onMounted } from 'vue'
import anime from 'animejs'
import { useProductsStore } from '@/stores/products'

const store = useProductsStore()

onMounted(() => {
  store.fetchProducts()

  anime({
    targets: '.triu-element',
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
      <div class="triu-element text-xs font-mono uppercase tracking-widest text-naturals mb-8">TRIU Naturals</div>
      <h1 class="triu-element text-5xl md:text-8xl mb-8 font-serif">Rooted in<br/>tradition.</h1>
      <p class="triu-element text-xl md:text-2xl text-foreground/70 font-light leading-relaxed max-w-2xl">
        Chemical-free care returning to the essentials. We curate natural products that respect both heritage and biological utility.
      </p>
    </div>

    <div v-if="store.loading" class="grid grid-cols-1 md:grid-cols-3 gap-8">
      <div 
        v-for="i in 3"
        :key="i"
        class="triu-element border border-foreground/10 p-8 md:p-12 bg-background"
      >
        <div class="w-24 h-4 bg-neutral-100 animate-pulse mb-12"></div>
        <div class="w-full aspect-square bg-neutral-100 animate-pulse mb-8"></div>
        <div class="w-3/4 h-8 bg-neutral-100 animate-pulse mb-4"></div>
        <div class="w-1/2 h-6 bg-neutral-100 animate-pulse mb-4"></div>
        <div class="w-full h-16 bg-neutral-100 animate-pulse"></div>
      </div>
    </div>

    <div v-else-if="store.error" class="text-center py-24 triu-element">
      <p class="text-foreground mb-4">Could not load products. Please try again.</p>
      <button
        @click="store.fetchProducts()"
        class="bg-foreground text-background px-6 py-2 uppercase tracking-widest text-sm hover:bg-foreground/80 transition-colors"
      >
        Retry
      </button>
    </div>

    <div v-else-if="store.products.length === 0" class="triu-element">
      <div class="text-center py-24 border border-foreground/10 bg-background/50 mb-16">
        <p class="text-foreground text-xl font-serif mb-2">No products found</p>
        <p class="text-foreground/60 text-sm">Our live catalog is currently empty or unavailable.</p>
      </div>

      <div class="pt-16 border-t border-foreground/10">
        <div class="text-center mb-12">
          <h2 class="text-3xl font-serif mb-4">Demo Showcase Catalog</h2>
          <p class="text-foreground/60">Explore our sample products (Fallback data)</p>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div
            v-for="product in store.fallbackProducts"
            :key="product.$id"
            @click="store.openProductPanel(product)"
            class="group border border-foreground/10 p-8 md:p-12 hover:border-naturals transition-colors duration-500 bg-background cursor-pointer"
          >
            <div class="text-xs font-mono uppercase tracking-widest text-naturals mb-12">{{ product.category }}</div>
            <div class="w-full aspect-square bg-neutral-100 border border-neutral-200 overflow-hidden mb-8 flex items-center justify-center text-neutral-400">
              [ Demo Image ]
            </div>
            <h3 class="text-3xl mb-2 font-serif">{{ product.name }}</h3>
            <div class="text-xl mb-4 font-medium text-foreground">₹{{ product.price.toFixed(2) }}</div>
            <p class="text-foreground/70 mb-6">{{ product.description }}</p>
            <div class="flex flex-wrap gap-2">
              <a v-if="product.flipkartUrl" :href="product.flipkartUrl" target="_blank" @click.stop class="text-xs bg-blue-50 text-blue-600 px-3 py-1 hover:bg-blue-100 transition-colors">Flipkart</a>
              <a v-if="product.meeshoUrl" :href="product.meeshoUrl" target="_blank" @click.stop class="text-xs bg-pink-50 text-pink-600 px-3 py-1 hover:bg-pink-100 transition-colors">Meesho</a>
              <button @click.stop class="text-xs bg-green-50 text-green-600 px-3 py-1 hover:bg-green-100 transition-colors">WhatsApp</button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-else class="grid grid-cols-1 md:grid-cols-3 gap-8">
      <div
        v-for="product in store.products"
        :key="product.$id"
        @click="store.openProductPanel(product)"
        class="triu-element group border border-foreground/10 p-8 md:p-12 hover:border-naturals transition-colors duration-500 bg-background cursor-pointer"
      >
        <div class="text-xs font-mono uppercase tracking-widest text-naturals mb-12">{{ product.category }}</div>
        <div v-if="product.imageFileId" class="w-full aspect-square bg-neutral-100 border border-neutral-200 overflow-hidden mb-8">
          <img
            :src="store.getImageUrl(product.imageFileId)"
            :alt="product.name"
            class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          />
        </div>
        <h3 class="text-3xl mb-2 font-serif">{{ product.name }}</h3>
        <div v-if="product.price" class="text-xl mb-4 font-medium text-foreground">₹{{ product.price.toFixed(2) }}</div>
        <p class="text-foreground/70">{{ product.description }}</p>
      </div>
    </div>
  </div>
</template>
