<template>
  <footer class="border-t border-foreground/5 mt-20 py-12 px-6">
    <div class="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
      <div class="font-serif text-xl tracking-tight font-bold">SALTEDHASH</div>
      <div class="text-sm text-foreground/60">&copy; {{ new Date().getFullYear() }} SALTEDHASH Venture Studio. All rights reserved.</div>
      <div class="flex gap-4 text-sm uppercase tracking-widest">
        <router-link to="/studio" class="hover:text-tech transition-colors">Tech</router-link>
        <router-link to="/triu" class="hover:text-naturals transition-colors">Naturals</router-link>
      </div>
    </div>
  </footer>
</template>
