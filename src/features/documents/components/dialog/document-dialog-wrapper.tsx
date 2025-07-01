"use client"

import { useRouter } from "next/navigation"
import React from "react"

import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"

export default function DocumentDialogWrapper({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()

  const handleOpenChange = React.useCallback(
    (open: boolean) => {
      if (!open) {
        router.back()
      }
    },
    [router]
  )

  return (
    <Dialog defaultOpen={true} onOpenChange={handleOpenChange}>
      <DialogTitle className="sr-only">Document</DialogTitle>
      <DialogContent className="w-full max-w-[95vw] lg:max-w-[90vw] xl:max-w-[85vw]">
        {children}
      </DialogContent>
    </Dialog>
  )
}
