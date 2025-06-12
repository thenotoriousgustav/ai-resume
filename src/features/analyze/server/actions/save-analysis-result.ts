"use server"

import { z } from "zod"

import { resumeAnalysisSchema } from "@/features/analyze/schema/analysis-result-schema"
import { createClient } from "@/utils/supabase/server"

const saveGeneralAnalysisSchema = z.object({
  resumeId: z.string().uuid(),
  analysisResult: resumeAnalysisSchema,
})

export async function saveAnalysisResult(
  data: z.infer<typeof saveGeneralAnalysisSchema>
) {
  const supabase = await createClient()

  // Get current user
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser()

  if (userError || !user) {
    console.error("User authentication error:", userError)
    throw new Error("User not authenticated")
  }

  // Validate input data
  const parseResult = saveGeneralAnalysisSchema.safeParse(data)
  if (!parseResult.success) {
    console.error("Schema validation failed:", parseResult.error)
    throw new Error(
      `Invalid data format: ${parseResult.error.issues[0].message}`
    )
  }

  const { resumeId, analysisResult } = parseResult.data

  // Validate analysis result schema
  const analysisParseResult = resumeAnalysisSchema.safeParse(analysisResult)
  if (!analysisParseResult.success) {
    console.error(
      "Analysis result schema validation failed:",
      analysisParseResult.error
    )
    throw new Error(
      `Invalid analysis result format: ${analysisParseResult.error.issues[0].message}`
    )
  }

  try {
    // Check if analysis already exists for this resume
    const { data: existingAnalysis } = await supabase
      .from("resume_analysis")
      .select("id")
      .eq("resume_id", resumeId)
      .eq("user_id", user.id)
      .single()

    const analysisData = {
      resume_id: resumeId,
      user_id: user.id,
      language: analysisResult.language || "English",
      overall_score: analysisResult.overall_score,
      overall_impression: analysisResult.overall_impression,
      sections: analysisResult.sections,
      keywords: analysisResult.keywords,
      career_recommendation: analysisResult.career_recommendation,
      raw_analysis_data: analysisResult,
      analysis_date: new Date().toISOString(),
    }

    console.log("Attempting to save analysis data:", {
      resumeId,
      userId: user.id,
      hasExisting: !!existingAnalysis,
    })

    if (existingAnalysis) {
      // Update existing analysis
      const { error } = await supabase
        .from("resume_analysis")
        .update(analysisData)
        .eq("id", existingAnalysis.id)

      if (error) {
        console.error("Error updating analysis:", error)
        throw new Error(`Failed to update analysis result: ${error.message}`)
      }

      console.log("Analysis updated successfully for resume:", resumeId)
    } else {
      // Insert new analysis
      const { error } = await supabase
        .from("resume_analysis")
        .insert(analysisData)

      if (error) {
        console.error("Error saving analysis:", error)
        throw new Error(`Failed to save analysis result: ${error.message}`)
      }

      console.log("New analysis saved successfully for resume:", resumeId)
    }

    return { success: true, message: "Analysis saved successfully" }
  } catch (error) {
    console.error("Error in saveAnalysisResult:", error)
    throw error
  }
}
