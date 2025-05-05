"use server"

import { headers } from "next/headers"
import { redirect } from "next/navigation"

import { createClient } from "@/utils/supabase/server"

export default async function googleOAuth() {
  const supabase = await createClient()
  const headersList = await headers()
  const host = headersList.get("x-forwarded-host") || headersList.get("host")
  const protocol = host?.includes("localhost") ? "http" : "https"
  const baseUrl = `${protocol}://${host}`

  const {
    data: { url },
    error,
  } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: `${baseUrl}/api/auth/callback`,
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
