import { functions } from '@/lib/appwrite';
import { ExecutionMethod } from 'appwrite';

export const functionsService = {
  async executeFunction(functionId: string, data?: string, async: boolean = false) {
    try {
      // For Appwrite version < 1.4, use old signature if needed. Assuming current Appwrite version supports this:
      const execution = await functions.createExecution(
        functionId,
        data ? data : '',
        async,
        undefined, // path
        ExecutionMethod.POST // Method
      );
      return execution;
    } catch (error) {
      console.error(`Error executing function ${functionId}:`, error);
      throw error;
    }
  },
};
