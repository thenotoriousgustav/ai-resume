"use client"

import { CellContext } from "@tanstack/react-table"
import React, { JSX, useEffect, useTransition } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form"
import { Textarea } from "@/components/ui/textarea"
import { JobApplication } from "@/types/database"

import updateTableCell from "../../server/actions/update-table-cell"

export const DescriptionCell = ({
  getValue,
  row,
  column,
}: CellContext<JobApplication, string>): JSX.Element => {
  const initialValue = getValue() ?? ""
  const rowId = row.original.id
  const columnId = column.id

  const [open, setOpen] = React.useState(false)
  const [isPending, startTransition] = useTransition()

  const form = useForm({
    defaultValues: {
      description: initialValue,
    },
    mode: "onSubmit",
  })

  const handleSubmit = async () => {
    const value = form.getValues("description")

    if (value !== initialValue) {
      startTransition(async () => {
        await updateTableCell(rowId, columnId, value)
        toast.success("Description updated successfully")
      })
    } else {
      toast.info("No changes made to the description")
      setOpen(false)
    }
  }

  // Add useEffect to close dialog when transition completes
  useEffect(() => {
    if (!isPending && form.formState.isSubmitSuccessful) {
      setOpen(false)
    }
  }, [isPending, form.formState.isSubmitSuccessful])

  const handleKeyDown = (e: React.KeyboardEvent) => {
    // Save on Ctrl+Enter or Cmd+Enter
    if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
      e.preventDefault()
      handleSubmit()
    }
    // Close on Escape
    if (e.key === "Escape") {
      e.preventDefault()
      setOpen(false)
    }
  }

  const displayText = initialValue
    ? initialValue.substring(0, 50) + (initialValue.length > 50 ? "..." : "")
    : "Add description..."

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          className="hover:bg-muted/50 flex h-8 w-full cursor-pointer items-start justify-start gap-1.5 px-2 text-left"
        >
          {initialValue ? (
            <div className="flex w-full flex-col items-start">
              <span className="text-muted-foreground max-w-[150px] truncate text-xs leading-relaxed">
                {displayText}
              </span>
            </div>
          ) : (
            <span className="text-muted-foreground text-xs italic">
              Add description...
            </span>
          )}
        </Button>
      </DialogTrigger>

      <DialogContent className="flex max-h-[80vh] flex-col sm:max-w-[700px]">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold">
            {row.original.position || "Job Position"}
          </DialogTitle>
          <DialogDescription className="text-muted-foreground text-sm">
            {row.original.company ? (
              <>at {row.original.company}</>
            ) : (
              "Add job description and notes"
            )}
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-4"
          >
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Textarea
                      {...field}
                      onKeyDown={handleKeyDown}
                      className="border-border h-[400px] min-h-[400px] resize-none rounded-md border p-3 text-sm leading-relaxed"
                      placeholder="Enter job description, requirements, benefits, or any notes about this position..."
                    />
                  </FormControl>
                  <div className="text-muted-foreground flex items-center justify-between text-xs">
                    <span>{field.value?.length || 0} characters</span>
                    <span>Press Ctrl+Enter to save, Esc to close</span>
                  </div>
                </FormItem>
              )}
            />
            <div className="flex justify-end gap-2 border-t pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => setOpen(false)}
                disabled={isPending}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isPending}>
                {isPending ? "Saving..." : "Save"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
