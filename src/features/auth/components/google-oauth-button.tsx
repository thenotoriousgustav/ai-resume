import React from "react"

import { Button } from "@/components/ui/button"

import { googleOAuthWithTryCatch } from "../server/actions/google-oauth"

export default function GoogleOAuthButton() {
  return (
    <form action={googleOAuthWithTryCatch}>
      <Button
        className="w-full cursor-pointer"
        variant={"secondary"}
        type="submit"
      >
        Google
      </Button>
    </form>
  )
}
