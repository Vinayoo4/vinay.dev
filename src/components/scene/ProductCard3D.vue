<script setup lang="ts">
import { logger } from '@/utils/logger'
import { ref, onMounted } from 'vue'
import { useTresContext, useLoop } from '@tresjs/core'
import { CanvasTexture, DoubleSide, TextureLoader } from 'three'
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
const hovered = ref(false)
const startTime = ref(0)
const entryDuration = 1.5

const categoryColor = (cat: string | undefined): string => {
  const map: Record<string, string> = { tech: '#233CB5', natural: '#2F4F2F' }
  return map[cat || ''] || '#666666'
}

function drawCanvasTexture(): CanvasTexture {
  const canvas = document.createElement('canvas')
  canvas.width = 512
  canvas.height = 682
  const ctx = canvas.getContext('2d')!
  const w = 512, h = 682
  const cat = props.product.category || ''
  const col = categoryColor(cat)
  const name = props.product.name
  const price = props.product.price
  const brand = props.product.brand_code

  const grad = ctx.createLinearGradient(0, 0, w, h)
  grad.addColorStop(0, '#1a1a2e')
  grad.addColorStop(1, '#16213e')
  ctx.fillStyle = grad
  ctx.fillRect(0, 0, w, h)

  ctx.fillStyle = col
  ctx.fillRect(0, 0, 6, h)

  ctx.textAlign = 'left'
  ctx.font = '600 11px "JetBrains Mono", monospace'
  ctx.fillStyle = col
  ctx.fillText(cat.toUpperCase(), 28, 44)

  ctx.textAlign = 'center'
  ctx.font = '700 30px Georgia, "Playfair Display", serif'
  ctx.fillStyle = '#ffffff'

  const words = name.split(' ')
  let line = ''
  let ly = h / 2 - 24
  const maxW = w - 56
  for (const word of words) {
    const test = line ? line + ' ' + word : word
    if (ctx.measureText(test).width > maxW && line) {
      ctx.fillText(line, w / 2, ly)
      line = word
      ly += 36
    } else {
      line = test
    }
  }
  ctx.fillText(line, w / 2, ly)

  if (price) {
    ly += 52
    ctx.textAlign = 'center'
    ctx.font = '400 18px "Inter", sans-serif'
    ctx.fillStyle = '#cccccc'
    ctx.fillText(`\u20B9${price.toFixed(2)}`, w / 2, ly)
  }

  ctx.textAlign = 'right'
  ctx.font = '400 10px "JetBrains Mono", monospace'
  ctx.fillStyle = '#555555'
  ctx.fillText(brand, w - 20, h - 16)

  return new CanvasTexture(canvas)
}

onMounted(async () => {
  startTime.value = performance.now()

  if (materialRef.value) {
    if (props.product.imageFileId) {
      const textureLoader = new TextureLoader()
      try {
        const textureUrl = store.getImageUrl(props.product.imageFileId)
        if (textureUrl) {
          const texture = await textureLoader.loadAsync(textureUrl)
          materialRef.value.map = texture
          materialRef.value.needsUpdate = true
          return
        }
      } catch (e) {
        logger.error('Error loading texture', e)
      }
    }

    const tex = drawCanvasTexture()
    materialRef.value.map = tex
    materialRef.value.needsUpdate = true
  }

  if (meshRef.value) {
    meshRef.value.scale.set(0.01, 0.01, 0.01)
  }
})

onBeforeRender(() => {
  if (!meshRef.value) return

  const now = performance.now()
  const progress = Math.min((now - startTime.value) / 1000 / entryDuration, 1)

  const easeOutBack = (t: number): number => {
    const c = 1.70158
    return 1 + (c + 1) * Math.pow(t - 1, 3) + c * Math.pow(t - 1, 2)
  }
  const s = easeOutBack(progress)

  let hoverScale = 1
  if (hovered.value && progress >= 1) {
    const t = (now / 1000) * 4
    hoverScale = 1 + Math.sin(t) * 0.03
  }

  meshRef.value.scale.set(s * hoverScale, s * hoverScale, s * hoverScale)

  const baseY = props.position[1]
  const floatOffset = Math.sin(now / 1000 * 2 + props.position[0]) * 0.2 * (progress >= 1 ? 1 : 0)
  const dropY = (1 - progress) * 5
  meshRef.value.position.set(props.position[0], baseY + floatOffset - dropY, props.position[2])

  const cam = (camera && 'value' in camera ? camera.value : camera) as PerspectiveCamera | undefined
  if (cam?.position) {
    meshRef.value.lookAt(cam.position)
  }
})

const handleClick = () => {
  store.openProductPanel(props.product)
}

const handlePointerOver = () => {
  document.body.style.cursor = 'pointer'
  hovered.value = true
}

const handlePointerOut = () => {
  document.body.style.cursor = 'default'
  hovered.value = false
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
    />
  </TresMesh>
</template>
