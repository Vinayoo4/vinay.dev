import { storage } from '@/lib/appwrite';
import { ID } from 'appwrite';

export const storageService = {
  async uploadFile(bucketId: string, file: File) {
    try {
      return await storage.createFile(bucketId, ID.unique(), file);
    } catch (error) {
      console.error(`Error uploading file to bucket ${bucketId}:`, error);
      throw error;
    }
  },

  async deleteFile(bucketId: string, fileId: string) {
    try {
      return await storage.deleteFile(bucketId, fileId);
    } catch (error) {
      console.error(`Error deleting file ${fileId} from bucket ${bucketId}:`, error);
      throw error;
    }
  },

  getFilePreview(bucketId: string, fileId: string) {
    try {
      return storage.getFilePreview(bucketId, fileId);
    } catch (error) {
      console.error(`Error generating preview for file ${fileId} in bucket ${bucketId}:`, error);
      throw error;
    }
  },

  getFileDownload(bucketId: string, fileId: string) {
    try {
        return storage.getFileDownload(bucketId, fileId);
    } catch (error) {
        console.error(`Error getting download URL for file ${fileId} in bucket ${bucketId}:`, error);
        throw error;
    }
  }
};
