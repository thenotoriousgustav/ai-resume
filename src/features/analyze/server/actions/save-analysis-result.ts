"use server"

import { z } from "zod"

import { resumeAnalysisSchema } from "@/features/analyze/schema/analysis-result-schema"
import { getCurrentUser } from "@/server/actions/get-current-user"
import { type ResultAsync, tryCatch } from "@/types/result"
import { createClient } from "@/utils/supabase/server"

const saveGeneralAnalysisSchema = z.object({
  resumeId: z.string().uuid(),
  analysisResult: resumeAnalysisSchema,
})

export async function saveAnalysisResult(
  data: z.infer<typeof saveGeneralAnalysisSchema>
): ResultAsync<void, Error> {
  return tryCatch(async () => {
    const supabase = await createClient()
    const [user, userError] = await getCurrentUser()

    if (userError) {
      throw userError
    }

    // Validate input data
    const parseResult = saveGeneralAnalysisSchema.safeParse(data)
    if (!parseResult.success) {
      throw new Error(
        `Invalid data format: ${parseResult.error.issues[0].message}`
      )
    }

    const { resumeId, analysisResult } = parseResult.data

    // Validate analysis result schema
    const analysisParseResult = resumeAnalysisSchema.safeParse(analysisResult)
    if (!analysisParseResult.success) {
      throw new Error(
        `Invalid analysis result format: ${analysisParseResult.error.issues[0].message}`
      )
    }

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

    if (existingAnalysis) {
      // Update existing analysis
      const { error } = await supabase
        .from("resume_analysis")
        .update(analysisData)
        .eq("id", existingAnalysis.id)

      if (error) {
        throw new Error(`Failed to update analysis result: ${error.message}`)
      }
    } else {
      // Insert new analysis
      const { error } = await supabase
        .from("resume_analysis")
        .insert(analysisData)

      if (error) {
        throw new Error(`Failed to save analysis result: ${error.message}`)
      }
    }
  })
}
