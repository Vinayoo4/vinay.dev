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
  flipkartUrl?: string;
  meeshoUrl?: string;
  whatsappText?: string;
}

export function useProducts() {
  const { databases, databaseId, productsCollectionId, storage, bucketId } = useAppwrite()
  const products = ref<Product[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  const fallbackProducts: Product[] = [
    {
      $id: 'fallback-1',
      name: 'Neem & Basil Soap',
      slug: 'neem-basil-soap',
      description: 'Cold-pressed natural soap infused with neem and holy basil. Cleanses deeply while preserving natural oils.',
      price: 350.00,
      brand_code: 'TRIU',
      status: 'active',
      category: 'natural',
      flipkartUrl: 'https://www.flipkart.com'
    },
    {
      $id: 'fallback-2',
      name: 'Rose Water Toner',
      slug: 'rose-water-toner',
      description: 'Pure distilled rose water. Balances pH and hydrates the skin without any synthetic additives.',
      price: 450.00,
      brand_code: 'TRIU',
      status: 'active',
      category: 'natural',
      meeshoUrl: 'https://www.meesho.com'
    },
    {
      $id: 'fallback-3',
      name: 'Herbal Hair Oil',
      slug: 'herbal-hair-oil',
      description: 'Traditional blend of amla, bhringraj, and coconut oil for scalp nourishment.',
      price: 650.00,
      brand_code: 'TRIU',
      status: 'active',
      category: 'natural'
    }
  ]

  const fetchProducts = async () => {
    loading.value = true
    error.value = null

    if (!databaseId || !productsCollectionId) {
      logger.warn('Missing Appwrite configuration. Expected empty state.')
      products.value = []
      loading.value = false
      return
    }

    try {
      const response = await databases.listDocuments(databaseId, productsCollectionId, [
        Query.equal('status', 'active')
      ])
      products.value = response.documents as unknown as Product[]
    } catch (err: any) {
      logger.error('Error fetching products:', err)
      products.value = []
    } finally {
      loading.value = false
    }
  }

  const getImageUrl = (imageFileId: string): string => {
    if (!imageFileId || !bucketId) return ''
    try {
      return storage.getFilePreview(bucketId, imageFileId, 800, 800).toString()
    } catch {
      return ''
    }
  }

  return {
    products,
    fallbackProducts,
    loading,
    error,
    fetchProducts,
    getImageUrl
  }
}
