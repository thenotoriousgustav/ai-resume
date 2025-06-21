"use server"

import { JobApplication } from "@/types/database"
import { ResultAsync, tryCatch } from "@/types/result"
import { createClient } from "@/utils/supabase/server"

import { getCurrentUser } from "../actions/get-current-user"

export default async function getJobApplications(): ResultAsync<
  JobApplication[],
  Error
> {
  return tryCatch(async () => {
    const supabase = await createClient()

    const [user, userError] = await getCurrentUser()

    if (userError) {
      throw userError
    }

    const { data, error: dbError } = await supabase
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

    if (dbError) {
      throw new Error(`Failed to retrieve job application: ${dbError.message}`)
    }

    return data
  })
}
