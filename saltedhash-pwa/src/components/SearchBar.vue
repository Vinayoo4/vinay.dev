<script setup>
defineProps({ modelValue: String })
const emit = defineEmits(['update:modelValue'])
</script>

<template>
  <input :value="modelValue" @input="emit('update:modelValue', $event.target.value)" placeholder="Search apps" class="w-full rounded-lg border border-slate-300 px-3 py-2" />
</template>
