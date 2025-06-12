import CoverLetterWrapper from "@/features/cover-letter/components/cover-letter-wrapper"
import { getCoverLetter } from "@/features/cover-letter/server/actions/cover-letter-action"
import getJobApplication from "@/features/cover-letter/server/data-acess/get-job-application"

export default async function CoverLetter({
  params,
}: {
  params: Promise<{ jobApplicationId: string }>
}) {
  const { jobApplicationId } = await params

  // Fetch both in parallel
  const jobApplicationPromise = getJobApplication(jobApplicationId)
  const coverLetterPromise = getCoverLetter(jobApplicationId)

  const [jobApplicationData, existingCoverLetter] = await Promise.all([
    jobApplicationPromise,
    coverLetterPromise,
  ])

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
