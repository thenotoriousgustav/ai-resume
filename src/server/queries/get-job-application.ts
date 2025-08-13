"use server"

import { redirect } from "next/navigation"
import { cache } from "react"

import { JobApplication } from "@/types/database"
import { type ResultAsync, tryCatch } from "@/types/result"
import { createClient } from "@/utils/supabase/server"

import { getCurrentUser } from "./get-current-user"

const getJobApplication = cache(async function getJobApplication(
  jobApplicationId: string
): ResultAsync<JobApplication, Error> {
  return tryCatch(async () => {
    const supabase = await createClient()

    const [user, _] = await getCurrentUser()

    if (!user) {
      redirect("/auth")
    }

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

    if (!data) {
      throw new Error("Job application not found")
    }

    return data
  })
})

export default getJobApplication
