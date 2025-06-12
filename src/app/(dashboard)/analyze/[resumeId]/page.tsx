import AnalyzeClient from "@/features/analyze/components/analyze-client"
import getResume from "@/server/data-access/get-resume"

export default async function AnalyzePage({
  params,
}: {
  params: Promise<{ resumeId: string }>
}) {
  const { resumeId } = await params

  const resumeData = await getResume(resumeId)

  if (!resumeData) {
    return (
      <div className="flex h-[60vh] items-center justify-center">
        No resume found.
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4">
      <h1 className="mb-6 text-3xl font-bold">Analyze Your Resume</h1>
      <AnalyzeClient resumeData={resumeData} />
    </div>
  )
}
