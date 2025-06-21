"use server"

import { cache } from "react"

import { tryCatch } from "@/types/result"
import { createClient } from "@/utils/supabase/server"

export const getCurrentUser = cache(async () => {
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

    return user
  })
})
