"use server"

import { DbResumeAnalysis } from "@/types/database"
import { ResultAsync, tryCatch } from "@/types/result"
import { createClient } from "@/utils/supabase/server"

export async function getResumeAnalysis(
  resumeId: string
): ResultAsync<DbResumeAnalysis | null, Error> {
  return tryCatch(async () => {
    const supabase = await createClient()

    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser()

    if (userError || !user) {
      throw new Error("User not authenticated")
    }

    const { data, error } = await supabase
      .from("resume_analysis")
      .select("*")
      .eq("resume_id", resumeId)
      .eq("user_id", user.id)
      .order("analysis_date", { ascending: false })
      .limit(1)
      .single()

    if (error) {
      if (error.code === "PGRST116") {
        // No data found
        return null
      }
      throw new Error(`Failed to fetch resume analysis: ${error.message}`)
    }

    return data as DbResumeAnalysis
  })
}

export async function getAllResumeAnalyses(
  resumeId: string
): ResultAsync<DbResumeAnalysis[], Error> {
  return tryCatch(async () => {
    const supabase = await createClient()

    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser()

    if (userError || !user) {
      throw new Error("User not authenticated")
    }

    const { data, error } = await supabase
      .from("resume_analysis")
      .select("*")
      .eq("resume_id", resumeId)
      .eq("user_id", user.id)
      .order("analysis_date", { ascending: false })

    if (error) {
      throw new Error(`Failed to fetch resume analyses: ${error.message}`)
    }

    return data as DbResumeAnalysis[]
  })
}
