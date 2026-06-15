import { Client, Databases } from 'appwrite';

const client = new Client()
    .setEndpoint(import.meta.env.VITE_APPWRITE_ENDPOINT || 'https://cloud.appwrite.io/v1')
    .setProject(import.meta.env.VITE_APPWRITE_PROJECT_ID || '');

export const databases = new Databases(client);
export const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID || 'saltedhash_public';
export const LEADS_COLLECTION_ID = import.meta.env.VITE_APPWRITE_LEADS_COLLECTION_ID || 'contact_leads';

export default client;
