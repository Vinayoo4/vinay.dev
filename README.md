# SALTEDHASH Umbrella PWA

This is the central umbrella platform for the SALTEDHASH ecosystem, built with Vue 3, Vite, and Tailwind CSS.

## Architecture

- **Frontend:** Vue 3, Vite, Tailwind CSS, Anime.js
- **Backend/Auth:** Appwrite Cloud (Lead Capture)
- **Deployment:** Static Export (`dist/`) optimized for Appwrite Sites

## Appwrite Integration

This project uses Appwrite exclusively for lead capture on the Contact page.
Configure your `.env` using the following as a template:

```
VITE_APPWRITE_ENDPOINT=https://fra.cloud.appwrite.io/v1
VITE_APPWRITE_PROJECT_ID=...
VITE_APPWRITE_DATABASE_ID=saltedhash_public
VITE_APPWRITE_LEADS_COLLECTION_ID=contact_leads
```

## Production Build & Deployment

To build the static PWA for deployment:

```bash
npm run build
```

The output will be in the `dist/` directory.

### Important: Appwrite Sites Routing

Because this is a Single Page Application (SPA) using Vue Router in `history` mode, **you must configure a rewrite rule** when deploying to Appwrite Sites (or any other static host).

You need to add a catch-all rewrite rule that points all unmatched routes to `index.html`. Without this, direct navigation to subpages (e.g., `/studio`) will result in a 404 error.
