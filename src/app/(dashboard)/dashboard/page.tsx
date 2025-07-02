import React, { Suspense } from "react"

import DashboardClient from "@/features/dashboard/components/dashboard-client"
import getJobApplications from "@/server/queries/get-job-applications"
import getResumes from "@/server/queries/get-resumes"

// Loading component for dashboard content
function DashboardContentSkeleton() {
  return (
    <div className="space-y-6">
      {/* Stats Cards Loading */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="rounded-lg border bg-white p-6">
            <div className="mb-2 h-4 w-20 animate-pulse rounded bg-gray-200" />
            <div className="mb-1 h-8 w-16 animate-pulse rounded bg-gray-200" />
            <div className="h-3 w-24 animate-pulse rounded bg-gray-200" />
          </div>
        ))}
      </div>

      {/* Recent sections loading */}
      <div className="grid gap-6 lg:grid-cols-2">
        {Array.from({ length: 2 }).map((_, i) => (
          <div key={i} className="rounded-lg border bg-white p-6">
            <div className="mb-4 h-6 w-32 animate-pulse rounded bg-gray-200" />
            <div className="space-y-3">
              {Array.from({ length: 3 }).map((_, j) => (
                <div key={j} className="flex items-center space-x-4">
                  <div className="h-10 w-10 animate-pulse rounded bg-gray-200" />
                  <div className="flex-1 space-y-2">
                    <div className="h-4 w-32 animate-pulse rounded bg-gray-200" />
                    <div className="h-3 w-24 animate-pulse rounded bg-gray-200" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

async function DashboardData() {
  const [resumesResult, jobAppsResult] = await Promise.all([
    getResumes(),
    getJobApplications(),
  ])

  const [resumes, resumesError] = resumesResult
  const [jobApplications, jobApplicationsError] = jobAppsResult

  if (resumesError || jobApplicationsError) {
    return <div>Error loading dashboard data.</div>
  }

  return (
    <DashboardClient
      resumes={resumes}
      recentJobApplications={jobApplications}
    />
  )
}

export default function DashboardPage() {
  return (
    <div className="container mx-auto px-4 py-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground mt-2">
          Welcome back! Here's an overview of your resume analysis and job
          application activities.
        </p>
      </div>

      <Suspense fallback={<DashboardContentSkeleton />}>
        <DashboardData />
      </Suspense>
    </div>
  )
}
