"use client"

import { Loader2 } from "lucide-react"
import { useState } from "react"
import { Document, Page, pdfjs } from "react-pdf"
import "react-pdf/dist/Page/AnnotationLayer.css"
import "react-pdf/dist/Page/TextLayer.css"

import { usePdfStore } from "@/hooks/use-pdf-store"
import { DbResume } from "@/types/database"

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url
).toString()

export default function PdfViewer({ resume }: { resume: DbResume }) {
  const [numPages, setNumPages] = useState<number | null>(null)

  const { scale } = usePdfStore()

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages)
  }

  return (
    <>
      <Document
        file={resume.storage_url}
        className="flex flex-col items-center justify-center p-4"
        onLoadSuccess={onDocumentLoadSuccess}
        error={
          <div className="flex h-full w-full flex-col items-center justify-center p-6 text-center">
            <p className="text-lg font-medium text-red-500">
              Failed to load PDF
            </p>
            <p className="text-muted-foreground mt-2 text-sm">
              There was a problem loading this document. Try downloading it
              instead.
            </p>
          </div>
        }
      >
        {numPages &&
          Array.from(new Array(numPages), (_, index) => (
            <Page
              key={`page_${index + 1}`}
              pageNumber={index + 1}
              scale={scale}
              className="mb-8 shadow-md"
              loading={
                <div className="mb-8 flex h-[800px] w-[600px] items-center justify-center rounded-md border border-dashed">
                  <Loader2 className="text-muted-foreground h-6 w-6 animate-spin" />
                </div>
              }
            >
              <div className="absolute right-2 bottom-2 rounded bg-white/70 px-2 py-1 text-xs text-gray-800">
                Page {index + 1} of {numPages}
              </div>
            </Page>
          ))}
      </Document>
    </>
  )
}
