# Appwrite Setup Guide

This guide walks through setting up the Appwrite backend for SALTEDHASH.

---

## 1. Create an Appwrite Project

1. Go to [Appwrite Console](https://cloud.appwrite.io) and log in.
2. Click **Create Project** and name it `saltedhash`.
3. Note your **Project ID** — you will need it for `.env`.

---

## 2. Create the Database

1. In your project, navigate to **Databases**.
2. Click **Create Database**.
3. Set **Database ID** to: `saltedhash_public`
4. Set **Name** to: `SALTEDHASH Public`

---

## 3. Create the `products` Collection

1. Inside the `saltedhash_public` database, click **Create Collection**.
2. Set **Collection ID** to: `products`
3. Set **Name** to: `Products`
4. Click **Create**.

### Attributes

| Attribute      | Type   | Size  | Required | Default |
|----------------|--------|-------|----------|---------|
| `name`         | string | 255   | Yes      | —       |
| `slug`         | string | 255   | Yes      | —       |
| `description`  | string | 2000  | Yes      | —       |
| `price`        | double | —     | Yes      | —       |
| `brand_code`   | string | 50    | Yes      | —       |
| `status`       | string | 20    | Yes      | —       |
| `imageFileId`  | string | 255   | No       | —       |
| `category`     | string | 50    | No       | —       |
| `flipkartUrl`  | string | 500   | No       | —       |
| `meeshoUrl`    | string | 500   | No       | —       |
| `whatsappText` | string | 500   | No       | —       |
| `tags`         | string[] | —   | No       | —       |

### Indexes

| Key        | Attributes    | Order | Type |
|------------|---------------|-------|------|
| `status`   | `status`      | ASC   | Key  |

### Permissions

- **Read**: `any` (public product listing)
- **Write**: `users` (authenticated admin)

---

## 4. Create the `contact_leads` Collection

1. Inside the `saltedhash_public` database, click **Create Collection**.
2. Set **Collection ID** to: `contact_leads`
3. Set **Name** to: `Contact Leads`
4. Click **Create**.

### Attributes

| Attribute         | Type   | Size  | Required |
|-------------------|--------|-------|----------|
| `name`            | string | 255   | Yes      |
| `phone`           | string | 20    | Yes      |
| `email`           | string | 255   | No       |
| `productInterest` | string | 255   | No       |
| `message`         | string | 2000  | No       |
| `createdAt`       | string | 50    | Yes      |

### Permissions

- **Read**: `users` (authenticated admin)
- **Write**: `any` (public form submission)

---

## 5. Create the Storage Bucket

1. Navigate to **Storage**.
2. Click **Create Bucket**.
3. Set **Bucket ID** to: `product_assets`
4. Set **Name** to: `Product Assets`

### Allowed File Types

- `image/jpeg` (.jpg)
- `image/png` (.png)
- `image/webp` (.webp)

### Permissions

- **Read**: `any` (public image serving)
- **Write**: `users` (authenticated admin)

---

## 6. Environment Variables

Copy `.env.example` to `.env` and fill in your values:

```env
VITE_APPWRITE_ENDPOINT=https://fra.cloud.appwrite.io/v1
VITE_APPWRITE_PROJECT_ID=your_project_id_here
VITE_APPWRITE_DATABASE_ID=saltedhash_public
VITE_APPWRITE_PRODUCTS_COLLECTION_ID=products
VITE_APPWRITE_LEADS_COLLECTION_ID=contact_leads
VITE_APPWRITE_BUCKET_ID=product_assets
```

---

## 7. Verify Setup

Run the dev server and check the browser console:

```bash
npm run dev
```

- If Appwrite is misconfigured, the app falls back to hardcoded product data gracefully.
- Contact form submissions will fail silently with a user-friendly fallback message.
