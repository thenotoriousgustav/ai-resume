"use server"

import { DbTargetedResumeAnalysis } from "@/types/database"
import { ResultAsync, tryCatch } from "@/types/result"
import { createClient } from "@/utils/supabase/server"

export default async function getLatestResumeAnalysis(
  jobApplicationId: string
): ResultAsync<DbTargetedResumeAnalysis | null, Error> {
  return tryCatch(async () => {
    const supabase = await createClient()

    const { data, error } = await supabase
      .from("targeted_resume_analysis")
      .select("*")
      .eq("job_application_id", jobApplicationId)
      .order("created_at", { ascending: false })
      .limit(1)
      .maybeSingle()

    if (error) {
      throw new Error(`Failed to fetch analysis: ${error.message}`)
    }

    return data
  })
}
