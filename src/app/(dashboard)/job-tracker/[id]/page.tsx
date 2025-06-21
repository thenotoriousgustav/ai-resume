import React from "react"

import DrawerContentDetail from "@/features/job-tracker/components/detail-page/drawer-content-detail"
import getJobApplication from "@/server/queries/get-job-application"

export default async function JobDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params

  const [jobApplicationData, jobApplicationError] = await getJobApplication(id)

  if (jobApplicationError) {
    return (
      <div className="flex h-[calc(100vh-4rem)] items-center justify-center">
        <p>Error: {jobApplicationError.message}</p>
      </div>
    )
  }

  return <DrawerContentDetail data={jobApplicationData} />
}
