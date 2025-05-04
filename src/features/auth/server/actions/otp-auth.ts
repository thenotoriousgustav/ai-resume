"use server"

import { z } from "zod"

import { createClient } from "@/utils/supabase/server"

import { authSchema } from "../../schemas/auth-schema"

export default async function otpAuth(values: z.infer<typeof authSchema>) {
  const supabase = await createClient()

  try {
    const result = authSchema.safeParse(values)

    if (!result.success) {
      return {
        status: "error",
        message: result.error.issues[0].message,
      }
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
      return {
        status: "error",
        message: error.message + "Failed to send magic link. Please try again.",
      }
    }

    return {
      status: "success",
      message: "Check your email for the magic link to sign in.",
    }
  } catch (error) {
    console.error("Unexpected error:", error)
    return {
      status: "error",
      message: "An unexpected error occurred. Please try again later." + error,
    }
  }
}
