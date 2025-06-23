"use client"

import type { Table } from "@tanstack/react-table"
import React from "react"

import { JobApplicationTableData } from "@/types/database"

import { DeleteJobDialog } from "./delete-job-dialog"

interface JobsTableToolbarActionsProps {
  table: Table<JobApplicationTableData>
}

export function JobsTableToolbarActions({
  table,
}: JobsTableToolbarActionsProps) {
  return (
    <React.Fragment>
      <div className="flex items-center gap-2">
        {table.getFilteredSelectedRowModel().rows.length > 0 ? (
          <DeleteJobDialog
            job={table
              .getFilteredSelectedRowModel()
              .rows.map((row) => row.original)}
            onSuccess={() => table.toggleAllRowsSelected(false)}
          />
        ) : null}
      </div>
    </React.Fragment>
  )
}
