"use server"

import { getCurrentUser } from "@/server/actions/get-current-user"
import { DBResumeBuilder } from "@/types/database"
import { createClient } from "@/utils/supabase/server"

export default async function getResumesBuilder(): Promise<DBResumeBuilder[]> {
  const supabase = await createClient()
  const [user, userError] = await getCurrentUser()

  if (userError) {
    throw userError
  }

  const { data, error } = await supabase
    .from("resumes_builder")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false })

  if (error) {
    console.error("Error fetching resumes:", error)
    throw new Error(`Failed to fetch resumes: ${error.message}`)
  }
  return data || []
}
