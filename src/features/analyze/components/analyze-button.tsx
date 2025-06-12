"use client"

import React from "react"
import { toast } from "sonner"
import { z } from "zod"

import { Button } from "@/components/ui/button"

import { resumeAnalysisSchema } from "../schema/analysis-result-schema"

export default function AnalyzeButton({
  resumeText,
  resumeId,
  onAnalysisComplete,
  hasExistingAnalysis = false,
}: {
  resumeText: string | null
  resumeId: string
  onAnalysisComplete: (result: z.infer<typeof resumeAnalysisSchema>) => void
  hasExistingAnalysis?: boolean
}) {
  const [isLoading, setIsLoading] = React.useState(false)
  const [error, setError] = React.useState<string | null>(null)

  const handleAnalyze = async () => {
    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          parsedResume: resumeText,
          resumeId: resumeId,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        // Check if we still got analysis data despite the error
        if (data.analysisResult) {
          onAnalysisComplete(data.analysisResult)
          const action = hasExistingAnalysis ? "regenerated" : "completed"
          toast.warning(
            `Analysis ${action} but not saved to database. ` +
              (data.details || "Please try again.")
          )
          return
        }
        throw new Error(data.error || `HTTP error! status: ${response.status}`)
      }

      if (data.error) {
        throw new Error(data.error)
      }

      onAnalysisComplete(data)

      if (hasExistingAnalysis) {
        toast.success("Resume analysis regenerated and updated successfully!")
      } else {
        toast.success("Resume analysis complete and saved!")
      }
    } catch (error) {
      console.error("Analysis failed:", error)
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Failed to analyze resume. Please try again."
      setError(errorMessage)
      toast.error(errorMessage)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <React.Fragment>
      <div>
        <div className="flex flex-col items-center space-y-4">
          <Button
            onClick={handleAnalyze}
            disabled={isLoading || !resumeText}
            className="w-full cursor-pointer"
            size="lg"
          >
            {isLoading ? (
              <React.Fragment>
                {hasExistingAnalysis ? "Re-generating..." : "Analyzing..."}
              </React.Fragment>
            ) : hasExistingAnalysis ? (
              "Re-generate Analysis"
            ) : (
              "Analyze Resume"
            )}
          </Button>

          {error && (
            <div className="w-full rounded-md bg-red-50 p-3 text-sm text-red-600">
              {error}
            </div>
          )}

          {!isLoading && !error && (
            <p className="text-center text-sm text-gray-500">
              {hasExistingAnalysis
                ? "Click to re-generate your resume analysis with fresh insights"
                : "Click to analyze your resume and get detailed feedback"}
            </p>
          )}
        </div>
      </div>
    </React.Fragment>
  )
}
