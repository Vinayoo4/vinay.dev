<script setup>
import Button from '../components/Button.vue'
import { useMeta } from '../utils/useMeta'

useMeta('Contact SALTed HASH', 'Get in touch for general, beta, partner, or press inquiries.')
</script>

<template>
  <section class="container-max py-10">
    <h1 class="text-3xl font-bold">Get in Touch</h1>
    <form class="card mt-6 grid gap-3">
      <input placeholder="Name" class="rounded-lg border border-slate-300 px-3 py-2" />
      <input placeholder="Email" type="email" class="rounded-lg border border-slate-300 px-3 py-2" />
      <select class="rounded-lg border border-slate-300 px-3 py-2"><option>General</option><option>Beta</option><option>Partner</option><option>Press</option></select>
      <textarea placeholder="Message" rows="4" class="rounded-lg border border-slate-300 px-3 py-2" />
      <Button>Send Message</Button>
    </form>
    <p class="mt-4 text-sm text-slate-600">Direct email: contact@saltedhash.com</p>
    <p class="text-sm text-slate-600">Book 15-min consultation: https://calendly.com/saltedhash</p>
  </section>
</template>
