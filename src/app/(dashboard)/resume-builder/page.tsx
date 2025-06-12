import Link from "next/link"
import React from "react"

import { Button } from "@/components/ui/button"
import getResumesBuilder from "@/features/resume-builder/actions/get-resumes-builder"

export default async function ResumeBuilderPage() {
  const data = await getResumesBuilder()

  return (
    <section className="p-6">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Resume Builder</h1>
          <Button asChild>
            <Link href="/resume-builder/new">Create New Resume</Link>
          </Button>
        </div>

        {data.length > 0 ? (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
            {data.map((resume) => (
              <Link
                key={resume.id}
                href={`/resume-builder/${resume.id}`}
                className="rounded-lg border p-4 transition-shadow hover:shadow-md"
              >
                <h2 className="text-lg font-semibold">{resume.title}</h2>
                <p className="text-muted-foreground text-sm">
                  Created on: {new Date(resume.created_at).toLocaleDateString()}
                </p>
                <p className="text-muted-foreground text-sm">
                  Last updated:{" "}
                  {new Date(resume.updated_at).toLocaleDateString()}
                </p>
                <p className="text-muted-foreground text-sm">
                  Template: {resume.template}
                </p>
              </Link>
            ))}
          </div>
        ) : (
          <p>No resumes found.</p>
        )}
      </div>
    </section>
  )
}
