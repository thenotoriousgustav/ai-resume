"use client"

import { experimental_useObject as useObject } from "@ai-sdk/react"
import { useMemo, useState } from "react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { DbResumeAnalysis, JobApplication } from "@/types/database"

import { tailorSchema } from "../schema/tailor-schema"
import { saveResumeAnalysis } from "../server/actions/resume-analysis-actions"

import ResumeAnalysisForm from "./resume-analysis-form"
import ResumeAnalysisResult from "./resume-analysis-result"
import ResumeAnalysisViewer from "./resume-analysis-viewer"

// Define proper types for the analysis object
type AnalysisObject = {
  keywords: {
    missing: string[]
    present: string[]
    suggestions: string[]
  }
  suggestions: Array<{
    section: string
    improvement: string
    priority: "high" | "medium" | "low"
  }>
  jobTitleMissing: Array<{
    title: string
    relevance: string
    where: string
  }>
  matchScore: number
}

interface ResumeAnalysisWrapperProps {
  jobApplicationData: JobApplication
  previousAnalysis?: DbResumeAnalysis | null
}

export default function ResumeAnalysisWrapper({
  jobApplicationData,
  previousAnalysis,
}: ResumeAnalysisWrapperProps) {
  const [savedAnalysis, setSavedAnalysis] = useState<DbResumeAnalysis | null>(
    previousAnalysis || null
  )
  const [isGenerating, setIsGenerating] = useState(false)
  const [showForm, setShowForm] = useState(!previousAnalysis) // Show form only if no previous analysis

  const { isLoading, stop, object, submit } = useObject({
    api: "/api/resume-analyze",
    schema: tailorSchema,
    onFinish: async (result) => {
      // Auto-save when generation is complete
      if (result.object && jobApplicationData.resumes) {
        setIsGenerating(false)
        try {
          const [saveResult, saveError] = await saveResumeAnalysis({
            jobApplicationId: jobApplicationData.id,
            resumeId: jobApplicationData.resumes.id,
            analysisData: result.object,
          })

          if (saveResult) {
            toast.success("Analysis saved successfully!")
            // Update the saved analysis state with the returned data
            setSavedAnalysis(saveResult)
            // Hide form after successful generation
            setShowForm(false)
          } else if (saveError) {
            toast.error(`Failed to save analysis: ${saveError.message}`)
          }
        } catch (error) {
          console.error("Error saving analysis:", error)
          toast.error("Failed to save analysis")
        }
      }
    },
  })

  const handleNewSubmit = (input: unknown) => {
    setIsGenerating(true)
    submit(input)
  }

  const handleRegenerate = () => {
    setShowForm(true)
  }

  // Helper to convert partial object to proper format
  const normalizeAnalysisObject = (obj: unknown): AnalysisObject | null => {
    if (!obj || typeof obj !== "object") return null

    // Type the object for property access - this is safe since we're checking all properties
    const typedObj = obj as Record<string, unknown>
    const keywords = typedObj.keywords as Record<string, unknown> | undefined

    return {
      keywords: {
        missing: Array.isArray(keywords?.missing)
          ? (keywords.missing as unknown[]).filter(
              (k: unknown): k is string => typeof k === "string"
            )
          : [],
        present: Array.isArray(keywords?.present)
          ? (keywords.present as unknown[]).filter(
              (k: unknown): k is string => typeof k === "string"
            )
          : [],
        suggestions: Array.isArray(keywords?.suggestions)
          ? (keywords.suggestions as unknown[]).filter(
              (k: unknown): k is string => typeof k === "string"
            )
          : [],
      },
      suggestions: Array.isArray(typedObj.suggestions)
        ? (typedObj.suggestions as AnalysisObject["suggestions"])
        : [],
      jobTitleMissing: Array.isArray(typedObj.jobTitleMissing)
        ? (typedObj.jobTitleMissing as AnalysisObject["jobTitleMissing"])
        : [],
      matchScore:
        typeof typedObj.matchScore === "number" ? typedObj.matchScore : 0,
    }
  }

  // Convert saved analysis to the format expected by components
  const displayObject = useMemo(() => {
    if (object) {
      return normalizeAnalysisObject(object)
    }

    if (savedAnalysis) {
      return {
        keywords: {
          missing: Array.isArray(savedAnalysis.keywords_missing)
            ? savedAnalysis.keywords_missing.filter(
                (k: unknown): k is string => typeof k === "string"
              )
            : [],
          present: Array.isArray(savedAnalysis.keywords_present)
            ? savedAnalysis.keywords_present.filter(
                (k: unknown): k is string => typeof k === "string"
              )
            : [],
          suggestions: Array.isArray(savedAnalysis.keywords_suggestions)
            ? savedAnalysis.keywords_suggestions.filter(
                (k: unknown): k is string => typeof k === "string"
              )
            : [],
        },
        suggestions:
          (savedAnalysis.suggestions as Array<{
            section: string
            improvement: string
            priority: "high" | "medium" | "low"
          }>) || [],
        jobTitleMissing:
          (savedAnalysis.job_title_missing as Array<{
            title: string
            relevance: string
            where: string
          }>) || [],
        matchScore: savedAnalysis.match_score || 0,
      }
    }

    return null
  }, [object, savedAnalysis])

  // Create viewer-specific object
  const viewerObject = useMemo(() => {
    if (displayObject?.keywords?.present) {
      return {
        keywords: {
          present: displayObject.keywords.present.filter(
            (k: string): k is string => typeof k === "string" && k.length > 0
          ),
        },
      }
    }
    return undefined
  }, [displayObject])

  const hasAnalysis = displayObject !== null
  const isCurrentGeneration = !!object
  const isFromSaved = !isCurrentGeneration && !!savedAnalysis

  // Determine what to show
  const shouldShowForm = !hasAnalysis || showForm
  const shouldShowResults = hasAnalysis && !showForm

  return (
    <div className="flex min-h-screen w-full">
      <div className="flex-1 overflow-y-auto p-4">
        {/* Show form only when there's no analysis OR user explicitly wants to regenerate */}
        {shouldShowForm && (
          <ResumeAnalysisForm
            jobApplication={jobApplicationData}
            submit={handleNewSubmit}
            onCancel={hasAnalysis ? () => setShowForm(false) : undefined}
          />
        )}

        {/* Show results when analysis exists AND form is not being shown */}
        {shouldShowResults && (
          <div className="rounded-lg border bg-white p-4 shadow-sm">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold">Resume Analysis</h2>
                {isFromSaved && (
                  <p className="text-muted-foreground text-sm">
                    Showing previous analysis • Last updated:{" "}
                    {new Date(
                      savedAnalysis?.updated_at || ""
                    ).toLocaleDateString()}
                  </p>
                )}
              </div>
              <div className="flex gap-2">
                {(isLoading || isGenerating) && (
                  <Button
                    onClick={() => stop()}
                    variant="destructive"
                    size="sm"
                  >
                    Stop Generating
                  </Button>
                )}
                {!isLoading && !isGenerating && (
                  <Button
                    onClick={handleRegenerate}
                    variant="outline"
                    size="sm"
                  >
                    Generate New Analysis
                  </Button>
                )}
              </div>
            </div>

            <ResumeAnalysisResult
              object={displayObject}
              jobDescription={jobApplicationData.description}
            />
          </div>
        )}

        {/* Show placeholder when no analysis and no form (loading state) */}
        {!shouldShowForm && !shouldShowResults && (
          <div className="rounded-lg border bg-white p-4 shadow-sm">
            <div className="text-muted-foreground py-8 text-center">
              <p>Generating your resume analysis...</p>
            </div>
          </div>
        )}
      </div>

      <div className="flex-1 p-4">
        <ResumeAnalysisViewer
          resume={jobApplicationData.resumes!}
          analysisObject={viewerObject}
        />
      </div>
    </div>
  )
}
