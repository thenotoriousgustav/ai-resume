"use client"

import { useState } from "react"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

import UploudResumeForm from "./forms/uploud-resume-form"

export function DocumentUploadDialog() {
  const [open, setOpen] = useState(false)

  const handleSuccess = () => {
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Upload your file below</DialogTitle>
        </DialogHeader>
        <UploudResumeForm onSuccess={handleSuccess} />
      </DialogContent>
    </Dialog>
  )
}
