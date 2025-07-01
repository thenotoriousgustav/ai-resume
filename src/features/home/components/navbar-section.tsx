import Link from "next/link"
import React from "react"

import { Button } from "@/components/ui/button"
import { getCurrentUser } from "@/server/actions/get-current-user"

export default async function NavbarSection() {
  const [user, _] = await getCurrentUser()

  return (
    <header className="bg-background/95 supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 flex w-full items-center justify-center border-b backdrop-blur">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-xl font-bold">Silamar</span>
        </div>

        <Button
          variant={"default"}
          className="rounded-full bg-black text-white hover:bg-black/90"
          asChild
        >
          <Link href={user ? "/dashboard" : "/auth"}>
            {user ? "Dashboard" : "Sign In"}
          </Link>
        </Button>
      </div>
    </header>
  )
}
