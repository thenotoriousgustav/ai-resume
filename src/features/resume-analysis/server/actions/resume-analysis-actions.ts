"use server"

import { DbResumeAnalysis } from "@/types/database"
import { ResultAsync, tryCatch } from "@/types/result"
import { createClient } from "@/utils/supabase/server"

interface SaveAnalysisInput {
  jobApplicationId: string
  resumeId: string
  analysisData: {
    keywords?: {
      missing?: string[]
      present?: string[]
      suggestions?: string[]
    }
    suggestions?: Array<{
      section: string
      improvement: string
      priority: "high" | "medium" | "low"
    }>
    jobTitleMissing?: Array<{
      title: string
      relevance: string
      where: string
    }>
    matchScore?: number
  }
}

export async function saveResumeAnalysis(
  input: SaveAnalysisInput
): ResultAsync<DbResumeAnalysis, Error> {
  return tryCatch(async () => {
    const supabase = await createClient()

    const { jobApplicationId, resumeId, analysisData } = input

    // Check if analysis already exists
    const { data: existingAnalysis } = await supabase
      .from("resume_analysis")
      .select("id")
      .eq("job_application_id", jobApplicationId)
      .eq("resume_id", resumeId)
      .single()

    const analysisPayload = {
      job_application_id: jobApplicationId,
      resume_id: resumeId,
      keywords_missing: analysisData.keywords?.missing || [],
      keywords_present: analysisData.keywords?.present || [],
      keywords_suggestions: analysisData.keywords?.suggestions || [],
      suggestions: analysisData.suggestions || [],
      job_title_missing: analysisData.jobTitleMissing || [],
      match_score: analysisData.matchScore || 0,
      updated_at: new Date().toISOString(),
    }

    if (existingAnalysis) {
      // Update existing analysis
      const { data, error } = await supabase
        .from("resume_analysis")
        .update(analysisPayload)
        .eq("id", existingAnalysis.id)
        .select()
        .single()

      if (error) {
        throw new Error(`Failed to update analysis: ${error.message}`)
      }

      return data
    } else {
      // Create new analysis
      const { data, error } = await supabase
        .from("resume_analysis")
        .insert([
          {
            ...analysisPayload,
            created_at: new Date().toISOString(),
          },
        ])
        .select()
        .single()

      if (error) {
        throw new Error(`Failed to save analysis: ${error.message}`)
      }

      return data
    }
  })
}
