import { defineStore } from 'pinia'

export const useOpalStore = defineStore('opal', {
  state: () => ({ opalApps: [], loaded: false }),
  actions: {
    async load() {
      if (this.loaded) return
      const res = await fetch('/data/opal-apps.json')
      const data = await res.json()
      this.opalApps = data.opalApps
      this.loaded = true
    },
  },
})
