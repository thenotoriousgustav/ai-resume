"use client"

import { CellContext } from "@tanstack/react-table"
import { JSX, startTransition, useEffect, useState } from "react"

import { Badge } from "@/components/ui/badge"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { JobTypeBadgeVariant } from "@/features/job-tracker/lib/job-type-badge"
import { PriorityBadgeVariant } from "@/features/job-tracker/lib/priority-badge"
import { StatusBadgeVariant } from "@/features/job-tracker/lib/status-badge"
import { JobApplication } from "@/types/database"

import updateTableCell from "../../server/actions/update-table-cell"

export type BadgeVariant =
  | StatusBadgeVariant
  | PriorityBadgeVariant
  | JobTypeBadgeVariant

export const SelectCell = ({
  getValue,
  row,
  column,
  options,
  variantGetter,
}: CellContext<JobApplication, string> & {
  options: { label: string; value: string }[]
  variantGetter?: (value: string) => BadgeVariant
}): JSX.Element => {
  const initialValue = getValue()
  const rowId = row.original.id
  const columnId = column.id

  const [value, setValue] = useState(initialValue)
  const [open, setOpen] = useState(false)

  const handleChange = (newValue: string) => {
    setValue(newValue)

    if (value !== newValue) {
      startTransition(() => {
        updateTableCell(rowId, columnId, newValue)
      })
    }
  }

  useEffect(() => {
    setValue(initialValue)
  }, [initialValue])

  return (
    <Select
      value={value}
      onValueChange={handleChange}
      open={open}
      onOpenChange={setOpen}
    >
      <SelectTrigger
        isArrow={false}
        className="h-auto w-full border-0 bg-transparent p-0 shadow-none focus-within:shadow-none focus-within:ring-0 hover:bg-transparent focus:shadow-none focus:ring-0 focus:ring-offset-0 focus-visible:shadow-none focus-visible:ring-0 focus-visible:ring-offset-0 data-[state=open]:border-0 data-[state=open]:bg-transparent data-[state=open]:shadow-none"
      >
        <SelectValue placeholder="Select value">
          {value && variantGetter ? (
            <Badge variant={variantGetter(value)}>
              {options.find((opt) => opt.value === value)?.label || value}
            </Badge>
          ) : (
            value
          )}
        </SelectValue>
      </SelectTrigger>
      <SelectContent>
        {options.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {variantGetter ? (
              <Badge variant={variantGetter(option.value)}>
                {option.label}
              </Badge>
            ) : (
              <span>{option.label}</span>
            )}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
