import type { VariantProps } from "class-variance-authority"
import { LogOut } from "lucide-react"
import React from "react"

import { cn } from "@/lib/utils"
import signOut from "@/server/actions/sign-out"

import { Button, buttonVariants } from "./ui/button"

export type ButtonVariantProps = VariantProps<typeof buttonVariants>["variant"]

export default function SignOut({
  variant,
  children,
  className,
}: {
  variant?: ButtonVariantProps
  children: React.ReactNode
  className?: string
}) {
  return (
    <form action={signOut} className="w-full">
      <Button
        type="submit"
        variant={variant}
        className={cn("m-0 cursor-pointer p-0", className)}
      >
        <LogOut />
        {children}
      </Button>
    </form>
  )
}
