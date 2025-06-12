"use client"

import { usePathname } from "next/navigation"

import { Separator } from "@/components/ui/separator"
import { SidebarTrigger } from "@/components/ui/sidebar"

// Define page titles based on routes
const getPageTitle = (pathname: string): string => {
  const routes: Record<string, string> = {
    "/": "Dashboard",
    "/analyze": "Resume Analyzer",
    "/job-tracker": "Job Tracker",
    "/profile": "Profile",
    "/documents": "Documents",
  }

  // Check for exact match first
  if (routes[pathname]) {
    return routes[pathname]
  }

  // Check for dynamic routes
  if (pathname.startsWith("/job-tracker/") && pathname !== "/job-tracker/") {
    return "Job Details"
  }

  // Check for analyze routes (including detail pages)
  if (pathname.startsWith("/analyze/")) {
    return "Analyze Resume"
  }

  // Default fallback
  const segments = pathname.split("/").filter(Boolean)
  if (segments.length > 0) {
    return segments[segments.length - 1]
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ")
  }

  return "Dashboard"
}

export function HeaderSidebar() {
  const pathname = usePathname()
  const pageTitle = getPageTitle(pathname)

  return (
    <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
      <div className="flex items-center gap-2 px-4">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="bg-border h-4 w-px" />
        <h1 className="text-lg font-semibold">{pageTitle}</h1>
      </div>
    </header>
  )
}
