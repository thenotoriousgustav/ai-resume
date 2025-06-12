"use client"

import "react-pdf/dist/esm/Page/AnnotationLayer.css"
import "react-pdf/dist/esm/Page/TextLayer.css"

import { useEffect, useRef, useState } from "react"
import { Document, Page, pdfjs } from "react-pdf"
import { z } from "zod"

import { Tables } from "@/types/supabase-types"

import { resumeAnalysisSchema } from "../schema/analysis-result-schema"

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url
).toString()

type Resume = Tables<"resumes">

export default function ResumeViewer({
  resume,
  analysisResult,
}: {
  resume: Resume
  analysisResult: z.infer<typeof resumeAnalysisSchema> | null
}) {
  const [numPages, setNumPages] = useState<number | null>(null)
  const [textLayerReady, setTextLayerReady] = useState(false)
  const documentRef = useRef<HTMLDivElement>(null)

  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    setNumPages(numPages)
  }

  // Apply highlights when text layer is ready and analysis results are available
  useEffect(() => {
    if (textLayerReady && analysisResult && documentRef.current) {
      highlightIssuesInResume(analysisResult)
    }
  }, [textLayerReady, analysisResult])

  const highlightIssuesInResume = (
    analysis: z.infer<typeof resumeAnalysisSchema>
  ) => {
    if (!documentRef.current || !analysis) return

    // Get all textLayer spans from the document
    const textElements = documentRef.current.querySelectorAll(
      ".react-pdf__Page__textContent span"
    )

    // Reset any previous highlights
    textElements.forEach((span) => {
      span.classList.remove(
        "highlight-issue",
        "highlight-keyword",
        "highlight-skill"
      )
    })

    // // Helper to check if text contains a phrase (case insensitive)
    const containsPhrase = (text: string, phrase: string) => {
      return text.toLowerCase().includes(phrase.toLowerCase())
    }

    // Apply highlights based on content
    textElements.forEach((element) => {
      const text = element.textContent || ""

      // Highlight present keywords
      if (analysis.keywords) {
        // Combine all keyword arrays and highlight them
        const allKeywords = [
          ...(analysis.keywords.job_titles || []),
          ...(analysis.keywords.skills || []),
          ...(analysis.keywords.career_paths || []),
          ...(analysis.keywords.professional_summaries || []),
          ...(analysis.keywords.additional_keywords || []),
        ]

        allKeywords.forEach((keyword: string) => {
          if (containsPhrase(text, keyword)) {
            element.classList.add("highlight-keyword")
          }
        })
      }

      // Highlight missing skills (to show where they could be added)
      if (analysis.sections) {
        const skillsSection = analysis.sections.find(
          (s) => s.name.toLowerCase() === "skills"
        )
        if (skillsSection && text.toLowerCase().includes("skills")) {
          element.classList.add("highlight-skill-section")
        }
      }
    })
  }

  // This function is called when each page's text layer is ready
  const onTextLayerRendered = () => {
    setTextLayerReady(true)
  }

  return (
    <div className="h-[75vh] overflow-y-auto rounded-lg border bg-white shadow-sm">
      <style jsx global>{`
        .highlight-issue {
          background-color: rgba(255, 100, 100, 0.3) !important;
          border-bottom: 2px wavy #ff6464 !important;
          position: relative;
          cursor: help;
        }

        .highlight-keyword {
          background-color: rgba(100, 200, 255, 0.2) !important;
          border-bottom: 1px solid #64c8ff !important;
        }

        .highlight-skill-section {
          background-color: rgba(255, 180, 100, 0.2) !important;
          border: 1px dashed #ffb464 !important;
        }

        .react-pdf__Document {
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .react-pdf__Page {
          margin-bottom: 1rem;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
        }
      `}</style>

      <div ref={documentRef}>
        <Document
          file={resume.storage_url}
          onLoadSuccess={onDocumentLoadSuccess}
          onLoadError={(error) => {
            console.error("PDF Load Error:", error)
          }}
          loading={
            <div className="flex h-full w-full items-center justify-center p-8">
              <div className="text-center">
                <div className="mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-b-2 border-blue-600"></div>
                <p className="text-gray-600">Loading document...</p>
              </div>
            </div>
          }
          className="flex flex-col items-center justify-center p-4"
          error={
            <div className="flex h-full w-full flex-col items-center justify-center p-6 text-center">
              <div className="mb-4 text-6xl">📄</div>
              <p className="mb-2 text-lg font-medium text-red-500">
                Failed to load PDF
              </p>
              <p className="text-muted-foreground mb-4 text-sm">
                There was a problem loading this document. This could be due to:
              </p>
              <ul className="mb-4 space-y-1 text-left text-sm text-gray-600">
                <li>• PDF file corruption</li>
                <li>• Network connectivity issues</li>
                <li>• Unsupported PDF format</li>
                <li>• File access permissions</li>
              </ul>
              <p className="text-muted-foreground text-sm">
                Try refreshing the page or download the file directly.
              </p>
            </div>
          }
        >
          {numPages &&
            Array.from(new Array(numPages), (_, index) => (
              <Page
                key={`page_${index + 1}`}
                pageNumber={index + 1}
                renderTextLayer={true}
                renderAnnotationLayer={true}
                className="mb-8 shadow-md"
                onGetTextSuccess={onTextLayerRendered}
              >
                <div className="absolute right-2 bottom-2 rounded bg-white/70 px-2 py-1 text-xs text-gray-800">
                  Page {index + 1} of {numPages}
                </div>
              </Page>
            ))}
        </Document>
      </div>

      {analysisResult && (
        <div className="sticky right-0 bottom-0 left-0 bg-white/90 p-2 backdrop-blur">
          <div className="flex justify-start gap-4 text-xs">
            <div className="flex items-center">
              <span className="mr-1 inline-block h-3 w-3 border-b-2 border-red-400 bg-red-200"></span>
              <span>Issues</span>
            </div>
            <div className="flex items-center">
              <span className="mr-1 inline-block h-3 w-3 border-b border-blue-400 bg-blue-200"></span>
              <span>Keywords</span>
            </div>
            <div className="flex items-center">
              <span className="mr-1 inline-block h-3 w-3 border border-dashed border-orange-400 bg-orange-200"></span>
              <span>Skills Section</span>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
