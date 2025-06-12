import React from "react"

import getJobApplication from "@/server/data-access/get-job-application"

import { getLatestResumeAnalysis } from "./_actions/targeted-resume-actions"
import TargetedResumeWrapper from "./_components/targeted-resume-wrapper"

export default async function TargetedResumePage({
  params,
}: {
  params: Promise<{ jobApplicationId: string }>
}) {
  const { jobApplicationId } = await params

  if (!jobApplicationId) {
    return (
      <div className="flex h-[calc(100vh-4rem)] items-center justify-center">
        No job application found.
      </div>
    )
  }

  const jobApplicationData = await getJobApplication(jobApplicationId)

  if (!jobApplicationData?.resumes) {
    return (
      <div className="flex h-[calc(100vh-4rem)] items-center justify-center">
        No resume found for this job application.
      </div>
    )
  }

  // Get previous analysis if exists
  const previousAnalysis = await getLatestResumeAnalysis(jobApplicationId)

  return (
    <TargetedResumeWrapper
      jobApplicationData={jobApplicationData}
      previousAnalysis={previousAnalysis}
    />
  )
}
