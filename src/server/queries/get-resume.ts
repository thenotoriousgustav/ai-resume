import { DbResume } from "@/types/database"
import { ResultAsync, tryCatch } from "@/types/result"
import { createClient } from "@/utils/supabase/server"

export default async function getResume(
  id: string
): ResultAsync<DbResume, Error> {
  return tryCatch(async () => {
    const supabase = await createClient()

    const { data, error } = await supabase
      .from("resumes")
      .select("*")
      .eq("id", id)
      .single()

    if (error) {
      throw new Error(`Failed to fetch resume: ${error.message}`)
    }

    return data
  })
}
