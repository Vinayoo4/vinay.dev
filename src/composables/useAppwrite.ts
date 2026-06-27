import { client, databases, storage } from '@/lib/appwrite'

export function useAppwrite() {
  return {
    client,
    databases,
    storage,
    databaseId: import.meta.env.VITE_APPWRITE_DATABASE_ID,
    productsCollectionId: import.meta.env.VITE_APPWRITE_PRODUCTS_COLLECTION_ID,
    leadsCollectionId: import.meta.env.VITE_APPWRITE_LEADS_COLLECTION_ID,
    bucketId: import.meta.env.VITE_APPWRITE_BUCKET_ID,
    whatsappNumber: import.meta.env.VITE_WHATSAPP_NUMBER || '918930609914',
    contactEmail: import.meta.env.VITE_CONTACT_EMAIL || 'askvinaybusiness@gmail.com'
  }
}
