"use server"

import { DbResumeAnalysis } from "@/types/database"
import { createClient } from "@/utils/supabase/server"

export async function getResumeAnalysis(
  resumeId: string
): Promise<DbResumeAnalysis | null> {
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
    console.error("Error fetching resume analysis:", error)
    throw new Error("Failed to fetch resume analysis")
  }

  return data as DbResumeAnalysis
}

export async function getAllResumeAnalyses(
  resumeId: string
): Promise<DbResumeAnalysis[]> {
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
    console.error("Error fetching resume analyses:", error)
    throw new Error("Failed to fetch resume analyses")
  }

  return data as DbResumeAnalysis[]
}
