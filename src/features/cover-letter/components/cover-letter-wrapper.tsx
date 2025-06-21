"use client"

import { useCompletion } from "@ai-sdk/react"
import React, { useEffect, useState } from "react"
import { toast } from "sonner"
import { z } from "zod"

import { DbCoverLetter, JobApplication } from "@/types/database"

import { coverLetterSchema } from "../schemas/cover-letter-schema"
import { saveCoverLetter } from "../server/actions/save-cover-letter"

import CoverLetterForm from "./cover-letter-form"
import CoverLetterResult from "./cover-letter-result"

interface CoverLetterWrapperProps {
  jobApplicationData: JobApplication
  jobApplicationId: string
  existingCoverLetter?: DbCoverLetter | null
}

export default function CoverLetterWrapper({
  jobApplicationData,
  jobApplicationId,
  existingCoverLetter,
}: CoverLetterWrapperProps) {
  const [currentCoverLetter, setCurrentCoverLetter] = useState<
    string | undefined
  >(existingCoverLetter?.content)
  const [showingPrevious, setShowingPrevious] = useState(!!existingCoverLetter)

  const { complete, completion, isLoading } = useCompletion({
    api: "/api/cover-letter-generator",
  })

  // Save cover letter when generation is complete
  useEffect(() => {
    if (completion && !isLoading) {
      saveCoverLetter({
        jobApplicationId,
        content: completion,
      })
        .then(() => {
          toast.success("Cover letter saved successfully")
          setCurrentCoverLetter(completion)
          setShowingPrevious(false)
        })
        .catch((error) => {
          console.error("Failed to save cover letter:", error)
          toast.error("Failed to save cover letter")
        })
    }
  }, [completion, isLoading, jobApplicationId])

  const handleSaveAndGenerate = async (
    formData: z.infer<typeof coverLetterSchema>
  ) => {
    setShowingPrevious(false)
    setCurrentCoverLetter(undefined)

    await complete(
      "Generate a professional cover letter for the position below.",
      {
        body: {
          company: formData.company,
          position: formData.position,
          description: formData.description,
          resume: jobApplicationData.resumes?.extracted_text || "",
        },
      }
    )
  }

  const handleRegenerateCoverLetter = () => {
    setShowingPrevious(false)
    setCurrentCoverLetter(undefined)
  }

  // Use either new completion or existing cover letter
  const displayContent = completion || currentCoverLetter

  return (
    <div className="flex h-[calc(100vh-200px)] flex-grow gap-6">
      <div className="flex w-1/2">
        <div className="flex w-full flex-col rounded-lg border bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-xl font-semibold">
            Job Application Details
          </h2>
          <div className="flex flex-grow flex-col overflow-hidden">
            <CoverLetterForm
              initialData={{
                company: jobApplicationData.company || "",
                position: jobApplicationData.position || "",
                description: jobApplicationData.description || "",
                resume: jobApplicationData.resumes?.extracted_text || "",
              }}
              jobApplicationId={jobApplicationId}
              onSaveAndGenerate={handleSaveAndGenerate}
              isGenerating={isLoading}
            />
          </div>
        </div>
      </div>

      <div className="flex w-1/2">
        <CoverLetterResult
          completion={displayContent}
          isLoading={isLoading}
          showingPrevious={showingPrevious}
          onRegenerate={handleRegenerateCoverLetter}
          existingCoverLetter={existingCoverLetter}
        />
      </div>
    </div>
  )
}
