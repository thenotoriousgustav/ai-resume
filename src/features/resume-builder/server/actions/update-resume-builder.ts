"use server"

import { getCurrentUser } from "@/server/actions/get-current-user"
import { DBResumeBuilder } from "@/types/database"
import { type ResultAsync, tryCatch } from "@/types/result"
import { createClient } from "@/utils/supabase/server"

export async function updateResumeBuilder(
  id: string,
  updates: Partial<DBResumeBuilder>
): Promise<ResultAsync<DBResumeBuilder, Error>> {
  return await tryCatch(async () => {
    const supabase = await createClient()
    const [user, userError] = await getCurrentUser()

    if (userError) {
      throw userError
    }

    const { data, error } = await supabase
      .from("resumes_builder")
      .update({
        ...updates,
        updated_at: new Date().toISOString(),
      })
      .eq("id", id)
      .eq("user_id", user.id)
      .select()
      .single()

    if (error) {
      throw new Error(`Failed to update resume builder: ${error.message}`)
    }

    return data
  })
}
