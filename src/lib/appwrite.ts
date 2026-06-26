import { Client, Databases, Storage } from 'appwrite'
import { logger } from '@/utils/logger'

const endpoint = import.meta.env.VITE_APPWRITE_ENDPOINT
const projectId = import.meta.env.VITE_APPWRITE_PROJECT_ID

const client = new Client()

if (endpoint && projectId) {
  client.setEndpoint(endpoint).setProject(projectId)
} else {
  logger.warn('Appwrite environment variables are missing. Appwrite features will not work.')
}

export const databases = new Databases(client)
export const storage = new Storage(client)
export { client }
