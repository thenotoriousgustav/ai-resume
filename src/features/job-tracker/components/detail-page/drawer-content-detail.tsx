"use client"

import { X } from "lucide-react"
import React from "react"

import { Badge } from "@/components/ui/badge"
import { DrawerClose, DrawerHeader } from "@/components/ui/drawer"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"
import { DbResume, JobApplication } from "@/types/database"

import DrawerDocument from "./drawer-document"
import DrawerJobDetails from "./drawer-job-details"

interface DrawerContentDetailProps {
  data: JobApplication
  resumes: DbResume[]
}

function getStatusColor(status: string | null) {
  switch (status?.toLowerCase()) {
    case "applied":
      return "bg-blue-100 text-blue-800"
    case "interview":
      return "bg-yellow-100 text-yellow-800"
    case "offered":
      return "bg-green-100 text-green-800"
    case "rejected":
      return "bg-red-100 text-red-800"
    default:
      return "bg-gray-100 text-gray-800"
  }
}

function getPriorityColor(priority: string | null) {
  switch (priority?.toLowerCase()) {
    case "high":
      return "bg-red-100 text-red-800"
    case "medium":
      return "bg-yellow-100 text-yellow-800"
    case "low":
      return "bg-green-100 text-green-800"
    default:
      return "bg-gray-100 text-gray-800"
  }
}

export default function DrawerContentDetail({
  data,
  resumes,
}: DrawerContentDetailProps) {
  return (
    <React.Fragment>
      <DrawerClose className="flex justify-end p-2">
        <X className="h-4 w-4" />
      </DrawerClose>
      <DrawerHeader className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex-1 space-y-2">
          <h1 className="text-xl leading-none font-semibold tracking-tight">
            {data.position} at {data.company}
          </h1>
          <div className="text-muted-foreground flex flex-wrap items-center gap-4 text-sm">
            {data.location && (
              <span className="flex items-center gap-1">{data.location}</span>
            )}
            {data.salary && (
              <span className="flex items-center gap-1">{data.salary}</span>
            )}
          </div>
        </div>
        <div className="flex items-center gap-2">
          {data.status && (
            <Badge className={cn(getStatusColor(data.status))}>
              {data.status}
            </Badge>
          )}
          {data.priority && (
            <Badge className={cn(getPriorityColor(data.priority))}>
              {data.priority}
            </Badge>
          )}
        </div>
      </DrawerHeader>

      <div className="flex-1 p-4">
        <Tabs defaultValue="details" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="details">Job Details</TabsTrigger>
            <TabsTrigger value="documents">Documents</TabsTrigger>
          </TabsList>

          <TabsContent value="details" className="mt-6 space-y-6">
            <DrawerJobDetails data={data} />
          </TabsContent>

          <TabsContent value="documents" className="mt-6 space-y-4">
            <DrawerDocument data={data} resumes={resumes} />
          </TabsContent>
        </Tabs>
      </div>
    </React.Fragment>
  )
}
