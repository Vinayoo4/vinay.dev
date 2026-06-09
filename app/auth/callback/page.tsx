"use client";
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { account } from '@/lib/appwrite';
import { authService } from '@/services/authService';
import { databaseService } from '@/services/databaseService';
import { ID } from 'appwrite';

export default function AuthCallbackPage() {
  const router = useRouter();

  useEffect(() => {
    async function handleAuthCallback() {
      const url = new URL(window.location.href);
      const code = url.searchParams.get('code');
      const error = url.searchParams.get('error');

      if (error) {
        router.push('/auth/login?error=' + encodeURIComponent(error));
        return;
      }

      // Appwrite typically handles OAuth callbacks differently (via a success URL redirection)
      // where the session is automatically created, or by directly verifying a magic URL token.
      // If this is an OAuth callback with tokens, we attempt to get the current session.
      try {
        const user = await authService.getCurrentUser();

        if (user) {
          // Sync profile to database if it doesn't exist
          try {
             const PROFILES_COLLECTION_ID = process.env.NEXT_PUBLIC_PROFILES_COLLECTION_ID || process.env.PROFILES_COLLECTION_ID || 'profiles';
             await databaseService.createDocument(PROFILES_COLLECTION_ID, {
                email: user.email,
                full_name: user.name,
                role: 'user',
                status: 'active'
             }, user.$id);
          } catch(e: any) {
             // If document already exists, this is fine
             if (e.code !== 409) {
                console.error("Failed to sync profile:", e);
             }
          }

          router.push('/');
        } else {
          router.push('/auth/login?error=no-session');
        }
      } catch (err) {
        router.push('/auth/login?error=callback-failed');
      }
    }

    handleAuthCallback();
  }, [router]);

  return (
    <div className="min-h-screen bg-neural flex items-center justify-center">
      <div className="text-white font-mono animate-pulse">Authenticating...</div>
    </div>
  );
}
