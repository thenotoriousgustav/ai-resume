"use client"

import { useCallback, useEffect, useState } from "react"

import { updateResumeBuilder } from "@/features/resume-builder/server/actions/update-resume-builder"
import { useDebounce } from "@/hooks/use-debounce"
import { DBResumeBuilder } from "@/types/database"

export function useAutoSave(
  resumeId: string,
  data: Partial<DBResumeBuilder>,
  delay: number = 1000
) {
  const [isSaving, setIsSaving] = useState(false)
  const [lastSaved, setLastSaved] = useState<Date | null>(null)
  const [saveError, setSaveError] = useState<string | null>(null)

  const debouncedData = useDebounce(data, delay)

  const save = useCallback(
    async (dataToSave: Partial<DBResumeBuilder>) => {
      if (!resumeId || Object.keys(dataToSave).length === 0) return

      setIsSaving(true)
      setSaveError(null)

      try {
        await updateResumeBuilder(resumeId, dataToSave)
        setLastSaved(new Date())
      } catch (error) {
        console.error("Failed to save resume:", error)
        setSaveError(error instanceof Error ? error.message : "Failed to save")
      } finally {
        setIsSaving(false)
      }
    },
    [resumeId]
  )

  useEffect(() => {
    if (debouncedData && Object.keys(debouncedData).length > 0) {
      save(debouncedData)
    }
  }, [debouncedData, save])

  return {
    isSaving,
    lastSaved,
    saveError,
    forceSave: () => save(data),
  }
}
