# SALTEDHASH Umbrella PWA

This is the central umbrella platform for the SALTEDHASH ecosystem, built with Next.js App Router and Appwrite.

## Architecture

- **Frontend:** Next.js 13+ (App Router), Tailwind CSS, Framer Motion
- **Backend/Auth:** Appwrite Cloud
- **Deployment:** Static Export (`out/`) optimized for Appwrite Platform
- **State:** React Hooks + Appwrite Realtime

## Appwrite Integration

This project depends on Appwrite for all backend functionality.
Configure your `.env.local` using `.env.example` as a template:

```
NEXT_PUBLIC_APPWRITE_ENDPOINT=https://fra.cloud.appwrite.io/v1
NEXT_PUBLIC_APPWRITE_PROJECT_ID=69c3aeb5001e29bce67a
NEXT_PUBLIC_APPWRITE_DATABASE_ID=...
NEXT_PUBLIC_PROFILES_COLLECTION_ID=...
```

## Production Build

To build the static PWA for deployment on Appwrite:

```
npm run build
```

The output will be in the `out/` directory. Deploy this directory via Appwrite CLI or connect the repository in the Appwrite Console.
