import { Clock, Edit, Plus } from "lucide-react"
import Link from "next/link"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import getResumesBuilder from "@/features/resume-builder/actions/get-resumes-builder"

import CreateResumeClient from "./create-resume-client"

export default async function ResumePage() {
  // Fetch existing resume builder projects
  const userResumes = await getResumesBuilder()

  return (
    <div className="container mx-auto max-w-6xl p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Resume Builder</h1>
        <p className="text-muted-foreground mt-2">
          Build and manage your professional resumes
        </p>
      </div>

      {/* My Resumes Section - Only show if user has resumes */}
      {userResumes.length > 0 && (
        <>
          <div className="mb-8">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-semibold">My Resumes</h2>
                <p className="text-muted-foreground text-sm">
                  Continue working on your existing resumes
                </p>
              </div>
              <Badge variant="secondary" className="text-sm">
                {userResumes.length} resume{userResumes.length !== 1 ? "s" : ""}
              </Badge>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {userResumes.map((resume) => (
                <Card
                  key={resume.id}
                  className="group hover:border-primary/20 cursor-pointer transition-all hover:shadow-md"
                >
                  <Link href={`/resume-builder/${resume.id}`} className="block">
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <div className="min-w-0 flex-1">
                          <CardTitle className="truncate text-lg">
                            {resume.title || "Untitled Resume"}
                          </CardTitle>
                          <div className="mt-1 flex items-center gap-2">
                            <Badge variant="outline" className="text-xs">
                              {resume.template || "Default"}
                            </Badge>
                          </div>
                        </div>
                        <div className="flex items-center gap-1 opacity-0 transition-opacity group-hover:opacity-100">
                          <Edit className="text-muted-foreground h-4 w-4" />
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <div className="text-muted-foreground flex items-center gap-2 text-sm">
                        <Clock className="h-4 w-4" />
                        <span>
                          {resume.updated_at
                            ? `Updated ${new Date(resume.updated_at).toLocaleDateString()}`
                            : "Recently created"}
                        </span>
                      </div>
                    </CardContent>
                  </Link>
                </Card>
              ))}
            </div>
          </div>

          <Separator className="my-8" />
        </>
      )}

      {/* Create New Resume Section */}
      <div className="mb-8">
        <div className="mb-4">
          <h2 className="flex items-center gap-2 text-2xl font-semibold">
            <Plus className="h-6 w-6" />
            Create New Resume
          </h2>
          <p className="text-muted-foreground text-sm">
            Choose how you want to create your resume
          </p>
        </div>

        <CreateResumeClient />
      </div>
    </div>
  )
}
