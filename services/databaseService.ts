import { databases } from '@/lib/appwrite';
import { ID, Query } from 'appwrite';

const DATABASE_ID = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID || "saltedhash_db";

export const databaseService = {
  async getDocument(collectionId: string, documentId: string) {
    try {
      return await databases.getDocument(DATABASE_ID, collectionId, documentId);
    } catch (error) {
      console.error(`Error fetching document ${documentId} from ${collectionId}:`, error);
      throw error;
    }
  },

  async listDocuments(collectionId: string, queries: string[] = []) {
    try {
      return await databases.listDocuments(DATABASE_ID, collectionId, queries);
    } catch (error) {
      console.error(`Error listing documents from ${collectionId}:`, error);
      throw error;
    }
  },

  async createDocument(collectionId: string, data: any, documentId: string = ID.unique()) {
    try {
      return await databases.createDocument(DATABASE_ID, collectionId, documentId, data);
    } catch (error) {
      console.error(`Error creating document in ${collectionId}:`, error);
      throw error;
    }
  },

  async updateDocument(collectionId: string, documentId: string, data: any) {
    try {
      return await databases.updateDocument(DATABASE_ID, collectionId, documentId, data);
    } catch (error) {
      console.error(`Error updating document ${documentId} in ${collectionId}:`, error);
      throw error;
    }
  },

  async deleteDocument(collectionId: string, documentId: string) {
    try {
      return await databases.deleteDocument(DATABASE_ID, collectionId, documentId);
    } catch (error) {
      console.error(`Error deleting document ${documentId} from ${collectionId}:`, error);
      throw error;
    }
  },
};
