"use client"

import { CellContext } from "@tanstack/react-table"
import Link from "next/link"
import { JSX, startTransition, useEffect, useState } from "react"
import { useForm } from "react-hook-form"

import { Form, FormControl, FormField, FormItem } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { JobApplication } from "@/types/database"

import updateTableCell from "../../server/actions/update-table-cell"

export const PositionCell = ({
  getValue,
  row,
  column,
}: CellContext<JobApplication, string>): JSX.Element => {
  const initialValue = getValue() ?? ""
  const [value, setValue] = useState(initialValue)
  const [isEditing, setIsEditing] = useState(false)

  const form = useForm({
    defaultValues: {
      [column.id]: value,
    },
    mode: "onBlur",
  })

  const handleBlur = async () => {
    const currentValue = form.getValues(column.id)
    const rowId = row.original.id

    if (currentValue !== initialValue) {
      startTransition(async () => {
        await updateTableCell(rowId, column.id, currentValue)
        setValue(currentValue)
        setIsEditing(false)
      })
    } else {
      setIsEditing(false)
    }
  }

  useEffect(() => {
    setValue(initialValue)
    form.setValue(column.id, initialValue)
  }, [initialValue, column.id, form])

  return (
    <div className="space-y-2">
      {isEditing ? (
        <Form {...form}>
          <FormField
            control={form.control}
            name={column.id}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    {...field}
                    onBlur={() => {
                      field.onBlur()
                      handleBlur()
                    }}
                    autoFocus
                    className="h-8"
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </Form>
      ) : (
        <div className="space-y-1">
          <Link
            href={`/job-tracker/${row.original.id}`}
            className={cn(
              "block text-sm font-medium text-blue-600 hover:text-blue-800 hover:underline",
              "cursor-pointer transition-colors duration-200"
            )}
          >
            {value || "Untitled Position"}
          </Link>
          <button
            onClick={() => setIsEditing(true)}
            className="text-xs text-gray-500 hover:text-gray-700"
          >
            Edit
          </button>
        </div>
      )}
    </div>
  )
}
