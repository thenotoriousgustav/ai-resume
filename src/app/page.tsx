import React from "react"

import Navigation from "@/components/navigation"
import { env } from "@/config/env"

export default async function Page() {
  return (
    <section className="p-8">
      <Navigation />
      <h1 className="text-8xl">Find your expertise by your cv</h1>
      <p>{env.NEXT_PUBLIC_BASE_URL}</p>
    </section>
  )
}
