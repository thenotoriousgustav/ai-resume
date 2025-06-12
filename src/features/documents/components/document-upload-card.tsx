"use client"

import { Plus } from "lucide-react"
import { useState } from "react"

import { Card, CardContent } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

import UploudResumeForm from "./forms/uploud-resume-form"

export default function DocumentUploadCard() {
  const [open, setOpen] = useState(false)

  const handleSuccess = () => {
    setOpen(false)
  }

  return (
    <>
      <Card
        className="flex w-full cursor-pointer flex-col gap-0 overflow-hidden border-2 border-dashed border-gray-300 p-0 transition-all duration-300 hover:border-gray-400 hover:shadow-md"
        onClick={() => setOpen(true)}
      >
        <CardContent className="bg-muted flex h-full items-center justify-center rounded-t-md p-0">
          <div className="flex flex-col items-center justify-center text-gray-500">
            <Plus size={48} className="mb-2" />
            <span className="text-sm font-medium">Upload Document</span>
          </div>
        </CardContent>
      </Card>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Upload your file below</DialogTitle>
          </DialogHeader>
          <UploudResumeForm onSuccess={handleSuccess} />
        </DialogContent>
      </Dialog>
    </>
  )
}
