import React from "react"

import DrawerContentDetail from "@/features/job-tracker/components/detail-page/drawer-content-detail"
import DrawerWrapper from "@/features/job-tracker/components/detail-page/drawer-wrapper"
import getJobApplication from "@/server/data-access/get-job-application"

export default async function JobDetailsPageDrawer({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params

  const data = await getJobApplication(id)

  if (!id || !data) return null

  return (
    <DrawerWrapper>
      <DrawerContentDetail data={data} />
    </DrawerWrapper>
  )
}
