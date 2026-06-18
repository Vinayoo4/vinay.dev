import { client, databases, storage } from '@/lib/appwrite'

export function useAppwrite() {
  return {
    client,
    databases,
    storage,
    databaseId: import.meta.env.VITE_APPWRITE_DATABASE_ID,
    productsCollectionId: import.meta.env.VITE_APPWRITE_PRODUCTS_COLLECTION_ID,
    leadsCollectionId: import.meta.env.VITE_APPWRITE_LEADS_COLLECTION_ID,
    bucketId: import.meta.env.VITE_APPWRITE_BUCKET_ID
  }
}
