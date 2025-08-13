"use server"

import { redirect } from "next/navigation"
import { cache } from "react"

import { GoogleUserMetadata } from "@/types/google-user-metadata"
import { type ResultAsync, tryCatch } from "@/types/result"

import { getCurrentUser } from "./get-current-user"

export const getUserMetadata = cache(
  async function getUserMetadata(): ResultAsync<GoogleUserMetadata, Error> {
    return tryCatch(async () => {
      const [user, _] = await getCurrentUser()

      if (!user) {
        redirect("/auth")
      }

      return user.user_metadata
    })
  }
)
