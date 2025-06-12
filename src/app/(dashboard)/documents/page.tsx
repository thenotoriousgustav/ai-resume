import { Suspense } from "react"

import DocumentList from "@/features/documents/components/document-list"
import { DocumentUploadDialog } from "@/features/documents/components/document-uploud-dialog"

async function LoadingDocuments() {
  return (
    <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {[...Array(8)].map((_, i) => (
        <div
          key={i}
          className="animate-pulse rounded-lg bg-gray-200"
          style={{ height: "300px" }}
        />
      ))}
    </div>
  )
}

export default async function DocumentsPage() {
  return (
    <section className="w-full">
      <div className="flex items-center justify-between p-4">
        <DocumentUploadDialog />
      </div>

      <Suspense fallback={<LoadingDocuments />}>
        <DocumentList />
      </Suspense>
    </section>
  )
}
