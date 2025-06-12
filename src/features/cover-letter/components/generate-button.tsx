import { RequestOptions } from "ai"
import React from "react"

import { Button } from "@/components/ui/button"

interface GenerateButtonProps {
  complete: (
    prompt: string,
    options?: RequestOptions
  ) => Promise<string | null | undefined>
}

export default function GenerateButton({ complete }: GenerateButtonProps) {
  return (
    <Button
      type="submit"
      className="cursor-pointer"
      onClick={async () => {
        await complete(
          "Generate a professional cover letter based on the provided job details"
        )
      }}
    >
      Generate Cover Letter
    </Button>
  )
}
