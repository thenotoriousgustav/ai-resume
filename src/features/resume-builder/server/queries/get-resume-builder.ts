"use server"

import { getCurrentUser } from "@/server/actions/get-current-user"
import { DBResumeBuilder } from "@/types/database"
import { ResultAsync, tryCatch } from "@/types/result"
import { createClient } from "@/utils/supabase/server"

export async function getResumeBuilder(
  id: string
): Promise<ResultAsync<DBResumeBuilder | null, Error>> {
  return tryCatch(async () => {
    const supabase = await createClient()
    const [user, userError] = await getCurrentUser()

    if (userError) {
      throw userError
    }

    const { data, error } = await supabase
      .from("resumes_builder")
      .select("*")
      .eq("id", id)
      .eq("user_id", user.id)
      .single()

    if (error) {
      throw new Error(`Failed to fetch resume builder: ${error.message}`)
    }

    return data
  })
}
