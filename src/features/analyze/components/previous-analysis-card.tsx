"use client"

import React from "react"

import { DbResumeAnalysis } from "@/types/database"

interface PreviousAnalysisCardProps {
  analysis: DbResumeAnalysis
  onRegenerateClick?: () => void
  isRegenerating?: boolean
}

export default function PreviousAnalysisCard({
  analysis,
  onRegenerateClick: _onRegenerateClick,
  isRegenerating: _isRegenerating,
}: PreviousAnalysisCardProps) {
  const formatDate = (dateString: string | null) => {
    if (!dateString) return "Unknown date"
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-600 bg-green-100"
    if (score >= 60) return "text-yellow-600 bg-yellow-100"
    return "text-red-600 bg-red-100"
  }

  return (
    <div className="rounded-md border border-blue-200 bg-gradient-to-r from-blue-50 to-indigo-50 p-4">
      <div className="flex items-start justify-between">
        <div className="flex items-center space-x-3">
          <div className="flex-shrink-0">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100">
              <svg
                className="h-6 w-6 text-blue-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-blue-900">
              Previous Analysis Available
            </h3>
            <div className="mt-1 flex items-center space-x-2">
              <span
                className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${getScoreColor(analysis.overall_score)}`}
              >
                Score: {analysis.overall_score}/100
              </span>
              <span className="text-xs text-blue-600">
                {formatDate(analysis.analysis_date || analysis.updated_at)}
              </span>
            </div>
            {analysis.language && (
              <span className="mt-2 inline-flex items-center rounded-full bg-gray-100 px-2 py-1 text-xs font-medium text-gray-800">
                {analysis.language}
              </span>
            )}
          </div>
        </div>
        <div className="flex-shrink-0">
          <span className="inline-flex items-center rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-800">
            <div className="mr-1 h-2 w-2 rounded-full bg-green-400"></div>
            Saved
          </span>
        </div>
      </div>

      {analysis.overall_impression && (
        <div className="mt-3 rounded-md bg-white/50 p-3">
          <p className="text-sm text-gray-700">
            <span className="font-medium">Previous feedback:</span>{" "}
            {analysis.overall_impression}
          </p>
        </div>
      )}
    </div>
  )
}
