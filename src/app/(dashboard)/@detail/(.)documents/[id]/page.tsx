import DocumentDialog from "@/features/documents/components/dialog/document-dialog"
import DocumentDialogContent from "@/features/documents/components/dialog/document-dialog-content"

export default async function DocumentDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  return (
    <DocumentDialog>
      <DocumentDialogContent resumeId={id} />
    </DocumentDialog>
  )
}
