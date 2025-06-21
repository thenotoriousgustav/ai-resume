"use client"

import { AlertCircle, CheckCircle, Loader2 } from "lucide-react"

interface SaveIndicatorProps {
  isSaving: boolean
  lastSaved: Date | null
  saveError: string | null
}

export function SaveIndicator({
  isSaving,
  lastSaved,
  saveError,
}: SaveIndicatorProps) {
  if (saveError) {
    return (
      <div className="flex items-center gap-2 text-sm text-red-600">
        <AlertCircle className="h-4 w-4" />
        <span>Failed to save</span>
      </div>
    )
  }

  if (isSaving) {
    return (
      <div className="flex items-center gap-2 text-sm text-gray-600">
        <Loader2 className="h-4 w-4 animate-spin" />
        <span>Saving...</span>
      </div>
    )
  }

  if (lastSaved) {
    return (
      <div className="flex items-center gap-2 text-sm text-green-600">
        <CheckCircle className="h-4 w-4" />
        <span>Saved at {lastSaved.toLocaleTimeString()}</span>
      </div>
    )
  }

  return (
    <div className="flex items-center gap-2 text-sm text-gray-400">
      <span>No changes</span>
    </div>
  )
}
