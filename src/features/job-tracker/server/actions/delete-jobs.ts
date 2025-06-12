"use server"

import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

import { createClient } from "@/utils/supabase/server"

export async function deleteJobs(input: { ids: string[] }) {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/login")
  }

  try {
    const { error } = await supabase
      .from("job_applications")
      .delete()
      .in("id", input.ids)
      .eq("user_id", user.id)

    if (error) {
      console.error("Error deleting jobs:", error)
      return {
        data: null,
        error: `Failed to delete jobs: ${error.message}`,
      }
    }

    revalidatePath("/job-tracker")

    return {
      data: null,
      error: null,
    }
  } catch (err) {
    return {
      data: null,
      error:
        err instanceof Error ? err.message : "An unexpected error occurred",
    }
  }
}
