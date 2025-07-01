import React from "react"

import { DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Skeleton } from "@/components/ui/skeleton"

export default function DocumentDialogLoading() {
  return (
    <>
      <DialogHeader className="flex flex-row items-center justify-between">
        <DialogTitle className="text-xl">
          <Skeleton className="h-6 w-48" />
        </DialogTitle>
        <div className="flex gap-2">
          <Skeleton className="h-9 w-9" />
          <Skeleton className="h-9 w-9" />
          <Skeleton className="h-9 w-9" />
        </div>
      </DialogHeader>
      <div className="mt-4 grid grid-cols-1 gap-6 md:grid-cols-3">
        <div className="h-[75vh] overflow-y-auto rounded-md border bg-white md:col-span-2">
          <div className="space-y-4 p-4">
            <Skeleton className="h-[600px] w-full" />
          </div>
        </div>
        <div className="space-y-4">
          <div className="space-y-2">
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-10 w-full" />
          </div>
          <div className="space-y-2">
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-32 w-full" />
          </div>
          <div className="space-y-2">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-20 w-full" />
          </div>
          <div className="space-y-2">
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-20 w-full" />
          </div>
          <div className="space-y-2">
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-20 w-full" />
          </div>
        </div>
      </div>
    </>
  )
}
