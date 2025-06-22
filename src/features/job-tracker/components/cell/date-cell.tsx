"use client"

import { CellContext } from "@tanstack/react-table"
import { format } from "date-fns"
import { enUS } from "date-fns/locale"
import { CalendarIcon } from "lucide-react"
import { JSX, startTransition } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { JobApplication } from "@/types/database"

import updateTableCell from "../../server/actions/update-table-cell"

export const DateCell = ({
  getValue,
  row,
  column,
}: CellContext<JobApplication, string>): JSX.Element => {
  // Parse date string correctly to avoid timezone issues
  const parseDateString = (dateString: string | null): Date | undefined => {
    if (!dateString) return undefined

    // Parse YYYY-MM-DD format directly without timezone conversion
    const [year, month, day] = dateString.split("-").map(Number)
    return new Date(year, month - 1, day) // month is 0-indexed
  }

  const initialDate = parseDateString(getValue())
  const rowId = row.original.id
  const columnId = column.id

  const form = useForm({
    defaultValues: {
      [columnId]: initialDate,
    },
    mode: "onBlur",
  })

  const handleChange = (date: Date | undefined) => {
    if (!date) return

    form.setValue(columnId, date)
    startTransition(async () => {
      try {
        // Format date to YYYY-MM-DD without timezone conversion
        const year = date.getFullYear()
        const month = String(date.getMonth() + 1).padStart(2, "0")
        const day = String(date.getDate()).padStart(2, "0")
        const dateString = `${year}-${month}-${day}`

        const [_, error] = await updateTableCell(rowId, columnId, dateString)

        if (error) {
          toast.error("Failed to update date")
        } else {
          toast.success("Date updated successfully")
        }
      } catch (error) {
        console.error("Failed to update date:", error)
        toast.error("Failed to update date")
      }
    })
  }

  return (
    <Form {...form}>
      <form noValidate>
        <FormField
          control={form.control}
          name={column.id}
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="ghost"
                      className="h-auto w-full justify-start p-0 text-left font-normal hover:bg-transparent"
                    >
                      <span className="flex items-center space-x-2">
                        <CalendarIcon className="h-4 w-4" />
                        <span>
                          {field.value
                            ? format(field.value, "dd MMMM yyyy", {
                                locale: enUS,
                              })
                            : "Pilih tanggal"}
                        </span>
                      </span>
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={(date) => {
                        field.onChange(date)
                        handleChange(date)
                      }}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </FormControl>
            </FormItem>
          )}
        />
      </form>
    </Form>
  )
}
