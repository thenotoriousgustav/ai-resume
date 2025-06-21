import React, { Suspense } from "react"

import DrawerContentDetail from "@/features/job-tracker/components/detail-page/drawer-content-detail"
import DrawerWrapper from "@/features/job-tracker/components/detail-page/drawer-wrapper"
import getJobApplication from "@/server/queries/get-job-application"

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

export async function JobDetailsPage({ id }: { id: string }) {
  const [jobApplication, error] = await getJobApplication(id)
  await new Promise((resolve) => setTimeout(resolve, 1000)) // Simulate loading delay

  if (error) {
    console.error("Error fetching job application:", error)
    return null
  }

  return <DrawerContentDetail data={jobApplication} />
}
