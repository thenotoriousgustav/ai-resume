import { format } from "date-fns"
import { Download, Eye, FileText, PenTool, Search } from "lucide-react"
import Link from "next/link"
import React from "react"

import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { JobApplication } from "@/types/database"

export default function DrawerDocument({ data }: { data: JobApplication }) {
  return (
    <div>
      <h3 className="mb-4 text-sm font-semibold tracking-wide text-gray-600 uppercase">
        Associated Documents
      </h3>
      {data.resumes ? (
        <div className="space-y-3 rounded-lg border p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div>
                <div className="font-medium">{data.resumes.title}</div>
                <div className="text-sm text-gray-500">
                  {data.resumes.file_name} •{" "}
                  {(data.resumes.file_size / 1024 / 1024).toFixed(2)} MB
                </div>
                {data.resumes.description && (
                  <div className="mt-1 text-sm text-gray-600">
                    {data.resumes.description}
                  </div>
                )}
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Eye className="mr-2 h-4 w-4" />
                View
              </Button>
              <Button variant="outline" size="sm">
                <Download className="mr-2 h-4 w-4" />
                Download
              </Button>
            </div>
          </div>
          <Separator />

          {/* Quick Actions */}
          <div className="space-y-2">
            <div className="text-xs font-medium tracking-wide text-gray-700 uppercase">
              Quick Actions
            </div>
            <div className="flex flex-wrap gap-2">
              <Button asChild variant="outline" size="sm">
                <Link href={`/targeted-resume/${data.id}`}>
                  <FileText className="mr-2 h-4 w-4" />
                  Targeted Resume
                </Link>
              </Button>
              <Button asChild variant="outline" size="sm">
                <Link href={`/analyze/${data.resumes.id}`}>
                  <Search className="mr-2 h-4 w-4" />
                  Analyze Resume
                </Link>
              </Button>
              <Button asChild variant="outline" size="sm">
                <Link href={`/cover-letter/${data.id}`}>
                  <PenTool className="mr-2 h-4 w-4" />
                  Cover Letter
                </Link>
              </Button>
            </div>
          </div>

          <Separator />

          <div className="text-xs text-gray-500">
            Uploaded:{" "}
            {format(
              new Date(data.resumes.created_at!),
              "MMM dd, yyyy 'at' HH:mm"
            )}
          </div>
        </div>
      ) : (
        <div className="rounded-lg border-2 border-dashed border-gray-300 p-8 text-center">
          <p className="text-gray-500">
            No resume attached to this application
          </p>
          <Button variant="outline" className="mt-3">
            Attach Resume
          </Button>
        </div>
      )}
    </div>
  )
}
