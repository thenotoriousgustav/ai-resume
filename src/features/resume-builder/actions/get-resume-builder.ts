"use server"

import { getCurrentUser } from "@/server/actions/get-current-user"
import { DBResumeBuilder } from "@/types/database"
import { createClient } from "@/utils/supabase/server"

export async function getResumeBuilder(id: string): Promise<DBResumeBuilder> {
  const supabase = await createClient()
  const user = await getCurrentUser()

  const { data, error } = await supabase
    .from("resumes_builder")
    .select("*")
    .eq("id", id)
    .eq("user_id", user.id)
    .single()

  if (error || !data) {
    console.error("Error fetching resume:", error)
    throw new Error("Resume not found")
  }

  return data
}
