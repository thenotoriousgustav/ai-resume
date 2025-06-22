import React, { Suspense } from "react"

import DrawerContentDetail from "@/features/job-tracker/components/detail-page/drawer-content-detail"
import getJobApplication from "@/server/queries/get-job-application"

import JobModalLoading from "./loading"

export default async function JobDetailsPageDrawer({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params

  return (
    <Suspense fallback={<JobModalLoading />}>
      <JobDetailsPage id={id} />
    </Suspense>
  )
}

async function JobDetailsPage({ id }: { id: string }) {
  const [jobApplication, error] = await getJobApplication(id)

  if (error) {
    console.error("Error fetching job application:", error)
    return null
  }

  return <DrawerContentDetail data={jobApplication} />
}
