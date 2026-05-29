import { defineStore } from 'pinia'
import { useAuth } from '../composables/useAuth'

export const useAuthStore = defineStore('auth', () => {
  const auth = useAuth()
  return auth
})
