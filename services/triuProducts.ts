import { databaseService } from '@/services/databaseService';
import { authService } from '@/services/authService';
import { SyncQueue } from '../lib/syncQueue';
import { Query } from 'appwrite';

const PRODUCTS_COLLECTION_ID = process.env.NEXT_PUBLIC_PRODUCTS_COLLECTION_ID || process.env.PRODUCTS_COLLECTION_ID || 'products';
const CART_ITEMS_COLLECTION_ID = process.env.NEXT_PUBLIC_CART_ITEMS_COLLECTION_ID || process.env.CART_ITEMS_COLLECTION_ID || 'cart_items';
const ORDERS_COLLECTION_ID = process.env.NEXT_PUBLIC_ORDERS_COLLECTION_ID || process.env.ORDERS_COLLECTION_ID || 'orders';

export async function listTriuProducts() {
  try {
    const data = await databaseService.listDocuments(PRODUCTS_COLLECTION_ID, [
        Query.equal('brand_code', 'triu'),
        Query.equal('status', 'active'),
        Query.orderDesc('created_at')
    ]);
    return data.documents ?? [];
  } catch (error) {
    console.error("Error fetching TRIU products:", error);
    throw error;
  }
}

export async function getTriuProductBySlug(slug: string) {
  try {
     const data = await databaseService.listDocuments(PRODUCTS_COLLECTION_ID, [
        Query.equal('brand_code', 'triu'),
        Query.equal('slug', slug),
        Query.limit(1)
     ]);
     return data.documents[0] ?? null;
  } catch(error) {
     console.error(`Error fetching TRIU product by slug ${slug}:`, error);
     throw error;
  }
}

export async function listTriuCartItems() {
  try {
    // Requires a join capability or doing it client side. Assuming the backend resolves it or we just list.
    const data = await databaseService.listDocuments(CART_ITEMS_COLLECTION_ID, [
        Query.orderDesc('created_at')
    ]);
    return data.documents ?? [];
  } catch (error) {
    console.error("Error fetching TRIU cart items:", error);
    throw error;
  }
}

export async function addTriuCartItem(productId: string, quantity = 1) {
  const user = await authService.getCurrentUser();
  const userId = user?.$id;

  const payload = { product_id: productId, quantity, user_id: userId };

  if (typeof navigator !== 'undefined' && !navigator.onLine) {
    SyncQueue.addAction({ type: 'INSERT', table: CART_ITEMS_COLLECTION_ID, payload });
    return payload; // Optimistic return
  }

  try {
    const data = await databaseService.createDocument(CART_ITEMS_COLLECTION_ID, payload);
    return data;
  } catch (error) {
     SyncQueue.addAction({ type: 'INSERT', table: CART_ITEMS_COLLECTION_ID, payload });
     return payload; // Optimistic return
  }
}

export async function createTriuOrder(payload: {
  total: number
  shipping_address: Record<string, unknown>
}) {
  const user = await authService.getCurrentUser();
  const userId = user?.$id;

  const insertPayload = {
      brand_code: 'triu',
      total: payload.total,
      shipping_address: JSON.stringify(payload.shipping_address),
      user_id: userId
  };

  if (typeof navigator !== 'undefined' && !navigator.onLine) {
    SyncQueue.addAction({ type: 'INSERT', table: ORDERS_COLLECTION_ID, payload: insertPayload });
    return insertPayload; // Optimistic return
  }

  try {
     const data = await databaseService.createDocument(ORDERS_COLLECTION_ID, insertPayload);
     return data;
  } catch (error) {
     SyncQueue.addAction({ type: 'INSERT', table: ORDERS_COLLECTION_ID, payload: insertPayload });
     return insertPayload; // Optimistic return
  }
}
