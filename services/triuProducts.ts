import { supabase } from '../lib/supabaseClient'
import { SyncQueue } from '../lib/syncQueue'

export async function listTriuProducts() {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('brand_code', 'triu')
    .eq('status', 'active')
    .order('created_at', { ascending: false })

  if (error) throw error
  return data ?? []
}

export async function getTriuProductBySlug(slug: string) {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('brand_code', 'triu')
    .eq('slug', slug)
    .single()

  if (error) throw error
  return data
}

export async function listTriuCartItems() {
  const { data, error } = await supabase
    .from('cart_items')
    .select('id, quantity, product_id, products(*)')
    .order('created_at', { ascending: false })

  if (error) throw error
  return data ?? []
}

export async function addTriuCartItem(productId: string, quantity = 1) {
  const { data: sessionData } = await supabase.auth.getSession()
  const userId = sessionData.session?.user.id

  const payload = { product_id: productId, quantity, user_id: userId }

  if (typeof navigator !== 'undefined' && !navigator.onLine) {
    SyncQueue.addAction({ type: 'INSERT', table: 'cart_items', payload });
    return payload; // Optimistic return
  }

  const { data, error } = await supabase
    .from('cart_items')
    .insert(payload)
    .select()
    .single()

  if (error) {
     SyncQueue.addAction({ type: 'INSERT', table: 'cart_items', payload });
     return payload; // Optimistic return
  }
  return data
}

export async function createTriuOrder(payload: {
  total: number
  shipping_address: Record<string, unknown>
}) {
  const { data: sessionData } = await supabase.auth.getSession()
  const userId = sessionData.session?.user.id

  const insertPayload = {
      brand_code: 'triu',
      total: payload.total,
      shipping_address: payload.shipping_address,
      user_id: userId
  }

  if (typeof navigator !== 'undefined' && !navigator.onLine) {
    SyncQueue.addAction({ type: 'INSERT', table: 'orders', payload: insertPayload });
    return insertPayload; // Optimistic return
  }

  const { data, error } = await supabase
    .from('orders')
    .insert(insertPayload)
    .select()
    .single()

  if (error) {
     SyncQueue.addAction({ type: 'INSERT', table: 'orders', payload: insertPayload });
     return insertPayload; // Optimistic return
  }
  return data
}
