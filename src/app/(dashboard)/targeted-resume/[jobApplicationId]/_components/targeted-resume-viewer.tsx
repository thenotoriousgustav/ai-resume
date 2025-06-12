"use client"

import "react-pdf/dist/esm/Page/AnnotationLayer.css"
import "react-pdf/dist/esm/Page/TextLayer.css"

import { useCallback, useState } from "react"
import { Document, Page, pdfjs } from "react-pdf"

import { DbResume } from "@/types/database"

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url
).toString()

function highlightPattern(text: string, keywords: string[]): string {
  if (!keywords || keywords.length === 0) return text

  // Create a regex pattern that matches any of the keywords (case insensitive)
  const pattern = new RegExp(`\\b(${keywords.join("|")})\\b`, "gi")
  return text.replace(pattern, (value: string) => `<mark>${value}</mark>`)
}

export default function TargetedResumeViewer({
  resume,
  analysisObject,
}: {
  resume: DbResume
  analysisObject?: {
    keywords?: {
      present?: string[]
    }
  }
}) {
  const [numPages, setNumPages] = useState<number | null>(null)

  const textRenderer = useCallback(
    (textItem: { str: string }) => {
      let highlightedText = textItem.str

      // Highlight the present keywords from analysis
      if (analysisObject?.keywords?.present) {
        highlightedText = highlightPattern(
          highlightedText,
          analysisObject.keywords.present
        )
      }

      return highlightedText
    },
    [analysisObject?.keywords?.present]
  )

  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    setNumPages(numPages)
  }

  return (
    <div className="flex h-full flex-col rounded-lg border bg-white shadow-sm">
      <Document
        file={resume.storage_url}
        onLoadSuccess={onDocumentLoadSuccess}
        loading={
          <div className="flex h-full w-full items-center justify-center">
            Loading document...
          </div>
        }
        className="h-full w-full"
        error={
          <div className="flex h-full w-full flex-col items-center justify-center p-6 text-center">
            <p className="text-lg font-medium text-red-500">
              Failed to load PDF
            </p>
            <p className="text-muted-foreground mt-2 text-sm">
              There was a problem loading this document. Try the text view
              below.
            </p>
          </div>
        }
      >
        <div className="flex h-full flex-col items-center space-y-4 overflow-y-auto p-4">
          {numPages &&
            Array.from(new Array(numPages), (_, index) => (
              <Page
                key={`page_${index + 1}`}
                pageNumber={index + 1}
                renderTextLayer={true}
                renderAnnotationLayer={true}
                customTextRenderer={textRenderer}
                className="relative shadow-md"
              >
                <div className="absolute right-2 bottom-2 rounded bg-white/70 px-2 py-1 text-xs text-gray-800">
                  Page {index + 1} of {numPages}
                </div>
              </Page>
            ))}
        </div>
      </Document>
    </div>
  )
}
