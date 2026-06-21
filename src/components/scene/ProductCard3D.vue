<script setup lang="ts">
import { logger } from '@/utils/logger'
import { ref, onMounted, onUnmounted } from 'vue'
import { useTresContext } from '@tresjs/core'
import { TextureLoader, DoubleSide, Color } from 'three'
import type { PerspectiveCamera } from 'three'
import { useProductsStore } from '@/stores/products'
import type { Product } from '@/composables/useProducts'
import anime from 'animejs'

const props = defineProps<{
  product: Product;
  position: [number, number, number];
}>()

const store = useProductsStore()
const meshRef = ref()
const materialRef = ref()
const { camera } = useTresContext()
let animationFrameId: number | null = null

onMounted(async () => {
  if (props.product.imageId) {
    const textureLoader = new TextureLoader()
    try {
      const textureUrl = store.getImageUrl(props.product.imageId)
      const texture = await textureLoader.loadAsync(textureUrl)
      if (materialRef.value) {
        materialRef.value.map = texture
        materialRef.value.needsUpdate = true
      }
    } catch (e) {
      logger.error('Error loading texture', e)
    }
  }

  // Entrance animation
  if (meshRef.value) {
    // Initial hidden state
    meshRef.value.position.set(props.position[0], props.position[1] - 5, props.position[2])
    meshRef.value.scale.set(0, 0, 0)

    anime({
      targets: meshRef.value.position,
      y: props.position[1],
      duration: 1500,
      delay: Math.abs(props.position[2]) * 100, // Delay based on depth
      easing: 'easeOutElastic(1, .8)'
    })

    anime({
      targets: meshRef.value.scale,
      x: 1,
      y: 1,
      z: 1,
      duration: 1000,
      delay: Math.abs(props.position[2]) * 100,
      easing: 'easeOutBack'
    })
  }

  // Render loop using rAF
  const renderLoop = () => {
    const cam = (camera && 'value' in camera ? camera.value : camera) as PerspectiveCamera | undefined
    if (meshRef.value && cam) {
      // Billboard behavior: always face camera
      meshRef.value.lookAt(cam.position)

      // Subtle floating animation
      const time = Date.now() * 0.001
      meshRef.value.position.y = props.position[1] + Math.sin(time * 2 + props.position[0]) * 0.2
    }
    animationFrameId = requestAnimationFrame(renderLoop)
  }
  animationFrameId = requestAnimationFrame(renderLoop)
})

onUnmounted(() => {
  if (animationFrameId !== null) {
    cancelAnimationFrame(animationFrameId)
  }
})

const handleClick = () => {
  store.openProductPanel(props.product)
}

const handlePointerOver = () => {
  document.body.style.cursor = 'pointer'
  if (materialRef.value) {
    anime({
      targets: materialRef.value.color,
      r: 1.5, g: 1.5, b: 1.5, // Brighten
      duration: 300,
      easing: 'easeOutQuad'
    })
  }
}

const handlePointerOut = () => {
  document.body.style.cursor = 'default'
  if (materialRef.value) {
    anime({
      targets: materialRef.value.color,
      r: 1, g: 1, b: 1, // Restore
      duration: 300,
      easing: 'easeOutQuad'
    })
  }
}
</script>

<template>
  <TresMesh
    ref="meshRef"
    @click="handleClick"
    @pointer-enter="handlePointerOver"
    @pointer-leave="handlePointerOut"
  >
    <TresPlaneGeometry :args="[3, 4]" />
    <TresMeshBasicMaterial
      ref="materialRef"
      :side="DoubleSide"
      :transparent="true"
      :color="new Color(1, 1, 1)"
    />
  </TresMesh>
</template>
