"use client"

import { CellContext, ColumnDef } from "@tanstack/react-table"
import {
  ChartBarStacked,
  Ellipsis,
  Eye,
  FileText,
  Star,
  Text,
  Trash2,
} from "lucide-react"
import Link from "next/link"
import React from "react"

import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { DescriptionCell } from "@/features/job-tracker/components/cell/description-cell"
import { FavoriteCell } from "@/features/job-tracker/components/cell/favorite-cell"
import { ResumeCell } from "@/features/job-tracker/components/cell/resume-cell"
import { TextCell } from "@/features/job-tracker/components/cell/text-cell"
import { getBadgeVariantByPriority } from "@/features/job-tracker/lib/priority-badge"
import { getBadgeVariantByStatus } from "@/features/job-tracker/lib/status-badge"
import { cn } from "@/lib/utils"
import { DataTableRowAction } from "@/types/data-table"
import { JobApplication } from "@/types/database"
import { Database } from "@/types/supabase-types"

import { jobTypeOptions, priorityOptions, statusOptions } from "../lib/data"
import { getBadgeVariantByJobType } from "../lib/job-type-badge"

import { DateCell } from "./cell/date-cell"
import { SalaryCell } from "./cell/salary-cell"
import { SelectCell } from "./cell/select-cell"

type Resume = Database["public"]["Tables"]["resumes"]["Row"]

interface GetJobsTableColumnsProps {
  setRowAction: React.Dispatch<
    React.SetStateAction<DataTableRowAction<JobApplication> | null>
  >
  resumes: Resume[]
}

export default function getColumnsJob({
  setRowAction,
  resumes,
}: GetJobsTableColumnsProps): ColumnDef<JobApplication>[] {
  return [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
          className="translate-y-0.5"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
          className="translate-y-0.5"
        />
      ),
      enableSorting: false,
      enableHiding: false,
      size: 40,
    },
    {
      id: "is_favorite",
      accessorKey: "is_favorite",
      meta: {
        label: "Favorite",
      },
      enableColumnFilter: true,
      enableSorting: true,
      size: 50,
      filterFn: (row, id, value) => {
        return value.includes(row.getValue(id))
      },
      header: ({ column }) => {
        const isSorted = column.getIsSorted() // "asc" | "desc" | false

        const handleSortToggle = () => {
          if (isSorted === false) {
            column.toggleSorting(false) // sort ascending
          } else if (isSorted === "asc") {
            column.toggleSorting(true) // sort descending
          } else {
            column.clearSorting() // remove sorting
          }
        }

        return (
          <Button
            variant="ghost"
            onClick={handleSortToggle}
            title="Sort by favorite"
            className="m-0 p-0"
          >
            <Star
              className={cn(
                "h-4 w-4 transition-colors",
                isSorted === "asc" && "text-yellow-500",
                isSorted === "desc" && "fill-yellow-500 text-yellow-500",
                isSorted === false && "text-slate-400"
              )}
            />
          </Button>
        )
      },
      cell: (props) => {
        return (
          <FavoriteCell {...(props as CellContext<JobApplication, boolean>)} />
        )
      },
    },
    {
      id: "position",
      accessorKey: "position",
      meta: {
        label: "Position",
        placeholder: "Search positions...",
        variant: "text",
        icon: Text,
      },
      enableColumnFilter: true,
      size: 200,
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Position" />
      ),
      cell: (props) => {
        return (
          <Link
            href={`/job-tracker/${props.row.original.id}`}
            className="block font-semibold hover:underline"
          >
            {props.row.original.position}
          </Link>
        )
      },
    },

    {
      id: "company",
      accessorKey: "company",
      meta: {
        label: "Company",
        placeholder: "Search companies...",
        variant: "text",
        icon: Text,
      },
      enableColumnFilter: true,
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Company" />
      ),
      cell: (props) => {
        return <TextCell {...(props as CellContext<JobApplication, string>)} />
      },
    },

    {
      id: "location",
      accessorKey: "location",
      meta: {
        label: "Location",
        variant: "text",
        placeholder: "Search locations...",
        icon: Eye,
      },
      enableColumnFilter: true,
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Location" />
      ),
      cell: (props) => {
        return <TextCell {...(props as CellContext<JobApplication, string>)} />
      },
    },
    {
      id: "salary",
      accessorKey: "salary",
      meta: {
        label: "Salary",
      },
      size: 150,
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Salary" />
      ),
      cell: (props) => {
        return (
          <SalaryCell
            {...(props as CellContext<JobApplication, number | null>)}
          />
        )
      },
    },
    {
      id: "job_type",
      accessorKey: "job_type",
      meta: {
        label: "Job Type",
        placeholder: "Filter by job type",
        options: jobTypeOptions,
        variant: "multiSelect",
        icon: Eye,
      },
      size: 120,
      enableColumnFilter: true,
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Job Type" />
      ),
      cell: (props) => (
        <SelectCell
          options={jobTypeOptions}
          variantGetter={getBadgeVariantByJobType}
          {...(props as CellContext<JobApplication, string>)}
        />
      ),
    },
    {
      id: "status",
      accessorKey: "status",
      meta: {
        label: "Status",
        placeholder: "Filter by status",
        options: statusOptions,
        variant: "multiSelect",
        icon: Eye,
      },
      size: 120,
      enableColumnFilter: true,
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Status" />
      ),
      cell: (props) => (
        <SelectCell
          options={statusOptions}
          variantGetter={getBadgeVariantByStatus}
          {...(props as CellContext<JobApplication, string>)}
        />
      ),
    },

    {
      id: "priority",
      accessorKey: "priority",
      meta: {
        label: "Priority",
        placeholder: "Filter by priority",
        options: priorityOptions,
        variant: "multiSelect",
        icon: Eye,
      },
      size: 120,
      enableColumnFilter: true,
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Priority" />
      ),
      cell: (props) => (
        <SelectCell
          options={priorityOptions}
          variantGetter={getBadgeVariantByPriority}
          {...(props as CellContext<JobApplication, string>)}
        />
      ),
    },
    {
      id: "applied_at",
      accessorKey: "applied_at",
      meta: {
        label: "Applied Date",
        placeholder: "Filter by applied date",
        variant: "dateRange",
        icon: Eye,
      },

      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Applied Date" />
      ),
      cell: (props) => (
        <DateCell {...(props as CellContext<JobApplication, string>)} />
      ),
    },
    {
      id: "description",
      accessorKey: "description",
      meta: {
        label: "Description",
      },
      size: 150,
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Description" />
      ),
      cell: (props) => {
        return (
          <DescriptionCell
            {...(props as CellContext<JobApplication, string>)}
          />
        )
      },
    },
    {
      id: "resume_id",
      accessorKey: "resume_id",
      meta: {
        label: "Resume",
      },
      size: 200,
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Resume" />
      ),
      cell: (props) => {
        return (
          <ResumeCell
            {...(props as CellContext<JobApplication, string>)}
            resumes={resumes}
          />
        )
      },
    },
    {
      id: "actions",
      cell: function Cell({ row }) {
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                aria-label="Open menu"
                variant="ghost"
                className="data-[state=open]:bg-muted flex size-8 p-0"
              >
                <Ellipsis className="size-4" aria-hidden="true" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem asChild>
                <Link
                  href={`/targeted-resume/${row.original.id}`}
                  className="flex cursor-pointer items-center"
                >
                  <ChartBarStacked className="mr-2 h-4 w-4" />
                  Targeted Resume
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link
                  href={`/cover-letter/${row.original.id}`}
                  className="flex cursor-pointer items-center"
                >
                  <FileText className="mr-2 h-4 w-4" />
                  Cover Letter
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link
                  href={`/job-tracker/${row.original.id}`}
                  className="flex cursor-pointer items-center"
                >
                  <Eye className="mr-2 h-4 w-4" />
                  View Details
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onSelect={() => setRowAction({ row, variant: "delete" })}
                className="text-destructive focus:text-destructive"
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Delete
                <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )
      },
      size: 40,
    },
  ]
}
