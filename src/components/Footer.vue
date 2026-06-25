<template>
  <footer class="border-t border-neutral-200 bg-[#FAFAFA] px-6 py-8">
    <div class="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
      <div class="font-serif text-xl tracking-tight font-bold text-[#111827]">SALTEDHASH</div>
      <nav class="flex gap-6 text-sm uppercase tracking-widest text-[#111827]">
        <router-link to="/studio" class="hover:text-[#233CB5] transition-colors">Studio</router-link>
        <router-link to="/triu" class="hover:text-[#2F4F2F] transition-colors">TRIU</router-link>
        <router-link to="/about" class="hover:text-neutral-500 transition-colors">About</router-link>
        <router-link to="/contact" class="hover:text-neutral-500 transition-colors">Contact</router-link>
      </nav>
      <div class="text-sm text-neutral-500">&copy; 2026 SALTEDHASH. All rights reserved.</div>
    </div>
  </footer>
</template>
