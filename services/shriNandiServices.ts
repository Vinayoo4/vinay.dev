import { databaseService } from '@/services/databaseService';
import { authService } from '@/services/authService';
import { SyncQueue } from '../lib/syncQueue';
import { Query } from 'appwrite';

const SERVICES_COLLECTION_ID = process.env.NEXT_PUBLIC_SERVICES_COLLECTION_ID || process.env.SERVICES_COLLECTION_ID || 'services';
const LEADS_COLLECTION_ID = process.env.NEXT_PUBLIC_LEADS_COLLECTION_ID || process.env.LEADS_COLLECTION_ID || 'leads';
const BOOKINGS_COLLECTION_ID = process.env.NEXT_PUBLIC_BOOKINGS_COLLECTION_ID || process.env.BOOKINGS_COLLECTION_ID || 'consultation_bookings';
const CLIENT_PROJECTS_COLLECTION_ID = process.env.NEXT_PUBLIC_CLIENT_PROJECTS_COLLECTION_ID || process.env.CLIENT_PROJECTS_COLLECTION_ID || 'client_projects';

export async function listServices() {
  try {
    const data = await databaseService.listDocuments(SERVICES_COLLECTION_ID, [
        Query.equal('brand_code', 'shri-nandi'),
        Query.equal('status', 'active'),
        Query.orderDesc('created_at')
    ]);
    return data.documents ?? [];
  } catch (error) {
    console.error("Error fetching services:", error);
    throw error;
  }
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
  };

  if (typeof navigator !== 'undefined' && !navigator.onLine) {
    SyncQueue.addAction({ type: 'INSERT', table: LEADS_COLLECTION_ID, payload: insertPayload });
    return insertPayload; // Optimistic return
  }

  try {
     const data = await databaseService.createDocument(LEADS_COLLECTION_ID, insertPayload);
     return data;
  } catch (error) {
     SyncQueue.addAction({ type: 'INSERT', table: LEADS_COLLECTION_ID, payload: insertPayload });
     return insertPayload; // Optimistic return
  }
}

export async function bookConsultation(payload: {
  service_id: string
  booking_time: string
  notes?: string
}) {
  const user = await authService.getCurrentUser();
  const userId = user?.$id;

  const insertPayload = {
      service_id: payload.service_id,
      booking_time: payload.booking_time,
      notes: payload.notes ?? null,
      user_id: userId
  };

  if (typeof navigator !== 'undefined' && !navigator.onLine) {
    SyncQueue.addAction({ type: 'INSERT', table: BOOKINGS_COLLECTION_ID, payload: insertPayload });
    return insertPayload; // Optimistic return
  }

  try {
     const data = await databaseService.createDocument(BOOKINGS_COLLECTION_ID, insertPayload);
     return data;
  } catch (error) {
     SyncQueue.addAction({ type: 'INSERT', table: BOOKINGS_COLLECTION_ID, payload: insertPayload });
     return insertPayload; // Optimistic return
  }
}

export async function listClientProjects() {
  try {
     const data = await databaseService.listDocuments(CLIENT_PROJECTS_COLLECTION_ID, [
         Query.orderDesc('created_at')
     ]);
     return data.documents ?? [];
  } catch (error) {
     console.error("Error fetching client projects:", error);
     throw error;
  }
}
