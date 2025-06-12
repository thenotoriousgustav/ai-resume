"use client"

import { useEffect } from "react"

import { useResumeStore } from "@/stores/resume-builder-store"

import PersonalInfoForm from "./personal-info-form"
import { SaveIndicator } from "./save-indicator"

interface TestResumeBuilderProps {
  id: string
}

export default function TestResumeBuilder({ id }: TestResumeBuilderProps) {
  const { loadResume, createNewResume, resumeData } = useResumeStore()

  useEffect(() => {
    if (id === "new") {
      createNewResume()
    } else {
      loadResume(id)
    }
  }, [id, loadResume, createNewResume])

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Resume Builder</h1>
            <p className="mt-2 text-gray-600">
              Build your professional resume step by step
            </p>
          </div>
          <SaveIndicator />
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          {/* Form Section */}
          <div className="space-y-8">
            <div className="rounded-lg bg-white p-6 shadow-sm">
              <PersonalInfoForm />
            </div>

            {/* Placeholder for other sections */}
            <div className="rounded-lg bg-white p-6 shadow-sm">
              <h3 className="mb-4 text-lg font-semibold text-gray-900">
                Other Sections (Coming Soon)
              </h3>
              <div className="space-y-3 text-sm text-gray-600">
                <p>• Professional Summary/Objective</p>
                <p>• Work Experience</p>
                <p>• Education</p>
                <p>• Skills</p>
                <p>• Certifications</p>
              </div>
            </div>
          </div>

          {/* Preview Section */}
          <div className="lg:sticky lg:top-8 lg:h-fit">
            <div className="rounded-lg bg-white p-6 shadow-sm">
              <h3 className="mb-4 text-lg font-semibold text-gray-900">
                Resume Preview
              </h3>
              <div className="min-h-[600px] rounded border-2 border-dashed border-gray-300 bg-gray-50 p-4">
                <div className="text-center text-gray-500">
                  <p className="mb-4 text-sm">Preview will appear here</p>

                  {/* Basic preview of personal info */}
                  {resumeData.personal_info.fullName && (
                    <div className="space-y-2 text-left">
                      <h4 className="text-xl font-bold text-gray-900">
                        {resumeData.personal_info.fullName}
                      </h4>
                      {resumeData.personal_info.email && (
                        <p className="text-sm text-gray-600">
                          {resumeData.personal_info.email}
                        </p>
                      )}
                      {resumeData.personal_info.phone && (
                        <p className="text-sm text-gray-600">
                          {resumeData.personal_info.phone}
                        </p>
                      )}
                      {resumeData.personal_info.location && (
                        <p className="text-sm text-gray-600">
                          {resumeData.personal_info.location}
                        </p>
                      )}
                      <div className="flex flex-wrap gap-2 text-xs">
                        {resumeData.personal_info.website && (
                          <a
                            href={resumeData.personal_info.website}
                            className="text-blue-600 hover:underline"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            Website
                          </a>
                        )}
                        {resumeData.personal_info.linkedin && (
                          <a
                            href={resumeData.personal_info.linkedin}
                            className="text-blue-600 hover:underline"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            LinkedIn
                          </a>
                        )}
                        {resumeData.personal_info.github && (
                          <a
                            href={resumeData.personal_info.github}
                            className="text-blue-600 hover:underline"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            GitHub
                          </a>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
