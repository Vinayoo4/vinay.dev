import { databaseService } from '@/services/databaseService'
import { authService } from '@/services/authService'
import { Query } from 'appwrite'

const MEMBERSHIPS_COLLECTION_ID = process.env.NEXT_PUBLIC_BRAND_MEMBERSHIPS_COLLECTION_ID || process.env.BRAND_MEMBERSHIPS_COLLECTION_ID || 'user_brand_memberships'
const APP_ACCESS_COLLECTION_ID = process.env.NEXT_PUBLIC_APP_ACCESS_COLLECTION_ID || process.env.APP_ACCESS_COLLECTION_ID || 'app_access'

export async function getMyMemberships() {
  const user = await authService.getCurrentUser()
  const userId = user?.$id
  if (!userId) return []

  try {
    const data = await databaseService.listDocuments(MEMBERSHIPS_COLLECTION_ID, [
      Query.equal('user_id', userId),
      Query.equal('status', 'active')
    ])
    return data.documents ?? []
  } catch (error) {
    console.error("Failed to fetch brand memberships:", error)
    throw error
  }
}

export async function getMyAppAccess() {
  const user = await authService.getCurrentUser()
  const userId = user?.$id
  if (!userId) return []

  try {
    const data = await databaseService.listDocuments(APP_ACCESS_COLLECTION_ID, [
      Query.equal('user_id', userId),
      Query.equal('status', 'active')
    ])
    return data.documents ?? []
  } catch (error) {
    console.error("Failed to fetch app access:", error)
    throw error
  }
}

export async function hasAccess(appCode: string) {
  const access = await getMyAppAccess()
  return access.some((row) => row.app_code === appCode)
}
