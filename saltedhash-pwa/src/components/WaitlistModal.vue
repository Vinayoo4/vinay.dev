<script setup>
import { ref } from 'vue'
import Button from './Button.vue'
import { useWaitlistStore } from '../stores/waitlistStore'

const props = defineProps({ open: Boolean, apps: Array, selectedApp: String })
const emit = defineEmits(['close'])
const waitlistStore = useWaitlistStore()
const email = ref('')
const app = ref(props.selectedApp || '')
const message = ref('')

function submit() {
  const result = waitlistStore.submit({ email: email.value, app: app.value, name: '', categories: [] })
  message.value = result.message
  if (result.ok) email.value = ''
}
</script>

<template>
  <div v-if="open" class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
    <div class="w-full max-w-md rounded-xl bg-white p-5">
      <h3 class="text-lg font-semibold">Join Beta Waitlist</h3>
      <input v-model="email" type="email" placeholder="Email" class="mt-3 w-full rounded-lg border border-slate-300 px-3 py-2" />
      <select v-model="app" class="mt-2 w-full rounded-lg border border-slate-300 px-3 py-2">
        <option value="">Select app</option>
        <option v-for="item in apps" :key="item.id" :value="item.id">{{ item.name }}</option>
      </select>
      <p v-if="message" class="mt-2 text-sm text-primary">{{ message }}</p>
      <div class="mt-4 flex justify-end gap-2">
        <Button variant="outline" @click="emit('close')">Cancel</Button>
        <Button @click="submit">Submit</Button>
      </div>
    </div>
  </div>
</template>
