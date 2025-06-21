"use client"

import { FileText, Plus } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

interface EmptyResumePreviewProps {
  onGetStarted?: () => void
}

export function EmptyResumePreview({ onGetStarted }: EmptyResumePreviewProps) {
  return (
    <Card className="h-full flex-1">
      <CardContent className="flex h-full flex-col items-center justify-center p-8 text-center">
        <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-gray-100">
          <FileText size={48} className="text-gray-400" />
        </div>

        <h3 className="mb-2 text-xl font-semibold text-gray-900">
          Your Resume Preview
        </h3>

        <p className="mb-6 max-w-md text-gray-600">
          Start building your professional resume by filling out the form on the
          left. Your changes will appear here in real-time.
        </p>

        {onGetStarted && (
          <Button onClick={onGetStarted} className="flex items-center gap-2">
            <Plus size={16} />
            Get Started
          </Button>
        )}

        <div className="mt-8 text-sm text-gray-500">
          <p>✨ Real-time preview</p>
          <p>📄 Professional formatting</p>
          <p>⬇️ Download as PDF</p>
        </div>
      </CardContent>
    </Card>
  )
}
