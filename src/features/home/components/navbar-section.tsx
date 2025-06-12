import { Search } from "lucide-react"
import Link from "next/link"
import React from "react"

import { Button } from "@/components/ui/button"
import { getCurrentUser } from "@/server/actions/get-current-user"

export default async function NavbarSection() {
  const user = await getCurrentUser()

  return (
    <header className="bg-background/95 supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 flex w-full items-center justify-center border-b backdrop-blur">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Search className="h-5 w-5 text-black" />
          <span className="text-xl font-bold">JobGenius</span>
        </div>

        <div className="flex items-center gap-4">
          <Link
            href={user ? "/dashboard" : "/auth"}
            className="text-sm font-medium underline-offset-4 hover:underline"
          >
            {user ? "Dashboard" : "Sign In"}
          </Link>

          <Button
            className="rounded-full bg-black text-white hover:bg-black/90"
            asChild
          >
            <Link href={user ? "/dashboard" : "/auth"}>Get Started</Link>
          </Button>
        </div>
      </div>
    </header>
  )
}
