<script setup lang="ts">
import { useTresContext } from '@tresjs/core'
import { watch } from 'vue'
import anime from 'animejs'
import type { PerspectiveCamera } from 'three'

const { camera: tresCamera } = useTresContext()

watch(tresCamera, (cam) => {
  const pcam = cam as unknown as PerspectiveCamera | null
  if (!pcam?.position) return

  pcam.position.set(0, 0, 5)
  pcam.lookAt(0, 0, -35)

  anime({
    targets: pcam.position,
    z: -35,
    duration: 4000,
    easing: 'easeOutCubic',
    update: () => {
      pcam.lookAt(0, 0, -40)
    }
  })
}, { immediate: true })
</script>

<template>
  <TresPerspectiveCamera :position="[0, 0, 5]" :fov="75" :near="0.1" :far="1000" />
</template>
