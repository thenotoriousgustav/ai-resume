"use client"

import { SelectTrigger } from "@radix-ui/react-select"
import type { Table } from "@tanstack/react-table"
import { ArrowUp, CheckCircle2, Trash2 } from "lucide-react"
import * as React from "react"
import { toast } from "sonner"

import {
  DataTableActionBar,
  DataTableActionBarAction,
  DataTableActionBarSelection,
} from "@/components/data-table/data-table-action-bar"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
} from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import {
  JobApplication,
  JobApplicationPriority,
  JobApplicationStatus,
} from "@/types/database"

import { deleteJobs } from "../server/actions/delete-jobs"
import { updateJobs } from "../server/actions/update-jobs"

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const actions = ["update-status", "update-priority", "delete"] as const

type Action = (typeof actions)[number]

// Status and priority options
const statusOptions = [
  { value: "applied", label: "Applied" },
  { value: "interview", label: "Interview" },
  { value: "offer", label: "Offer" },
  { value: "rejected", label: "Rejected" },
  { value: "accepted", label: "Accepted" },
] as const

const priorityOptions = [
  { value: "low", label: "Low" },
  { value: "medium", label: "Medium" },
  { value: "high", label: "High" },
] as const

interface JobsTableActionBarProps {
  table: Table<JobApplication>
}

export function TableActionBar({ table }: JobsTableActionBarProps) {
  const rows = table.getFilteredSelectedRowModel().rows
  const [isPending, startTransition] = React.useTransition()
  const [currentAction, setCurrentAction] = React.useState<Action | null>(null)

  const getIsActionPending = React.useCallback(
    (action: Action) => isPending && currentAction === action,
    [isPending, currentAction]
  )

  const onJobUpdate = React.useCallback(
    ({
      field,
      value,
    }: {
      field: "status" | "priority"
      value: JobApplication["status"] | JobApplication["priority"]
    }) => {
      setCurrentAction(field === "status" ? "update-status" : "update-priority")

      startTransition(async () => {
        try {
          const { error } = await updateJobs({
            ids: rows.map((row) => row.original.id),
            [field]: value,
          })

          if (error) {
            toast.error(error)
            return
          }

          toast.success(`Jobs ${field} updated successfully`)
          table.toggleAllRowsSelected(false)

          // Force refresh to get updated data
        } catch (err) {
          console.error(`Error updating jobs ${field}:`, err)
          toast.error(`Failed to update jobs ${field}`)
        } finally {
          setCurrentAction(null)
        }
      })
    },
    [rows, table]
  )

  const onJobDelete = React.useCallback(() => {
    setCurrentAction("delete")
    startTransition(async () => {
      try {
        const { error } = await deleteJobs({
          ids: rows.map((row) => row.original.id),
        })

        if (error) {
          toast.error(error)
          return
        }

        toast.success(
          `${rows.length} job${rows.length === 1 ? "" : "s"} deleted successfully`
        )
        table.toggleAllRowsSelected(false)
      } catch (err) {
        console.error("Error deleting jobs:", err)
        toast.error("Failed to delete jobs")
      } finally {
        setCurrentAction(null)
      }
    })
  }, [rows, table])

  return (
    <DataTableActionBar table={table} visible={rows.length > 0}>
      <DataTableActionBarSelection table={table} />
      <Separator
        orientation="vertical"
        className="hidden data-[orientation=vertical]:h-5 sm:block"
      />
      <div className="flex items-center gap-1.5">
        <Select
          onValueChange={(value: JobApplicationStatus) =>
            onJobUpdate({ field: "status", value })
          }
        >
          <SelectTrigger asChild>
            <DataTableActionBarAction
              size="icon"
              tooltip="Update status"
              isPending={getIsActionPending("update-status")}
            >
              <CheckCircle2 />
            </DataTableActionBarAction>
          </SelectTrigger>
          <SelectContent align="center">
            <SelectGroup>
              {statusOptions.map((status) => (
                <SelectItem
                  key={status.value}
                  value={status.value}
                  className="capitalize"
                >
                  {status.label}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
        <Select
          onValueChange={(value: JobApplicationPriority) =>
            onJobUpdate({ field: "priority", value })
          }
        >
          <SelectTrigger asChild>
            <DataTableActionBarAction
              size="icon"
              tooltip="Update priority"
              isPending={getIsActionPending("update-priority")}
            >
              <ArrowUp />
            </DataTableActionBarAction>
          </SelectTrigger>
          <SelectContent align="center">
            <SelectGroup>
              {priorityOptions.map((priority) => (
                <SelectItem
                  key={priority.value}
                  value={priority.value}
                  className="capitalize"
                >
                  {priority.label}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
        <DataTableActionBarAction
          size="icon"
          tooltip="Delete jobs"
          isPending={getIsActionPending("delete")}
          onClick={onJobDelete}
        >
          <Trash2 />
        </DataTableActionBarAction>
      </div>
    </DataTableActionBar>
  )
}
