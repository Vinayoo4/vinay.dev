"use client";
import { useEffect } from 'react';
import { supabase } from '../../../lib/supabaseClient';
import { useRouter } from 'next/navigation';

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

      if (!code) {
        router.push('/auth/login?error=no-code');
        return;
      }

      const { data, error: exchangeError } = await supabase.auth.exchangeCodeForSession(code);

      if (exchangeError || !data.session) {
        router.push('/auth/login?error=callback-failed');
        return;
      }

      const { data: sessionData } = await supabase.auth.getSession();
      const user = sessionData.session?.user;

      if (user) {
        await supabase.from('profiles').upsert({
          id: user.id,
          email: user.email ?? null,
          full_name: user.user_metadata?.full_name ?? user.user_metadata?.name ?? null,
          avatar_url: user.user_metadata?.avatar_url ?? null,
          role: 'user',
          status: 'active'
        });
      }

      router.push('/');
    }

    handleAuthCallback();
  }, [router]);

  return (
    <div className="min-h-screen bg-neural flex items-center justify-center">
      <div className="text-white font-mono animate-pulse">Authenticating...</div>
    </div>
  );
}
