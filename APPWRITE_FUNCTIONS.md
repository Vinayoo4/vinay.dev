# Appwrite Functions Setup and Deployment

This guide explains how to set up, deploy, and test Appwrite functions for the SALTEDHASH umbrella PWA.

## Overview

Appwrite Functions are server-side code units you can run for backend logic such as validation, automation, notifications, and secure operations.

In this repo, the functions are organized in the `/appwrite/functions` folder.

## Prerequisites

1. Install the Appwrite CLI (`npm install -g appwrite-cli` or similar)
2. Log in to your Appwrite console and have your project ID ready.

## Deployment using Appwrite CLI

1. **Login to Appwrite**
   ```bash
   appwrite login
   ```

2. **Initialize your Project**
   Link the CLI to your specific Appwrite project.
   ```bash
   appwrite init project
   ```

3. **Initialize Functions**
   If you are creating new functions locally, initialize them:
   ```bash
   appwrite init functions
   ```
   *Note: If the functions already exist in the Appwrite console, pull them into your repo instead:*
   ```bash
   appwrite pull functions
   ```

4. **Deploy Functions**
   Push the functions to the Appwrite server:
   ```bash
   appwrite push functions
   ```

## Configuring Environment Variables

After deploying, you must configure the environment variables in the Appwrite Console under the specific function's settings.

Required variables include:
- `APPWRITE_API_KEY`
- `APPWRITE_ENDPOINT`
- `APPWRITE_PROJECT_ID`
- `DATABASE_ID`
- `PROFILES_COLLECTION_ID`
- `PUBLIC_PROFILES_COLLECTION_ID`
- `BRAND_MEMBERSHIPS_COLLECTION_ID`

*Remember to redeploy the function in the Appwrite console after adding or updating environment variables.*

## Testing Functions

After deploying and configuring:
1. Go to the Appwrite Console > Functions.
2. Select your function (e.g., `umbrella-health-check`).
3. Click "Execute Now".
4. Check the "Logs" section to ensure it runs successfully, outputs the expected logs, and does not expose secrets.
