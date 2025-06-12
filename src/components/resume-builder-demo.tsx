"use client"

import { useParams } from "next/navigation"
import { useEffect } from "react"

import EducationForm from "@/features/resume-builder/components/forms/education-form"
import {
  useAutoSaveStatus,
  useResumeBuilderStore,
} from "@/stores/resume-builder-store"

import PersonalInfoForm from "../features/resume-builder/components/forms/personal-info-form"

export default function ResumeBuilderPage() {
  const { resumeData, setResumeData } = useResumeBuilderStore()
  const { isAutoSaving, statusText } = useAutoSaveStatus()
  const { id } = useParams()

  // Initialize resume data if it doesn't exist
  useEffect(() => {
    if (!resumeData) {
      const initialData = {
        id: (id as string) || crypto.randomUUID(),
        user_id: "temp-user", // Replace with actual user ID
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
  }, [id, resumeData, setResumeData])

  if (!resumeData) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="text-center">
          <div className="mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-b-2 border-blue-500"></div>
          <p className="text-gray-500">Loading resume builder...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto max-w-4xl p-6">
      <div className="mb-6">
        <h1 className="mb-2 text-3xl font-bold">Resume Builder</h1>
        <p className="text-gray-600">
          Build your professional resume with auto-save functionality
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

      {/* Personal Info Section */}
      <div className="mb-8">
        <PersonalInfoForm />
      </div>

      {/* Education Section */}
      <div className="mb-8">
        <EducationForm />
      </div>

      {/* You can add more sections here */}
      {/* <ExperienceForm /> */}
      {/* <SkillsForm /> */}
    </div>
  )
}
