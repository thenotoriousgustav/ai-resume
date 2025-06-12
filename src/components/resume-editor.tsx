"use client"

import { useParams } from "next/navigation"
import { useEffect } from "react"

import { useAutoSaveStatus, useResumeStore } from "@/stores/resume-store"

export default function ResumeEditor() {
  const { resume, setResume, updateField, toggleAutoSave } = useResumeStore()
  const { isAutoSaving, statusText, autoSaveEnabled } = useAutoSaveStatus()
  const { id } = useParams()

  // Fetch resume by ID (you'll need to implement this based on your data source)
  useEffect(() => {
    const fetchResume = async () => {
      // Replace this with your actual data fetching logic
      // For example, from Supabase or your API
      const mockResume = {
        id: id as string,
        title: "Software Engineer",
        summary: "Experienced developer...",
        experience: "Company A - 2020-2023...",
      }
      setResume(mockResume)
    }

    if (id) {
      fetchResume()
    }
  }, [id, setResume])

  if (!resume) return <p>Loading...</p>

  return (
    <div className="mx-auto max-w-2xl space-y-6 p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Resume Builder</h1>

        {/* Auto-save status and toggle */}
        <div className="flex items-center gap-4">
          <span
            className={`text-sm ${isAutoSaving ? "text-blue-600" : "text-gray-500"}`}
          >
            {statusText}
          </span>
          <button
            onClick={toggleAutoSave}
            className={`rounded px-3 py-1 text-xs ${
              autoSaveEnabled
                ? "bg-green-100 text-green-700"
                : "bg-gray-100 text-gray-700"
            }`}
          >
            Auto-save: {autoSaveEnabled ? "ON" : "OFF"}
          </button>
        </div>
      </div>

      <div>
        <label className="mb-2 block font-semibold">Title</label>
        <input
          type="text"
          className="w-full rounded border border-gray-300 p-2 focus:border-transparent focus:ring-2 focus:ring-blue-500"
          value={resume.title}
          onChange={(e) => updateField("title", e.target.value)}
          placeholder="Enter resume title..."
        />
      </div>

      <div>
        <label className="mb-2 block font-semibold">Summary</label>
        <textarea
          className="w-full rounded border border-gray-300 p-2 focus:border-transparent focus:ring-2 focus:ring-blue-500"
          rows={3}
          value={resume.summary}
          onChange={(e) => updateField("summary", e.target.value)}
          placeholder="Enter professional summary..."
        />
      </div>

      <div>
        <label className="mb-2 block font-semibold">Experience</label>
        <textarea
          className="w-full rounded border border-gray-300 p-2 focus:border-transparent focus:ring-2 focus:ring-blue-500"
          rows={6}
          value={resume.experience}
          onChange={(e) => updateField("experience", e.target.value)}
          placeholder="Enter work experience..."
        />
      </div>

      {/* Auto-save indicator */}
      {isAutoSaving && (
        <div className="fixed right-4 bottom-4 rounded-lg bg-blue-500 px-4 py-2 text-white shadow-lg">
          <div className="flex items-center gap-2">
            <div className="h-4 w-4 animate-spin rounded-full border-b-2 border-white"></div>
            Saving...
          </div>
        </div>
      )}
    </div>
  )
}
