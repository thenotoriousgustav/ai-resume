import { notFound } from "next/navigation"

import { getResume } from "@/features/documents/server/data-access/get-resume"

export default async function DocumentDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  // Await params to ensure it's resolved
  const { id } = await params
  const resume = await getResume(id)

  if (!resume) {
    notFound()
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="mb-4 text-2xl font-bold">{resume.file_name}</h1>
      <div className="rounded-lg bg-white p-6 shadow-md">
        {/* Add your full document viewing experience here */}
        <iframe
          src={resume.storage_url}
          className="h-[800px] w-full"
          title={resume.file_name}
        />
      </div>
    </div>
  )
}
