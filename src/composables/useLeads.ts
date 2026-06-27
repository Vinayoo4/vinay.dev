import { logger } from '@/utils/logger'
import { ref } from 'vue'
import { ID } from 'appwrite'
import { useAppwrite } from './useAppwrite'

export interface Lead {
  name: string
  phone: string
  email?: string
  productInterest?: string
  message?: string
}

export function useLeads() {
  const { databases, databaseId, leadsCollectionId } = useAppwrite()
  const loading = ref(false)
  const error = ref<string | null>(null)
  const success = ref(false)

  const submitLead = async (leadData: Lead) => {
    if (!databaseId || !leadsCollectionId) {
      error.value = 'Contact system not configured. Please email us directly.'
      return
    }
    loading.value = true
    error.value = null
    success.value = false
    try {
      await databases.createDocument(
        databaseId,
        leadsCollectionId,
        ID.unique(),
        { ...leadData, createdAt: new Date().toISOString() }
      )
      success.value = true
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Failed to submit'
      error.value = msg
      logger.error('Error submitting lead:', err)
    } finally {
      loading.value = false
    }
  }

  return { submitLead, loading, error, success }
}