import { Suspense } from "react"

import DocumentList from "@/features/documents/components/document-list"
import DocumentListLoading from "@/features/documents/components/document-list-loading"
import { DocumentUploadDialog } from "@/features/documents/components/document-uploud-dialog"

export const dynamic = "force-dynamic"

export default async function DocumentsPage() {
  return (
    <section className="w-full">
      <div className="flex items-center justify-between p-4">
        <DocumentUploadDialog />
      </div>

      <Suspense fallback={<DocumentListLoading />}>
        <DocumentList />
      </Suspense>
    </section>
  )
}
