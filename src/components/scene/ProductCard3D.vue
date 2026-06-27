<script setup lang="ts">
import { logger } from '@/utils/logger'
import { ref, onMounted } from 'vue'
import { useTresContext, useLoop } from '@tresjs/core'
import { TextureLoader, DoubleSide, Color } from 'three'
import type { PerspectiveCamera } from 'three'
import { useProductsStore } from '@/stores/products'
import type { Product } from '@/composables/useProducts'

const props = defineProps<{
  product: Product;
  position: [number, number, number];
}>()

const store = useProductsStore()
const meshRef = ref()
const materialRef = ref()
const { camera } = useTresContext()
const { onBeforeRender } = useLoop()

onMounted(async () => {
  if (props.product.imageFileId) {
    const textureLoader = new TextureLoader()
    try {
      const textureUrl = store.getImageUrl(props.product.imageFileId)
      if (!textureUrl) return
      const texture = await textureLoader.loadAsync(textureUrl)
      if (materialRef.value) {
        materialRef.value.map = texture
        materialRef.value.needsUpdate = true
      }
    } catch (e) {
      logger.error('Error loading texture', e)
    }
  }
})

onBeforeRender(({ elapsed }) => {
  const entryDuration = 1.5
  const progress = Math.min(elapsed / entryDuration, 1)

  if (!meshRef.value) return

  const cam = (camera && 'value' in camera ? camera.value : camera) as PerspectiveCamera | undefined

  if (progress < 1) {
    const easeOutBack = (t: number) => {
      const c = 1.70158
      return 1 + (c + 1) * Math.pow(t - 1, 3) + c * Math.pow(t - 1, 2)
    }
    const easeOutElastic = (t: number) => {
      if (t === 0 || t === 1) return t
      return Math.pow(2, -10 * t) * Math.sin((t - 0.075) * (2 * Math.PI) / 0.3) + 1
    }
    const yOff = (1 - easeOutElastic(progress)) * 5
    meshRef.value.position.set(props.position[0], props.position[1] - yOff, props.position[2])
    const s = easeOutBack(progress)
    meshRef.value.scale.set(s, s, s)
  } else {
    meshRef.value.position.set(props.position[0], props.position[1], props.position[2])
    meshRef.value.scale.set(1, 1, 1)
  }

  if (cam && cam.position) {
    meshRef.value.lookAt(cam.position)
    const time = elapsed
    meshRef.value.position.y = meshRef.value.position.y + Math.sin(time * 2 + props.position[0]) * 0.2 * (progress >= 1 ? 1 : 0)
  }
})

const handleClick = () => {
  store.openProductPanel(props.product)
}

const handlePointerOver = () => {
  document.body.style.cursor = 'pointer'
}

const handlePointerOut = () => {
  document.body.style.cursor = 'default'
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
