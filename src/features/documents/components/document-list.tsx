import getResumes from "@/server/queries/get-resumes"

import DocumentCard from "./document-card"
import DocumentUploadCard from "./document-upload-card"

export default async function DocumentList() {
  const [resumes, resumesError] = await getResumes()

  if (resumesError) {
    console.error("Resume loading error:", resumesError)
    return (
      <div className="p-4">
        <p className="text-red-500">
          Error loading resumes:{" "}
          {resumesError.message || "Unknown error occurred"}
        </p>
        <p className="mt-2 text-sm text-gray-500">
          Please try refreshing the page or contact support if the issue
          persists.
        </p>
      </div>
    )
  }

  if (!resumes || resumes.length === 0) {
    return (
      <div className="grid grid-cols-1 gap-6 p-4 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
        <DocumentUploadCard />
        <div className="col-span-full p-8 text-center text-gray-500">
          <p>No documents found. Upload your first resume to get started!</p>
        </div>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 gap-6 p-4 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
      <DocumentUploadCard />
      {resumes.map((resume) => (
        <DocumentCard key={resume.id} resume={resume} />
      ))}
    </div>
  )
}
