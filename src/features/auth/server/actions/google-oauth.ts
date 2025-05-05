"use server"

import { redirect } from "next/navigation"

import { env } from "@/config/env"
import { createClient } from "@/utils/supabase/server"

export default async function googleOAuth() {
  const supabase = await createClient()

  const {
    data: { url },
    error,
  } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: `${env.NEXT_PUBLIC_BASE_URL}/auth/callback`,
    },
  })

  if (error) {
    console.error("OAuth error:", error.message)
    throw new Error("Failed to initiate OAuth.")
  }

  if (url) {
    redirect(url)
  }
}
