"use client"

import { CellContext } from "@tanstack/react-table"
import { JSX, startTransition, useEffect, useState } from "react"
import { useForm } from "react-hook-form"

import { Form, FormControl, FormField, FormItem } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { JobApplicationTableData } from "@/types/database"

import updateTableCell from "../../server/actions/update-table-cell"

export const TextCell = ({
  getValue,
  row,
  column,
}: CellContext<JobApplicationTableData, string>): JSX.Element => {
  const initialValue = getValue() ?? ""

  const [value, setValue] = useState(initialValue)

  const form = useForm({
    defaultValues: {
      [column.id]: value,
    },
    mode: "onBlur",
  })

  const handleBlur = async () => {
    const currentValue = form.getValues(column.id)
    const rowId = row.original.id
    const columnId = column.id

    if (currentValue !== value) {
      startTransition(async () => {
        await updateTableCell(rowId, columnId, currentValue)
      })
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault()
      ;(e.target as HTMLInputElement).blur()
    }
  }

  useEffect(() => {
    setValue(initialValue)
  }, [initialValue])

  return (
    <Form {...form}>
      <form>
        <FormField
          control={form.control}
          name={column.id}
          render={({ field }) => (
            <FormItem className="m-0 space-y-0 p-0">
              <FormControl>
                <Input
                  {...field}
                  onBlur={handleBlur}
                  onKeyDown={handleKeyDown}
                  className="h-auto border-0 bg-transparent p-0 shadow-none focus-visible:ring-0 focus-visible:ring-offset-0"
                />
              </FormControl>
            </FormItem>
          )}
        />
      </form>
    </Form>
  )
}
