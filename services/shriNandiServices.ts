import { supabase } from '../lib/supabaseClient'
import { SyncQueue } from '../lib/syncQueue'

export async function listServices() {
  const { data, error } = await supabase
    .from('services')
    .select('*')
    .eq('brand_code', 'shri-nandi')
    .eq('status', 'active')
    .order('created_at', { ascending: false })

  if (error) throw error
  return data ?? []
}

export async function createLead(payload: {
  full_name: string
  email?: string
  phone?: string
  source?: string
  notes?: string
}) {
  const insertPayload = {
      full_name: payload.full_name,
      email: payload.email ?? null,
      phone: payload.phone ?? null,
      source: payload.source ?? 'website',
      notes: payload.notes ?? null
  }

  if (typeof navigator !== 'undefined' && !navigator.onLine) {
    SyncQueue.addAction({ type: 'INSERT', table: 'leads', payload: insertPayload });
    return insertPayload; // Optimistic return
  }

  const { data, error } = await supabase
    .from('leads')
    .insert(insertPayload)
    .select()
    .single()

  if (error) {
     SyncQueue.addAction({ type: 'INSERT', table: 'leads', payload: insertPayload });
     return insertPayload; // Optimistic return
  }
  return data
}

export async function bookConsultation(payload: {
  service_id: string
  booking_time: string
  notes?: string
}) {
  const { data: sessionData } = await supabase.auth.getSession()
  const userId = sessionData.session?.user.id

  const insertPayload = {
      service_id: payload.service_id,
      booking_time: payload.booking_time,
      notes: payload.notes ?? null,
      user_id: userId
  }

  if (typeof navigator !== 'undefined' && !navigator.onLine) {
    SyncQueue.addAction({ type: 'INSERT', table: 'consultation_bookings', payload: insertPayload });
    return insertPayload; // Optimistic return
  }

  const { data, error } = await supabase
    .from('consultation_bookings')
    .insert(insertPayload)
    .select()
    .single()

  if (error) {
     SyncQueue.addAction({ type: 'INSERT', table: 'consultation_bookings', payload: insertPayload });
     return insertPayload; // Optimistic return
  }
  return data
}

export async function listClientProjects() {
  const { data, error } = await supabase
    .from('client_projects')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) throw error
  return data ?? []
}
