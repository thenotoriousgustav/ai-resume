import React from "react"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface ResumeAnalysisResultProps {
  object: {
    keywords?: {
      missing?: string[]
      present?: string[]
      suggestions?: string[]
    }
    suggestions?: Array<{
      section: string
      improvement: string
      priority: "high" | "medium" | "low"
    }>
    jobTitleMissing?: Array<{
      title: string
      relevance: string
      where: string
    }>
    matchScore?: number
  } | null
  jobDescription?: string
}

function highlightKeywords(text: string, keywords: string[]): string {
  if (!keywords || keywords.length === 0) return text

  const pattern = new RegExp(`\\b(${keywords.join("|")})\\b`, "gi")
  return text.replace(
    pattern,
    (match) => `<mark style="background-color: yellow;">${match}</mark>`
  )
}

export default function ResumeAnalysisResult({
  object,
  jobDescription = "",
}: ResumeAnalysisResultProps) {
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800"
      case "medium":
        return "bg-yellow-100 text-yellow-800"
      case "low":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const highlightedJobDescription = object?.keywords?.present
    ? highlightKeywords(jobDescription, object.keywords.present)
    : jobDescription

  if (!object) {
    return (
      <div className="text-muted-foreground py-8 text-center">
        <p>No analysis data available.</p>
      </div>
    )
  }

  return (
    <Tabs defaultValue="results" className="w-full">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="results">Analysis Results</TabsTrigger>
        <TabsTrigger value="job-description">Job Description</TabsTrigger>
      </TabsList>

      <TabsContent value="results" className="mt-6 space-y-6">
        {/* Match Score */}
        {object.matchScore !== undefined && (
          <Card>
            <CardHeader>
              <CardTitle>Match Score</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-blue-600">
                {Math.round(object.matchScore)}%
              </div>
            </CardContent>
          </Card>
        )}

        {/* Keywords */}
        {object.keywords && (
          <Card>
            <CardHeader>
              <CardTitle>Keywords Analysis</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {object.keywords.missing &&
                object.keywords.missing.length > 0 && (
                  <div>
                    <h4 className="mb-2 font-semibold text-red-600">
                      Missing Keywords
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {object.keywords.missing.map((keyword, index) => (
                        <Badge key={index} variant="destructive">
                          {keyword}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

              {object.keywords.present &&
                object.keywords.present.length > 0 && (
                  <div>
                    <h4 className="mb-2 font-semibold text-green-600">
                      Present Keywords
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {object.keywords.present.map((keyword, index) => (
                        <Badge
                          key={index}
                          variant="secondary"
                          className="bg-green-100 text-green-800"
                        >
                          {keyword}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

              {object.keywords.suggestions &&
                object.keywords.suggestions.length > 0 && (
                  <div>
                    <h4 className="mb-2 font-semibold text-blue-600">
                      Suggested Keywords
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {object.keywords.suggestions.map((keyword, index) => (
                        <Badge
                          key={index}
                          variant="outline"
                          className="border-blue-200 text-blue-700"
                        >
                          {keyword}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
            </CardContent>
          </Card>
        )}

        {/* Improvement Suggestions */}
        {object.suggestions && object.suggestions.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Improvement Suggestions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {object.suggestions.map((suggestion, index) => (
                  <div
                    key={index}
                    className="border-l-4 border-blue-200 py-2 pl-4"
                  >
                    <div className="mb-1 flex items-center gap-2">
                      <span className="font-medium">{suggestion.section}</span>
                      <Badge className={getPriorityColor(suggestion.priority)}>
                        {suggestion.priority}
                      </Badge>
                    </div>
                    <p className="text-gray-700">{suggestion.improvement}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Missing Job Titles */}
        {object.jobTitleMissing && object.jobTitleMissing.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Missing Job Titles</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {object.jobTitleMissing.map((job, index) => (
                  <div key={index} className="rounded-lg border bg-gray-50 p-3">
                    <h4 className="font-semibold text-gray-800">{job.title}</h4>
                    <p className="mt-1 text-sm text-gray-600">
                      {job.relevance}
                    </p>
                    <p className="mt-1 text-xs text-blue-600">
                      Suggested location: {job.where}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </TabsContent>

      <TabsContent value="job-description" className="mt-6">
        <Card>
          <CardHeader>
            <CardTitle>Job Description</CardTitle>
            <p className="text-muted-foreground text-sm">
              Keywords found in your resume are highlighted in yellow
            </p>
          </CardHeader>
          <CardContent>
            <div
              className="border-input bg-background ring-offset-background min-h-[400px] w-full rounded-md border px-3 py-2 text-sm whitespace-pre-wrap"
              dangerouslySetInnerHTML={{ __html: highlightedJobDescription }}
            />
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  )
}
