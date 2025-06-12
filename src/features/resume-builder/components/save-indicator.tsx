// components/save-indicator.tsx
import { AlertCircle, CheckCircle, Clock, Loader2 } from "lucide-react"

import { useResumeStore } from "@/stores/resume-builder-store"

export function SaveIndicator() {
  const { saveStatus, lastSaved } = useResumeStore()

  const getStatusIcon = () => {
    switch (saveStatus) {
      case "saving":
        return <Loader2 className="h-4 w-4 animate-spin text-blue-500" />
      case "saved":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "error":
        return <AlertCircle className="h-4 w-4 text-red-500" />
      default:
        return <Clock className="h-4 w-4 text-gray-400" />
    }
  }

  const getStatusText = () => {
    switch (saveStatus) {
      case "saving":
        return "Saving..."
      case "saved":
        return lastSaved
          ? `Saved at ${lastSaved.toLocaleTimeString()}`
          : "Saved"
      case "error":
        return "Save failed"
      default:
        return "Unsaved changes"
    }
  }

  return (
    <div className="text-muted-foreground flex items-center gap-2 text-sm">
      {getStatusIcon()}
      <span>{getStatusText()}</span>
    </div>
  )
}
