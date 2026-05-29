<script setup>
import Button from '../components/Button.vue'
import { useMeta } from '../utils/useMeta'

useMeta('Partner with SALTed HASH', 'Agencies, incubators, and investors — collaborate with SALTed HASH.')
</script>

<template>
  <section class="container-max py-10">
    <h1 class="text-3xl font-bold">Partner with SALTed HASH</h1>
    <p class="mt-2 text-slate-600">Agencies, incubators, and investors — collaborate with us.</p>

    <div class="mt-6 grid gap-4 md:grid-cols-3">
      <div class="card"><h3 class="font-semibold">White-label license</h3><p class="text-sm text-slate-600">License our SaaS to resell, 20% revenue share.</p></div>
      <div class="card"><h3 class="font-semibold">Agency collaboration</h3><p class="text-sm text-slate-600">Build custom solutions for your clients.</p></div>
      <div class="card"><h3 class="font-semibold">Investment</h3><p class="text-sm text-slate-600">Join our seed round (opening Q4 2026).</p></div>
    </div>

    <form class="card mt-6 grid gap-3">
      <input placeholder="Name" class="rounded-lg border border-slate-300 px-3 py-2" />
      <input placeholder="Email" type="email" class="rounded-lg border border-slate-300 px-3 py-2" />
      <input placeholder="Organization" class="rounded-lg border border-slate-300 px-3 py-2" />
      <select class="rounded-lg border border-slate-300 px-3 py-2"><option>White-label</option><option>Agency collaboration</option><option>Investment</option></select>
      <textarea placeholder="Message" class="rounded-lg border border-slate-300 px-3 py-2" rows="4" />
      <Button>Submit</Button>
      <p class="text-sm text-slate-600">contact@saltedhash.com</p>
    </form>
  </section>
</template>
