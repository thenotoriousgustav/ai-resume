"use client"

import { Download, Eye, Minus, Plus, Printer, RotateCw } from "lucide-react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { usePdfStore } from "@/hooks/use-pdf-store"
import { Tables } from "@/types/supabase-types"

export default function PdfToolbar({ resume }: { resume: Tables<"resumes"> }) {
  const { scale, resetZoom, zoomIn, zoomOut } = usePdfStore()

  const handleDownload = async () => {
    try {
      const response = await fetch(resume.storage_url)
      const blob = await response.blob()
      const blobUrl = URL.createObjectURL(blob)

      const link = document.createElement("a")
      link.href = blobUrl
      link.download = resume.file_name
      link.style.display = "none"

      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)

      URL.revokeObjectURL(blobUrl)
    } catch (error) {
      console.error("Download failed:", error)
      toast.error("Failed to download the PDF. Please try again.")
    }
  }

  const handlePrint = async () => {
    try {
      const { default: printJS } = await import("print-js")
      printJS({
        printable: resume.storage_url,
        type: "pdf",
        onError: () => {
          toast.error("Failed to print. Please try again.")
        },
      })
    } catch (error) {
      console.error("Print failed:", error)
      toast.error("Failed to load print functionality. Please try again.")
    }
  }

  const handleView = () => {
    try {
      window.open(resume.storage_url, "_blank", "noopener,noreferrer")
    } catch (error) {
      console.error("View failed:", error)
      toast.error("Failed to open the PDF. Please try again.")
    }
  }

  return (
    <div className="mr-4 flex items-center justify-end gap-3">
      {/* Zoom Controls Group */}
      <div className="bg-background flex items-center rounded-md border p-1">
        <Button
          size="icon"
          variant="ghost"
          onClick={zoomOut}
          title="Zoom out"
          className="h-7 w-7 cursor-pointer"
        >
          <Minus className="h-3.5 w-3.5" />
        </Button>

        <div className="mx-2 min-w-[48px] text-center text-xs font-medium">
          {Math.round(scale * 100)}%
        </div>

        <Button
          size="icon"
          variant="ghost"
          onClick={zoomIn}
          title="Zoom in"
          className="h-7 w-7 cursor-pointer"
        >
          <Plus className="h-3.5 w-3.5" />
        </Button>

        <Button
          size="icon"
          variant="ghost"
          onClick={resetZoom}
          title="Reset zoom"
          className="ml-1 h-7 w-7 cursor-pointer"
        >
          <RotateCw className="h-3.5 w-3.5" />
        </Button>
      </div>

      {/* Action Buttons Group */}
      <div className="flex items-center gap-2">
        <Button
          size="sm"
          variant="outline"
          onClick={handleView}
          title="View PDF"
          className="flex h-8 cursor-pointer items-center gap-1 px-3"
        >
          <Eye className="mr-1 h-3.5 w-3.5" />
          <span className="text-xs">View</span>
        </Button>

        <Button
          size="sm"
          variant="outline"
          onClick={handleDownload}
          title="Download PDF"
          className="flex h-8 cursor-pointer items-center gap-1 px-3"
        >
          <Download className="mr-1 h-3.5 w-3.5" />
          <span className="text-xs">Download</span>
        </Button>

        <Button
          size="sm"
          variant="outline"
          onClick={handlePrint}
          title="Print PDF"
          className="flex h-8 cursor-pointer items-center gap-1 px-3"
        >
          <Printer className="mr-1 h-3.5 w-3.5" />
          <span className="text-xs">Print</span>
        </Button>
      </div>
    </div>
  )
}
