import { Client, Databases, Storage } from 'appwrite'

const endpoint = import.meta.env.VITE_APPWRITE_ENDPOINT
const projectId = import.meta.env.VITE_APPWRITE_PROJECT_ID

if (!endpoint || !projectId) {
  console.warn('[SALTEDHASH] Appwrite env vars missing. Data features will be disabled.')
}

const client = new Client()

if (endpoint && projectId) {
  client.setEndpoint(endpoint).setProject(projectId)
}

export const databases = new Databases(client)
export const storage = new Storage(client)
export { client }