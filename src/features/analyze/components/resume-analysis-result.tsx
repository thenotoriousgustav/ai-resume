import {
  AwardIcon,
  BriefcaseIcon,
  ClipboardListIcon,
  CodeIcon,
  FileTextIcon,
  GraduationCapIcon,
  PenToolIcon,
  PlusIcon,
  UserIcon,
  UsersIcon,
} from "lucide-react"
import React from "react"
import { z } from "zod"

import { Badge } from "@/components/ui/badge"

import { resumeAnalysisSchema } from "../schema/analysis-result-schema"

interface ResumeAnalysisResultProps {
  analysis: z.infer<typeof resumeAnalysisSchema> | null
}

export default function ResumeAnalysisResult({
  analysis,
}: ResumeAnalysisResultProps) {
  // If analysis is not available yet
  if (!analysis) return null

  // Get score color based on value
  const getScoreColor = (score: number) => {
    if (score >= 90) return "text-green-600"
    if (score >= 70) return "text-yellow-600"
    return "text-red-600"
  }

  // Get score background color based on value
  const getScoreBgColor = (score: number) => {
    if (score >= 90) return "bg-green-100 text-green-800"
    if (score >= 70) return "bg-yellow-100 text-yellow-800"
    return "bg-red-100 text-red-800"
  }

  // Get section icon
  const getSectionIcon = (sectionName: string) => {
    const name = sectionName.toLowerCase()
    if (name.includes("contact")) return <UserIcon className="h-5 w-5" />
    if (name.includes("summary") || name.includes("professional"))
      return <ClipboardListIcon className="h-5 w-5" />
    if (name.includes("work") || name.includes("experience"))
      return <BriefcaseIcon className="h-5 w-5" />
    if (name.includes("education"))
      return <GraduationCapIcon className="h-5 w-5" />
    if (name.includes("skill")) return <CodeIcon className="h-5 w-5" />
    if (name.includes("achievement")) return <AwardIcon className="h-5 w-5" />
    if (name.includes("organizational") || name.includes("activities"))
      return <UsersIcon className="h-5 w-5" />
    if (name.includes("writing") || name.includes("quality"))
      return <PenToolIcon className="h-5 w-5" />
    if (name.includes("additional")) return <PlusIcon className="h-5 w-5" />
    return <FileTextIcon className="h-5 w-5" />
  }

  return (
    <div className="space-y-6">
      {/* Overall Score */}
      <div className="rounded-lg border bg-white p-6 shadow-sm">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold">Overall Score</h2>
          <div
            className={`text-3xl font-bold ${getScoreColor(analysis.overall_score)}`}
          >
            {analysis.overall_score}%
          </div>
        </div>
        <p className="mt-2 text-gray-600">{analysis.overall_impression}</p>
      </div>

      {/* Section Analysis */}
      <div className="rounded-lg border bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-xl font-bold">Section Analysis</h2>

        <div className="space-y-4">
          {analysis.sections.map((section, index: number) => (
            <div key={index} className="rounded-lg border p-4">
              <div className="mb-3 flex items-center justify-between">
                <div className="flex items-center">
                  <div className="mr-3 text-gray-600">
                    {getSectionIcon(section.name)}
                  </div>
                  <h3 className="text-lg font-semibold">{section.name}</h3>
                </div>
                <Badge className={getScoreBgColor(section.score)}>
                  {section.score}%
                </Badge>
              </div>

              <div className="mb-4">
                <h4 className="mb-2 font-medium text-gray-700">Analysis</h4>
                <p className="text-gray-600">{section.analysis}</p>
              </div>

              <div className="mb-4">
                <h4 className="mb-2 font-medium text-gray-700">
                  Action Points
                </h4>
                <ul className="list-inside list-disc space-y-1">
                  {section.action_points.map((point, pointIndex) => (
                    <li key={pointIndex} className="text-sm text-gray-600">
                      {point}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-md bg-blue-50 p-3">
                <h4 className="mb-1 font-medium text-blue-800">
                  Why It's Important
                </h4>
                <p className="text-sm text-blue-700">{section.importance}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Keywords */}
      <div className="rounded-lg border bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-xl font-bold">Keywords</h2>

        <div className="space-y-4">
          <div>
            <h3 className="mb-2 text-sm font-medium text-gray-600">
              Job Titles
            </h3>
            <div className="flex flex-wrap gap-2">
              {analysis.keywords.job_titles.map(
                (keyword: string, index: number) => (
                  <Badge
                    key={index}
                    variant="outline"
                    className="border-blue-200 bg-blue-50 text-blue-700"
                  >
                    {keyword}
                  </Badge>
                )
              )}
            </div>
          </div>

          <div>
            <h3 className="mb-2 text-sm font-medium text-gray-600">Skills</h3>
            <div className="flex flex-wrap gap-2">
              {analysis.keywords.skills.map(
                (keyword: string, index: number) => (
                  <Badge
                    key={index}
                    variant="outline"
                    className="border-green-200 bg-green-50 text-green-700"
                  >
                    {keyword}
                  </Badge>
                )
              )}
            </div>
          </div>

          <div>
            <h3 className="mb-2 text-sm font-medium text-gray-600">
              Career Paths
            </h3>
            <div className="flex flex-wrap gap-2">
              {analysis.keywords.career_paths.map(
                (keyword: string, index: number) => (
                  <Badge
                    key={index}
                    variant="outline"
                    className="border-purple-200 bg-purple-50 text-purple-700"
                  >
                    {keyword}
                  </Badge>
                )
              )}
            </div>
          </div>

          <div>
            <h3 className="mb-2 text-sm font-medium text-gray-600">
              Professional Summaries
            </h3>
            <div className="flex flex-wrap gap-2">
              {analysis.keywords.professional_summaries.map(
                (keyword: string, index: number) => (
                  <Badge
                    key={index}
                    variant="outline"
                    className="border-orange-200 bg-orange-50 text-orange-700"
                  >
                    {keyword}
                  </Badge>
                )
              )}
            </div>
          </div>

          <div>
            <h3 className="mb-2 text-sm font-medium text-gray-600">
              Additional Keywords
            </h3>
            <div className="flex flex-wrap gap-2">
              {analysis.keywords.additional_keywords.map(
                (keyword: string, index: number) => (
                  <Badge
                    key={index}
                    variant="outline"
                    className="border-gray-200 bg-gray-50 text-gray-700"
                  >
                    {keyword}
                  </Badge>
                )
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Career Recommendation */}
      <div className="rounded-lg border bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-xl font-bold">Career Recommendation</h2>
        <div className="rounded-lg border border-blue-200 bg-gradient-to-r from-blue-50 to-indigo-50 p-4">
          <p className="leading-relaxed text-gray-700">
            {analysis.career_recommendation}
          </p>
        </div>
      </div>
    </div>
  )
}
