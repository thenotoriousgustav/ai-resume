import { ArrowLeft } from "lucide-react"
import Link from "next/link"

import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden">
      <div className="max-w-md space-y-6">
        <div className="space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">
            Page not found 🧐
          </h2>
          <p className="text-muted-foreground">
            Oops! Looks like you've ventured into the digital wilderness. This
            page is playing hide and seek (and it's winning).
          </p>
        </div>

        <div className="flex flex-col items-center justify-center space-y-4">
          <p className="text-primary text-xl font-medium">
            Hmm, this page seems to have gone on vacation!
          </p>
        </div>

        <Button asChild className="gap-2">
          <Link href="/">
            <ArrowLeft className="h-4 w-4" />
            Back to home
          </Link>
        </Button>
      </div>

      {/* <div className="absolute bottom-0 left-0 w-full pointer-events-none">
        <h1 className="text-8xl md:text-9xl font-bold tracking-tighter flex flex-col text-start p-4">
          <span>Ahh, something</span>
          <span>went wrong :(</span>
        </h1>
      </div> */}
    </div>
  )
}
