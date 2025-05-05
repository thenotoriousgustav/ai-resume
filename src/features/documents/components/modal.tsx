"use client"

import { Download, Minus, Plus, Printer, RotateCw } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { Document, Page, pdfjs } from "react-pdf"
import "react-pdf/dist/esm/Page/AnnotationLayer.css"
import "react-pdf/dist/esm/Page/TextLayer.css"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Separator } from "@/components/ui/separator"
import { Tables } from "@/types/database.types"

import UpdateResumeForm from "./forms/update-resume-form"

// Set worker URL
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url
).toString()

type Resume = Tables<"resumes">

export default function DocumentModal({ resume }: { resume: Resume }) {
  const router = useRouter()
  const [numPages, setNumPages] = useState<number | null>(null)
  const [scale, setScale] = useState<number>(1.0)
  const [isOpen, setIsOpen] = useState(true) // Control dialog open state

  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    setNumPages(numPages)
  }

  const zoomIn = () => {
    setScale((prevScale) => Math.min(prevScale + 0.2, 2.5))
  }

  const zoomOut = () => {
    setScale((prevScale) => Math.max(prevScale - 0.2, 0.5))
  }

  const resetZoom = () => {
    setScale(1.0)
  }

  const handleDownload = () => {
    // Create a temporary anchor element and trigger download
    const link = document.createElement("a")
    link.href = resume.storage_url
    link.download = resume.file_name
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const handlePrint = () => {
    // Open the PDF in a new window for printing
    const printWindow = window.open(resume.storage_url, "_blank")
    if (printWindow) {
      printWindow.addEventListener("load", () => {
        printWindow.print()
      })
    }
  }

  const handleCloseModal = () => {
    setIsOpen(false)
    setTimeout(() => {
      router.back()
    }, 300)
  }

  return (
    <Dialog
      defaultOpen={true}
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) {
          handleCloseModal()
        }
      }}
    >
      <DialogContent className="w-full max-w-[95vw] lg:max-w-[90vw] xl:max-w-[85vw]">
        <DialogHeader className="flex flex-row items-center justify-between">
          <DialogTitle className="text-xl">{resume.title}</DialogTitle>

          <div className="mr-8 flex items-center gap-2">
            <div className="mr-4 flex items-center">
              <Button
                size="icon"
                variant="outline"
                onClick={zoomOut}
                title="Zoom out"
                className="h-8 w-8"
              >
                <Minus className="h-4 w-4" />
              </Button>
              <div className="mx-2 min-w-[48px] text-center text-sm">
                {Math.round(scale * 100)}%
              </div>
              <Button
                size="icon"
                variant="outline"
                onClick={zoomIn}
                title="Zoom in"
                className="h-8 w-8"
              >
                <Plus className="h-4 w-4" />
              </Button>
              <Button
                size="icon"
                variant="outline"
                onClick={resetZoom}
                title="Reset zoom"
                className="ml-1 h-8 w-8"
              >
                <RotateCw className="h-4 w-4" />
              </Button>
            </div>

            <Button
              size="sm"
              variant="outline"
              onClick={handleDownload}
              title="Download PDF"
              className="flex items-center gap-1"
            >
              <Download className="mr-1 h-4 w-4" />
              Download
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={handlePrint}
              title="Print PDF"
              className="flex items-center gap-1"
            >
              <Printer className="mr-1 h-4 w-4" />
              Print
            </Button>
          </div>
        </DialogHeader>

        <div className="mt-4 grid grid-cols-1 gap-6 md:grid-cols-3">
          {/* PDF Viewer - Takes up 2/3 of the space */}
          <div className="h-[75vh] overflow-y-auto rounded-md border bg-white md:col-span-2">
            <Document
              file={resume.storage_url}
              onLoadSuccess={onDocumentLoadSuccess}
              loading={
                <div className="flex h-full w-full items-center justify-center">
                  Loading document...
                </div>
              }
              className="flex flex-col items-center justify-center p-4"
              error={
                <div className="flex h-full w-full flex-col items-center justify-center p-6 text-center">
                  <p className="text-lg font-medium text-red-500">
                    Failed to load PDF
                  </p>
                  <p className="text-muted-foreground mt-2 text-sm">
                    There was a problem loading this document. Try downloading
                    it instead.
                  </p>
                </div>
              }
            >
              {Array.from(new Array(numPages), (_, index) => (
                <Page
                  key={`page_${index + 1}`}
                  pageNumber={index + 1}
                  renderTextLayer={true}
                  renderAnnotationLayer={true}
                  scale={scale}
                  className="mb-8 shadow-md"
                >
                  <div className="absolute right-2 bottom-2 rounded bg-white/70 px-2 py-1 text-xs text-gray-800">
                    Page {index + 1} of {numPages}
                  </div>
                </Page>
              ))}
            </Document>
          </div>

          {/* Resume Data - Takes up 1/3 of the space */}
          <div className="bg-muted h-[75vh] overflow-y-auto rounded-md p-4">
            <h3 className="mb-3 text-lg font-medium">Resume Details</h3>
            <Separator className="mb-4" />

            <div className="space-y-4">
              <div>
                <h4 className="text-muted-foreground text-sm font-medium">
                  File Type
                </h4>
                <p className="mt-1">{resume.file_type}</p>
              </div>

              <div>
                <h4 className="text-muted-foreground text-sm font-medium">
                  File Size
                </h4>
                <p className="mt-1">
                  {(resume.file_size / 1024 / 1024).toFixed(2)} MB
                </p>
              </div>

              {/* You can add your DocumentForm component here */}
              <UpdateResumeForm resume={resume} />
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
