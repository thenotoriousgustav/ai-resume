"use server"

import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

import { createClient } from "@/utils/supabase/server"

export default async function signOut() {
  const supabase = await createClient()
  const { error } = await supabase.auth.signOut()

  if (error) {
    console.error("Sign out error:", error.message)
    redirect("/error") // atau redirect ke halaman error, dsb
  }

  revalidatePath("/", "layout")
  redirect("/auth")
}
