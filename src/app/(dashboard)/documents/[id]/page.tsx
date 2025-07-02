import { notFound } from "next/navigation"

import DocumentViewer from "@/features/documents/components/document-viewer"
import getResume from "@/server/queries/get-resume"

export const dynamic = "force-dynamic"

export default async function DocumentDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params

  if (!id) {
    notFound()
  }

  const [resume, error] = await getResume(id)

  if (error) {
    notFound()
  }

  if (!resume) {
    notFound()
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">{resume.title}</h1>
        <p className="text-muted-foreground">Document details and preview</p>
      </div>

      <DocumentViewer resume={resume} />
    </div>
  )
}
