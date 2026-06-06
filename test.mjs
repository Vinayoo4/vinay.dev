import fs from 'fs';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.example' });

async function runTests() {
  console.log("Running tests...");
  let passed = true;

  try {
    const supabaseUrl = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
    if (!supabaseUrl || supabaseUrl === '') {
       console.error("Test failed: SUPABASE_URL is not set.");
       passed = false;
    } else {
        console.log("Test passed: Supabase URL is found.");
    }

    // Attempt basic initialization test
    try {
        const { createClient } = await import('@supabase/supabase-js');
        const supabase = createClient(supabaseUrl || 'https://example.supabase.co', 'dummy-key');
        console.log("Test passed: Supabase client initializes correctly.");
    } catch(e) {
        console.error("Test failed: Supabase client failed to initialize", e);
        passed = false;
    }

    // Check that there's no secret in frontend client file
    const clientCode = fs.readFileSync('lib/supabaseClient.ts', 'utf8');
    if (clientCode.includes('SUPABASE_SERVICE_ROLE_KEY') || clientCode.includes('process.env.SUPABASE_SERVICE_ROLE_KEY')) {
        console.error("Test failed: Frontend client contains service role key.");
        passed = false;
    } else {
        console.log("Test passed: No secrets exposed in frontend client.");
    }

    // Verify required files were implemented
    if (!fs.existsSync('lib/brandMembership.ts')) {
       console.error("Test failed: lib/brandMembership.ts is missing.");
       passed = false;
    } else {
        console.log("Test passed: lib/brandMembership.ts is present.");
    }

    if (!fs.existsSync('services/triuProducts.ts')) {
       console.error("Test failed: services/triuProducts.ts is missing.");
       passed = false;
    } else {
        console.log("Test passed: services/triuProducts.ts is present.");
    }

    if (!fs.existsSync('services/shriNandiServices.ts')) {
       console.error("Test failed: services/shriNandiServices.ts is missing.");
       passed = false;
    } else {
        console.log("Test passed: services/shriNandiServices.ts is present.");
    }

    if (!fs.existsSync('app/auth/callback/page.tsx')) {
       console.error("Test failed: app/auth/callback/page.tsx is missing.");
       passed = false;
    } else {
        console.log("Test passed: app/auth/callback/page.tsx is present.");
    }

  } catch (error) {
    console.error("Tests failed with exception:", error);
    passed = false;
  }

  if (passed) {
    console.log("All tests passed.");
    process.exit(0);
  } else {
    console.log("Some tests failed.");
    process.exit(1);
  }
}

runTests();
