"use client"

import React from "react"

import { DataTable } from "@/components/data-table/data-table"
import { DataTableSortList } from "@/components/data-table/data-table-sort-list"
import { DataTableToolbar } from "@/components/data-table/data-table-toolbar"
import { getJobApplications } from "@/features/job-tracker/server/queries/get-job-applications"
import { useDataTable } from "@/hooks/use-data-table"
import getResumes from "@/server/queries/get-resumes"
import { DataTableRowAction } from "@/types/data-table"
import { JobApplication } from "@/types/database"

import AddJobApplication from "./add-job-application"
import getColumnsJob from "./columns"
import { DeleteJobDialog } from "./delete-job-dialog"
import { TableActionBar } from "./table-action-bar"
import { JobsTableToolbarActions } from "./table-toolbar-actions"

interface JobTableProps {
  promises: Promise<
    [
      Awaited<ReturnType<typeof getJobApplications>>,
      Awaited<ReturnType<typeof getResumes>>,
    ]
  >
  columnVisibilityCookie?: string
}

export default function JobTable({
  promises,
  columnVisibilityCookie,
}: JobTableProps) {
  const [
    [jobApplicationsData, jobApplicationsError],
    [resumesData, resumesError],
  ] = React.use(promises)

  // Handle errors
  if (jobApplicationsError) {
    throw jobApplicationsError
  }

  if (resumesError) {
    throw resumesError
  }

  const data = jobApplicationsData?.data || []
  const pageCount = jobApplicationsData?.pageCount || 0
  const resumes = resumesData || []

  const [rowAction, setRowAction] =
    React.useState<DataTableRowAction<JobApplication> | null>(null)

  const memoizedData = React.useMemo(() => data, [data])
  const memoizedResumes = React.useMemo(() => resumes, [resumes])

  const columns = React.useMemo(
    () =>
      getColumnsJob({
        setRowAction,
        resumes: memoizedResumes,
      }),
    [memoizedResumes]
  )

  const { table } = useDataTable({
    data: memoizedData,
    columns,
    pageCount,
    initialState: {
      columnPinning: { right: ["actions"] },
    },
    getRowId: (originalRow) => originalRow.id,
    shallow: false,
    clearOnDefault: true,
    columnVisibilityCookie,
  })

  return (
    <React.Fragment>
      <DataTable table={table} actionBar={<TableActionBar table={table} />}>
        <DataTableToolbar table={table} className="items-center md:items-start">
          <AddJobApplication />
          <JobsTableToolbarActions table={table} />
          <DataTableSortList table={table} />
        </DataTableToolbar>
      </DataTable>

      <DeleteJobDialog
        open={rowAction?.variant === "delete"}
        onOpenChange={() => setRowAction(null)}
        job={rowAction?.row.original ? [rowAction?.row.original] : []}
        showTrigger={false}
        onSuccess={() => rowAction?.row.toggleSelected(false)}
      />
    </React.Fragment>
  )
}
