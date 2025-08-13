import { createBrowserClient } from "@supabase/ssr"

import { env } from "@/config/env"
import { Database } from "@/types/supabase-types"

export function createClient() {
  return createBrowserClient<Database>(
    env.NEXT_PUBLIC_SUPABASE_URL,
    env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  )
}
