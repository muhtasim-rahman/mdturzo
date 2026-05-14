// ============================================================
// SUPABASE CONFIG — PostgreSQL Database Client
// Anon key = public key, RLS দিয়ে data protect হয়
// ⚠️  Service role key কখনো এখানে রাখবে না
// ============================================================

import { createClient } from '@supabase/supabase-js'

const supabaseUrl  = import.meta.env.VITE_SUPABASE_URL
const supabaseAnon = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnon) {
  console.error('[Supabase] Missing VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY in .env')
}

// ── Public Client (anon key) ───────────────────────────────
// Public reads, RLS-protected writes
export const supabase = createClient(supabaseUrl, supabaseAnon, {
  auth: {
    // আমরা Firebase Auth use করছি — Supabase Auth disable
    persistSession: false,
    autoRefreshToken: false,
    detectSessionInUrl: false,
  },
  global: {
    headers: {
      'X-Client-Info': 'mdturzo-portfolio/2.2.0',
    },
  },
  db: {
    schema: 'public',
  },
  realtime: {
    params: {
      eventsPerSecond: 10,
    },
  },
})

// ── Helper: Firebase UID পাঠিয়ে Supabase queries করা ──────
// RLS policies তে user_id comparison এর জন্য
// Sensitive writes Cloudflare Worker এ করা হয় (service role key দিয়ে)
export function getSupabaseWithUser(firebaseUID) {
  return createClient(supabaseUrl, supabaseAnon, {
    auth: { persistSession: false, autoRefreshToken: false },
    global: {
      headers: {
        'X-Firebase-UID': firebaseUID || '',
        'X-Client-Info': 'mdturzo-portfolio/2.2.0',
      },
    },
  })
}

export default supabase
