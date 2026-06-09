import { client } from '@/lib/appwrite';

export const realtimeService = {
  subscribe(channels: string | string[], callback: (payload: any) => void) {
    try {
      const unsubscribe = client.subscribe(channels, callback);
      return unsubscribe;
    } catch (error) {
      console.error(`Error subscribing to channels ${channels}:`, error);
      // Return a dummy unsubscribe function if it fails to avoid breaking calling code
      return () => {};
    }
  },
};
