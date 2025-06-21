// app/(dashboard)/cover-letter/[jobApplicationId]/page.tsx

import CoverLetterWrapper from "@/features/cover-letter/components/cover-letter-wrapper"
import getCoverLetter from "@/features/cover-letter/server/queries/get-cover-letter"
import getJobApplication from "@/server/queries/get-job-application"

export default async function CoverLetterPage({
  params,
}: {
  params: Promise<{ jobApplicationId: string }>
}) {
  const { jobApplicationId } = await params

  const [jobApplicationResult, coverLetterResult] = await Promise.all([
    getJobApplication(jobApplicationId),
    getCoverLetter(jobApplicationId),
  ])

  const [jobApplicationData, jobApplicationError] = jobApplicationResult
  const [existingCoverLetter, coverLetterError] = coverLetterResult

  if (jobApplicationError || coverLetterError) {
    return (
      <section className="container mx-auto py-8">
        <h1 className="text-2xl font-bold text-red-600">Failed to load data</h1>
        <p className="text-muted-foreground">
          {jobApplicationError?.message || coverLetterError?.message}
        </p>
      </section>
    )
  }

  return (
    <section className="container mx-auto">
      <div className="mb-6 space-y-2">
        <h1 className="text-2xl font-bold">Generate your cover letter</h1>
        <p className="text-muted-foreground">
          Create a customized cover letter for your job application
        </p>
      </div>

      <CoverLetterWrapper
        jobApplicationData={jobApplicationData}
        jobApplicationId={jobApplicationId}
        existingCoverLetter={existingCoverLetter}
      />
    </section>
  )
}
