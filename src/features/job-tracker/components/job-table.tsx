"use client"

import React from "react"

import { DataTable } from "@/components/data-table/data-table"
import { DataTableSortList } from "@/components/data-table/data-table-sort-list"
import { DataTableToolbar } from "@/components/data-table/data-table-toolbar"
import { getJobApplications } from "@/features/job-tracker/server/data-access/get-job-applications"
import { useDataTable } from "@/hooks/use-data-table"
import getResumes from "@/server/data-access/get-resumes"
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
  const [{ data, pageCount }, resumes] = React.use(promises)

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
        <DataTableToolbar table={table}>
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
