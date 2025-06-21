"use server"

import { getCurrentUser } from "@/server/actions/get-current-user"
import { type ResultAsync, tryCatch } from "@/types/result"
import { createClient } from "@/utils/supabase/server"

export async function createResumeFromScratch(
  title: string
): Promise<ResultAsync<string, Error>> {
  return await tryCatch(async () => {
    const supabase = await createClient()
    const [user, userError] = await getCurrentUser()

    if (userError) {
      throw userError
    }
    const resumeId = crypto.randomUUID()

    const { data, error } = await supabase
      .from("resumes_builder")
      .insert({
        id: resumeId,
        user_id: user.id,
        title: title,
        template: "modern",
        personal_info: {
          fullName: "",
          email: "",
          phone: "",
          location: "",
          linkedin: "",
          website: "",
        },
        objective: "",
        experiences: [],
        education: [],
        skills: [],
        certifications: [],
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      })
      .select()
      .single()

    if (error) {
      throw new Error(`Failed to create resume: ${error.message}`)
    }

    return data.id
  })
}
