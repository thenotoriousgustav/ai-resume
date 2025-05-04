"use client"

import { useRouter } from "next/navigation"

import "react-pdf/dist/esm/Page/AnnotationLayer.css"
import "react-pdf/dist/esm/Page/TextLayer.css"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Separator } from "@/components/ui/separator"
import { Tables } from "@/types/database.types"

// Set worker URL

type Resume = Tables<"resumes">

export default function DocumentModal({ resume }: { resume: Resume }) {
  const router = useRouter()

  return (
    <Dialog
      defaultOpen={true}
      open={true}
      onOpenChange={(open) => {
        if (!open) {
          router.back()
        }
      }}
    >
      <DialogContent className="w-full max-w-[95vw] lg:max-w-[90vw] xl:max-w-[85vw]">
        <DialogHeader>
          <DialogTitle className="text-xl">{resume.file_name}</DialogTitle>
        </DialogHeader>

        <div className="mt-4 grid grid-cols-1 gap-6 md:grid-cols-3">
          {/* PDF Viewer - Takes up 2/3 of the space */}
          <div className="h-[75vh] overflow-y-auto rounded-md border bg-white md:col-span-2">
            <iframe
              src={resume.storage_url}
              className="h-[800px] w-full"
              title={resume.title}
            />
          </div>

          {/* Resume Data - Takes up 1/3 of the space */}
          <div className="bg-muted h-[75vh] overflow-y-auto rounded-md p-4">
            <h3 className="mb-3 text-lg font-medium">Resume Details</h3>
            <Separator className="mb-4" />

            {/* <DocumentForm resume={resume} /> */}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
