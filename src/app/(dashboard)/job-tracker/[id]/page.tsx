import React from "react"

import DrawerContentDetail from "@/features/job-tracker/components/detail-page/drawer-content-detail"
import getJobApplication from "@/server/data-access/get-job-application"

export default async function JobDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params

  const data = await getJobApplication(id)

  return (
    <>
      <DrawerContentDetail data={data} />
    </>
  )
}
