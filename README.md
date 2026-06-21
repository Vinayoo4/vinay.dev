# SALTEDHASH

Venture studio and brand umbrella. Builds intelligent software and curates natural products.

## Stack
Vue 3 · Vite · TypeScript · Tailwind CSS v4 · Pinia · Appwrite SDK · vite-plugin-pwa

## Setup
npm install
cp .env.example .env
# Fill in .env with your Appwrite project credentials

## Dev
npm run dev

## Build
npm run build

## Preview
npm run preview

## Deploy
Connect repo to Vercel. Set environment variables from .env in Vercel dashboard. Deploy.

## Appwrite Setup
1. Create project at cloud.appwrite.io
2. Run: npx appwrite deploy collection (requires appwrite CLI)
3. Or manually create collections from appwrite.json schema
4. Set collection permissions: products → read("any"), contact_leads → create("any")
5. Create storage bucket product_assets → read("any")

## Routes
/ — Home
/studio — Tech & AI/ML services
/triu — TRIU Naturals product catalog
/about — Brand story
/contact — Contact and lead form

## Env Variables
See .env.example
