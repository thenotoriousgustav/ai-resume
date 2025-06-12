"use server"

import { getCurrentUser } from "@/server/actions/get-current-user"
import { DbResume } from "@/types/database"
import { createClient } from "@/utils/supabase/server"

export default async function getResumes(): Promise<DbResume[]> {
  const supabase = await createClient()
  try {
    const user = await getCurrentUser()

    const { data, error } = await supabase
      .from("resumes")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false })
      .limit(100)

    if (error) {
      console.error("Error fetching resumes:", error)
      throw new Error(`Failed to fetch resumes: ${error.message}`)
    }

    return data
  } catch (error) {
    console.error("Error fetching resumes:", error)
    throw new Error("An unexpected error occurred while fetching resumes")
  }
}
