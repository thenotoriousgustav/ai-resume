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
}: {
  resumeData: DbResume
}) {
  const [analysisResult, setAnalysisResult] = useState<z.infer<
    typeof resumeAnalysisSchema
  > | null>(null)
  const [existingAnalysis, setExistingAnalysis] =
    useState<DbResumeAnalysis | null>(null)
  const [isLoadingAnalysis, setIsLoadingAnalysis] = useState(true)

  // Load existing analysis on component mount
  useEffect(() => {
    const loadExistingAnalysis = async () => {
      try {
        setIsLoadingAnalysis(true)
        const response = await fetch(`/api/resume-analysis/${resumeData.id}`)

        if (response.ok) {
          const analysis = await response.json()
          if (analysis) {
            setExistingAnalysis(analysis)
            // Set the analysis result from raw_analysis_data
            if (analysis.raw_analysis_data) {
              setAnalysisResult(
                analysis.raw_analysis_data as z.infer<
                  typeof resumeAnalysisSchema
                >
              )
            }
          }
        } else if (response.status === 404) {
          // No existing analysis found - this is normal for first-time analysis
          console.log("No existing analysis found for this resume")
        } else {
          // Log other errors
          const errorText = await response.text()
          console.error(
            `Error loading existing analysis (${response.status}):`,
            errorText
          )
        }
      } catch (error) {
        console.error("Error loading existing analysis:", error)
        // Don't show error toast for initial load failures as analysis might not exist
      } finally {
        setIsLoadingAnalysis(false)
      }
    }

    loadExistingAnalysis()
  }, [resumeData.id])

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
