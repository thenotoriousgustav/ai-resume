import { EllipsisIcon } from "lucide-react"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import DeleteButton from "./delete-button"

export default function DocumentDropdown({
  resumeId,
  resumeFileName,
}: {
  resumeId: string
  resumeFileName: string
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          size="icon"
          variant="ghost"
          className="rounded-full shadow-none"
          aria-label="Open edit menu"
        >
          <EllipsisIcon size={16} aria-hidden="true" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem asChild>
          <Button asChild variant={"link"} className="w-full cursor-pointer">
            <Link href={`/analyze/${resumeId}`}>Analyze</Link>
          </Button>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Button asChild variant={"link"} className="w-full cursor-pointer">
            <Link href={`/resume-builder/${resumeId}`}>Edit</Link>
          </Button>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <DeleteButton fileName={resumeFileName} />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
