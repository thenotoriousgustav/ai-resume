"use server"

import { redirect } from "next/navigation"
import { cache } from "react"

import { getCurrentUser } from "@/server/queries/get-current-user"
import { DbResume } from "@/types/database"
import { type ResultAsync, tryCatch } from "@/types/result"
import { createClient } from "@/utils/supabase/server"

export default cache(async function getResumes(): ResultAsync<
  DbResume[],
  Error
> {
  return tryCatch(async () => {
    const supabase = await createClient()

    const [user, _] = await getCurrentUser()

    if (!user) {
      redirect("/auth")
    }

    const { data, error } = await supabase
      .from("resumes")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false })
      .limit(100)

    if (error) {
      throw new Error(`Failed to fetch resumes: ${error.message}`)
    }

    return data
  })
})
