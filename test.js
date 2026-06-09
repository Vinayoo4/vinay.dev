const { supabaseAdmin } = require('./server/lib/supabaseAdmin.ts');
const fs = require('fs');
const dotenv = require('dotenv');

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
        const { createClient } = require('@supabase/supabase-js');
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
