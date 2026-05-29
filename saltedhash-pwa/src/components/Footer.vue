<script setup>
import { RouterLink } from 'vue-router'
const year = new Date().getFullYear()
</script>

<template>
  <footer class="mt-16 border-t border-slate-200 bg-white">
    <div class="container-max grid gap-6 py-10 md:grid-cols-3">
      <div>
        <p class="font-semibold text-primary">SALTed HASH</p>
        <p class="mt-2 text-sm text-slate-600">Venture studio building category-defining SaaS.</p>
      </div>
      <div class="flex flex-col gap-2 text-sm">
        <RouterLink to="/about">About</RouterLink>
        <RouterLink to="/portfolio">Portfolio</RouterLink>
        <RouterLink to="/opal">Opal Gallery</RouterLink>
        <RouterLink to="/contact">Contact</RouterLink>
      </div>
      <div class="text-sm text-slate-600">
        <p>LinkedIn · Twitter · GitHub</p>
        <p class="mt-2">© {{ year }} SALTed HASH</p>
      </div>
    </div>
  </footer>
</template>
