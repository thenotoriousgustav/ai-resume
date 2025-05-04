import Link from "next/link"
import React from "react"

import { createClient } from "@/utils/supabase/server"

import SignOut from "./sign-out"
import { Button } from "./ui/button"

export default async function Navigation() {
  const supabase = await createClient()

  const { data } = await supabase.auth.getUser()

  return (
    <header>
      <div className="flex items-center justify-between px-10 py-4">
        <h1>Magang Gue</h1>
        <div>
          {data.user ? (
            <SignOut variant="default" className="cursor-pointer">
              Sign Out
            </SignOut>
          ) : (
            <Button variant={"default"} className="cursor-pointer" asChild>
              <Link href="/auth">Log In</Link>
            </Button>
          )}
        </div>
      </div>
    </header>
  )
}
