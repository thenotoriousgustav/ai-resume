"use server"

import { revalidatePath } from "next/cache"

import { getCurrentUser } from "@/server/actions/get-current-user"
import { type ResultAsync, tryCatch } from "@/types/result"
import { createClient } from "@/utils/supabase/server"

interface UpdateJobsInput {
  ids: string[]
  status?: string
  priority?: string
}

export async function updateJobs(
  input: UpdateJobsInput
): ResultAsync<void, Error> {
  return tryCatch(async () => {
    const supabase = await createClient()

    const [user, userError] = await getCurrentUser()

    if (userError) {
      throw userError
    }

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
      throw new Error(`Failed to update jobs: ${error.message}`)
    }

    revalidatePath("/job-tracker")
  })
}
