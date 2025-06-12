"use client"

import { CellContext } from "@tanstack/react-table"
import { Star } from "lucide-react"
import { JSX, useState } from "react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { JobApplication } from "@/types/database"

import updateTableCell from "../../server/actions/update-table-cell"

export const FavoriteCell = ({
  getValue,
  row,
  column,
}: CellContext<JobApplication, boolean>): JSX.Element => {
  // Gunakan Boolean untuk memastikan nilai selalu boolean
  const initialValue = Boolean(getValue())
  const [isFavorite, setIsFavorite] = useState(initialValue)

  const toggleFavorite = async () => {
    try {
      const newValue = !isFavorite
      const rowId = row.original.id
      const columnId = column.id

      setIsFavorite(newValue)

      await updateTableCell(rowId, columnId, newValue)
    } catch (error) {
      setIsFavorite(initialValue)
      console.error("Error updating favorite status:", error)
      toast.error("Failed to update favorite status")
    }
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleFavorite}
      className="m-0 cursor-pointer p-0"
    >
      <Star
        className={cn(
          "h-4 w-4 transition-colors",
          isFavorite ? "fill-yellow-400 text-yellow-400" : "text-slate-400"
        )}
      />
      <span className="sr-only">
        {isFavorite ? "Remove from favorites" : "Add to favorites"}
      </span>
    </Button>
  )
}
