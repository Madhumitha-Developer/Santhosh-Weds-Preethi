import { createClient } from '@supabase/supabase-js'

const url = import.meta.env.VITE_SUPABASE_URL
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const isSupabaseConfigured = Boolean(url && anonKey)

export const supabase = isSupabaseConfigured ? createClient(url, anonKey) : null

if (!isSupabaseConfigured) {
  console.warn(
    '[wedding-invite] Supabase env vars missing — wishes will only be kept in this browser tab. ' +
      'Copy .env.example to .env and fill in your project URL + anon key.'
  )
}
