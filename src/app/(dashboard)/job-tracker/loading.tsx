import React from "react"

import { DataTableSkeleton } from "@/components/data-table/data-table-skeleton"

export default function JobTrackerLoading() {
  return (
    <div className="w-full">
      <DataTableSkeleton
        columnCount={8}
        rowCount={10}
        filterCount={3}
        cellWidths={[
          "40px",
          "200px",
          "150px",
          "120px",
          "120px",
          "120px",
          "150px",
          "40px",
        ]}
        withViewOptions={true}
        withPagination={true}
        shrinkZero={false}
      />
    </div>
  )
}
