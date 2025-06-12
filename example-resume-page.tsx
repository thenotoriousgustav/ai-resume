"use client"

import { useParams } from "next/navigation"
import { useEffect } from "react"

import { useAutoSaveStatus, useResumeStore } from "@/stores/resume-store"

export default function ResumePage() {
  const { resume, setResume, updateField } = useResumeStore()
  const { isAutoSaving, statusText, autoSaveEnabled } = useAutoSaveStatus()
  const { id } = useParams()

  // Fetch resume by ID
  useEffect(() => {
    const fetchResume = async () => {
      try {
        const { createClient } = await import("@supabase/supabase-js")

        const supabase = createClient(
          process.env.NEXT_PUBLIC_SUPABASE_URL!,
          process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
        )

        const { data } = await supabase
          .from("resumes")
          .select("*")
          .eq("id", id)
          .single()

        if (data) {
          setResume(data)
        }
      } catch (error) {
        console.error("Error fetching resume:", error)
      }
    }

    if (id) {
      fetchResume()
    }
  }, [id, setResume])

  if (!resume) {
    return (
      <div className="mx-auto max-w-2xl p-6">
        <p>Loading...</p>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-2xl space-y-6 p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Resume Builder</h1>

        {/* Auto-save status indicator */}
        <div className="flex items-center space-x-2">
          {isAutoSaving && (
            <div className="h-4 w-4 animate-spin rounded-full border-2 border-blue-500 border-t-transparent"></div>
          )}
          <span
            className={`text-sm ${
              isAutoSaving
                ? "text-blue-600"
                : autoSaveEnabled
                  ? "text-green-600"
                  : "text-gray-500"
            }`}
          >
            {statusText}
          </span>
        </div>
      </div>

      <div>
        <label className="mb-1 block font-semibold">Title</label>
        <input
          type="text"
          className="w-full rounded border border-gray-300 p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          value={resume.title}
          onChange={(e) => updateField("title", e.target.value)}
          placeholder="Enter resume title..."
        />
      </div>

      <div>
        <label className="mb-1 block font-semibold">Summary</label>
        <textarea
          className="w-full rounded border border-gray-300 p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          rows={3}
          value={resume.summary}
          onChange={(e) => updateField("summary", e.target.value)}
          placeholder="Enter a brief summary..."
        />
      </div>

      <div>
        <label className="mb-1 block font-semibold">Experience</label>
        <textarea
          className="w-full rounded border border-gray-300 p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          rows={6}
          value={resume.experience}
          onChange={(e) => updateField("experience", e.target.value)}
          placeholder="Enter your work experience..."
        />
      </div>

      <div className="rounded-lg bg-gray-50 p-4">
        <h3 className="mb-2 font-semibold">Auto-save Settings</h3>
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            id="autoSave"
            checked={autoSaveEnabled}
            onChange={() => useResumeStore.getState().toggleAutoSave()}
            className="rounded"
          />
          <label htmlFor="autoSave" className="text-sm">
            Enable auto-save (saves automatically as you type)
          </label>
        </div>
      </div>
    </div>
  )
}
