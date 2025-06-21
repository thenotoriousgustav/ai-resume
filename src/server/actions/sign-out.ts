"use server"

import { redirect } from "next/navigation"

import { tryCatch } from "@/types/result"
import { createClient } from "@/utils/supabase/server"

export default async function signOut() {
  const [_, error] = await tryCatch(async () => {
    const supabase = await createClient()
    const { error } = await supabase.auth.signOut()
    if (error) throw new Error(`Failed to sign out: ${error.message}`)
  })

  if (error) {
    console.error(error)
    // Optional: redirect to error page or show toast via cookie
    return
  }

  redirect("/login")
}
