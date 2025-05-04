import React from "react"

import { Button } from "@/components/ui/button"

import googleOAuth from "../server/actions/google-oauth"

export default function GoogleOAuthButton() {
  return (
    <form action={googleOAuth}>
      <Button
        variant={"secondary"}
        type="submit"
        className="w-full cursor-pointer"
      >
        Google
      </Button>
    </form>
  )
}
