"use client"

import { createContext, ReactNode, useContext } from "react"

import { useResumeBuilderStore } from "./resume-builder-store"

interface ResumeBuilderProviderProps {
  children: ReactNode
  resumeId: string
}

const ResumeBuilderContext = createContext<{
  resumeId: string
} | null>(null)

export function ResumeBuilderProvider({
  children,
  resumeId,
}: ResumeBuilderProviderProps) {
  return (
    <ResumeBuilderContext.Provider value={{ resumeId }}>
      {children}
    </ResumeBuilderContext.Provider>
  )
}

export function useResumeBuilderContext() {
  const context = useContext(ResumeBuilderContext)
  if (!context) {
    throw new Error(
      "useResumeBuilderContext must be used within a ResumeBuilderProvider"
    )
  }
  return context
}

// Hook untuk mengakses store dengan context
export function useResumeBuilder() {
  const { resumeId } = useResumeBuilderContext()
  const store = useResumeBuilderStore()

  return {
    ...store,
    resumeId,
  }
}
