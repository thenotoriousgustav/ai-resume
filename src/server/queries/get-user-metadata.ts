"use server"

import { GoogleUserMetadata } from "@/types/google-user-metadata"
import { type ResultAsync, tryCatch } from "@/types/result"
import { createClient } from "@/utils/supabase/server"

export async function getUserMetadata(): ResultAsync<
  GoogleUserMetadata,
  Error
> {
  return tryCatch(async () => {
    const supabase = await createClient()

    const {
      data: { user },
      error,
    } = await supabase.auth.getUser()

    if (error) {
      throw new Error(`Failed to fetch user: ${error.message}`)
    }

    if (!user) {
      throw new Error("User not authenticated")
    }

    return user.user_metadata
  })
}
