"use server"

import { revalidatePath } from "next/cache"

import { getCurrentUser } from "@/server/actions/get-current-user"
import { ResultAsync, tryCatch } from "@/types/result"
import { createClient } from "@/utils/supabase/server"

export default async function deleteJobs(input: {
  ids: string[]
}): Promise<ResultAsync<void, Error>> {
  return tryCatch(async () => {
    const supabase = await createClient()
    const [user, userError] = await getCurrentUser()

    if (userError) {
      throw userError
    }

    const { error } = await supabase
      .from("job_applications")
      .delete()
      .in("id", input.ids)
      .eq("user_id", user.id)

    if (error) {
      console.error("Error deleting jobs:", error)
      throw new Error(`Failed to delete jobs: ${error.message}`)
    }

    revalidatePath("/job-tracker")
  })
}
