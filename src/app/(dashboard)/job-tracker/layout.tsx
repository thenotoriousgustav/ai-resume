import type { Metadata } from "next"
import React from "react"

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
}

export default async function DashboardLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode

  modal: React.ReactNode
}>) {
  return (
    <main>
      <div className="mx-auto flex w-full flex-1 flex-col px-4 py-2 contain-inline-size">
        {children}
      </div>
      {modal}
    </main>
  )
}
