"use client"

import { CellContext } from "@tanstack/react-table"
import { FileText } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import React, { JSX, useEffect, useState, useTransition } from "react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  Drawer,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { ScrollArea } from "@/components/ui/scroll-area"
import { DbResume, JobApplication } from "@/types/database"

import updateTableCell from "../../server/actions/update-table-cell"

interface ResumeCellProps extends CellContext<JobApplication, string | null> {
  resumes: DbResume[]
}

export const ResumeCell = ({
  getValue,
  row,
  column,
  resumes,
}: ResumeCellProps): JSX.Element => {
  const currentValue = getValue() || null
  const router = useRouter()

  const rowId = row.original.id
  const columnId = column.id

  const [isOpen, setIsOpen] = useState(false)
  const [selectedResumeId, setSelectedResumeId] = useState<string | null>(
    rowId || null
  )

  const [isPending, startTransition] = useTransition()

  const handleSubmit = async (resumeId: string) => {
    startTransition(async () => {
      const [_, error] = await updateTableCell(rowId, columnId, resumeId)
      toast.success("Resume assigned to job application")

      router.refresh()
      setSelectedResumeId(resumeId)

      if (error) {
        toast.error("Failed to assign resume")
      }
    })
  }

  useEffect(() => {
    if (!isPending) {
      setIsOpen(false)
    }
  }, [isPending])

  return (
    <Drawer open={isOpen} onOpenChange={setIsOpen} direction="right">
      <DrawerTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="w-full cursor-pointer justify-start px-2"
        >
          {row.original.resumes ? (
            <div className="flex items-center text-blue-600">
              <FileText className="mr-2 h-4 w-4" />
              <span className="max-w-[150px] truncate">
                {row.original.resumes.title}
              </span>
            </div>
          ) : (
            <div className="flex items-center text-gray-500">
              <FileText className="mr-2 h-4 w-4" />
              <span className="max-w-[150px] truncate">No resume attached</span>
            </div>
          )}
        </Button>
      </DrawerTrigger>

      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Select Resume for Application</DrawerTitle>
        </DrawerHeader>

        {resumes.length === 0 ? (
          <div className="py-6 text-center">
            <FileText className="mx-auto mb-2 h-12 w-12 text-gray-400" />
            <h3 className="mb-1 font-medium">No resumes available</h3>
            <p className="mb-4 text-sm text-gray-500">
              Upload a resume first to attach it to this application
            </p>
            <Button
              onClick={() => window.open("/documents", "_blank")}
              className="mx-auto"
            >
              Upload Resume
            </Button>
          </div>
        ) : (
          <ScrollArea className="max-h-[60vh]">
            <div className="space-y-2 py-2">
              {resumes.map((resume) => (
                <Card
                  key={resume.id}
                  className={`cursor-pointer transition-colors hover:bg-slate-50 ${
                    selectedResumeId === resume.id
                      ? "border-blue-500 bg-blue-50"
                      : ""
                  } ${isPending ? "pointer-events-none opacity-50" : ""}`}
                  onClick={() => !isPending && setSelectedResumeId(resume.id)}
                >
                  <CardContent className="p-3">
                    <div className="flex items-center gap-3">
                      <FileText className="h-5 w-5 text-blue-600" />
                      <div className="min-w-0 flex-1">
                        <p className="font-medium">{resume.title}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </ScrollArea>
        )}

        <DrawerFooter className="flex flex-row items-center justify-between gap-2 p-4">
          <div className="flex gap-2">
            {selectedResumeId && (
              <Button
                size="sm"
                variant="outline"
                className="cursor-pointer"
                asChild
              >
                <Link href={`analyze/${selectedResumeId}`}>Analyze</Link>
              </Button>
            )}
          </div>

          <Button
            onClick={() => selectedResumeId && handleSubmit(selectedResumeId)}
            disabled={
              !selectedResumeId ||
              selectedResumeId === currentValue ||
              isPending
            }
            className="cursor-pointer"
          >
            {isPending
              ? "Updating..."
              : selectedResumeId === currentValue
                ? "Current Selection"
                : "Select Resume"}
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}
