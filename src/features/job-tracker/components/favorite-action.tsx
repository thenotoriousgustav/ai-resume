"use client"

import { Star } from "lucide-react"
import { startTransition } from "react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

import updateTableCell from "../server/actions/update-table-cell"

interface FavoriteActionProps {
  rowId: string
  isFavorite: boolean
  onFavoriteChange?: (newValue: boolean) => void
}

export function FavoriteAction({
  rowId,
  isFavorite,
  onFavoriteChange,
}: FavoriteActionProps) {
  const toggleFavorite = () => {
    const newValue = !isFavorite

    startTransition(async () => {
      try {
        await updateTableCell(rowId, "is_favorite", newValue)

        if (onFavoriteChange) {
          onFavoriteChange(newValue)
        }

        toast.success(
          newValue ? "Added to favorites" : "Removed from favorites"
        )
      } catch (error) {
        console.error("Error updating favorite status:", error)
        toast.error("Failed to update favorite status")
      }
    })
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleFavorite}
      className="h-8 w-8 p-0"
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
