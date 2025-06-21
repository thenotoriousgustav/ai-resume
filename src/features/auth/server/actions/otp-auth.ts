"use server"

import { z } from "zod"

import { type ResultAsync, tryCatch } from "@/types/result"
import { createClient } from "@/utils/supabase/server"

import { authSchema } from "../../schemas/auth-schema"

export default async function otpAuth(
  values: z.infer<typeof authSchema>
): ResultAsync<void, Error> {
  return tryCatch(async () => {
    const supabase = await createClient()

    const result = authSchema.safeParse(values)

    if (!result.success) {
      throw new Error(result.error.issues[0].message)
    }

    const { error } = await supabase.auth.signInWithOtp({
      email: result.data.email,
      options: {
        shouldCreateUser: true,
        emailRedirectTo: "https://www.youtube.com",
      },
    })

    if (error) {
      console.error("Supabase error:", error)
      throw new Error(
        `${error.message} Failed to send magic link. Please try again.`
      )
    }
  })
}
