import TestResumeBuilder from "@/features/resume-builder/components/test-resume-builder"

export default async function ResumeBuilderPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params

  return (
    <div className="h-full">
      <TestResumeBuilder id={id} />
    </div>
  )
}
