import { cookies } from "next/headers"

import JobTable from "@/features/job-tracker/components/job-table"
import { searchParamsCache } from "@/features/job-tracker/lib/validations"
import { getJobApplications } from "@/features/job-tracker/server/queries/get-job-applications"

export const dynamic = "force-dynamic"

export default async function JobTrackerPage({
  searchParams,
}: {
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const searchAwait = await searchParams
  const search = searchParamsCache.parse(searchAwait ?? {})

  const cookieStore = await cookies()

  const columnVisibilityCookie = cookieStore.get(
    "data_table_column_visibility"
  )?.value

  const promises = Promise.all([
    getJobApplications({
      ...search,
    }),
  ])

  return (
    <JobTable
      promises={promises}
      columnVisibilityCookie={columnVisibilityCookie}
    />
  )
}
