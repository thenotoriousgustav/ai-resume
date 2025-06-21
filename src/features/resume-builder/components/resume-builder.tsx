"use client"

import { useEffect, useState } from "react"

import { DBResumeBuilder } from "@/types/database"

import { useAutoSave } from "../hooks/use-auto-save"
import { getResumeBuilder } from "../server/queries/get-resume-builder"
import {
  useLoadingState,
  useResumeBuilderStore,
} from "../store/resume-builder-store"

import { HtmlResumePreview } from "./html-resume-preview"
import { ResumeTabsPanel } from "./resume-tabs-panel"
import type {
  Certification,
  Education,
  Experience,
  PersonalInfo,
  ResumeBuilderData,
  Skill,
} from "./types"

interface ResumeBuilderProps {
  resumeId: string
}

export function ResumeBuilder({ resumeId }: ResumeBuilderProps) {
  // Zustand store
  const {
    setResumeData,
    updateField,
    setIsLoading,
    setIsSaving,
    setLastSaved,
    setSaveError,
  } = useResumeBuilderStore()

  const { isLoading, isSaving, lastSaved, saveError } = useLoadingState()

  // Track changed fields for auto-save
  const [changedFields, setChangedFields] = useState<Partial<DBResumeBuilder>>(
    {}
  )

  const {
    isSaving: autoSaveStatus,
    lastSaved: autoSaveLastSaved,
    saveError: autoSaveError,
  } = useAutoSave(resumeId, changedFields)

  // Sync auto-save status with store
  useEffect(() => {
    setIsSaving(autoSaveStatus)
    setLastSaved(autoSaveLastSaved)
    setSaveError(autoSaveError)
  }, [
    autoSaveStatus,
    autoSaveLastSaved,
    autoSaveError,
    setIsSaving,
    setLastSaved,
    setSaveError,
  ])

  useEffect(() => {
    const loadResumeData = async () => {
      setIsLoading(true)
      try {
        const [dbResume, dbResumeError] = await getResumeBuilder(resumeId)

        if (dbResumeError) {
          console.error("Failed to load resume data:", dbResumeError)
          return
        }

        if (dbResume) {
          setResumeData({
            id: dbResume.id,
            title: dbResume.title || "",
            template: dbResume.template,
            personalInfo:
              (dbResume.personal_info as unknown as PersonalInfo) || {
                fullName: "",
                email: "",
                phone: "",
                location: "",
                linkedin: "",
                website: "",
              },
            objective: dbResume.objective || "",
            experiences:
              (dbResume.experiences as unknown as Experience[]) || [],
            education: (dbResume.education as unknown as Education[]) || [],
            skills: (dbResume.skills as unknown as Skill[]) || [],
            certifications:
              (dbResume.certifications as unknown as Certification[]) || [],
          })
        }
      } catch (error) {
        console.error("Failed to load resume data:", error)
      } finally {
        setIsLoading(false)
      }
    }

    loadResumeData()
  }, [resumeId, setResumeData, setIsLoading])

  const handleUpdateField = <K extends keyof ResumeBuilderData>(
    field: K,
    value: ResumeBuilderData[K]
  ) => {
    // Update in store
    updateField(field, value)

    // Map the field to database field names for auto-save
    const dbFieldMap: Record<string, string> = {
      title: "title",
      personalInfo: "personal_info",
      objective: "objective",
      experiences: "experiences",
      education: "education",
      skills: "skills",
      certifications: "certifications",
    }

    const dbField = dbFieldMap[field as string] || field
    setChangedFields((prev) => ({ ...prev, [dbField]: value }))
  }

  if (isLoading) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="text-center">
          <div className="border-primary mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-b-2"></div>
          <p>Loading resume...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex h-full gap-6 p-6">
      {/* Left side - Tabs Panel */}
      <div className="flex-1">
        <ResumeTabsPanel
          handleUpdateField={handleUpdateField}
          isSaving={isSaving}
          lastSaved={lastSaved}
          saveError={saveError}
        />
      </div>

      {/* Right side - Preview */}
      <div className="flex-1">
        <HtmlResumePreview />
      </div>
    </div>
  )
}
