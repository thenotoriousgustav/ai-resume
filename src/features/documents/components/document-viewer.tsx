"use client"

import { Loader2 } from "lucide-react"
import { useState } from "react"
import { Document, Page, pdfjs } from "react-pdf"

import "react-pdf/dist/esm/Page/AnnotationLayer.css"
import "react-pdf/dist/esm/Page/TextLayer.css"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { usePdfStore } from "@/hooks/use-pdf-store"
import { Tables } from "@/types/supabase-types"

import PdfToolbar from "./dialog/pdf-toolbar"
import UpdateResumeForm from "./forms/update-resume-form"

// Set worker URL
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url
).toString()

type DocumentViewerProps = {
  resume: Tables<"resumes">
}

export default function DocumentViewer({ resume }: DocumentViewerProps) {
  const [numPages, setNumPages] = useState<number | null>(null)
  const { scale } = usePdfStore()

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages)
  }

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-4">
      {/* PDF Viewer - Takes up 3/4 of the space on large screens */}
      <div className="lg:col-span-3">
        <Card className="h-full">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
            <CardTitle className="text-lg font-medium">
              Document Preview
            </CardTitle>
            <PdfToolbar resume={resume} />
          </CardHeader>
          <CardContent className="p-0">
            <div className="h-[80vh] overflow-y-auto rounded-b-lg bg-gray-50 p-4">
              <Document
                file={resume.storage_url}
                className="flex flex-col items-center justify-center"
                onLoadSuccess={onDocumentLoadSuccess}
                loading={
                  <div className="flex h-full w-full items-center justify-center p-8">
                    <div className="text-center">
                      <Loader2 className="mx-auto mb-4 h-8 w-8 animate-spin text-blue-600" />
                      <p className="text-gray-600">Loading document...</p>
                    </div>
                  </div>
                }
                error={
                  <div className="flex h-full w-full flex-col items-center justify-center p-6 text-center">
                    <div className="mb-4 text-6xl">📄</div>
                    <p className="mb-2 text-lg font-medium text-red-500">
                      Failed to load PDF
                    </p>
                    <p className="text-muted-foreground mb-4 text-sm">
                      There was a problem loading this document. This could be
                      due to:
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
                      scale={scale}
                      className="mb-8 shadow-lg"
                      loading={
                        <div className="mb-8 flex h-[800px] w-[600px] items-center justify-center rounded-md border border-dashed bg-white">
                          <Loader2 className="text-muted-foreground h-6 w-6 animate-spin" />
                        </div>
                      }
                    >
                      <div className="absolute right-2 bottom-2 rounded bg-white/80 px-2 py-1 text-xs text-gray-800 shadow-sm">
                        Page {index + 1} of {numPages}
                      </div>
                    </Page>
                  ))}
              </Document>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Document Details Sidebar - Takes up 1/4 of the space on large screens */}
      <div className="lg:col-span-1">
        <Card className="h-full">
          <CardHeader>
            <CardTitle className="text-lg font-medium">
              Document Details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="text-muted-foreground text-sm font-medium">
                File Name
              </h4>
              <p className="mt-1 text-sm">{resume.file_name}</p>
            </div>

            <div>
              <h4 className="text-muted-foreground text-sm font-medium">
                File Type
              </h4>
              <p className="mt-1 text-sm">{resume.file_type}</p>
            </div>

            <div>
              <h4 className="text-muted-foreground text-sm font-medium">
                File Size
              </h4>
              <p className="mt-1 text-sm">
                {(resume.file_size / 1024 / 1024).toFixed(2)} MB
              </p>
            </div>

            <div>
              <h4 className="text-muted-foreground text-sm font-medium">
                Upload Date
              </h4>
              <p className="mt-1 text-sm">
                {resume.created_at
                  ? new Date(resume.created_at).toLocaleDateString()
                  : "Unknown"}
              </p>
            </div>

            <div>
              <h4 className="text-muted-foreground text-sm font-medium">
                Last Modified
              </h4>
              <p className="mt-1 text-sm">
                {resume.updated_at
                  ? new Date(resume.updated_at).toLocaleDateString()
                  : "Unknown"}
              </p>
            </div>

            <Separator className="my-4" />

            <div>
              <h4 className="text-muted-foreground mb-3 text-sm font-medium">
                Edit Details
              </h4>
              <UpdateResumeForm resume={resume} />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
