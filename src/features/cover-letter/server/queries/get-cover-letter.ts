"use server"

import { redirect } from "next/navigation"

import { getCurrentUser } from "@/server/queries/get-current-user"
import { DbCoverLetter } from "@/types/database"
import { ResultAsync, tryCatch } from "@/types/result"
import { createClient } from "@/utils/supabase/server"

export default async function getCoverLetter(
  jobApplicationId: string
): ResultAsync<DbCoverLetter | null, Error> {
  return tryCatch(async () => {
    const supabase = await createClient()

    const [user, _] = await getCurrentUser()

    if (!user) {
      redirect("/auth")
    }

    const { data, error } = await supabase
      .from("cover_letters")
      .select("*")
      .eq("job_application_id", jobApplicationId)
      .maybeSingle()

    if (error) {
      throw new Error(`Failed to get cover letter: ${error.message}`)
    }

    return data
  })
}
