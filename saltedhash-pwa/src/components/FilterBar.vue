<script setup>
defineProps({ categories: Array, selectedCategory: String, sortBy: String })
const emit = defineEmits(['update:selectedCategory', 'update:sortBy'])
</script>

<template>
  <div class="grid gap-3 md:grid-cols-2">
    <select class="rounded-lg border border-slate-300 px-3 py-2" :value="selectedCategory" @change="emit('update:selectedCategory', $event.target.value)">
      <option value="all">All categories</option>
      <option v-for="c in categories" :key="c.id" :value="c.id">{{ c.name }}</option>
    </select>
    <select class="rounded-lg border border-slate-300 px-3 py-2" :value="sortBy" @change="emit('update:sortBy', $event.target.value)">
      <option value="name">By name</option>
      <option value="category">By category</option>
      <option value="launchDate">By launch date</option>
    </select>
  </div>
</template>
