<script setup>
const props = defineProps({ variant: { type: String, default: 'primary' }, type: { type: String, default: 'button' } })
const classes = {
  primary: 'bg-primary text-white hover:bg-indigo-700',
  secondary: 'bg-secondary text-white hover:bg-violet-700',
  outline: 'border border-slate-300 text-slate-700 hover:bg-slate-100',
}
</script>

<template>
  <button :type="type" class="rounded-lg px-4 py-2 text-sm font-semibold transition" :class="classes[props.variant] || classes.primary">
    <slot />
  </button>
</template>
