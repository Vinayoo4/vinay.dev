import { ref } from 'vue'
import { Query } from 'appwrite'
import { useAppwrite } from './useAppwrite'

export interface Product {
  $id: string;
  name: string;
  category: 'stationery' | 'natural' | 'educational' | 'gardening' | 'digital';
  description?: string;
  price?: number;
  imageId?: string;
  available: boolean;
  order?: number;
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
        Query.equal('available', true),
        Query.orderAsc('order')
      ])
      products.value = response.documents as unknown as Product[]
    } catch (err: any) {
      error.value = err.message || 'Failed to fetch products'
      console.error('Error fetching products:', err)
    } finally {
      loading.value = false
    }
  }

  const getImageUrl = (imageId: string) => {
    if (!imageId) return ''
    return storage.getFileView(bucketId, imageId).toString()
  }

  return {
    products,
    loading,
    error,
    fetchProducts,
    getImageUrl
  }
}
