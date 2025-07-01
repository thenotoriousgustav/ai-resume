import { Suspense } from "react"

import DocumentDialogContent from "@/features/documents/components/dialog/document-dialog-content"
import DocumentDialogLoading from "@/features/documents/components/dialog/document-dialog-loading"
import DocumentDialogWrapper from "@/features/documents/components/dialog/document-dialog-wrapper"

export default async function DocumentDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  return (
    <DocumentDialogWrapper>
      <Suspense fallback={<DocumentDialogLoading />}>
        <DocumentDialogContent resumeId={id} />
      </Suspense>
    </DocumentDialogWrapper>
  )
}
