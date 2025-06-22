"use client"

import { CellContext } from "@tanstack/react-table"
import { CheckIcon, ChevronDownIcon, FileText, PlusIcon } from "lucide-react"
import { useRouter } from "next/navigation"
import React, { JSX, useId, useState, useTransition } from "react"
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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
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
  const id = useId()
  const currentValue = getValue() || null
  const router = useRouter()

  const rowId = row.original.id
  const columnId = column.id

  const [open, setOpen] = useState(false)

  const [isPending, startTransition] = useTransition()

  const handleSubmit = async (resumeId: string) => {
    startTransition(async () => {
      const [_, error] = await updateTableCell(rowId, columnId, resumeId)

      if (error) {
        toast.error("Failed to assign resume")
      } else {
        toast.success("Resume assigned to job application")
        router.refresh()
      }
    })
  }

  const handleSelect = (resumeTitle: string) => {
    const selectedResume = resumes.find(
      (resume) => resume.title === resumeTitle
    )
    if (selectedResume) {
      setOpen(false)
      if (selectedResume.id !== currentValue) {
        handleSubmit(selectedResume.id)
      }
    }
  }

  const selectedResume = resumes.find((resume) => resume.id === currentValue)

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          id={id}
          variant="ghost"
          role="combobox"
          aria-expanded={open}
          size="sm"
          className="w-full justify-start px-2 font-normal outline-offset-0 outline-none focus-visible:outline-[3px]"
          disabled={isPending}
        >
          {selectedResume ? (
            <div className="flex items-center text-blue-600">
              <FileText className="mr-2 h-4 w-4" />
              <span className="max-w-[150px] truncate">
                {selectedResume.title}
              </span>
            </div>
          ) : (
            <div className="flex items-center text-gray-500">
              <FileText className="mr-2 h-4 w-4" />
              <span className="max-w-[150px] truncate">
                {isPending ? "Updating..." : "No resume attached"}
              </span>
            </div>
          )}
          <ChevronDownIcon
            size={16}
            className="text-muted-foreground/80 ml-auto shrink-0"
            aria-hidden="true"
          />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="border-input w-full min-w-[var(--radix-popper-anchor-width)] p-0"
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
                    onSelect={(value) => handleSelect(value)}
                    className="flex items-center gap-2"
                  >
                    <FileText className="h-4 w-4 text-blue-600" />
                    <span className="flex-1 truncate">{resume.title}</span>
                    {currentValue === resume.id && (
                      <CheckIcon size={16} className="ml-auto" />
                    )}
                  </CommandItem>
                ))}
              </CommandGroup>
            )}
            <CommandSeparator />
            <CommandGroup>
              <CommandItem asChild>
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
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
