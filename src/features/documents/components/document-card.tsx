"use client"

import "react-pdf/dist/esm/Page/AnnotationLayer.css"
import "react-pdf/dist/esm/Page/TextLayer.css"

import { EllipsisIcon } from "lucide-react"
import Link from "next/link"
import { Document, Page, pdfjs } from "react-pdf"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardTitle } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Tables } from "@/types/database.types"

import DeleteButton from "./delete-button"

// import deleteDocument from "../server/actions/delete-document"

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url
).toString()

type Resume = Tables<"resumes">

export default function DocumentCard({ resume }: { resume: Resume }) {
  return (
    <Card className="flex w-full flex-col overflow-hidden p-0 transition-all duration-300 hover:shadow-md">
      <Link href={`/documents/${resume.id}`} scroll={false} passHref>
        <CardContent className="bg-muted flex h-[300px] cursor-pointer items-start justify-center overflow-hidden rounded-t-md p-0">
          <Document
            file={resume.storage_url}
            className="max-h-[280px]"
            loading={
              <div className="flex h-full w-full items-center justify-center">
                Loading...
              </div>
            }
          >
            <Page
              pageNumber={1}
              renderTextLayer={false}
              renderAnnotationLayer={false}
              scale={0.55}
            />
          </Document>
        </CardContent>
      </Link>

      <CardFooter className="m-0 flex items-center justify-between bg-gray-200 p-2">
        <CardTitle className="max-w-[180px] truncate text-sm">
          {resume.title}
        </CardTitle>
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
              <DeleteButton fileName={resume.file_name} />
            </DropdownMenuItem>
            <DropdownMenuItem>Option 2</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardFooter>
    </Card>
  )
}
