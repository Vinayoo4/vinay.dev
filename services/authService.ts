import { account } from '@/lib/appwrite';
import { ID } from 'appwrite';

export const authService = {
  async register(email: string, password: string, name: string) {
    try {
      const user = await account.create(ID.unique(), email, password, name);
      // Log the user in immediately after successful registration
      await this.login(email, password);
      return user;
    } catch (error) {
      console.error('Registration failed:', error);
      throw error;
    }
  },

  async login(email: string, password: string) {
    try {
      const session = await account.createEmailPasswordSession(email, password);
      return session;
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  },

  async logout() {
    try {
      await account.deleteSession('current');
    } catch (error) {
      console.error('Logout failed:', error);
      // Suppress error if already logged out
    }
  },

  async getCurrentUser() {
    try {
      const user = await account.get();
      return user;
    } catch (error) {
      // User is not logged in, return null
      return null;
    }
  },

  async getSession() {
     try {
         const session = await account.getSession('current');
         return session;
     } catch (error) {
         return null;
     }
  }
};
