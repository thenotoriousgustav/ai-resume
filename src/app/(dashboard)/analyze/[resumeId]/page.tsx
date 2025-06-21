import AnalyzeClient from "@/features/analyze/components/analyze-client"
import { getResumeAnalysis } from "@/features/analyze/server/queries/get-resume-analysis"
import getResume from "@/server/queries/get-resume"

export default async function AnalyzePage({
  params,
}: {
  params: Promise<{ resumeId: string }>
}) {
  const { resumeId } = await params

  const [resumeData, resumeError] = await getResume(resumeId)

  if (!resumeData) {
    return (
      <div className="flex h-[60vh] items-center justify-center">
        {resumeError ? (
          <p>Error: {resumeError.message}</p>
        ) : (
          <p>No resume found.</p>
        )}
      </div>
    )
  }

  const [existingAnalysis, analysisError] = await getResumeAnalysis(resumeId)

  return (
    <div className="container mx-auto px-4">
      <h1 className="mb-6 text-3xl font-bold">Analyze Your Resume</h1>

      {analysisError && (
        <div className="mb-4 rounded-lg border border-red-200 bg-red-50 p-4">
          <p className="text-red-700">
            Error loading existing analysis: {analysisError.message}
          </p>
        </div>
      )}

      <AnalyzeClient
        resumeData={resumeData}
        existingAnalysis={existingAnalysis}
      />
    </div>
  )
}
