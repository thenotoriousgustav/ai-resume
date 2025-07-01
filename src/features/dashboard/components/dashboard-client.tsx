"use client"

import {
  AlertCircle,
  BarChart3,
  Briefcase,
  CheckCircle,
  Clock,
  FileText,
  Plus,
  Users,
  XCircle,
} from "lucide-react"
import Link from "next/link"
import React from "react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { DbResume, JobApplication } from "@/types/database"

interface DashboardClientProps {
  resumes?: DbResume[]
  recentJobApplications?: JobApplication[]
}

export default function DashboardClient({
  resumes = [],
  recentJobApplications = [],
}: DashboardClientProps) {
  // Calculate statistics
  const totalResumes = resumes.length
  const totalJobApplications = recentJobApplications.length

  // Job application status counts - only use valid status values
  const pendingApplications = recentJobApplications.filter(
    (app) => app.status === "applied"
  ).length
  const interviewingApplications = recentJobApplications.filter(
    (app) => app.status === "interview"
  ).length
  const rejectedApplications = recentJobApplications.filter(
    (app) => app.status === "rejected"
  ).length
  const acceptedApplications = recentJobApplications.filter(
    (app) => app.status === "accepted"
  ).length

  const getStatusIcon = (status: string | null) => {
    switch (status) {
      case "applied":
        return <Clock className="h-4 w-4 text-yellow-500" />
      case "interview":
        return <Users className="h-4 w-4 text-blue-500" />
      case "accepted":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "rejected":
        return <XCircle className="h-4 w-4 text-red-500" />
      default:
        return <AlertCircle className="h-4 w-4 text-gray-500" />
    }
  }

  const getStatusBadgeVariant = (status: string | null) => {
    switch (status) {
      case "applied":
        return "secondary" as const
      case "interview":
        return "default" as const
      case "accepted":
        return "default" as const
      case "rejected":
        return "destructive" as const
      default:
        return "outline" as const
    }
  }

  return (
    <div className="space-y-6">
      {/* Statistics Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Resumes</CardTitle>
            <FileText className="text-muted-foreground h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalResumes}</div>
            <p className="text-muted-foreground text-xs">Ready for analysis</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Job Applications
            </CardTitle>
            <Briefcase className="text-muted-foreground h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalJobApplications}</div>
            <p className="text-muted-foreground text-xs">Recent applications</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending</CardTitle>
            <Clock className="text-muted-foreground h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pendingApplications}</div>
            <p className="text-muted-foreground text-xs">Awaiting response</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Interviews</CardTitle>
            <Users className="text-muted-foreground h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{interviewingApplications}</div>
            <p className="text-muted-foreground text-xs">In progress</p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>
            Get started with your resume analysis and job applications
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            <Button asChild className="h-auto p-4">
              <Link href="/documents">
                <div className="flex flex-col items-center space-y-2">
                  <Plus className="h-6 w-6" />
                  <span className="text-sm">Upload Resume</span>
                </div>
              </Link>
            </Button>

            <Button asChild variant="outline" className="h-auto p-4">
              <Link href="/job-tracker">
                <div className="flex flex-col items-center space-y-2">
                  <Briefcase className="h-6 w-6" />
                  <span className="text-sm">Add Job</span>
                </div>
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Recent Resumes */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Resumes</CardTitle>
            <CardDescription>Your uploaded resume documents</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {resumes.length === 0 ? (
                <div className="py-8 text-center">
                  <FileText className="text-muted-foreground mx-auto h-12 w-12" />
                  <h3 className="mt-2 text-sm font-semibold">No resumes yet</h3>
                  <p className="text-muted-foreground mt-1 text-sm">
                    Get started by uploading your first resume.
                  </p>
                  <div className="mt-6">
                    <Button asChild>
                      <Link href="/documents">
                        <Plus className="mr-2 h-4 w-4" />
                        Upload Resume
                      </Link>
                    </Button>
                  </div>
                </div>
              ) : (
                resumes.slice(0, 5).map((resume) => (
                  <div
                    key={resume.id}
                    className="flex items-center justify-between space-x-4"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="bg-muted flex h-10 w-10 items-center justify-center rounded-lg">
                        <FileText className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="text-sm leading-none font-medium">
                          {resume.title}
                        </p>
                        <p className="text-muted-foreground text-sm">
                          {new Date(
                            resume.created_at || ""
                          ).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button asChild size="sm" variant="outline">
                        <Link href={`/documents/${resume.id}`}>
                          <BarChart3 className="mr-2 h-4 w-4" />
                          View
                        </Link>
                      </Button>
                    </div>
                  </div>
                ))
              )}

              {resumes.length > 5 && (
                <div className="pt-4 text-center">
                  <Button asChild variant="outline">
                    <Link href="/documents">View All Resumes</Link>
                  </Button>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Recent Job Applications */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Applications</CardTitle>
            <CardDescription>Your latest job applications</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentJobApplications.length === 0 ? (
                <div className="py-8 text-center">
                  <Briefcase className="text-muted-foreground mx-auto h-12 w-12" />
                  <h3 className="mt-2 text-sm font-semibold">
                    No applications yet
                  </h3>
                  <p className="text-muted-foreground mt-1 text-sm">
                    Start tracking your job applications.
                  </p>
                  <div className="mt-6">
                    <Button asChild>
                      <Link href="/job-tracker">
                        <Plus className="mr-2 h-4 w-4" />
                        Add Application
                      </Link>
                    </Button>
                  </div>
                </div>
              ) : (
                recentJobApplications.slice(0, 5).map((application) => (
                  <div
                    key={application.id}
                    className="flex items-center justify-between space-x-4"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="bg-muted flex h-10 w-10 items-center justify-center rounded-lg">
                        {getStatusIcon(application.status)}
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm leading-none font-medium">
                          {application.position}
                        </p>
                        <p className="text-muted-foreground truncate text-sm">
                          {application.company} • {application.location}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge
                        variant={getStatusBadgeVariant(application.status)}
                      >
                        {application.status || "unknown"}
                      </Badge>
                    </div>
                  </div>
                ))
              )}

              {recentJobApplications.length > 5 && (
                <div className="pt-4 text-center">
                  <Button asChild variant="outline">
                    <Link href="/job-tracker">View All Applications</Link>
                  </Button>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Application Status Overview */}
      {totalJobApplications > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Application Status Overview</CardTitle>
            <CardDescription>
              Summary of your job application statuses
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-4">
              <div className="flex items-center space-x-2">
                <Clock className="h-4 w-4 text-yellow-500" />
                <span className="text-sm font-medium">Applied:</span>
                <span className="text-muted-foreground text-sm">
                  {pendingApplications}
                </span>
              </div>

              <div className="flex items-center space-x-2">
                <Users className="h-4 w-4 text-blue-500" />
                <span className="text-sm font-medium">Interview:</span>
                <span className="text-muted-foreground text-sm">
                  {interviewingApplications}
                </span>
              </div>

              <div className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span className="text-sm font-medium">Accepted:</span>
                <span className="text-muted-foreground text-sm">
                  {acceptedApplications}
                </span>
              </div>

              <div className="flex items-center space-x-2">
                <XCircle className="h-4 w-4 text-red-500" />
                <span className="text-sm font-medium">Rejected:</span>
                <span className="text-muted-foreground text-sm">
                  {rejectedApplications}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
