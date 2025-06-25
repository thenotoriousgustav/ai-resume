"use client"

import { format } from "date-fns"
import {
  CheckIcon,
  ChevronDownIcon,
  Download,
  Eye,
  FileText,
  Loader2,
  PenTool,
  PlusIcon,
} from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import React, { useId, useState, useTransition } from "react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command"
import { Label } from "@/components/ui/label"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"
import { DbResume, JobApplication } from "@/types/database"

import updateTableCell from "../../server/actions/update-table-cell"

export default function DrawerDocument({
  data,
  resumes,
}: {
  data: JobApplication
  resumes: DbResume[]
}) {
  const id = useId()
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [isPending, startTransition] = useTransition()

  const handleResumeChange = async (resumeId: string) => {
    if (resumeId === data.resume_id) return

    startTransition(async () => {
      try {
        const [_, error] = await updateTableCell(data.id, "resume_id", resumeId)
        if (error) {
          toast.error("Failed to update resume")
        } else {
          toast.success("Resume updated successfully")
          router.refresh()
        }
      } catch (error) {
        console.error("Failed to update resume:", error)
        toast.error("Failed to update resume")
      }
    })
  }

  const ResumeSelector = () => (
    <div className="mb-4">
      <Label htmlFor={id} className="mb-2 block text-sm font-medium">
        Attached Resume
      </Label>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            id={id}
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between px-3 font-normal"
            disabled={isPending}
          >
            <div className="flex items-center">
              {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              <span
                className={cn(
                  "truncate",
                  !data.resumes && "text-muted-foreground"
                )}
              >
                {isPending
                  ? "Updating..."
                  : data.resumes
                    ? data.resumes.title
                    : "No resume attached"}
              </span>
            </div>
            <ChevronDownIcon
              size={16}
              className="text-muted-foreground/80 shrink-0"
              aria-hidden="true"
            />
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className="w-full min-w-[var(--radix-popper-anchor-width)] p-0"
          align="start"
        >
          <Command>
            <CommandInput placeholder="Find resume..." />
            <CommandList>
              <CommandEmpty>No resume found.</CommandEmpty>
              {resumes.length > 0 && (
                <CommandGroup>
                  {resumes.map((resume) => (
                    <CommandItem
                      key={resume.id}
                      value={resume.title}
                      onSelect={() => {
                        handleResumeChange(resume.id)
                        setOpen(false)
                      }}
                      className="flex items-center gap-2"
                    >
                      <FileText className="h-4 w-4 text-blue-600" />
                      <span className="flex-1 truncate">{resume.title}</span>
                      {data.resume_id === resume.id && (
                        <CheckIcon size={16} className="ml-auto" />
                      )}
                    </CommandItem>
                  ))}
                </CommandGroup>
              )}
              <CommandSeparator />
              <CommandGroup>
                <Button
                  variant="ghost"
                  className="w-full justify-start font-normal"
                  onClick={() => window.open("/documents", "_blank")}
                >
                  <PlusIcon
                    size={16}
                    className="-ms-2 opacity-60"
                    aria-hidden="true"
                  />
                  Upload new resume
                </Button>
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  )

  return (
    <div>
      <h3 className="mb-4 text-sm font-semibold tracking-wide text-gray-600 uppercase">
        Associated Documents
      </h3>

      <ResumeSelector />

      {data.resumes ? (
        <div className="space-y-3 rounded-lg border p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div>
                <div className="font-medium">{data.resumes.title}</div>
                <div className="text-sm text-gray-500">
                  {data.resumes.file_name} •{" "}
                  {(data.resumes.file_size / 1024 / 1024).toFixed(2)} MB
                </div>
                {data.resumes.description && (
                  <div className="mt-1 text-sm text-gray-600">
                    {data.resumes.description}
                  </div>
                )}
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Eye className="mr-2 h-4 w-4" />
                View
              </Button>
              <Button variant="outline" size="sm">
                <Download className="mr-2 h-4 w-4" />
                Download
              </Button>
            </div>
          </div>
          <Separator />

          {/* Quick Actions */}
          <div className="space-y-2">
            <div className="text-xs font-medium tracking-wide text-gray-700 uppercase">
              Quick Actions
            </div>
            <div className="flex flex-wrap gap-2">
              <Button asChild variant="outline" size="sm">
                <Link href={`/targeted-resume/${data.id}`}>
                  <FileText className="mr-2 h-4 w-4" />
                  Targeted Resume
                </Link>
              </Button>
              <Button asChild variant="outline" size="sm">
                <Link href={`/cover-letter/${data.id}`}>
                  <PenTool className="mr-2 h-4 w-4" />
                  Cover Letter
                </Link>
              </Button>
            </div>
          </div>

          <Separator />

          <div className="text-xs text-gray-500">
            Uploaded:{" "}
            {format(
              new Date(data.resumes.created_at!),
              "MMM dd, yyyy 'at' HH:mm"
            )}
          </div>
        </div>
      ) : (
        <div className="rounded-lg border-2 border-dashed border-gray-300 p-8 text-center">
          <p className="text-gray-500">
            No resume attached to this application
          </p>
          <Button variant="outline" className="mt-3">
            Attach Resume
          </Button>
        </div>
      )}
    </div>
  )
}
