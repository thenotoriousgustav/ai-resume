"use server"

import { getCurrentUser } from "@/server/actions/get-current-user"
import { DBResumeBuilder } from "@/types/database"
import { type ResultAsync, tryCatch } from "@/types/result"
import { createClient } from "@/utils/supabase/server"

export async function createResumeBuilder(
  id: string
): Promise<ResultAsync<DBResumeBuilder, Error>> {
  return tryCatch(async () => {
    const supabase = await createClient()
    const [user, userError] = await getCurrentUser()

    if (userError) {
      throw userError
    }

    const { data, error } = await supabase
      .from("resumes_builder")
      .insert({
        id,
        user_id: user.id,
        title: "Untitled Resume",
        template: "modern",
        personal_info: {},
        objective: "",
        experiences: [],
        education: [],
        skills: [],
        certifications: [],
      })
      .select()
      .single()

    if (error) {
      throw new Error(`Failed to create resume builder: ${error.message}`)
    }

    return data
  })
}
