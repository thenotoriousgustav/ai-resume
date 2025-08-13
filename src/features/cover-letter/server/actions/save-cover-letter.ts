"use server"

import { redirect } from "next/navigation"

import { getCurrentUser } from "@/server/queries/get-current-user"
import { DbCoverLetter } from "@/types/database"
import { type ResultAsync, tryCatch } from "@/types/result"
import { createClient } from "@/utils/supabase/server"

interface SaveCoverLetterInput {
  jobApplicationId: string
  content: string
}

export async function saveCoverLetter({
  jobApplicationId,
  content,
}: SaveCoverLetterInput): ResultAsync<DbCoverLetter, Error> {
  return tryCatch(async () => {
    const supabase = await createClient()

    const [user, _] = await getCurrentUser()

    if (!user) {
      redirect("/auth")
    }

    // Check if cover letter already exists
    const { data: existingCoverLetter } = await supabase
      .from("cover_letters")
      .select("id")
      .eq("job_application_id", jobApplicationId)
      .single()

    const coverLetterPayload = {
      job_application_id: jobApplicationId,
      content: content,
      generated_at: new Date().toISOString(),
    }

    if (existingCoverLetter) {
      // Update existing cover letter
      const { data, error } = await supabase
        .from("cover_letters")
        .update(coverLetterPayload)
        .eq("id", existingCoverLetter.id)
        .select()
        .single()

      if (error) {
        throw new Error(`Failed to update cover letter: ${error.message}`)
      }

      return data
    } else {
      // Create new cover letter
      const { data, error } = await supabase
        .from("cover_letters")
        .insert(coverLetterPayload)
        .select()
        .single()

      if (error) {
        throw new Error(`Failed to save cover letter: ${error.message}`)
      }

      return data
    }
  })
}
