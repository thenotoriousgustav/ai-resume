"use client"

import { Download } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

import { useResumePreview } from "../hooks/use-resume-preview"
import {
  useResumeBuilderStore,
  useResumeData,
} from "../store/resume-builder-store"

import { EmptyResumePreview } from "./empty-resume-preview"
import { downloadResumePDF } from "./resume-pdf"

export function HtmlResumePreview() {
  const resumeData = useResumeData()
  const { navigateToField } = useResumeBuilderStore()
  const {
    displayName,
    pdfFilename,
    hasObjective,
    hasExperiences,
    hasEducation,
    hasSkills,
    hasCertifications,
    skillsByCategory,
    skillCategories,
  } = useResumePreview()

  const handleDownloadPDF = async () => {
    try {
      await downloadResumePDF(resumeData, pdfFilename)
    } catch (error) {
      console.error("Failed to download PDF:", error)
    }
  }

  // Check if we have any meaningful content
  const hasAnyContent =
    displayName !== "Your Name" ||
    hasObjective ||
    hasExperiences ||
    hasEducation ||
    hasSkills ||
    hasCertifications

  // Show empty state if no content
  if (!hasAnyContent) {
    return <EmptyResumePreview />
  }

  return (
    <div className="flex h-full flex-col">
      {/* Header with download button */}
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold">Preview</h2>
        <Button onClick={handleDownloadPDF} className="flex items-center gap-2">
          <Download size={16} />
          Download PDF
        </Button>
      </div>

      {/* Resume Preview */}
      <Card className="flex-1 overflow-auto">
        <div
          className="resume-preview p-8"
          style={{ minHeight: "11in", width: "8.5in", margin: "0 auto" }}
        >
          {/* Header Section */}
          <div className="mb-6 border-b-2 border-gray-800 pb-4">
            <h1
              className="mb-2 cursor-pointer rounded px-1 text-3xl font-bold text-gray-900 transition-colors hover:bg-gray-100"
              onClick={() => navigateToField("personal", "fullName")}
              title="Click to edit name"
            >
              {displayName}
            </h1>
            <div className="flex flex-wrap gap-4 text-sm text-gray-600">
              {resumeData.personalInfo.email && (
                <span
                  className="cursor-pointer rounded px-1 transition-colors hover:bg-gray-100"
                  onClick={() => navigateToField("personal", "email")}
                  title="Click to edit email"
                >
                  {resumeData.personalInfo.email}
                </span>
              )}
              {resumeData.personalInfo.phone && (
                <span
                  className="cursor-pointer rounded px-1 transition-colors hover:bg-gray-100"
                  onClick={() => navigateToField("personal", "phone")}
                  title="Click to edit phone"
                >
                  {resumeData.personalInfo.phone}
                </span>
              )}
              {resumeData.personalInfo.location && (
                <span
                  className="cursor-pointer rounded px-1 transition-colors hover:bg-gray-100"
                  onClick={() => navigateToField("personal", "location")}
                  title="Click to edit location"
                >
                  {resumeData.personalInfo.location}
                </span>
              )}
              {resumeData.personalInfo.linkedin && (
                <span
                  className="cursor-pointer rounded px-1 transition-colors hover:bg-gray-100"
                  onClick={() => navigateToField("personal", "linkedin")}
                  title="Click to edit LinkedIn"
                >
                  {resumeData.personalInfo.linkedin}
                </span>
              )}
              {resumeData.personalInfo.website && (
                <span
                  className="cursor-pointer rounded px-1 transition-colors hover:bg-gray-100"
                  onClick={() => navigateToField("personal", "website")}
                  title="Click to edit website"
                >
                  {resumeData.personalInfo.website}
                </span>
              )}
            </div>
          </div>

          {/* Objective Section */}
          {hasObjective && (
            <div className="mb-6">
              <h2
                className="mb-3 cursor-pointer rounded border-b border-gray-300 px-1 pb-1 text-xl font-semibold text-gray-900 transition-colors hover:bg-gray-100"
                onClick={() => navigateToField("objective")}
                title="Click to edit objective"
              >
                Professional Summary
              </h2>
              <p
                className="cursor-pointer rounded px-1 leading-relaxed text-gray-700 transition-colors hover:bg-gray-100"
                onClick={() => navigateToField("objective")}
                title="Click to edit objective"
              >
                {resumeData.objective}
              </p>
            </div>
          )}

          {/* Experience Section */}
          {hasExperiences && (
            <div className="mb-6">
              <h2
                className="mb-3 cursor-pointer rounded border-b border-gray-300 px-1 pb-1 text-xl font-semibold text-gray-900 transition-colors hover:bg-gray-100"
                onClick={() => navigateToField("experience")}
                title="Click to edit experiences"
              >
                Professional Experience
              </h2>
              <div className="space-y-4">
                {resumeData.experiences.map((exp) => (
                  <div
                    key={exp.id}
                    className="mb-4 cursor-pointer rounded p-2 transition-colors hover:bg-gray-100"
                    onClick={() => navigateToField("experience")}
                    title="Click to edit this experience"
                  >
                    <div className="mb-1 flex items-start justify-between">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">
                          {exp.position}
                        </h3>
                        <p className="font-medium text-gray-700">
                          {exp.company} • {exp.location}
                        </p>
                      </div>
                      <p className="text-sm text-gray-600">
                        {exp.startDate} -{" "}
                        {exp.isCurrentRole ? "Present" : exp.endDate}
                      </p>
                    </div>
                    {exp.description && (
                      <div className="mt-2 text-sm leading-relaxed text-gray-700">
                        {exp.description
                          .split("\n")
                          .map((line: string, index: number) => (
                            <p key={index} className="mb-1">
                              {line}
                            </p>
                          ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Education Section */}
          {hasEducation && (
            <div className="mb-6">
              <h2
                className="mb-3 cursor-pointer rounded border-b border-gray-300 px-1 pb-1 text-xl font-semibold text-gray-900 transition-colors hover:bg-gray-100"
                onClick={() => navigateToField("education")}
                title="Click to edit education"
              >
                Education
              </h2>
              <div className="space-y-3">
                {resumeData.education.map((edu) => (
                  <div
                    key={edu.id}
                    className="mb-3 cursor-pointer rounded p-2 transition-colors hover:bg-gray-100"
                    onClick={() => navigateToField("education")}
                    title="Click to edit this education"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">
                          {edu.degree} {edu.field}
                        </h3>
                        <p className="font-medium text-gray-700">
                          {edu.institution}
                        </p>
                        {edu.gpa && (
                          <p className="text-sm text-gray-600">
                            GPA: {edu.gpa}
                          </p>
                        )}
                      </div>
                      <p className="text-sm text-gray-600">
                        {edu.startDate} -{" "}
                        {edu.isCurrently ? "Present" : edu.endDate}
                      </p>
                    </div>
                    {edu.description && (
                      <p className="mt-1 text-sm text-gray-700">
                        {edu.description}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Skills Section */}
          {hasSkills && (
            <div className="mb-6">
              <h2
                className="mb-3 cursor-pointer rounded border-b border-gray-300 px-1 pb-1 text-xl font-semibold text-gray-900 transition-colors hover:bg-gray-100"
                onClick={() => navigateToField("skills")}
                title="Click to edit skills"
              >
                Skills
              </h2>
              <div className="grid grid-cols-1 gap-3">
                {/* Group skills by category */}
                {skillCategories.map((category: string) => (
                  <div
                    key={category}
                    className="mb-2 cursor-pointer rounded p-1 transition-colors hover:bg-gray-100"
                    onClick={() => navigateToField("skills")}
                    title="Click to edit skills"
                  >
                    <h4 className="mb-1 font-medium text-gray-900">
                      {category}:
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {skillsByCategory[category].map((skill) => (
                        <span key={skill.id} className="text-sm text-gray-700">
                          {skill.name}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Certifications Section */}
          {hasCertifications && (
            <div className="mb-6">
              <h2
                className="mb-3 cursor-pointer rounded border-b border-gray-300 px-1 pb-1 text-xl font-semibold text-gray-900 transition-colors hover:bg-gray-100"
                onClick={() => navigateToField("certifications")}
                title="Click to edit certifications"
              >
                Certifications
              </h2>
              <div className="space-y-3">
                {resumeData.certifications.map((cert) => (
                  <div
                    key={cert.id}
                    className="mb-3 cursor-pointer rounded p-2 transition-colors hover:bg-gray-100"
                    onClick={() => navigateToField("certifications")}
                    title="Click to edit this certification"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">
                          {cert.name}
                        </h3>
                        <p className="font-medium text-gray-700">
                          {cert.issuer}
                        </p>
                        {cert.credentialId && (
                          <p className="text-sm text-gray-600">
                            Credential ID: {cert.credentialId}
                          </p>
                        )}
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-gray-600">
                          Issued: {cert.issueDate}
                        </p>
                        {cert.expirationDate && (
                          <p className="text-sm text-gray-600">
                            Expires: {cert.expirationDate}
                          </p>
                        )}
                      </div>
                    </div>
                    {cert.url && (
                      <p className="mt-1 text-sm text-blue-600">
                        <a
                          href={cert.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                        >
                          View Certificate
                        </a>
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </Card>
    </div>
  )
}
