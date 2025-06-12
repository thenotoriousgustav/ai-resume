import getResumes from "@/server/data-access/get-resumes"

import DocumentCard from "./document-card"
import DocumentUploadCard from "./document-upload-card"

export default async function DocumentList() {
  const resumesData = await getResumes()

  return (
    <div className="grid grid-cols-1 gap-6 p-4 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
      <DocumentUploadCard />
      {resumesData.map((resume) => (
        <DocumentCard key={resume.id} resume={resume} />
      ))}
    </div>
  )
}
