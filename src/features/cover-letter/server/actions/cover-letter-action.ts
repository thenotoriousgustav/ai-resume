"use server"

import { DbCoverLetter } from "@/types/database"
import { createClient } from "@/utils/supabase/server"

interface SaveCoverLetterInput {
  jobApplicationId: string
  content: string
}

export async function saveCoverLetter({
  jobApplicationId,
  content,
}: SaveCoverLetterInput): Promise<DbCoverLetter> {
  const supabase = await createClient()

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
}

export async function getCoverLetter(
  jobApplicationId: string
): Promise<DbCoverLetter | null> {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from("cover_letters")
    .select("*")
    .eq("job_application_id", jobApplicationId)
    .single()

  if (error) {
    if (error.code === "PGRST116") {
      // No rows returned
      return null
    }
    throw new Error(`Failed to get cover letter: ${error.message}`)
  }

  return data
}
