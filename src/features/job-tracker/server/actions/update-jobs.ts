"use server"

import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

import { createClient } from "@/utils/supabase/server"

interface UpdateJobsInput {
  ids: string[]
  status?: string
  priority?: string
}

export async function updateJobs(input: UpdateJobsInput) {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/login")
  }

  try {
    const updateData: Record<string, string> = {}

    if (input.status) {
      updateData.status = input.status
    }

    if (input.priority) {
      updateData.priority = input.priority
    }

    const { error } = await supabase
      .from("job_applications")
      .update(updateData)
      .in("id", input.ids)
      .eq("user_id", user.id)
      .select("*")

    if (error) {
      console.error("Error updating jobs:", error)
      return {
        data: null,
        error: `Failed to update jobs: ${error.message}`,
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
