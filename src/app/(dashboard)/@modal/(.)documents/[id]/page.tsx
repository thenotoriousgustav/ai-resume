import { notFound } from "next/navigation"
import React from "react"

import DocumentModal from "@/features/documents/components/modal"
import { getResume } from "@/features/documents/server/data-access/get-resume"

export default async function ModalPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const resume = await getResume(id)

  if (!resume) {
    notFound()
  }

  return (
    <React.Fragment>
      <DocumentModal resume={resume} />
    </React.Fragment>
  )
}
