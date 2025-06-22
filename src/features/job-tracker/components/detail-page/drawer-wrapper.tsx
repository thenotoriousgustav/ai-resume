// We are using useRouter hence this needs to be a client component.
"use client"

import { useParams, useRouter, useSelectedLayoutSegment } from "next/navigation"
import React, { useEffect } from "react"

import { DialogTitle } from "@/components/ui/dialog"
import { Drawer, DrawerContent } from "@/components/ui/drawer"

export default function DrawerWrapper({
  children,
}: {
  children: React.ReactNode
}) {
  const segment = useSelectedLayoutSegment("modal")
  const params = useParams()

  const router = useRouter()

  const [open, setOpen] = React.useState(false)

  useEffect(() => {
    const hasJobId = params?.id
    setOpen(!!hasJobId)
  }, [segment, params])

  const onOpenChange = (open: boolean) => {
    if (!open) {
      router.back()
    }
  }

  return (
    <Drawer
      open={open}
      onOpenChange={onOpenChange}
      shouldScaleBackground={true}
      direction="right"
    >
      <DrawerContent className="overflow-y-auto">
        <DialogTitle className="sr-only">Edit profile</DialogTitle>

        {children}
      </DrawerContent>
    </Drawer>
  )
}
