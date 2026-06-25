import { logger } from '@/utils/logger'
import { ref } from 'vue'
import { Query } from 'appwrite'
import { useAppwrite } from './useAppwrite'

export interface Product {
  $id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  brand_code: string;
  status: string;
  imageFileId?: string;
  category?: string;
  tags?: string[];
}

export function useProducts() {
  const { databases, databaseId, productsCollectionId, storage, bucketId } = useAppwrite()
  const products = ref<Product[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  const fetchProducts = async () => {
    loading.value = true
    error.value = null
    try {
      const response = await databases.listDocuments(databaseId, productsCollectionId, [
        Query.equal('status', 'active')
      ])
      products.value = response.documents as unknown as Product[]
    } catch (err: any) {
      error.value = err.message || 'Failed to fetch products'
      logger.error('Error fetching products:', err)
    } finally {
      loading.value = false
    }
  }

  const getImageUrl = (imageFileId: string) => {
    if (!imageFileId) return ''
    return storage.getFileView(bucketId, imageFileId).toString()
  }

  return {
    products,
    loading,
    error,
    fetchProducts,
    getImageUrl
  }
}
