"use client"

import { CellContext } from "@tanstack/react-table"
import { JSX, startTransition, useEffect, useState } from "react"

import { Input } from "@/components/ui/input"
import { JobApplicationTableData } from "@/types/database"

import updateTableCell from "../../server/actions/update-table-cell"

export const TextCell = ({
  getValue,
  row,
  column,
}: CellContext<JobApplicationTableData, string>): JSX.Element => {
  const initialValue = getValue()

  const [value, setValue] = useState(initialValue)

  useEffect(() => {
    setValue(initialValue)
  }, [initialValue])

  const handleBlur = async () => {
    const rowId = row.original.id
    const columnId = column.id

    if (initialValue !== value) {
      startTransition(async () => {
        await updateTableCell(rowId, columnId, value)
      })
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault()
      ;(e.target as HTMLInputElement).blur()
    }
  }

  return (
    <Input
      onBlur={handleBlur}
      onKeyDown={handleKeyDown}
      value={value}
      onChange={(e) => setValue(e.target.value)}
      className="h-auto border-0 bg-transparent p-0 shadow-none focus-visible:ring-0 focus-visible:ring-offset-0"
    />
  )
}
