import React from "react"

import TargetedResumeWrapper from "@/features/targeted-resume/components/targeted-resume-wrapper"
import getLatestResumeAnalysis from "@/features/targeted-resume/server/queries/get-latest-resume-analysis"
import getJobApplication from "@/server/queries/get-job-application"

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

  // Fetch both in parallel using Promise.all
  const [jobApplicationResult, previousAnalysisResult] = await Promise.all([
    getJobApplication(jobApplicationId),
    getLatestResumeAnalysis(jobApplicationId),
  ])
  const [jobApplicationData, jobApplicationError] = jobApplicationResult
  const [previousAnalysisData, previousAnalysisError] = previousAnalysisResult

  if (jobApplicationError) {
    return (
      <div className="flex h-[calc(100vh-4rem)] items-center justify-center">
        <p>Error: {jobApplicationError.message}</p>
      </div>
    )
  }

  if (!jobApplicationData || !jobApplicationData.resumes) {
    return (
      <div className="flex h-[calc(100vh-4rem)] items-center justify-center">
        <p>No resume found for this job application.</p>
      </div>
    )
  }

  if (previousAnalysisError) {
    return (
      <div className="flex h-[calc(100vh-4rem)] items-center justify-center">
        <p>Error: {previousAnalysisError.message}</p>
      </div>
    )
  }

  return (
    <TargetedResumeWrapper
      jobApplicationData={jobApplicationData}
      previousAnalysis={previousAnalysisData}
    />
  )
}
