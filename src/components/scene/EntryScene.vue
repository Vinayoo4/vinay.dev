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

// Map specific categories to exact positions in the 3D corridor
// Positions are laid out along the Z axis (negative goes deeper into screen)
const categoryPositions: Record<string, [number, number, number]> = {
  'stationery': [-4, 0, -10],
  'natural': [4, 2, -15],
  'educational': [-3, -2, -20],
  'gardening': [5, -1, -25],
  'digital': [0, 3, -30]
}

const displayProducts = computed(() => {
  // Take one product per category to display as the main billboard
  const categories = new Set()
  return store.products.filter(p => {
    if (!categories.has(p.category)) {
      categories.add(p.category)
      return true
    }
    return false
  })
})

const getPosition = (category: string): [number, number, number] => {
  return categoryPositions[category] || [0, 0, -10]
}
</script>

<template>
  <div class="w-full h-full bg-black">
    <TresCanvas v-bind="gl">
      <CameraRig />

      <!-- Scene Lighting -->
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

      <!-- Dark Corridor Environment -->
      <TresFog color="#000000" :near="1" :far="40" />

      <!-- Product Billboards -->
      <ProductCard3D
        v-for="product in displayProducts"
        :key="product.$id"
        :product="product"
        :position="getPosition(product.category)"
      />
    </TresCanvas>
  </div>
</template>
