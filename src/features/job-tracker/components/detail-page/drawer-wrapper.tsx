// We are using useRouter hence this needs to be a client component.
"use client"

import { useRouter } from "next/navigation"
import React from "react"

import { DialogTitle } from "@/components/ui/dialog"
import { Drawer, DrawerContent } from "@/components/ui/drawer"

export default function DrawerWrapper({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()

  const [open, setOpen] = React.useState(true)

  const closeDrawer = React.useCallback(() => {
    setOpen(false)
    router.back()
  }, [router])

  return (
    <Drawer
      open={open}
      shouldScaleBackground={true}
      direction="right"
      onOpenChange={(open) => {
        if (!open) closeDrawer()
      }}
    >
      <DrawerContent className="overflow-y-auto">
        <DialogTitle className="sr-only">Edit profile</DialogTitle>

        {children}
      </DrawerContent>
    </Drawer>
  )
}
