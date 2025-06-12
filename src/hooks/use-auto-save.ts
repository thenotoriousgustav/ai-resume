// hooks/use-auto-save.ts
import { useEffect, useRef } from "react"

import { useResumeStore } from "@/stores/resume-builder-store"

export function useAutoSave(delay: number = 2000) {
  const { resumeData, saveStatus, saveResume } = useResumeStore()
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    // Only auto-save if there are changes (status is 'idle')
    if (saveStatus === "idle") {
      // Clear existing timeout
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }

      // Set new timeout
      timeoutRef.current = setTimeout(() => {
        saveResume()
      }, delay)
    }

    // Cleanup
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [resumeData, saveStatus, saveResume, delay])

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [])
}
