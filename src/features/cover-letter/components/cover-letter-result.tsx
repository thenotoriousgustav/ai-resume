"use client"

import { Copy, RefreshCw } from "lucide-react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { DbCoverLetter } from "@/types/database"

interface CoverLetterResultProps {
  completion?: string
  isLoading?: boolean
  showingPrevious?: boolean
  onRegenerate?: () => void
  existingCoverLetter?: DbCoverLetter | null
}

export default function CoverLetterResult({
  completion,
  isLoading,
  showingPrevious = false,
  onRegenerate,
  existingCoverLetter,
}: CoverLetterResultProps) {
  const copyToClipboard = async () => {
    if (completion) {
      await navigator.clipboard.writeText(completion)
      toast.success("Cover letter copied to clipboard!")
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  return (
    <div className="flex h-full w-full flex-col rounded-lg border bg-white shadow-sm">
      <div className="flex items-center justify-between border-b p-4">
        <div className="flex flex-col">
          <h2 className="text-xl font-semibold">
            {showingPrevious
              ? "Previous Cover Letter"
              : "Generated Cover Letter"}
          </h2>
          {showingPrevious &&
            existingCoverLetter &&
            existingCoverLetter.generated_at && (
              <p className="text-sm text-gray-500">
                Generated on {formatDate(existingCoverLetter.generated_at)}
              </p>
            )}
        </div>

        <div className="flex gap-2">
          {isLoading ? (
            <div className="text-sm text-gray-500">Generating...</div>
          ) : completion && !isLoading ? (
            <>
              {showingPrevious && onRegenerate && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={onRegenerate}
                  className="flex items-center gap-2"
                >
                  <RefreshCw className="h-4 w-4" />
                  Regenerate
                </Button>
              )}
              <Button
                variant="outline"
                size="sm"
                onClick={copyToClipboard}
                className="flex items-center gap-2"
              >
                <Copy className="h-4 w-4" />
                Copy
              </Button>
            </>
          ) : null}
        </div>
      </div>

      {showingPrevious && (
        <div className="border-b bg-blue-50 p-3">
          <p className="text-sm text-blue-700">
            This cover letter was previously generated. Click "Regenerate" to
            create a new one.
          </p>
        </div>
      )}

      <div className="flex-1 overflow-y-auto p-6">
        {completion ? (
          <div className="prose max-w-none">
            <div className="leading-relaxed whitespace-pre-wrap">
              {completion}
            </div>
          </div>
        ) : (
          <div className="flex h-full items-center justify-center text-center text-gray-500">
            <div>
              <p className="mb-2 text-lg">
                Ready to generate your cover letter
              </p>
              <p className="text-sm">
                Fill out the job details and click "Save & Generate Cover
                Letter"
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
