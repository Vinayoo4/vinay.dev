<script setup lang="ts">
import { TresCanvas } from '@tresjs/core'
import { BasicShadowMap, SRGBColorSpace, NoToneMapping } from 'three'
import CameraRig from './CameraRig.vue'
import ProductCard3D from './ProductCard3D.vue'
import { useProductsStore } from '@/stores/products'
import { computed } from 'vue'

const store = useProductsStore()

const gl = {
  clearColor: '#000000',
  shadows: true,
  alpha: false,
  shadowMapType: BasicShadowMap,
  outputColorSpace: SRGBColorSpace,
  toneMapping: NoToneMapping,
}

const positions: [number, number, number][] = [
  [-4, 0, -12],
  [4, 1, -17],
  [-2, -1, -22],
  [5, 2, -27],
  [0, 0, -32]
]

const displayProducts = computed(() => {
  const usingFallback = store.products.length > 0 && store.products[0].$id?.startsWith('fallback-')

  if (usingFallback) {
    return store.products.slice(0, 5)
  }

  const seen = new Set<string>()
  return store.products.filter(p => {
    const cat = p.category || 'uncategorized'
    if (seen.has(cat)) return false
    seen.add(cat)
    return true
  }).slice(0, 5)
})

const getPosition = (index: number): [number, number, number] => {
  return positions[index] || [0, 0, -12]
}
</script>

<template>
  <div class="w-full h-full bg-black">
    <TresCanvas v-bind="gl">
      <CameraRig />

      <TresAmbientLight :intensity="0.2" color="#ffffff" />
      <TresDirectionalLight
        :position="[5, 5, 5]"
        :intensity="1"
        cast-shadow
      />
      <TresPointLight
        :position="[0, 0, -5]"
        :intensity="0.5"
        color="#ffffff"
        :distance="20"
      />

      <TresFog color="#000000" :near="1" :far="40" />

      <ProductCard3D
        v-for="(product, index) in displayProducts"
        :key="product.$id"
        :product="product"
        :position="getPosition(index)"
      />
    </TresCanvas>
  </div>
</template>
