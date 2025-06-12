"use server"

import { JobApplication } from "@/types/database"
import { createClient } from "@/utils/supabase/server"

import { getCurrentUser } from "../actions/get-current-user"

export default async function getJobApplications(): Promise<JobApplication[]> {
  const supabase = await createClient()

  const user = await getCurrentUser()

  const { data, error } = await supabase
    .from("job_applications")
    .select(
      `
      *,
      resumes (
        *
      )
      `
    )
    .eq("user_id", user.id)
    .order("created_at", { ascending: false })

  if (error) {
    throw new Error(`Failed to retrieve job application: ${error.message}`)
  }

  return data
}
