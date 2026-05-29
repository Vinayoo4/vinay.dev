import { defineStore } from 'pinia'

export const useAppsStore = defineStore('apps', {
  state: () => ({ apps: [], categories: [], loaded: false }),
  actions: {
    async load() {
      if (this.loaded) return
      const res = await fetch('/data/apps.json')
      const data = await res.json()
      this.apps = data.apps
      this.categories = data.categories
      this.loaded = true
    },
  },
})
