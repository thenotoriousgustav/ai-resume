"use client"

import type { Column, Table } from "@tanstack/react-table"
import { X } from "lucide-react"
import * as React from "react"

import { DataTableDateFilter } from "@/components/data-table/data-table-date-filter"
import { DataTableFacetedFilter } from "@/components/data-table/data-table-faceted-filter"
import { DataTableSliderFilter } from "@/components/data-table/data-table-slider-filter"
import { DataTableViewOptions } from "@/components/data-table/data-table-view-options"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select"

interface DataTableToolbarProps<TData> extends React.ComponentProps<"div"> {
  table: Table<TData>
}

export function DataTableToolbar<TData>({
  table,
  children,
  className,
  ...props
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0

  const columns = React.useMemo(
    () => table.getAllColumns().filter((column) => column.getCanFilter()),
    [table]
  )

  const onReset = React.useCallback(() => {
    table.resetColumnFilters()
  }, [table])

  return (
    <div
      role="toolbar"
      aria-orientation="horizontal"
      className={cn(
        "flex w-full items-start justify-between gap-2 p-1",
        className
      )}
      {...props}
    >
      <div className="flex flex-1 flex-wrap items-center gap-2">
        {columns.map((column) => (
          <DataTableToolbarFilter<TData>
            key={column.id}
            table={table}
            column={column}
          />
        ))}
        {isFiltered && (
          <Button
            aria-label="Reset filters"
            variant="outline"
            size="sm"
            className="border-dashed"
            onClick={onReset}
          >
            <X />
            Reset
          </Button>
        )}
      </div>
      <div className="flex items-center gap-2">
        {children}
        <DataTableViewOptions table={table} />
      </div>
    </div>
  )
}
interface DataTableToolbarFilterProps<TData> {
  table: Table<TData>
  column: Column<TData>
}

function DataTableToolbarFilter<TData>({
  table,
  column,
}: DataTableToolbarFilterProps<TData>) {
  {
    const textColumns = React.useMemo(() => {
      return table
        .getAllColumns()
        .filter(
          (col) => col.columnDef.meta?.variant === "text" && col.getCanFilter()
        )
    }, [table])

    const [selectedTextColumn, setSelectedTextColumn] = React.useState<string>(
      textColumns.length > 0 ? textColumns[0].id : ""
    )

    const columnMeta = column.columnDef.meta

    const onFilterRender = React.useCallback(() => {
      if (!columnMeta?.variant) return null

      switch (columnMeta.variant) {
        case "text":
          // If there's only one text column, render as before
          if (textColumns.length <= 1) {
            return (
              <Input
                placeholder={columnMeta.placeholder ?? columnMeta.label}
                value={(column.getFilterValue() as string) ?? ""}
                onChange={(event) => column.setFilterValue(event.target.value)}
                className="h-8 w-40 lg:w-56"
              />
            )
          }

          // If this is the first text column and there are multiple, render the combined search
          if (column.id === textColumns[0].id) {
            const activeColumn =
              textColumns.find((col) => col.id === selectedTextColumn) || column
            const activeColumnMeta = activeColumn.columnDef.meta

            return (
              <div className="flex items-center gap-2">
                <Select
                  value={selectedTextColumn}
                  onValueChange={(value) => {
                    // Clear all text column filters first
                    textColumns.forEach((col) => col.setFilterValue(""))
                    setSelectedTextColumn(value)
                  }}
                >
                  <SelectTrigger className="h-8 w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {textColumns.map((textCol) => (
                      <SelectItem key={textCol.id} value={textCol.id}>
                        {textCol.columnDef.meta?.label ?? textCol.id}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Input
                  placeholder={
                    activeColumnMeta?.placeholder ??
                    activeColumnMeta?.label ??
                    `Search ${selectedTextColumn}...`
                  }
                  value={(activeColumn.getFilterValue() as string) ?? ""}
                  onChange={(event) =>
                    activeColumn.setFilterValue(event.target.value)
                  }
                  className="h-8 w-40 lg:w-56"
                />
              </div>
            )
          }

          return null

        case "range":
          return (
            <DataTableSliderFilter
              column={column}
              title={columnMeta.label ?? column.id}
            />
          )

        case "date":
        case "dateRange":
          return (
            <DataTableDateFilter
              column={column}
              title={columnMeta.label ?? column.id}
              multiple={columnMeta.variant === "dateRange"}
            />
          )

        case "select":
        case "multiSelect":
          return (
            <DataTableFacetedFilter
              column={column}
              title={columnMeta.label ?? column.id}
              options={columnMeta.options ?? []}
              multiple={columnMeta.variant === "multiSelect"}
            />
          )

        default:
          return null
      }
    }, [column, columnMeta, textColumns, selectedTextColumn])

    return onFilterRender()
  }
}
