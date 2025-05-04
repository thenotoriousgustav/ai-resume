import clsx from "clsx"
import React from "react"

type ContainerProps = {
  children: React.ReactNode
  className?: string
}

export default function Container({ children, className }: ContainerProps) {
  return (
    <div className={clsx("container mx-auto px-8", className)}>{children}</div>
  )
}
