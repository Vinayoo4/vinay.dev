import { createClient } from '@supabase/supabase-js';

// The server-side admin client with service role key, DO NOT leak to frontend.
export const supabaseAdmin = createClient(
  process.env.SUPABASE_URL || '',
  process.env.SUPABASE_SERVICE_ROLE_KEY || '',
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  }
);
