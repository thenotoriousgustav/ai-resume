"use client"

import { AlertCircle, Brain, CheckCircle, XCircle } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

interface ReviewItem {
  id: string
  title: string
  status: "good" | "warning" | "error"
  description: string
  suggestion?: string
}

const mockReviewData: ReviewItem[] = [
  {
    id: "1",
    title: "Professional Summary",
    status: "good",
    description: "Strong professional summary with clear value proposition",
  },
  {
    id: "2",
    title: "Work Experience",
    status: "warning",
    description: "Consider adding quantified achievements",
    suggestion:
      "Include specific numbers, percentages, or metrics to demonstrate impact",
  },
  {
    id: "3",
    title: "Skills Section",
    status: "error",
    description: "Missing relevant technical skills",
    suggestion:
      "Add programming languages, frameworks, or tools relevant to your target role",
  },
  {
    id: "4",
    title: "Education",
    status: "good",
    description: "Education section is complete and well-formatted",
  },
]

const getStatusIcon = (status: string) => {
  switch (status) {
    case "good":
      return <CheckCircle className="h-4 w-4 text-green-500" />
    case "warning":
      return <AlertCircle className="h-4 w-4 text-yellow-500" />
    case "error":
      return <XCircle className="h-4 w-4 text-red-500" />
    default:
      return null
  }
}

const getStatusColor = (status: string) => {
  switch (status) {
    case "good":
      return "border-green-200 bg-green-50"
    case "warning":
      return "border-yellow-200 bg-yellow-50"
    case "error":
      return "border-red-200 bg-red-50"
    default:
      return "border-gray-200 bg-gray-50"
  }
}

export function AIReviewPanel() {
  const totalItems = mockReviewData.length
  const goodItems = mockReviewData.filter(
    (item) => item.status === "good"
  ).length
  const warningItems = mockReviewData.filter(
    (item) => item.status === "warning"
  ).length
  const errorItems = mockReviewData.filter(
    (item) => item.status === "error"
  ).length

  const overallScore = Math.round((goodItems / totalItems) * 100)

  return (
    <div className="space-y-6">
      {/* Overall Score */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5" />
            AI Review Score
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="text-center">
              <div className="text-primary text-3xl font-bold">
                {overallScore}%
              </div>
              <p className="text-muted-foreground text-sm">
                Overall Resume Score
              </p>
            </div>
            <Progress value={overallScore} className="w-full" />
            <div className="flex justify-between text-sm">
              <span className="text-green-600">{goodItems} Good</span>
              <span className="text-yellow-600">
                {warningItems} Needs Improvement
              </span>
              <span className="text-red-600">{errorItems} Issues</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Review Items */}
      <Card>
        <CardHeader>
          <CardTitle>Detailed Review</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {mockReviewData.map((item) => (
            <div
              key={item.id}
              className={`rounded-lg border p-4 ${getStatusColor(item.status)}`}
            >
              <div className="flex items-start gap-3">
                {getStatusIcon(item.status)}
                <div className="flex-1 space-y-2">
                  <h4 className="font-medium">{item.title}</h4>
                  <p className="text-muted-foreground text-sm">
                    {item.description}
                  </p>
                  {item.suggestion && (
                    <div className="rounded-md bg-white/50 p-3">
                      <p className="text-sm">
                        <strong>Suggestion:</strong> {item.suggestion}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <Card>
        <CardContent className="p-6">
          <div className="flex gap-3">
            <Button className="flex-1">Apply AI Suggestions</Button>
            <Button variant="outline" className="flex-1">
              Generate New Review
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
