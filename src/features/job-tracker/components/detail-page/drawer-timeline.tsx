import { format } from "date-fns"
import React from "react"

import { DbJobApplication } from "@/types/database"

export default function DrawerTimeline({ data }: { data: DbJobApplication }) {
  return (
    <div>
      <h3 className="mb-4 text-sm font-semibold tracking-wide text-gray-600 uppercase">
        Application Timeline
      </h3>
      <div className="space-y-4">
        <div className="flex gap-4">
          <div className="flex flex-col items-center">
            <div className="h-3 w-3 rounded-full bg-blue-600"></div>
            <div className="h-8 w-px bg-gray-300"></div>
          </div>
          <div className="flex-1 pb-4">
            <div className="font-medium">Application Created</div>
            <div className="text-sm text-gray-500">
              {format(new Date(data.created_at!), "MMM dd, yyyy 'at' HH:mm")}
            </div>
            <div className="mt-1 text-sm text-gray-600">
              Job application entry was created in the system
            </div>
          </div>
        </div>

        {data.applied_at && (
          <div className="flex gap-4">
            <div className="flex flex-col items-center">
              <div className="h-3 w-3 rounded-full bg-green-600"></div>
              <div className="h-8 w-px bg-gray-300"></div>
            </div>
            <div className="flex-1 pb-4">
              <div className="font-medium">Application Submitted</div>
              <div className="text-sm text-gray-500">
                {format(new Date(data.applied_at), "MMM dd, yyyy 'at' HH:mm")}
              </div>
              <div className="mt-1 text-sm text-gray-600">
                Application was submitted to {data.company}
              </div>
            </div>
          </div>
        )}

        <div className="flex gap-4">
          <div className="flex flex-col items-center">
            <div className="h-3 w-3 rounded-full bg-gray-300"></div>
          </div>
          <div className="flex-1">
            <div className="font-medium text-gray-500">Current Status</div>
            <div className="text-sm text-gray-400">
              {data.status || "Status not set"}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
