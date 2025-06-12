"use client"

import { useRouter } from "next/navigation"
import React, { useState } from "react"

import { Dialog } from "@/components/ui/dialog"

export default function DocumentDialog({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(true)

  const handleCloseModal = React.useCallback(() => {
    setIsOpen(false)
    setTimeout(() => {
      router.back()
    }, 300)
  }, [router])

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) handleCloseModal()
      }}
    >
      {children}
    </Dialog>
  )
}
