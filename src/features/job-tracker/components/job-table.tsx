"use client"

import React from "react"

import { DataTable } from "@/components/data-table/data-table"
import { DataTableSortList } from "@/components/data-table/data-table-sort-list"
import { DataTableToolbar } from "@/components/data-table/data-table-toolbar"
import { getJobApplications } from "@/features/job-tracker/server/queries/get-job-applications"
import { useDataTable } from "@/hooks/use-data-table"
import { DataTableRowAction } from "@/types/data-table"
import { JobApplicationTableData } from "@/types/database"

import AddJobApplication from "./add-job-application"
import AddJobFromUrl from "./add-job-from-url"
import getColumnsJob from "./columns"
import { DeleteJobDialog } from "./delete-job-dialog"
import { TableActionBar } from "./table-action-bar"
import { JobsTableToolbarActions } from "./table-toolbar-actions"

interface JobTableProps {
  promises: Promise<[Awaited<ReturnType<typeof getJobApplications>>]>
  columnVisibilityCookie?: string
}

export default function JobTable({
  promises,
  columnVisibilityCookie,
}: JobTableProps) {
  const [[jobApplicationsData, jobApplicationsError]] = React.use(promises)

  if (jobApplicationsError) {
    throw jobApplicationsError
  }

  const data = jobApplicationsData.data
  const pageCount = jobApplicationsData.pageCount || 0

  const [rowAction, setRowAction] =
    React.useState<DataTableRowAction<JobApplicationTableData> | null>(null)

  const memoizedData = React.useMemo(() => data, [data])

  const columns = React.useMemo(
    () =>
      getColumnsJob({
        setRowAction,
      }),
    [setRowAction]
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
          <div className="flex gap-2">
            <AddJobApplication />
            <AddJobFromUrl />
          </div>
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
