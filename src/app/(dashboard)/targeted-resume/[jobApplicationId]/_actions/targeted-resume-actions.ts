"use server"

import { ActionResponse } from "@/types/action-response"
import { DbTargetedResumeAnalysis } from "@/types/database"
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
): Promise<ActionResponse & { data?: DbTargetedResumeAnalysis }> {
  try {
    const supabase = await createClient()

    const { jobApplicationId, resumeId, analysisData } = input

    // Check if analysis already exists
    const { data: existingAnalysis } = await supabase
      .from("targeted_resume_analysis")
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

    let result: { data: DbTargetedResumeAnalysis[] | null; error: Error | null }

    if (existingAnalysis) {
      // Update existing analysis
      result = await supabase
        .from("targeted_resume_analysis")
        .update(analysisPayload)
        .eq("id", existingAnalysis.id)
        .select()
    } else {
      // Create new analysis
      result = await supabase
        .from("targeted_resume_analysis")
        .insert([
          {
            ...analysisPayload,
            created_at: new Date().toISOString(),
          },
        ])
        .select()
    }

    if (result.error) {
      console.error("Error saving analysis:", result.error)
      return {
        status: "error",
        message: "Failed to save analysis",
        error: result.error.message,
      }
    }

    return {
      status: "success",
      message: "Analysis saved successfully",
      data: result.data?.[0] || undefined,
    }
  } catch (error) {
    console.error("Unexpected error saving analysis:", error)
    return {
      status: "error",
      message: "An unexpected error occurred",
      error: error instanceof Error ? error.message : "Unknown error",
    }
  }
}

export async function getLatestResumeAnalysis(
  jobApplicationId: string
): Promise<DbTargetedResumeAnalysis | null> {
  try {
    const supabase = await createClient()

    const { data, error } = await supabase
      .from("targeted_resume_analysis")
      .select("*")
      .eq("job_application_id", jobApplicationId)
      .order("created_at", { ascending: false })
      .limit(1)
      .single()

    if (error) {
      if (error.code === "PGRST116") {
        // No data found
        return null
      }
      console.error("Error fetching latest analysis:", error)
      throw new Error(`Failed to fetch analysis: ${error.message}`)
    }

    return data
  } catch (error) {
    console.error("Error fetching latest analysis:", error)
    return null
  }
}
