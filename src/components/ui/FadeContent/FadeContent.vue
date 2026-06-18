<script setup lang="ts">
import { computed, onMounted, ref, useAttrs, type HTMLAttributes } from 'vue';
import anime from 'animejs';

interface FadeContentProps extends /* @vue-ignore */ HTMLAttributes {
  blur?: boolean;
  duration?: number;
  ease?: string;
  delay?: number;
  initialOpacity?: number;
}

const props = withDefaults(defineProps<FadeContentProps>(), {
  blur: false,
  duration: 1000,
  ease: 'easeOutCubic',
  delay: 0,
  initialOpacity: 0,
});

const attrs = useAttrs();
const fadeRef = ref<HTMLDivElement | null>(null);
const classes = computed(() => attrs.class);

onMounted(() => {
  if (!fadeRef.value) return;

  const el = fadeRef.value;
  el.style.opacity = String(props.initialOpacity);
  if (props.blur) {
    el.style.filter = 'blur(10px)';
  }

  anime({
    targets: el,
    opacity: [props.initialOpacity, 1],
    filter: props.blur ? ['blur(10px)', 'blur(0px)'] : undefined,
    duration: props.duration,
    delay: props.delay,
    easing: props.ease,
  });
});
</script>

<template>
  <div ref="fadeRef" :class="classes" v-bind="attrs">
    <slot />
  </div>
</template>
