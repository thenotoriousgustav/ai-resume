"use server"

import { redirect } from "next/navigation"

import { env } from "@/config/env"
import { tryCatch } from "@/types/result"
import { createClient } from "@/utils/supabase/server"

export async function googleOAuthWithTryCatch() {
  const [url, error] = await tryCatch(async () => {
    const supabase = await createClient()

    const {
      data: { url },
      error: oauthError,
    } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${env.NEXT_PUBLIC_BASE_URL}/auth/callback`,
      },
    })

    if (oauthError) {
      throw new Error(`OAuth failed: ${oauthError.message}`)
    }

    if (!url) {
      throw new Error("OAuth URL not generated")
    }

    return url
  })

  if (error) {
    console.error("OAuth error:", error.message)
    redirect(`/auth/error?message=${encodeURIComponent(error.message)}`)
  }

  redirect(url)
}
