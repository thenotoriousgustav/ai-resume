"use client"

import React, { useEffect, useState } from "react"
import { z } from "zod"

import { DbResume, DbResumeAnalysis } from "@/types/database"

import { resumeAnalysisSchema } from "../schema/analysis-result-schema"

import AnalyzeButton from "./analyze-button"
import PreviousAnalysisCard from "./previous-analysis-card"
import ResumeAnalysisResult from "./resume-analysis-result"
import ResumeViewer from "./resume-viewer"

export default function AnalyzeClient({
  resumeData,
  existingAnalysis: initialExistingAnalysis = null,
}: {
  resumeData: DbResume
  existingAnalysis?: DbResumeAnalysis | null
}) {
  const [analysisResult, setAnalysisResult] = useState<z.infer<
    typeof resumeAnalysisSchema
  > | null>(null)
  const [existingAnalysis, setExistingAnalysis] =
    useState<DbResumeAnalysis | null>(initialExistingAnalysis)
  const [isLoadingAnalysis, setIsLoadingAnalysis] = useState(false)

  // Set existing analysis result to display when component mounts
  useEffect(() => {
    if (initialExistingAnalysis) {
      setExistingAnalysis(initialExistingAnalysis)

      // If there's existing analysis, also show it as the current result
      if (initialExistingAnalysis.raw_analysis_data) {
        try {
          const parsedAnalysis = resumeAnalysisSchema.parse(
            initialExistingAnalysis.raw_analysis_data
          )
          setAnalysisResult(parsedAnalysis)
        } catch (error) {
          console.error("Error parsing existing analysis:", error)
        }
      }
    }
    setIsLoadingAnalysis(false)
  }, [initialExistingAnalysis])

  const handleAnalysisComplete = (
    result: z.infer<typeof resumeAnalysisSchema>
  ) => {
    setAnalysisResult(result)
    // Update existing analysis state with new timestamp
    setExistingAnalysis((prev) => ({
      ...prev,
      id: prev?.id || "",
      resume_id: resumeData.id,
      user_id: prev?.user_id || "",
      language: result.language || "English",
      overall_score: result.overall_score,
      overall_impression: result.overall_impression,
      sections: result.sections,
      keywords: result.keywords,
      career_recommendation: result.career_recommendation,
      raw_analysis_data: result,
      analysis_date: new Date().toISOString(),
      created_at: prev?.created_at || new Date().toISOString(),
      updated_at: new Date().toISOString(),
    }))
  }

  return (
    <div className="grid h-screen grid-cols-1 gap-6 lg:grid-cols-3">
      <div className="space-y-6 overflow-y-auto p-4 lg:col-span-1">
        <div className="rounded-lg border bg-white p-4 shadow-sm">
          {isLoadingAnalysis ? (
            <div className="animate-pulse space-y-4">
              <div className="h-4 w-3/4 rounded bg-gray-200"></div>
              <div className="h-10 rounded bg-gray-200"></div>
              <div className="h-3 w-1/2 rounded bg-gray-200"></div>
            </div>
          ) : (
            <>
              {existingAnalysis && (
                <div className="mb-4">
                  <PreviousAnalysisCard analysis={existingAnalysis} />
                </div>
              )}
              <AnalyzeButton
                resumeText={resumeData.extracted_text}
                resumeId={resumeData.id}
                onAnalysisComplete={handleAnalysisComplete}
                hasExistingAnalysis={!!existingAnalysis}
              />
            </>
          )}
        </div>

        <div>
          {analysisResult && <ResumeAnalysisResult analysis={analysisResult} />}
        </div>
      </div>

      <div className="h-screen overflow-hidden lg:col-span-2">
        <ResumeViewer resume={resumeData} analysisResult={analysisResult} />
      </div>
    </div>
  )
}
