"use client"

import Link from "next/link"

import { Card, CardContent, CardFooter, CardTitle } from "@/components/ui/card"
import { DbResume } from "@/types/database"

import DocumentCardPDF from "./document-card-pdf"
import DocumentDropdown from "./document-dropdown"

export default function DocumentCard({ resume }: { resume: DbResume }) {
  return (
    <Card className="flex w-full flex-col gap-0 overflow-hidden p-0 transition-all duration-300 hover:shadow-md">
      <Link href={`/documents/${resume.id}`} scroll={false} passHref>
        <CardContent className="bg-muted flex h-[350px] cursor-pointer items-start justify-center overflow-hidden rounded-t-md p-0">
          <DocumentCardPDF url={resume.storage_url} />
        </CardContent>
      </Link>

      <CardFooter className="m-0 flex items-center justify-between bg-gray-200 p-2">
        <CardTitle className="max-w-[180px] truncate text-sm">
          {resume.title}
        </CardTitle>
        <DocumentDropdown
          resumeId={resume.id}
          resumeFileName={resume.file_name}
        />
      </CardFooter>
    </Card>
  )
}
