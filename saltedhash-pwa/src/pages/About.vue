<script setup>
import { useMeta } from '../utils/useMeta'

useMeta('About SALTed HASH', 'Mission, founder story, timeline, and values behind SALTed HASH.')
</script>

<template>
  <section class="container-max py-10">
    <h1 class="text-3xl font-bold">About SALTed HASH</h1>
    <p class="mt-3 text-slate-600">Mission: Identifying underserved niches and building category-defining vertical SaaS.</p>

    <div class="card mt-6 grid gap-4 md:grid-cols-3">
      <img src="/images/founder.jpg" alt="Founder" class="h-48 w-full rounded-lg object-cover" />
      <div class="md:col-span-2">
        <h2 class="text-xl font-semibold">Vinay — BTech AI/ML + Entrepreneur</h2>
        <p class="mt-2 text-sm text-slate-600">Building EmporiumVipani and SALTed HASH. While building EmporiumVipani, I discovered 28+ underserved markets where focused SaaS can create outsized impact.</p>
      </div>
    </div>

    <div class="mt-6 grid gap-4 md:grid-cols-2">
      <div class="card"><h3 class="font-semibold">Timeline</h3><p class="text-sm text-slate-600">Opal prototypes → Production PWAs → Full portfolio launch.</p></div>
      <div class="card"><h3 class="font-semibold">Values</h3><p class="text-sm text-slate-600">Speed, Validation, Business-first, Transparent pricing.</p></div>
    </div>

    <p class="mt-6 text-sm text-slate-600">Contact: contact@saltedhash.com · LinkedIn · Twitter</p>
  </section>
</template>
