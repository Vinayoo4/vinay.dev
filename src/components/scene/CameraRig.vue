<script setup lang="ts">
import { useTresContext } from '@tresjs/core'
import { watch, onMounted, ref } from 'vue'
import anime from 'animejs'
import type { PerspectiveCamera } from 'three'

const { camera } = useTresContext()
const animationComplete = ref(false)

onMounted(() => {
  // Use unref or check if camera is a ref, or access it directly
  const cam = (camera && 'value' in camera ? camera.value : camera) as PerspectiveCamera | undefined
  if (!cam) return

  // Initial camera position
  cam.position.set(0, 0, 5)
  cam.lookAt(0, 0, -35)

  // Dolly animation moving forward through the dark corridor
  anime({
    targets: cam.position,
    z: -35, // Move deep into the corridor
    duration: 4000,
    easing: 'easeOutCubic',
    complete: () => {
      animationComplete.value = true
    }
  })
})

// Ensure camera always looks forward during animation
watch(() => {
    const cam = (camera && 'value' in camera ? camera.value : camera) as PerspectiveCamera | undefined
    return cam?.position.z
}, () => {
  const cam = (camera && 'value' in camera ? camera.value : camera) as PerspectiveCamera | undefined
  if (cam && !animationComplete.value) {
    cam.lookAt(0, 0, -40)
  }
})
</script>

<template>
  <TresPerspectiveCamera :position="[0, 0, 5]" :fov="75" :near="0.1" :far="1000" />
</template>
