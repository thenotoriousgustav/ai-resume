"use server"

import { redirect } from "next/navigation"

import { createClient } from "@/utils/supabase/server"

export async function getCurrentUser() {
  const supabase = await createClient()

  try {
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser()

    if (!user) {
      redirect("/auth")
    }

    if (error) {
      console.error("Error fetching user:", error.message)
      throw new Error("Failed to fetch user")
    }
    return user
  } catch (error) {
    console.error("Error fetching user:", error)
    throw new Error("An unexpected error occurred while fetching the user")
  }
}
