"use client"

import { useRouter } from "next/navigation"
import React from "react"

import { Drawer, DrawerContent, DrawerTitle } from "@/components/ui/drawer"

export default function DrawerWrapper({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const [isOpen, setIsOpen] = React.useState(true)

  const handleCloseModal = React.useCallback(() => {
    setIsOpen(false)
    router.back()
  }, [router])

  return (
    <Drawer
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) handleCloseModal()
      }}
      direction="right"
    >
      <DrawerContent className="overflow-y-auto">
        <DrawerTitle className="sr-only">Edit profile</DrawerTitle>

        {children}
      </DrawerContent>
    </Drawer>
  )
}
