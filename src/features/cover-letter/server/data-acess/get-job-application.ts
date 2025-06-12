"use server"

import { Database } from "@/types/supabase-types"
import { createClient } from "@/utils/supabase/server"

type DbJobApplication = Database["public"]["Tables"]["job_applications"]["Row"]
type DbResume = Database["public"]["Tables"]["resumes"]["Row"]

// Gabungkan tipe dari Supabase dengan tipe relasi resume
type JobApplication = DbJobApplication & {
  resumes: DbResume | null
}

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
