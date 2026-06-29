import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useProducts, type Product } from '@/composables/useProducts'

export const useProductsStore = defineStore('products', () => {
  const { products, fallbackProducts, loading, error, fetchProducts, getImageUrl } = useProducts()

  const selectedProduct = ref<Product | null>(null)
  const isPanelOpen = ref(false)

  const openProductPanel = (product: Product) => {
    selectedProduct.value = product
    isPanelOpen.value = true
  }

  const closeProductPanel = () => {
    isPanelOpen.value = false
    // Delay clearing the product to allow close animation
    setTimeout(() => {
      if (!isPanelOpen.value) {
        selectedProduct.value = null
      }
    }, 300)
  }

  return {
    products,
    fallbackProducts,
    loading,
    error,
    fetchProducts,
    getImageUrl,
    selectedProduct,
    isPanelOpen,
    openProductPanel,
    closeProductPanel
  }
})
