import { defineStore } from 'pinia'

export const useSiteConfigStore = defineStore('siteConfig', {
  state: () => ({ config: null }),
  actions: {
    async load() {
      if (this.config) return
      const res = await fetch('/data/site-config.json')
      this.config = await res.json()
    },
  },
})
