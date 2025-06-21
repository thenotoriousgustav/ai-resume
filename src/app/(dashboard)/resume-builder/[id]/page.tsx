import { ResumeBuilder } from "@/features/resume-builder/components/resume-builder"

export default async function ResumeBuilderPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params

  return (
    <div className="h-full">
      <ResumeBuilder resumeId={id} />
    </div>
  )
}
