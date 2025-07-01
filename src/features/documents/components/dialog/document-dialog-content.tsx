import React from "react"

import { DialogHeader, DialogTitle } from "@/components/ui/dialog"
import getResume from "@/server/queries/get-resume"

import PdfToolbar from "./pdf-toolbar"
import PdfViewer from "./pdf-viewer"
import ResumeData from "./resume-data"

export default async function DocumentDialogContent({
  resumeId,
}: {
  resumeId: string
}) {
  const [resume, error] = await getResume(resumeId)

  if (error) {
    return null
  }

  return (
    <React.Fragment>
      <DialogHeader className="flex flex-row items-center justify-between">
        <DialogTitle className="text-xl">{resume.title}</DialogTitle>
        <PdfToolbar resume={resume} />
      </DialogHeader>
      <div className="mt-4 grid grid-cols-1 gap-6 md:grid-cols-3">
        <div className="h-[75vh] overflow-y-auto rounded-md border bg-white md:col-span-2">
          <PdfViewer resume={resume} />
        </div>
        <ResumeData resume={resume} />
      </div>
    </React.Fragment>
  )
}
