import React from "react"

import DrawerContentDetail from "@/features/job-tracker/components/detail-page/drawer-content-detail"
import DrawerWrapper from "@/features/job-tracker/components/detail-page/drawer-wrapper"
import getJobApplication from "@/server/queries/get-job-application"

export default async function JobDetailsPageDrawer({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params

  const [jobApplication, error] = await getJobApplication(id)

  if (error) {
    console.error("Error fetching job application:", error)
    return null
  }

  return (
    <DrawerWrapper>
      <DrawerContentDetail data={jobApplication} />
    </DrawerWrapper>
  )
}
