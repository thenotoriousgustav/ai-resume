import React, { Suspense } from "react"

import DrawerContentDetail from "@/features/job-tracker/components/detail-page/drawer-content-detail"
import DrawerWrapper from "@/features/job-tracker/components/detail-page/drawer-wrapper"
import getJobApplication from "@/server/queries/get-job-application"
import getResumes from "@/server/queries/get-resumes"

import JobModalLoading from "./loading"

export default async function JobDetailsPageDrawer({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params

  return (
    <DrawerWrapper>
      <Suspense fallback={<JobModalLoading />}>
        <JobDetailsPage id={id} />
      </Suspense>
    </DrawerWrapper>
  )
}

async function JobDetailsPage({ id }: { id: string }) {
  const [jobApplicationResult, resumesResult] = await Promise.all([
    getJobApplication(id),
    getResumes(),
  ])

  const [jobApplication, jobApplicationError] = jobApplicationResult
  const [resumes, resumesError] = resumesResult

  if (jobApplicationError) {
    console.error("Error fetching job application:", jobApplicationError)
    return null
  }

  if (resumesError) {
    console.error("Error fetching resumes:", resumesError)
    return null
  }

  return <DrawerContentDetail data={jobApplication} resumes={resumes} />
}
