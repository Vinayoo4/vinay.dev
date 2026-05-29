import { defineStore } from 'pinia'

const STORAGE_KEY = 'saltedhash_waitlist'

export const useWaitlistStore = defineStore('waitlist', {
  state: () => ({ entries: [], config: null }),
  getters: {
    count: (state) => state.entries.length,
  },
  actions: {
    async load() {
      const res = await fetch('/data/waitlist.json')
      const data = await res.json()
      this.config = data.config
      this.entries = JSON.parse(localStorage.getItem(STORAGE_KEY) || JSON.stringify(data.submissions || []))
    },
    submit(payload) {
      const duplicate = this.entries.some((entry) => entry.email === payload.email && entry.app === payload.app)
      if (duplicate) return { ok: false, message: this.config?.duplicateMessage || 'Already on waitlist' }
      this.entries.unshift({ id: `waitlist-${Date.now()}`, submittedAt: new Date().toISOString(), ...payload })
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.entries))
      return { ok: true, message: this.config?.successMessage || 'Joined waitlist' }
    },
    remove(id) {
      this.entries = this.entries.filter((entry) => entry.id !== id)
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.entries))
    },
  },
})
