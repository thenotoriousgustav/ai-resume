"use server"

import { JobApplication } from "@/types/database"
import { createClient } from "@/utils/supabase/server"

export default async function getJobApplication(
  jobApplicationId: string
): Promise<JobApplication> {
  const supabase = await createClient()

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
    .eq("id", jobApplicationId)
    .single()

  if (error) {
    throw new Error(`Failed to retrieve job application: ${error.message}`)
  }

  return data as JobApplication
}
