"use server"

import { redirect } from "next/navigation"

import { tryCatch } from "@/types/result"
import { createClient } from "@/utils/supabase/server"

import { getCurrentUser } from "./get-current-user"

export default async function getJobApplications() {
  return tryCatch(async () => {
    const supabase = await createClient()

    const [user, _] = await getCurrentUser()

    if (!user) {
      redirect("/auth")
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
