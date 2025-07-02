"use client"

import { X } from "lucide-react"
import React from "react"

import { DrawerClose, DrawerHeader } from "@/components/ui/drawer"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DbResume, JobApplication } from "@/types/database"

import { JobTypeBadge, PriorityBadge, StatusBadge } from "../badges"

import DrawerDocument from "./drawer-document"
import DrawerJobDetails from "./drawer-job-details"

interface DrawerContentDetailProps {
  data: JobApplication
  resumes: DbResume[]
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
          <StatusBadge status={data.status} />
          <PriorityBadge priority={data.priority} />
          <JobTypeBadge jobType={data.job_type} />
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
