"use client"

import { Separator } from "@/components/ui/separator"
import UpdateResumeForm from "@/features/documents/components/forms/update-resume-form"
import { Tables } from "@/types/supabase-types"

type ResumeDataProps = {
  resume: Tables<"resumes">
}

export default function ResumeData({ resume }: ResumeDataProps) {
  return (
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

        <UpdateResumeForm resume={resume} />
      </div>
    </div>
  )
}
