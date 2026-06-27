<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'
import { useTresContext } from '@tresjs/core'
import type { PerspectiveCamera } from 'three'

const { camera: tresCamera } = useTresContext()

let rafId: number
const mouse = { x: 0, y: 0 }
const current = { x: 0, y: 0 }

const lerp = (a: number, b: number, t: number) => a + (b - a) * t

const onMouseMove = (e: MouseEvent) => {
  mouse.x = (e.clientX / window.innerWidth - 0.5) * 2
  mouse.y = -(e.clientY / window.innerHeight - 0.5) * 2
}

const loop = () => {
  current.x = lerp(current.x, mouse.x, 0.04)
  current.y = lerp(current.y, mouse.y, 0.04)

  const cam = (tresCamera && 'value' in tresCamera
    ? tresCamera.value
    : tresCamera) as PerspectiveCamera | undefined

  if (cam?.position) {
    cam.position.x = current.x * 1.5
    cam.position.y = current.y * 0.8
    cam.lookAt(0, 0, -20)
  }

  rafId = requestAnimationFrame(loop)
}

onMounted(() => {
  window.addEventListener('mousemove', onMouseMove)
  loop()
})

onUnmounted(() => {
  window.removeEventListener('mousemove', onMouseMove)
  cancelAnimationFrame(rafId)
})
</script>

<template>
  <TresPerspectiveCamera
    :position="[0, 0, 5]"
    :fov="70"
    :near="0.1"
    :far="100"
    make-default
  />
</template>