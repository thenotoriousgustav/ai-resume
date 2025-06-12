"use client"

import { useEffect } from "react"

import {
  useAutoSaveStatus,
  useResumeBuilderStore,
} from "@/stores/resume-builder-store"

export default function PersonalInfoDemo() {
  const { resumeData, setResumeData } = useResumeBuilderStore()
  const { isAutoSaving, statusText } = useAutoSaveStatus()

  // Initialize resume data if it doesn't exist
  useEffect(() => {
    if (!resumeData) {
      const initialData = {
        id: crypto.randomUUID(),
        user_id: "temp-user",
        education: [],
        experiences: [],
        skills: [],
        personalInfo: {
          fullName: "",
          email: "",
          phone: "",
          linkedIn: "",
          portfolio: "",
          address: "",
          summary: "",
        },
      }
      setResumeData(initialData)
    }
  }, [resumeData, setResumeData])

  if (!resumeData) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="text-center">
          <div className="mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-b-2 border-blue-500"></div>
          <p className="text-gray-500">Loading personal info form...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto max-w-2xl p-6">
      <div className="mb-6">
        <h1 className="mb-2 text-2xl font-bold">Personal Information Demo</h1>
        <p className="text-gray-600">
          Test the auto-save functionality for personal information
        </p>

        {/* Global auto-save status */}
        <div className="mt-4 rounded-lg bg-gray-50 p-3">
          <span
            className={`text-sm ${isAutoSaving ? "text-blue-600" : "text-gray-500"}`}
          >
            {statusText}
          </span>
        </div>
      </div>

      {/* Personal Info Form - You can import this when the restrictions are resolved */}
      <div className="rounded-lg border-2 border-dashed border-gray-300 p-8 text-center">
        <p className="text-gray-500">
          Personal Info Form component ready to use with auto-save
          functionality!
        </p>
        <p className="mt-2 text-sm text-gray-400">
          Import PersonalInfoForm from the forms directory to see it in action.
        </p>
      </div>
    </div>
  )
}
